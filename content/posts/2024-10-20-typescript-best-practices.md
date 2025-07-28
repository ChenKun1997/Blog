---
title: "TypeScript Best Practices for React Development"
date: "2024-10-20"
excerpt: "Essential TypeScript patterns and best practices that will make your React applications more robust and maintainable."
tags: ["typescript", "react", "best-practices", "development"]
featured: true
---

# TypeScript Best Practices for React Development

TypeScript has become an essential tool for building robust React applications. Here are some best practices that will help you write better, more maintainable code.

## 1. Define Proper Component Props

Always define explicit interfaces for your component props:

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  disabled = false 
}) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

## 2. Use Generic Types for Reusable Components

Create flexible, reusable components with generics:

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
```

## 3. Leverage Union Types for State Management

Use union types to create type-safe state machines:

```typescript
type LoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: any }
  | { status: 'error'; error: string };

const [state, setState] = useState<LoadingState>({ status: 'idle' });
```

## 4. Create Custom Hooks with Proper Types

Type your custom hooks properly:

```typescript
interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
```

## 5. Use Utility Types

Leverage TypeScript's built-in utility types:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// For API responses (exclude sensitive data)
type PublicUser = Omit<User, 'password'>;

// For forms (make some fields optional)
type UserForm = Partial<Pick<User, 'name' | 'email'>>;

// For updates (all fields optional except id)
type UserUpdate = Partial<User> & Pick<User, 'id'>;
```

## 6. Strict Configuration

Use strict TypeScript configuration:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## 7. Type Guards for Runtime Safety

Create type guards for runtime type checking:

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj
  );
}
```

## Conclusion

These TypeScript best practices will help you build more robust React applications. Remember to:

- Always type your props and state
- Use generics for reusable components
- Leverage utility types
- Create type guards for runtime safety
- Keep your TypeScript configuration strict

Happy coding!
