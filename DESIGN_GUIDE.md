# Zyra WorkHub - Visual Design Guide

## Brand Identity

### Color Philosophy

The Zyra WorkHub brand uses a bold, energetic palette that represents youth, creativity, and professionalism.

#### Primary Colors

**Orange (#FF7A00)**
- Represents: Creativity, Energy, Innovation
- Usage: Primary CTAs, headings, interactive elements
- Contrast: Use with white text for maximum readability

**White (#FFFFFF)**
- Represents: Clarity, Professionalism, Simplicity
- Usage: Backgrounds, text on dark surfaces, card backgrounds

#### Accent Colors

**Electric Blue (#00D9FF)**
- Represents: Modern, Tech-forward, Energy
- Usage: Accents, secondary CTAs, icons
- Pairs with: Orange for gradients

**Warm Yellow (#FFB800)**
- Represents: Warmth, Optimism, Growth
- Usage: Gradient partner with orange
- Usage Context: Hero sections, CTAs

#### Extended Palette

**Grays** (Neutral Scale):
- Gray 50: #F9FAFB - Light backgrounds
- Gray 100: #F3F4F6 - Card backgrounds
- Gray 200: #E5E7EB - Borders
- Gray 400: #9CA3AF - Disabled states
- Gray 600: #4B5563 - Secondary text
- Gray 900: #111827 - Primary text

**Semantic Colors**:
- Success: #10B981 (Green)
- Warning: #F59E0B (Amber)
- Error: #EF4444 (Red)
- Info: #3B82F6 (Blue)

---

### Gradient System

#### Primary Gradient
```css
background: linear-gradient(90deg, #FF7A00 0%, #FFB800 100%);
```
**Usage**: Primary buttons, hero backgrounds, CTAs

#### Hero Gradient
```css
background: linear-gradient(135deg, #FF7A00 0%, #FFB800 50%, #00D9FF 100%);
```
**Usage**: Hero sections, major CTAs, feature backgrounds

#### Accent Gradient
```css
background: linear-gradient(90deg, #00D9FF 0%, #3B82F6 100%);
```
**Usage**: Secondary features, service cards

#### Dark Gradient
```css
background: linear-gradient(135deg, #1F2937 0%, #111827 100%);
```
**Usage**: Dark sections, footer backgrounds

---

### Typography System

#### Font Families

**Poppins** (Headings)
- Weights: 400, 500, 600, 700, 800
- Usage: h1, h2, h3, h4, h5, h6
- Character: Bold, modern, impactful
- Line Height: 1.2 (tight)

**Inter** (Body)
- Weights: 400, 500, 600, 700
- Usage: Paragraphs, descriptions, general text
- Character: Clean, readable, professional
- Line Height: 1.5 (normal)

**Montserrat** (Accents)
- Weights: 600, 700
- Usage: Buttons, labels, emphasis
- Character: Strong, attention-grabbing
- Line Height: 1.0 (tight)

#### Type Scale

```
7xl: 4.5rem   (72px)  - Hero headlines
6xl: 3.75rem  (60px)  - Page headers
5xl: 3rem     (48px)  - Section headers
4xl: 2.25rem  (36px)  - Sub-headers
3xl: 1.875rem (30px)  - Card headers
2xl: 1.5rem   (24px)  - Large text
xl:  1.25rem  (20px)  - Emphasis text
lg:  1.125rem (18px)  - Slightly larger body
base: 1rem    (16px)  - Body text
sm:  0.875rem (14px)  - Small text
xs:  0.75rem  (12px)  - Tiny text
```

#### Usage Guidelines

**Headlines**:
```html
<h1 class="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold">
  Empowering Youth Through <span class="gradient-text">Innovation</span>
</h1>
```

**Body Text**:
```html
<p class="text-xl text-gray-600 leading-relaxed">
  World-class webinars and design services...
</p>
```

**Buttons**:
```html
<button class="btn-primary">Get Started</button>
<button class="btn-secondary">Learn More</button>
```

---

### Spacing System

Based on 8px grid for consistency and rhythm.

```
0:  0
1:  0.25rem  (4px)
2:  0.5rem   (8px)
3:  0.75rem  (12px)
4:  1rem     (16px)
5:  1.25rem  (20px)
6:  1.5rem   (24px)
8:  2rem     (32px)
10: 2.5rem   (40px)
12: 3rem     (48px)
16: 4rem     (64px)
20: 5rem     (80px)
24: 6rem     (96px)
32: 8rem     (128px)
```

#### Common Patterns

**Card Padding**: `p-6` to `p-8` (24px to 32px)
**Section Spacing**: `py-16` to `py-24` (64px to 96px)
**Element Gaps**: `gap-4` to `gap-8` (16px to 32px)
**Button Padding**: `px-6 py-3` (24px x 12px)

---

### Component Styles

#### Button System

**Primary Button** (`.btn-primary`):
```css
- Background: Orange to Yellow gradient
- Text: White
- Shadow: Glow effect
- Hover: Scale 1.05 + enhanced glow
- Padding: 24px × 12px
- Border Radius: 8px
- Font: Montserrat Semi-bold
```

**Secondary Button** (`.btn-secondary`):
```css
- Background: White
- Border: 2px solid Gray-900
- Text: Gray-900
- Hover: Invert colors + scale 1.05
- Padding: 24px × 12px
- Border Radius: 8px
- Font: Montserrat Semi-bold
```

#### Card System

**Glass Card** (`.glass-card`):
```css
- Background: White with 80% opacity
- Backdrop Filter: Blur (medium)
- Border: 1px solid Gray-100
- Border Radius: 12px (xl)
- Shadow: Large soft shadow
- Hover: Lift effect (-translate-y-2) + enhanced shadow
```

**Standard Card Pattern**:
```html
<div class="glass-card p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
  <!-- Card content -->
</div>
```

#### Text Effects

**Gradient Text** (`.gradient-text`):
```css
- Background: Linear gradient (Orange to Yellow)
- Background Clip: Text
- Text Fill: Transparent
- Usage: Emphasis words, brand moments
```

**Example**:
```html
<h1 class="text-5xl font-heading font-bold">
  Our <span class="gradient-text">Portfolio</span>
</h1>
```

---

### Shadow System

```css
sm:   0 1px 2px rgba(0,0,0,0.05)
base: 0 1px 3px rgba(0,0,0,0.1)
md:   0 4px 6px rgba(0,0,0,0.1)
lg:   0 10px 15px rgba(0,0,0,0.1)
xl:   0 20px 25px rgba(0,0,0,0.1)

glow:      0 0 20px rgba(255,122,0,0.3)   [Orange glow]
glow-blue: 0 0 20px rgba(0,217,255,0.3)   [Blue glow]
```

**Usage**:
- Cards: `shadow-lg` default, `shadow-2xl` on hover
- Buttons: `shadow-glow` for primary buttons
- Special effects: Custom glow for brand elements

---

### Border Radius

```css
sm:   0.25rem  (4px)   - Small elements
base: 0.5rem   (8px)   - Buttons, inputs
md:   0.75rem  (12px)  - Cards
lg:   1rem     (16px)  - Large cards
xl:   1.5rem   (24px)  - Feature sections
2xl:  2rem     (32px)  - Hero elements
full: 9999px           - Circular (avatars, badges)
```

---

### Animation System

#### Transition Speeds
```css
fast: 150ms   - Hover states
base: 300ms   - Standard interactions
slow: 500ms   - Page transitions
```

#### Keyframe Animations

**Fade In**:
```css
@keyframes fadeIn {
  0%: opacity 0
  100%: opacity 1
}
Duration: 0.5s
```

**Slide Up**:
```css
@keyframes slideUp {
  0%: translateY(20px), opacity 0
  100%: translateY(0), opacity 1
}
Duration: 0.5s
```

**Scale In**:
```css
@keyframes scaleIn {
  0%: scale(0.9), opacity 0
  100%: scale(1), opacity 1
}
Duration: 0.3s
```

#### Usage Pattern
```html
<div class="animate-fade-in">Content</div>
<div class="animate-slide-up">Content</div>
<div class="animate-scale-in">Content</div>
```

---

### Iconography

**Library**: Lucide React
**Size Standards**:
- Small: 16px (w-4 h-4)
- Base: 20px (w-5 h-5)
- Medium: 24px (w-6 h-6)
- Large: 32px (w-8 h-8)
- Extra Large: 48px (w-12 h-12)

**Color Usage**:
- Primary Actions: Orange (#FF7A00)
- Secondary: Gray-600
- On Dark: White
- Accent: Blue (#00D9FF)

**Common Icons**:
- Calendar: Events, webinars
- Users: Community, registrations
- Palette: Design services
- TrendingUp: Marketing, growth
- Mail, Phone, MapPin: Contact
- Star: Ratings, featured

---

### Layout Patterns

#### Container Pattern
```html
<div class="section-container">
  <!-- Max-width: 1280px, responsive padding -->
  <!-- Content here -->
</div>
```

#### Section Pattern
```html
<section class="section-spacing bg-white">
  <div class="section-container">
    <!-- Section content -->
  </div>
</section>
```

#### Grid Patterns

**3-Column Services**:
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <!-- Service cards -->
</div>
```

**2-Column Split**:
```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
  <!-- Left and right content -->
</div>
```

**Portfolio Grid**:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <!-- Project cards -->
</div>
```

---

### Responsive Breakpoints

```
sm:  640px  - Mobile landscape
md:  768px  - Tablets
lg:  1024px - Desktop
xl:  1280px - Large desktop
2xl: 1536px - Extra large screens
```

#### Mobile-First Approach

Always design for mobile first, then enhance:

```html
<!-- Mobile: Stack vertically -->
<!-- Tablet: 2 columns -->
<!-- Desktop: 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

---

### Accessibility Standards

#### Color Contrast
- Text on White: Minimum 4.5:1 ratio
- Large Text: Minimum 3:1 ratio
- Orange (#FF7A00) on White: ✅ Passes
- Gray-600 (#4B5563) on White: ✅ Passes

#### Focus Indicators
```css
focus:outline-none focus:ring-2 focus:ring-primary-orange
```

#### Interactive States
```css
hover:scale-105     /* Visual feedback */
active:scale-95     /* Click feedback */
disabled:opacity-50 /* Disabled state */
```

---

### Best Practices

#### DO's
✅ Use gradient text for emphasis sparingly
✅ Maintain consistent spacing using the 8px grid
✅ Apply hover effects to all interactive elements
✅ Use loading states for async operations
✅ Implement smooth transitions (300ms default)
✅ Provide visual feedback for all actions
✅ Use semantic HTML elements

#### DON'Ts
❌ Use purple, indigo, or violet hues (off-brand)
❌ Mix different font families within the same context
❌ Ignore mobile responsiveness
❌ Use animations longer than 500ms
❌ Forget focus states for keyboard navigation
❌ Use low-contrast color combinations
❌ Overuse gradients (reserve for impact moments)

---

### Common Patterns Reference

#### Hero Section
```html
<section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50">
  <div class="section-container relative z-10 text-center animate-fade-in">
    <h1 class="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold mb-6">
      Main Headline <span class="gradient-text">Gradient Word</span>
    </h1>
    <p class="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
      Supporting text
    </p>
    <div class="flex gap-4 justify-center">
      <button class="btn-primary">Primary Action</button>
      <button class="btn-secondary">Secondary Action</button>
    </div>
  </div>
</section>
```

#### Card Component
```html
<div class="glass-card overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
  <div class="relative h-64 bg-gradient-to-br from-primary-orange to-accent-blue">
    <img src="..." class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
  </div>
  <div class="p-6">
    <h3 class="text-xl font-heading font-bold mb-3 group-hover:text-primary-orange transition-colors">
      Card Title
    </h3>
    <p class="text-gray-600 mb-4">Card description</p>
    <button class="btn-primary w-full">Action</button>
  </div>
</div>
```

#### Form Input
```html
<div>
  <label class="block font-medium text-gray-700 mb-2">Label</label>
  <input
    type="text"
    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
    placeholder="Placeholder text"
  />
</div>
```

---

### Design Checklist

Before launching any new component or page:

- [ ] Colors match brand palette
- [ ] Typography follows hierarchy
- [ ] Spacing uses 8px grid
- [ ] Hover states implemented
- [ ] Focus states visible
- [ ] Mobile responsive
- [ ] Loading states present
- [ ] Error states handled
- [ ] Animations smooth (< 500ms)
- [ ] Contrast ratios pass WCAG
- [ ] Icons consistent size
- [ ] Buttons use correct styles

---

**Zyra WorkHub Design System v1.0**
**October 2025**

This design guide ensures consistency across all Zyra WorkHub digital properties while maintaining the energetic, professional brand identity.
