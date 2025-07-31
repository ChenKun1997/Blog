'use client';

import { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  'data-language'?: string;
  [key: string]: any;
}

export default function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (preRef.current) {
      // Get the code element inside the pre
      const codeElement = preRef.current.querySelector('code');
      if (codeElement) {
        // Extract text content, removing line numbers and other decorations
        const text = codeElement.textContent || '';

        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }
    }
  };

  return (
    <div className="relative group">
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
        aria-label={copied ? 'Copied!' : 'Copy code'}
        title={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
