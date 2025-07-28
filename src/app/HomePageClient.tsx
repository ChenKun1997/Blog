'use client';

import Link from 'next/link';
import { ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Container from '@/components/Container';
import BlogCard from '@/components/BlogCard';
import { BlogPostMeta } from '@/types/blog';
import { siteConfig } from '@/config/site';

interface HomePageClientProps {
  recentPosts: BlogPostMeta[];
}

export default function HomePageClient({ recentPosts }: HomePageClientProps) {
  const socialIcons = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    email: Mail,
  };

  return (
    <div className="py-12 md:py-20">
      <Container>
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Hi, I'm{' '}
              <span className="text-primary">{siteConfig.author.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {siteConfig.author.bio}
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-4 mb-8">
              {Object.entries(siteConfig.social).map(([platform, url]) => {
                if (!url) return null;
                
                const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                if (!IconComponent) return null;

                const isEmail = platform === 'email';
                const href = isEmail ? `mailto:${url}` : url;

                return (
                  <motion.a
                    key={platform}
                    href={href}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                    className="p-3 rounded-full bg-secondary hover:bg-accent text-secondary-foreground hover:text-accent-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Follow on ${platform}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Read My Blog
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Recent Posts Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Recent Posts</h2>
            <Link
              href="/blog"
              className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
            >
              View all posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>

          {recentPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts yet. Check back soon!</p>
            </div>
          )}
        </motion.section>
      </Container>
    </div>
  );
}
