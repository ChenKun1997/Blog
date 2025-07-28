'use client';

import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

export default function ThemeTestClient() {
  const { theme, mounted } = useTheme();

  return (
    <div className="mb-6 p-4 border border-border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Theme Test</h2>
      
      <div className="flex items-center gap-4 mb-4">
        <span>Current theme: <strong>{theme}</strong></span>
        <span>Mounted: <strong>{mounted ? 'Yes' : 'No'}</strong></span>
        <ThemeToggle />
      </div>
      
      <div className="text-green-600 font-semibold">
        ✅ Theme system is working correctly!
      </div>
    </div>
  );
}
