---
name: "Code Snippet Manager"
description: "A powerful tool to manage and organize your code snippets with syntax highlighting, search functionality, and team collaboration features."
tags: ["React", "TypeScript", "Productivity", "Development"]
featured: true
github: "https://github.com/ChenKun1997/snippet-manager"
demo: "https://snippet-manager-demo.vercel.app"
website: "https://snippet-manager.dev"
---

# Code Snippet Manager

A comprehensive solution for developers to store, organize, and share code snippets efficiently. Built with modern web technologies to provide a seamless experience for individual developers and teams.

## Features

### 🔍 Smart Search & Organization
- **Full-text search** across all snippets with instant results
- **Tag-based filtering** for quick categorization
- **Language-specific organization** with syntax highlighting
- **Folder structure** for hierarchical organization

### 🎨 Syntax Highlighting
- Support for **50+ programming languages**
- **Multiple themes** including dark and light modes
- **Line numbers** and **code folding** for better readability
- **Copy to clipboard** with one click

### 👥 Team Collaboration
- **Share snippets** with team members
- **Public/private** snippet visibility
- **Comments and discussions** on snippets
- **Version history** tracking

## Installation

### NPM Package
```bash
npm install @snippet-manager/core
```

### Yarn
```bash
yarn add @snippet-manager/core
```

### CDN
```html
<script src="https://unpkg.com/@snippet-manager/core@latest/dist/snippet-manager.min.js"></script>
```

## Quick Start

### Basic Usage
```javascript
import { SnippetManager } from '@snippet-manager/core';

const manager = new SnippetManager({
  apiKey: 'your-api-key',
  theme: 'dark'
});

// Create a new snippet
const snippet = await manager.create({
  title: 'React Hook Example',
  language: 'javascript',
  code: `
    import { useState, useEffect } from 'react';
    
    function useCounter(initialValue = 0) {
      const [count, setCount] = useState(initialValue);
      
      const increment = () => setCount(c => c + 1);
      const decrement = () => setCount(c => c - 1);
      const reset = () => setCount(initialValue);
      
      return { count, increment, decrement, reset };
    }
  `,
  tags: ['react', 'hooks', 'javascript']
});
```

### React Component Integration
```jsx
import { SnippetViewer } from '@snippet-manager/react';

function MyComponent() {
  return (
    <div>
      <h1>My Code Snippets</h1>
      <SnippetViewer 
        snippetId="abc123"
        theme="github-dark"
        showLineNumbers={true}
        allowCopy={true}
      />
    </div>
  );
}
```

## Configuration

### Environment Variables
```bash
SNIPPET_MANAGER_API_KEY=your_api_key_here
SNIPPET_MANAGER_BASE_URL=https://api.snippet-manager.dev
SNIPPET_MANAGER_THEME=dark
```

### Configuration File
```json
{
  "snippetManager": {
    "theme": "github-dark",
    "defaultLanguage": "javascript",
    "autoSave": true,
    "syncInterval": 30000,
    "features": {
      "collaboration": true,
      "versionHistory": true,
      "publicSharing": false
    }
  }
}
```

## API Reference

### Core Methods

#### `create(snippet: SnippetData): Promise<Snippet>`
Creates a new code snippet.

#### `get(id: string): Promise<Snippet>`
Retrieves a snippet by ID.

#### `search(query: string, filters?: SearchFilters): Promise<Snippet[]>`
Searches snippets with optional filters.

#### `update(id: string, data: Partial<SnippetData>): Promise<Snippet>`
Updates an existing snippet.

#### `delete(id: string): Promise<void>`
Deletes a snippet.

## Use Cases

### Individual Developers
- **Personal code library** for frequently used patterns
- **Learning notes** with executable examples
- **Project templates** and boilerplate code
- **Algorithm implementations** for interview prep

### Development Teams
- **Shared code standards** and best practices
- **Reusable components** and utilities
- **API examples** and integration guides
- **Troubleshooting solutions** and fixes

### Educational Purposes
- **Code examples** for tutorials and courses
- **Student submissions** and feedback
- **Interactive coding exercises**
- **Reference materials** for different topics

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/ChenKun1997/snippet-manager/blob/main/CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](https://github.com/ChenKun1997/snippet-manager/blob/main/LICENSE) for details.
