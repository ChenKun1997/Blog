// Simple test script to verify blog functionality
const fs = require('fs');
const path = require('path');

console.log('Testing blog functionality...');

// Test 1: Check if content directory exists
const contentDir = path.join(process.cwd(), 'content/posts');
if (fs.existsSync(contentDir)) {
  console.log('✅ Content directory exists');
  
  // Test 2: Check if sample posts exist
  const posts = fs.readdirSync(contentDir).filter(file => file.endsWith('.md'));
  console.log(`✅ Found ${posts.length} blog posts`);
  
  posts.forEach(post => {
    console.log(`   - ${post}`);
  });
} else {
  console.log('❌ Content directory not found');
}

// Test 3: Check if key components exist
const components = [
  'src/components/Navigation.tsx',
  'src/components/Footer.tsx',
  'src/components/BlogCard.tsx',
  'src/components/TagBadge.tsx',
  'src/components/ThemeToggle.tsx'
];

components.forEach(component => {
  if (fs.existsSync(component)) {
    console.log(`✅ ${component} exists`);
  } else {
    console.log(`❌ ${component} missing`);
  }
});

// Test 4: Check if pages exist
const pages = [
  'src/app/page.tsx',
  'src/app/blog/page.tsx',
  'src/app/tags/page.tsx',
  'src/app/tools/page.tsx',
  'src/app/daily/page.tsx',
  'src/app/case-studies/page.tsx'
];

pages.forEach(page => {
  if (fs.existsSync(page)) {
    console.log(`✅ ${page} exists`);
  } else {
    console.log(`❌ ${page} missing`);
  }
});

console.log('\nBlog setup verification complete!');
console.log('\nNext steps:');
console.log('1. Run "npm run dev" to start the development server');
console.log('2. Open http://localhost:3000 in your browser');
console.log('3. Customize src/config/site.ts with your information');
console.log('4. Add your own blog posts to content/posts/');
