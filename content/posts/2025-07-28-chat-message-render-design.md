---
title: "Ai Chat Message Render Design"
date: "2025-07-28"
excerpt: "我们的 AI 聊天界面项目是一个基于 Next.js 的实时流式聊天系统，支持多种内容类型的动态渲染，包括 Markdown、图表、代码块、思维链等。"
tags: ["ai", "chat", "development"]
featured: true
---

## 第一部分：项目背景与旧架构问题

### 项目概述

我们的 AI 聊天界面项目是一个基于 Next.js 的实时流式聊天系统，支持多种内容类型的动态渲染，包括 Markdown、图表、代码块、思维链等。

### 旧架构的核心问题

#### 1. 缺乏渲染器注册机制

在之前的实现中，我们的思维链内容渲染器直接嵌入在 TSX 文件中，每当需要添加新的内容类型时，开发者必须：

```tsx
// 旧架构的问题示例
function ContentRenderer({ blocks }) {
  return (
    <div>
      {blocks.map((block) => {
        // 每次添加新类型都要修改这里
        if (block.type === "markdown") {
          return <MarkdownRenderer block={block} />;
        } else if (block.type === "chart") {
          return <ChartRenderer block={block} />;
        } else if (block.type === "thinking") {
          return <ThinkingRenderer block={block} />;
        } else if (block.type === "code") {
          return <CodeRenderer block={block} />;
        }
        // 新增内容类型需要在这里添加条件判断
        else if (block.type === "new_type") {
          return <NewTypeRenderer block={block} />;
        }
        return <div>Unknown content type</div>;
      })}
    </div>
  );
}
```

#### 2. 紧耦合的架构问题

- **渲染逻辑与业务逻辑混合**：内容渲染直接嵌入在主要的 UI 组件中
- **扩展性差**：每次添加新功能都需要修改核心文件
- **维护困难**：条件判断链越来越长，代码可读性下降
- **测试复杂**：无法独立测试单个渲染器

#### 3. 开发体验问题

- 开发者需要了解整个渲染流程才能添加新功能
- 容易引入 bug，因为修改核心渲染逻辑
- 代码审查困难，每次 PR 都涉及核心文件修改

---

## 第二部分：新架构设计理念

### 核心设计原则

#### 1. 关注点分离 (Separation of Concerns)

我们将系统分为三个独立的层次：

```
SSE数据处理层 → 内容解析层 → 渲染层
```

#### 2. 插件化架构

新架构采用插件化设计，每个内容渲染器都是独立的组件：

```typescript
class ContentRendererRegistry {
  private renderers = new Map<
    string,
    React.ComponentType<ContentRendererProps>
  >();

  register(type: string, renderer: React.ComponentType<ContentRendererProps>) {
    this.renderers.set(type, renderer);
  }

  get(type: string): React.ComponentType<ContentRendererProps> | undefined {
    return this.renderers.get(type);
  }
}
```

#### 3. 开放封闭原则

- **对扩展开放**：轻松添加新的内容渲染器
- **对修改封闭**：核心渲染逻辑无需修改

### 架构优势对比

| 方面       | 旧架构       | 新架构          |
| ---------- | ------------ | --------------- |
| 添加新类型 | 修改核心文件 | 创建新组件+注册 |
| 代码耦合度 | 高耦合       | 低耦合          |
| 测试难度   | 集成测试     | 单元测试        |
| 维护成本   | 高           | 低              |
| 扩展性     | 差           | 优秀            |

---

## 第三部分：技术实现细节

### 1. 内容渲染器注册系统

我们的注册系统基于 Map 数据结构，提供类型安全的渲染器管理：

```typescript
/**
 * Initialize the default content renderers
 */
function initializeDefaultRenderers() {
  // Register all the default renderers
  defaultContentRendererRegistry.register("markdown", MarkdownRenderer);
  defaultContentRendererRegistry.register("chart", ChartRenderer);
  defaultContentRendererRegistry.register("code", CodeRenderer);
  defaultContentRendererRegistry.register("thinking", ThinkingRenderer);
  defaultContentRendererRegistry.register("mcp_tool", McpToolRenderer);
  defaultContentRendererRegistry.register("image", ImageRenderer);
  defaultContentRendererRegistry.register("table", TableRenderer);
}
```

### 2. SSE 数据处理与内容渲染分离

#### SSE 消息处理层

```typescript
const sendMessage = useCallback(
  async (content: string) => {
    // 添加用户消息
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // 连接SSE端点获取流式响应
    try {
      await connect({
        url: `/api/chat/stream?scenario=${content.trim()}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  },
  [connect]
);
```

#### 内容解析层

系统使用特殊标记来识别不同的内容类型：

```typescript
export const CONTENT_MARKERS = {
  CHART: {
    START: "[CONTENT_START_CHART]",
    END: "[CONTENT_END_CHART]",
  },
  CODE: {
    START: "[CONTENT_START_CODE]",
    END: "[CONTENT_END_CODE]",
  },
  THINKING: {
    START: "[CONTENT_START_THINKING]",
    END: "[CONTENT_END_THINKING]",
  },
  MCP_TOOL: {
    START: "[CONTENT_START_MCP_TOOL]",
    END: "[CONTENT_END_MCP_TOOL]",
  },
} as const;
```

### 3. 现有渲染器示例

#### 思维链渲染器

```typescript
function parseThinkingSteps(content: string): ThinkingStep[] {
  try {
    // 首先尝试解析JSON数组格式
    const trimmedContent = content.trim();

    if (trimmedContent.startsWith("[") && trimmedContent.endsWith("]")) {
      const parsed = JSON.parse(trimmedContent);

      if (Array.isArray(parsed)) {
        return parsed.map((item, index) => ({
          type: item.type || "analysis",
          title: item.title || `步骤 ${index + 1}`,
          content: item.content || "",
          duration: item.duration,
        }));
      }
    }

    // 回退到文本解析...
  } catch (error) {
    // 错误处理...
  }
}
```

#### Markdown 渲染器

```typescript
export function MarkdownRenderer({ block }: ContentRendererProps) {
  if (!block.content.trim()) {
    return null;
  }

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{block.content}</ReactMarkdown>
    </div>
  );
}
```

### 4. 主渲染器逻辑

```typescript
export function ContentRenderer({
  blocks,
  onBlockUpdate,
}: ContentRendererProps) {
  return (
    <div className="space-y-2">
      {blocks.map((block) => {
        // 显示加载骨架
        if (!block.isComplete && block.isLoading) {
          return <SkeletonLoader key={block.id} type={block.type} />;
        }

        // 获取适当的渲染器
        const RendererComponent = getContentRenderer(block.type);

        if (!RendererComponent) {
          // 未知内容类型的回退处理
          return <UnknownContentFallback key={block.id} block={block} />;
        }

        return (
          <RendererComponent
            key={block.id}
            block={block}
            onUpdate={onBlockUpdate}
          />
        );
      })}
    </div>
  );
}
```

---

## 第四部分：开发体验提升

### 添加新内容类型的步骤

现在添加新的内容类型只需要 3 个简单步骤：

#### 步骤 1：定义内容标记

```typescript
export const CONTENT_MARKERS = {
  // 现有标记...
  CUSTOM_WIDGET: {
    START: "[CONTENT_START_CUSTOM_WIDGET]",
    END: "[CONTENT_END_CUSTOM_WIDGET]",
  },
} as const;
```

#### 步骤 2：创建渲染器组件

```typescript
import { ContentRendererProps } from "@/types/content";

export function CustomWidgetRenderer({ block }: ContentRendererProps) {
  if (!block.isComplete) {
    return <SkeletonLoader type="custom_widget" />;
  }

  const data = JSON.parse(block.content);

  return (
    <div className="my-4 p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
      <h4 className="font-bold text-purple-800">{data.title}</h4>
      <p className="text-purple-600">{data.description}</p>
      {/* 自定义渲染逻辑 */}
    </div>
  );
}
```

#### 步骤 3：注册渲染器

```typescript
import { CustomWidgetRenderer } from "../content/renderers/CustomWidgetRenderer";

function initializeDefaultRenderers() {
  // 现有注册...
  defaultContentRendererRegistry.register(
    "custom_widget",
    CustomWidgetRenderer
  );
}
```

### 开发体验对比

**旧方式**：

- 需要修改核心 ContentRenderer 文件
- 添加条件判断逻辑
- 容易引入 bug
- 需要了解整个渲染流程

**新方式**：

- 创建独立的渲染器组件
- 简单的注册调用
- 零风险，不影响现有功能
- 专注于业务逻辑实现

---

## 第五部分：实战演示与总结

### 架构升级带来的价值

1. **开发效率提升 60%**：新增内容类型从半天缩短到 30 分钟
2. **代码质量提升**：单一职责原则，更好的可测试性
3. **维护成本降低**：模块化设计，问题定位更精准
4. **团队协作优化**：并行开发，减少代码冲突

### 技术债务清理

通过这次架构升级，我们成功解决了：

- ✅ 紧耦合的渲染逻辑
- ✅ 难以扩展的条件判断链
- ✅ 复杂的测试场景
- ✅ 频繁的核心文件修改

### 未来规划

基于新架构，我们计划：

- 支持更多内容类型（视频、音频、3D 模型等）
- 实现渲染器的热插拔机制
- 添加渲染器性能监控
- 构建渲染器生态系统

### Q&A 环节

欢迎大家提问关于新架构的任何技术细节！

---

## 附录：项目文件结构

```
src/
├── hooks/
│   ├── useSSE.ts          # SSE连接管理
│   ├── useChat.ts         # 主要聊天编排
├── components/
│   ├── chat/
│   │   ├── ChatInterface.tsx    # 主聊天组件
│   │   ├── MessageList.tsx      # 消息显示
│   │   ├── Message.tsx          # 单个消息
│   │   └── ChatInput.tsx        # 输入组件
│   ├── content/
│   │   ├── ContentRenderer.tsx  # 主内容编排器
│   │   ├── ContentRendererRegistry.ts # 渲染器注册系统
│   │   ├── renderers/
│   │   │   ├── MarkdownRenderer.tsx # Markdown渲染
│   │   │   ├── ChartRenderer.tsx    # 图表可视化
│   │   │   ├── ThinkingRenderer.tsx # 思维链渲染
│   │   │   ├── CodeRenderer.tsx     # 代码块渲染
│   │   │   └── McpToolRenderer.tsx  # MCP工具渲染
│   │   └── SkeletonLoader.tsx   # 加载状态
│   └── ui/
│       └── Button.tsx           # 可重用按钮
├── types/
│   ├── sse.ts            # SSE消息类型
│   ├── chat.ts           # 聊天状态类型
│   └── content.ts        # 内容渲染类型
└── utils/
    └── contentProcessor.ts # 内容解析逻辑
```

---
