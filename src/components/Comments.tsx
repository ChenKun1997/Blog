'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { MessageCircle, Github, AlertCircle } from 'lucide-react';
import { giscusConfig, getGiscusTheme, validateGiscusConfig } from '@/config/giscus';

interface CommentsProps {
  className?: string;
}

export default function Comments({ className = '' }: CommentsProps) {
  const { theme, mounted } = useTheme();
  const commentsRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [configValid, setConfigValid] = useState(false);

  useEffect(() => {
    // 验证配置
    const isValid = validateGiscusConfig();
    setConfigValid(isValid);

    if (!isValid) {
      setIsLoading(false);
      setHasError(true);
      return;
    }
  }, []);

  useEffect(() => {
    // 等待主题加载完成和配置验证
    if (!mounted || !configValid) return;

    // 清理之前的 giscus 实例
    if (commentsRef.current) {
      commentsRef.current.innerHTML = '';
    }

    setIsLoading(true);
    setHasError(false);

    // 创建 giscus script
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', giscusConfig.repo);
    script.setAttribute('data-repo-id', giscusConfig.repoId);
    script.setAttribute('data-category', giscusConfig.category);
    script.setAttribute('data-category-id', giscusConfig.categoryId);
    script.setAttribute('data-mapping', giscusConfig.mapping);
    script.setAttribute('data-strict', giscusConfig.strict);
    script.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled);
    script.setAttribute('data-emit-metadata', giscusConfig.emitMetadata);
    script.setAttribute('data-input-position', giscusConfig.inputPosition);
    script.setAttribute('data-theme', getGiscusTheme(theme));
    script.setAttribute('data-lang', giscusConfig.lang);
    script.setAttribute('data-loading', giscusConfig.loading);
    script.crossOrigin = 'anonymous';
    script.async = true;

    // 监听加载完成
    script.onload = () => {
      setIsLoading(false);
    };

    script.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };

    // 监听 giscus 消息
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://giscus.app') return;

      if (event.data.giscus?.discussion) {
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);

    // 添加到容器
    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    return () => {
      // 清理函数
      window.removeEventListener('message', handleMessage);
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '';
      }
    };
  }, [theme, mounted, configValid]);

  // 如果主题还没加载完成，不渲染组件
  if (!mounted) {
    return null;
  }

  // 如果配置无效，显示配置提示
  if (!configValid) {
    return (
      <div className={`w-full ${className}`}>
        <div className="mb-6 border-t border-border pt-8">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <h3 className="text-xl font-semibold text-foreground">
              评论系统配置
            </h3>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                需要配置 Giscus 评论系统
              </h4>
              <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                <p>请按照以下步骤配置评论系统：</p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>在 GitHub 仓库中启用 Discussions</li>
                  <li>访问 <a href="https://giscus.app" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">giscus.app</a> 获取配置</li>
                  <li>更新 <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">src/config/giscus.ts</code> 文件</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* 评论标题 */}
      <div className="mb-6 border-t border-border pt-8">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            评论讨论
          </h3>
        </div>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <Github className="w-4 h-4" />
          欢迎在下方留言讨论，需要 GitHub 账号登录
        </p>
      </div>

      {/* Giscus 容器 */}
      <div
        ref={commentsRef}
        className="giscus-container min-h-[200px]"
      />

      {/* 加载状态 */}
      {isLoading && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            正在加载评论系统...
          </div>
        </div>
      )}

      {/* 错误状态 */}
      {hasError && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          <div className="flex flex-col items-center gap-2">
            <MessageCircle className="w-8 h-8 text-muted-foreground/50" />
            <p>评论系统加载失败，请刷新页面重试</p>
          </div>
        </div>
      )}
    </div>
  );
}
