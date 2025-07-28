import Link from 'next/link';
import { ArrowLeft, FileX } from 'lucide-react';
import Container from '@/components/Container';

export default function NotFound() {
  return (
    <div className="py-12">
      <Container>
        <div className="text-center max-w-md mx-auto">
          <FileX className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Post Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </Container>
    </div>
  );
}
