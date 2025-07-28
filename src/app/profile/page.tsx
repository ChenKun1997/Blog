import { Metadata } from 'next';
import ProfilePageClient from './ProfilePageClient';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Profile | ChenKun',
  description: 'Full-stack developer passionate about creating amazing web experiences with modern technologies.',
  openGraph: {
    title: 'Profile | ChenKun',
    description: 'Full-stack developer passionate about creating amazing web experiences with modern technologies.',
    type: 'profile',
    url: `${siteConfig.siteUrl}/profile`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profile | ChenKun',
    description: 'Full-stack developer passionate about creating amazing web experiences with modern technologies.',
  },
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}
