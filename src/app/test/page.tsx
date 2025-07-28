// Test page to verify blog functionality
import { getAllPosts, getAllTags } from '@/lib/blog.server';
import ThemeTestClient from './ThemeTestClient';

export default function TestPage() {
  try {
    const posts = getAllPosts();
    const tags = getAllTags();

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Blog Test Page</h1>

        <ThemeTestClient />

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Posts ({posts.length})</h2>
          <ul className="list-disc pl-6">
            {posts.map((post) => (
              <li key={post.slug} className="mb-1">
                <strong>{post.title}</strong> - {post.date}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Tags ({tags.length})</h2>
          <ul className="list-disc pl-6">
            {tags.map((tag) => (
              <li key={tag.name} className="mb-1">
                {tag.name} ({tag.count})
              </li>
            ))}
          </ul>
        </div>

        <div className="text-green-600 font-semibold">
          ✅ Blog functionality is working correctly!
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Blog Test Failed</h1>
        <pre className="bg-red-100 p-4 rounded">
          {error instanceof Error ? error.message : 'Unknown error'}
        </pre>
      </div>
    );
  }
}
