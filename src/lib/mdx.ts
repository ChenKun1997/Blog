import rehypePrettyCode from "rehype-pretty-code";
import CodeBlock from "@/components/CodeBlock";
import remarkGfm from "remark-gfm";

// Rehype Pretty Code configuration
const rehypePrettyCodeOptions = {
  // Use Shiki themes that match our light/dark mode
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  // Keep background transparent to use our custom styling
  keepBackground: false,
  // Default language when none is specified
  defaultLang: "plaintext",
  // Transform function to add custom attributes
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: any) {
    // Add class for highlighted lines
    if (node.properties.className) {
      node.properties.className.push("line--highlighted");
    } else {
      node.properties.className = ["line--highlighted"];
    }
  },
  onVisitHighlightedChars(node: any) {
    // Add class for highlighted characters
    if (node.properties.className) {
      node.properties.className.push("word--highlighted");
    } else {
      node.properties.className = ["word--highlighted"];
    }
  },
};

// Custom MDX components
export const components = {
  pre: CodeBlock,
};

// MDX options for next-mdx-remote/rsc
export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
};
