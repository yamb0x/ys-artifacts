# 🎨 YS Studio Design System Rules
*Extracted from Figma Design - Professional Artifact Standards*

## Core Design Principles
- **Minimalist**: White background, black text, red accent elements
- **Swiss Design**: Grid-based, systematic, typographic excellence
- **Professional**: Clean, refined, sophisticated aesthetic
- **Consistent**: Unified visual language across all tools

## 🎨 Color Palette

### Primary Colors
```css
:root {
  --ys-white: #FFFFFF;      /* Primary background */
  --ys-black: #000000;      /* Primary text */
  --ys-red: #FF0000;        /* Accent elements (crosses) */
  --ys-gray: #D9D9D9;       /* Image placeholders */
}
```

### Usage Rules
- **Background**: Always white (#FFFFFF)
- **Text**: Always black (#000000)
- **Interactive/Accent**: Red (#FF0000) for crosses and highlights
- **Placeholders**: Light gray (#D9D9D9) for image areas

## 📝 Typography System

### Font Families
```css
:root {
  /* Primary Font - Headers and UI */
  --font-suisse: 'Suisse Intl', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Display Font - Large Titles */
  --font-sangbleu: 'SangBleu Versailles Trial', 'Georgia', serif;

  /* Fallback Stack */
  --font-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

### Type Scale
```css
/* Display - Large Titles (SangBleu Versailles) */
.type-display-xl {
  font-family: var(--font-sangbleu);
  font-size: 160px;
  line-height: 160px;  /* Can be 136px or 160px based on context */
  letter-spacing: -4.8px;
  font-style: italic;
  text-transform: lowercase;
  font-weight: 400;
}

/* Body Large - Main Content Text (Suisse Intl) */
.type-body-large {
  font-family: var(--font-suisse);
  font-size: 20px;
  line-height: 28px;
  letter-spacing: 0;
  text-align: justify;
  font-weight: 400;
}

/* Body - Standard Content Text (Suisse Intl) */
.type-body {
  font-family: var(--font-suisse);
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0;
  text-align: justify;
  font-weight: 400;
}

/* Caption - Header/Footer (Suisse Intl) */
.type-caption {
  font-family: var(--font-suisse);
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.24px;
  font-weight: 300;
}

/* Caption Italic - Subtitles */
.type-caption-italic {
  font-family: var(--font-sangbleu);
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.24px;
  font-style: italic;
  font-weight: 300;
}

/* Caption Special - For brackets/studies */
.type-caption-brackets {
  font-family: var(--font-suisse);
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.24px;
  font-weight: 300;
}
```

## 📐 Grid System & Layout

### Container (1920 × 1080 base)
```css
.ys-container {
  width: 100%;
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;
  padding: 24px;
  background: var(--ys-white);
  position: relative;
}
```

### Grid System
```css
.ys-grid {
  display: grid;
  grid-template-columns: repeat(16, 1fr);  /* 16-column grid */
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 24px;
}

/* Common Grid Spans */
.span-4 { grid-column: span 4; }   /* Quarter width */
.span-8 { grid-column: span 8; }   /* Half width */
.span-12 { grid-column: span 12; } /* Three quarters */
.span-16 { grid-column: span 16; } /* Full width */
```

### Spacing System
```css
:root {
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 24px;
  --spacing-lg: 40px;
  --spacing-xl: 80px;
  --spacing-2xl: 120px;
  --spacing-3xl: 160px;
}
```

## ➕ Cross Elements (Signature Style)

### Cross Sizes & Styles
```css
/* Large Cross (40×40px) - Main accent */
.cross-large {
  width: 40px;
  height: 40px;
  position: relative;
  color: var(--ys-red);
}

.cross-large::before,
.cross-large::after {
  content: '';
  position: absolute;
  background: currentColor;
}

.cross-large::before {
  width: 2px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.cross-large::after {
  width: 100%;
  height: 2px;
  top: 50%;
  transform: translateY(-50%);
}

/* Small Cross (12×12px) - Universal corner markers */
.cross-small {
  width: 12px;
  height: 12px;
  position: relative;
  color: var(--ys-black);
}

.cross-small::before,
.cross-small::after {
  content: '';
  position: absolute;
  background: currentColor;
}

.cross-small::before {
  width: 1px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.cross-small::after {
  width: 100%;
  height: 1px;
  top: 50%;
  transform: translateY(-50%);
}

/* Cross Pattern Row */
.cross-pattern {
  display: flex;
  gap: 16px;
  align-items: center;
}

.cross-pattern .cross-large {
  flex-shrink: 0;
}

/* Blue/Colored Cross Variants */
.cross-small.cross-blue {
  color: #0066FF;
}

.cross-large.cross-accent {
  color: var(--ys-red);
}
```

### Cross Positioning Rules
- **Large crosses (40×40px)**: Used as major accent elements, colored red (#FF0000)
- **Small crosses (12×12px)**: Used as corner markers for ALL content boxes, black (#000000)
- **Pattern rows**: Multiple crosses in sequence with 16px gaps
- **Corner positioning**: Place crosses at all four corners of content boxes
- **Color variants**: Blue crosses can be used for interactive elements

## 🎯 Header Component

### Standard Header Layout (Artifacts)
```html
<header class="ys-header">
  <div class="header-left">
    <span class="studio-name">Yambo Studio</span>
    <span class="project-type">(Artifacts)</span>
  </div>
  <div class="header-center">
    <span class="artifact-name">Artifact-01</span>
  </div>
  <div class="header-right">
    <span class="date">YY-MM-DD (Day of creation)</span>
    <span class="copyright">©2025 Yambo studio</span>
  </div>
</header>
```

### Alternative Header Layout (Studies/Lessons)
```html
<header class="ys-header alt">
  <div class="header-left">
    <span class="studio-name">Yambo studio {studies}</span>
  </div>
  <div class="header-center-alt">
    <span class="lesson-name">Lesson-1</span>
  </div>
  <div class="header-time">
    <span class="timestamp">12:04:51</span>
  </div>
  <div class="header-right">
    <span class="website">yambo-studio.com</span>
  </div>
</header>
```

### Header Styles
```css
.ys-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 57px;
  padding: 24px;
  background: var(--ys-white);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 1000;
}

.header-left {
  display: flex;
  gap: 2px;
  font-family: var(--font-suisse);
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.24px;
}

.studio-name {
  font-weight: 300;
}

.project-type {
  font-family: var(--font-sangbleu);
  font-style: italic;
}

.header-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-suisse);
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.24px;
  font-weight: 300;
}

.header-right {
  display: flex;
  gap: 40px;
  font-family: var(--font-suisse);
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.24px;
  font-weight: 300;
}

/* Alternative Header Styles */
.ys-header.alt {
  grid-template-columns: auto auto auto 1fr;
  gap: 0;
}

.ys-header.alt .header-left {
  font-family: var(--font-suisse);
}

.header-center-alt {
  position: static;
  transform: none;
  left: 66.667%;
  margin-left: 3px;
  font-family: var(--font-suisse);
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.24px;
  font-weight: 300;
}

.header-time {
  left: 75%;
  font-family: var(--font-suisse);
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.24px;
  font-weight: 300;
}

.header-right .website {
  font-family: var(--font-suisse);
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.24px;
  font-weight: 300;
}
```

## 📦 Content Wrapper Components

### Flexible Cross Wrapper System
The cross wrapper is a flexible container system that adapts to any content size. It places crosses at all four corners and can wrap text, images, or any other content.

### Basic Cross Wrapper
```html
<div class="ys-cross-wrapper">
  <div class="cross-row top">
    <div class="cross-small"></div>
    <div class="cross-small"></div>
  </div>
  <div class="wrapper-content">
    <!-- Any content: text, images, etc. -->
  </div>
  <div class="cross-row bottom">
    <div class="cross-small"></div>
    <div class="cross-small"></div>
  </div>
</div>
```

### Advanced Multi-Column Layout
```html
<div class="ys-layout-grid">
  <!-- Large content area with crosses -->
  <div class="ys-cross-wrapper large">
    <div class="cross-row top">
      <div class="cross-small"></div>
      <div class="cross-small"></div>
    </div>
    <div class="wrapper-content">
      <h1 class="type-display-xl">lesson one: hacking latent space with ai</h1>
    </div>
    <div class="cross-row bottom">
      <div class="cross-small"></div>
      <div class="cross-small"></div>
    </div>
  </div>

  <!-- Sidebar content with crosses -->
  <div class="ys-cross-wrapper sidebar">
    <div class="cross-row top">
      <div class="cross-small"></div>
      <div class="cross-small"></div>
    </div>
    <div class="wrapper-content">
      <p class="type-body">Content description...</p>
    </div>
    <div class="cross-row bottom">
      <div class="cross-small"></div>
      <div class="cross-small"></div>
    </div>
  </div>
</div>
```

### Cross Wrapper Styles
```css
/* Flexible Cross Wrapper Container */
.ys-cross-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--ys-white);
}

/* Cross Rows (Top and Bottom) */
.cross-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 12px;
  position: relative;
}

.cross-row.top {
  margin-bottom: 0;
}

.cross-row.bottom {
  margin-top: 0;
}

/* Content Area */
.wrapper-content {
  flex: 1;
  padding: 12px;
  min-height: 100px;
}

/* Size Variants */
.ys-cross-wrapper.large .wrapper-content {
  padding: 24px 12px;
}

.ys-cross-wrapper.sidebar {
  max-width: 613px;
}

.ys-cross-wrapper.sidebar .wrapper-content {
  font-size: 20px;
  line-height: 28px;
}

/* Multi-Column Layout */
.ys-layout-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  align-items: start;
  padding: 72px 24px;
}

/* Image Container with Crosses */
.ys-cross-wrapper.image-container .wrapper-content {
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ys-cross-wrapper.image-container img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0;
}

/* Typography Inside Wrappers */
.ys-cross-wrapper .type-display-xl {
  margin: 0;
  padding: 20px 0;
}

.ys-cross-wrapper .type-body {
  text-align: justify;
  margin: 0;
}

/* Responsive Behavior */
@media (max-width: 1024px) {
  .ys-layout-grid {
    grid-template-columns: 1fr;
  }

  .ys-cross-wrapper.sidebar {
    max-width: 100%;
  }
}
```

### Usage Patterns

#### 1. Text Content Box
```html
<div class="ys-cross-wrapper">
  <div class="cross-row top">
    <div class="cross-small"></div>
    <div class="cross-small"></div>
  </div>
  <div class="wrapper-content">
    <p class="type-body">Your justified text content here...</p>
  </div>
  <div class="cross-row bottom">
    <div class="cross-small"></div>
    <div class="cross-small"></div>
  </div>
</div>
```

#### 2. Title/Display Text
```html
<div class="ys-cross-wrapper large">
  <div class="cross-row top">
    <div class="cross-small"></div>
    <div class="cross-small"></div>
  </div>
  <div class="wrapper-content">
    <h1 class="type-display-xl">your title here</h1>
  </div>
  <div class="cross-row bottom">
    <div class="cross-small"></div>
    <div class="cross-small"></div>
  </div>
</div>
```

#### 3. Image Container
```html
<div class="ys-cross-wrapper image-container">
  <div class="cross-row top">
    <div class="cross-small"></div>
    <div class="cross-small"></div>
  </div>
  <div class="wrapper-content">
    <img src="image.jpg" alt="Description">
  </div>
  <div class="cross-row bottom">
    <div class="cross-small"></div>
    <div class="cross-small"></div>
  </div>
</div>
```

## 🎨 HTML Template Structure

### Basic Tool Template
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tool Name - YS Studio Artifacts</title>
    <style>
        /* Include all design system CSS variables and components */
        /* Add tool-specific styles */
    </style>
</head>
<body>
    <!-- Standard Header -->
    <header class="ys-header">
        <div class="header-left">
            <span class="studio-name">Yambo Studio</span>
            <span class="project-type">(Artifacts)</span>
        </div>
        <div class="header-center">
            <span class="artifact-name">Tool-Name</span>
        </div>
        <div class="header-right">
            <span class="date">2025-01-23</span>
            <span class="copyright">©2025 Yambo studio</span>
        </div>
    </header>

    <!-- Main Content Area -->
    <main class="ys-container">
        <div class="ys-grid">
            <!-- Tool content here -->
        </div>
    </main>

    <script>
        // Tool-specific JavaScript
        // Update date dynamically
        document.querySelector('.date').textContent =
            new Date().toISOString().split('T')[0] + ' (Day of creation)';
    </script>
</body>
</html>
```

## 📱 Responsive Considerations

### Breakpoints
```css
/* Desktop First Approach */
@media (max-width: 1920px) { /* Full HD */ }
@media (max-width: 1440px) { /* Laptop */ }
@media (max-width: 1024px) { /* Tablet Landscape */ }
@media (max-width: 768px)  { /* Tablet Portrait */ }
@media (max-width: 480px)  { /* Mobile */ }
```

### Mobile Adaptations
- Scale typography proportionally
- Maintain cross elements but reduce size
- Stack header elements vertically on small screens
- Preserve white/black/red color scheme
- Keep content boxes with corner crosses

## ✅ Implementation Checklist

For every YS Studio Artifact tool:

- [ ] White background (#FFFFFF)
- [ ] Black text (#000000)
- [ ] Red accent crosses (#FF0000)
- [ ] Suisse Intl font for UI text
- [ ] SangBleu Versailles for display text (italic, lowercase)
- [ ] Standard header with three sections
- [ ] 16-column grid system
- [ ] Cross elements at appropriate sizes
- [ ] Corner crosses on content boxes
- [ ] 24px base padding
- [ ] Justified text in content areas
- [ ] Dynamic date in header
- [ ] Copyright notice
- [ ] Responsive design maintained

## 🚀 Quick Start CSS

```css
/* Copy this into every new tool as base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Colors */
  --ys-white: #FFFFFF;
  --ys-black: #000000;
  --ys-red: #FF0000;
  --ys-gray: #D9D9D9;

  /* Fonts */
  --font-suisse: 'Suisse Intl', -apple-system, sans-serif;
  --font-sangbleu: 'SangBleu Versailles Trial', Georgia, serif;

  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 24px;
  --spacing-lg: 40px;
  --spacing-xl: 80px;
}

body {
  font-family: var(--font-suisse);
  color: var(--ys-black);
  background: var(--ys-white);
  line-height: 1.5;
  min-height: 100vh;
}
```

---

**Note**: This design system ensures all YS Studio Artifacts maintain a cohesive, professional appearance with Swiss design principles, distinctive cross elements, and a refined black/white/red color palette.