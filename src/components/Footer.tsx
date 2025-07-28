import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    email: Mail,
  };

  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {siteConfig.author.name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {siteConfig.author.bio}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/blog" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  All Posts
                </Link>
              </li>
              <li>
                <Link 
                  href="/tags" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Tags
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-4">
              {Object.entries(siteConfig.social).map(([platform, url]) => {
                if (!url) return null;
                
                const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                if (!IconComponent) return null;

                const isEmail = platform === 'email';
                const href = isEmail ? `mailto:${url}` : url;

                return (
                  <a
                    key={platform}
                    href={href}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                    className="p-2 rounded-lg bg-background hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`Follow on ${platform}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {siteConfig.author.name}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-2 sm:mt-0">
            Built with Next.js and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
