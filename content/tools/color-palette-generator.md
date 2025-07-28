---
name: "Color Palette Generator"
description: "Generate beautiful, accessible color palettes for your web projects with advanced color theory algorithms and WCAG compliance checking."
tags: ["CSS", "Design", "Accessibility", "Colors"]
featured: false
github: "https://github.com/ChenKun1997/color-palette-generator"
demo: "https://color-palette-gen.vercel.app"
---

# Color Palette Generator

A sophisticated tool for designers and developers to create harmonious color palettes with built-in accessibility features and export options for various design tools and frameworks.

## Features

### 🎨 Advanced Color Generation
- **Multiple harmony types**: Complementary, Triadic, Analogous, Split-complementary
- **Custom color spaces**: HSL, HSV, LAB, LCH support
- **Smart color suggestions** based on color theory principles
- **Gradient generation** with smooth transitions

### ♿ Accessibility First
- **WCAG 2.1 compliance** checking for AA and AAA standards
- **Contrast ratio calculator** for text and background combinations
- **Color blindness simulation** for Protanopia, Deuteranopia, and Tritanopia
- **Alternative color suggestions** for better accessibility

### 📤 Export Options
- **CSS variables** and custom properties
- **Sass/SCSS** variables and mixins
- **Tailwind CSS** configuration
- **Adobe Swatch Exchange** (.ase) files
- **JSON** format for programmatic use

## Installation

### CLI Tool
```bash
npm install -g @color-palette/cli
```

### JavaScript Library
```bash
npm install @color-palette/core
```

## Usage

### Command Line Interface
```bash
# Generate a palette from a base color
color-palette generate --base "#3B82F6" --harmony triadic --count 5

# Check accessibility compliance
color-palette check --foreground "#FFFFFF" --background "#3B82F6"

# Export to Tailwind CSS
color-palette export --input palette.json --format tailwind --output colors.js
```

### JavaScript API
```javascript
import { PaletteGenerator, AccessibilityChecker } from '@color-palette/core';

// Create a new palette generator
const generator = new PaletteGenerator();

// Generate a triadic color palette
const palette = generator.createPalette({
  baseColor: '#3B82F6',
  harmony: 'triadic',
  count: 5,
  saturation: 0.8,
  lightness: 0.6
});

console.log(palette);
// Output: ['#3B82F6', '#F63B82', '#82F63B', '#F6823B', '#823BF6']

// Check accessibility
const checker = new AccessibilityChecker();
const result = checker.checkContrast('#FFFFFF', '#3B82F6');

console.log(result);
// Output: { ratio: 4.56, level: 'AA', passes: true }
```

### React Component
```jsx
import { ColorPalette, AccessibilityIndicator } from '@color-palette/react';

function DesignSystem() {
  const [palette, setPalette] = useState(['#3B82F6', '#10B981', '#F59E0B']);

  return (
    <div>
      <ColorPalette 
        colors={palette}
        onColorChange={setPalette}
        showAccessibility={true}
      />
      
      <AccessibilityIndicator 
        foreground="#FFFFFF"
        background="#3B82F6"
        showDetails={true}
      />
    </div>
  );
}
```

## Color Harmony Types

### Complementary
Colors that are opposite each other on the color wheel, creating high contrast and vibrant looks.

```javascript
const palette = generator.createPalette({
  baseColor: '#FF6B6B',
  harmony: 'complementary'
});
// Result: ['#FF6B6B', '#6BFFFF']
```

### Triadic
Three colors evenly spaced around the color wheel, offering strong visual contrast while retaining harmony.

```javascript
const palette = generator.createPalette({
  baseColor: '#FF6B6B',
  harmony: 'triadic'
});
// Result: ['#FF6B6B', '#6BFF6B', '#6B6BFF']
```

### Analogous
Colors that are next to each other on the color wheel, creating serene and comfortable designs.

```javascript
const palette = generator.createPalette({
  baseColor: '#FF6B6B',
  harmony: 'analogous',
  count: 5
});
// Result: ['#FF6B6B', '#FF6B9D', '#FF6BCF', '#E56BFF', '#B36BFF']
```

## Accessibility Features

### WCAG Compliance Levels

- **AA Level**: Minimum contrast ratio of 4.5:1 for normal text, 3:1 for large text
- **AAA Level**: Enhanced contrast ratio of 7:1 for normal text, 4.5:1 for large text

### Color Blindness Support

The tool simulates how colors appear to users with different types of color vision deficiency:

```javascript
const simulator = new ColorBlindnessSimulator();

// Simulate protanopia (red-blind)
const protanopiaColors = simulator.simulate(palette, 'protanopia');

// Simulate deuteranopia (green-blind)
const deuteranopiaColors = simulator.simulate(palette, 'deuteranopia');

// Simulate tritanopia (blue-blind)
const tritanopiaColors = simulator.simulate(palette, 'tritanopia');
```

## Export Formats

### CSS Custom Properties
```css
:root {
  --color-primary: #3B82F6;
  --color-secondary: #10B981;
  --color-accent: #F59E0B;
  --color-neutral: #6B7280;
  --color-error: #EF4444;
}
```

### Tailwind CSS Configuration
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          500: '#3B82F6',
          900: '#1E3A8A'
        }
      }
    }
  }
}
```

### Sass Variables
```scss
$color-primary: #3B82F6;
$color-secondary: #10B981;
$color-accent: #F59E0B;

@mixin button-primary {
  background-color: $color-primary;
  color: white;
  
  &:hover {
    background-color: darken($color-primary, 10%);
  }
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](https://github.com/ChenKun1997/color-palette-generator/blob/main/CONTRIBUTING.md) before submitting pull requests.

## License

MIT License - see [LICENSE](https://github.com/ChenKun1997/color-palette-generator/blob/main/LICENSE) for details.
