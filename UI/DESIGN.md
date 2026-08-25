---
name: Sanctuary Design System
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#44474d'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#75777e'
  outline-variant: '#c5c6ce'
  surface-tint: '#4f5f7b'
  primary: '#04162e'
  on-primary: '#ffffff'
  primary-container: '#1a2b44'
  on-primary-container: '#8292b0'
  inverse-primary: '#b6c7e7'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#001923'
  on-tertiary: '#ffffff'
  tertiary-container: '#002f3f'
  on-tertiary-container: '#7297ab'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#b6c7e7'
  on-primary-fixed: '#091c34'
  on-primary-fixed-variant: '#374762'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#c1e8fd'
  tertiary-fixed-dim: '#a6cce1'
  on-tertiary-fixed: '#001f2a'
  on-tertiary-fixed-variant: '#254b5c'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  display:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Open Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Open Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  caption:
    fontFamily: Open Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is rooted in the concepts of **hospitality, tranquility, and shared wisdom**. It aims to create a digital "third space" that feels as welcoming as a physical church foyer. The aesthetic is a refined **Modern Corporate** style infused with **Minimalist** warmth, prioritizing legibility and emotional comfort for a multi-generational audience.

The goal is to evoke a sense of "digital sabbath"—a break from the high-velocity, high-stress environment of typical social media. By utilizing organic tones and generous whitespace, the interface encourages reflection, prayer, and genuine community connection without the anxiety of "engagement metrics."

## Colors

The palette is built on a foundation of **#FDFBF7 (Cream)**, which provides a softer, more paper-like reading experience than clinical white. 

- **Primary (Deep Navy):** Used for primary text and high-importance interaction states, providing a sense of stability and institutional trust.
- **Secondary (Spiritual Gold):** Reserved for accenting meaningful moments—prayer requests, "Community" highlights, or primary action buttons.
- **Tertiary (Sky Blue):** A calming secondary accent used for tags, informational chips, and soft background washes to denote different content types.
- **Neutral (Slate/Charcoal):** Used for secondary body text and icons to maintain hierarchy without the harshness of pure black.

## Typography

This design system employs a sophisticated typographic pairing to bridge the gap between tradition and modernity.

- **Source Serif 4** is used for headlines. Its sturdy, traditional serifs lend an air of authority and theological depth, making it ideal for scripture passages, sermon titles, and community announcements.
- **Open Sans** handles all body copy and functional UI labels. It is highly accessible for older eyes and provides a friendly, neutral counterpoint to the more expressive serif.

For long-form reading (like devotionals), use `body-lg` with a maximum line width of 65 characters to ensure a comfortable reading rhythm.

## Layout & Spacing

The layout follows a **Fixed Grid** approach on desktop and a **Fluid Grid** on mobile devices. 

- **Desktop:** A 12-column grid with a 1200px max-width, centered on the screen to create generous outer "breathing room."
- **Mobile:** A single-column layout with 16px side margins. 
- **Rhythm:** We utilize an 8px base unit. Vertical rhythm is critical; use `stack-lg` (32px) between major card sections and `stack-sm` (8px) between labels and their related inputs.

The layout should prioritize content density that feels "spacious" rather than "efficient." Avoid overcrowding the screen with sidebars; prioritize a single, focused content stream.

## Elevation & Depth

To maintain a peaceful and grounded aesthetic, the design system avoids heavy shadows and floating elements. Instead, it uses **Tonal Layers** and **Ambient Shadows**.

- **Surface Levels:** The base background is the light cream. Cards and containers use a pure white surface (`#FFFFFF`) to pop subtly against the off-white background.
- **Shadows:** Use extremely soft, low-opacity shadows (Opacity: 4-6%) with a large blur radius (16px - 24px). The shadow color should be tinted with the Primary Navy rather than black to keep the appearance organic.
- **Interactions:** On hover or tap, cards should not "lift" aggressively. Instead, a subtle increase in shadow spread or a 1px border in the Secondary Gold color should indicate focus.

## Shapes

The shape language is defined by **Soft Roundedness**. Following the `2` setting:

- **Standard Components:** Buttons, input fields, and small cards use a **0.5rem (8px)** radius.
- **Container Elements:** Feed cards, prayer cards, and event banners use **1rem (16px)** to emphasize a friendly, approachable container.
- **Avatars:** Use circular masks to emphasize the "human" element of the community.
- **Icons:** Should feature rounded terminals and corners to match the UI's softness. Avoid sharp, geometric 90-degree angles.

## Components

### Buttons
- **Primary:** Solid Deep Navy with White text. Rounded (8px). 
- **Secondary:** Transparent with a 1px Gold border and Gold text. Used for secondary actions like "Share" or "Save for Later."
- **Ghost:** Text-only buttons using the Sky Blue color for utility actions like "Clear All."

### Cards
- Cards are the heart of the community feed. They must feature a white background, 16px rounded corners, and the ambient navy-tinted shadow. 
- Content inside cards should have 24px of internal padding to ensure the text feels "honored" and easy to digest.

### Prayer Chips
- A specialized component for the "Prayer" feed. These are small, Sky Blue-tinted pills that users can tap to signify "I'm praying for this."

### Input Fields
- Input fields use a very light grey border that shifts to Gold on focus. The label should always be visible above the field using `label-md` in Deep Navy.

### Navigation
- **Bottom Bar (Mobile):** Uses thin-line icons (1.5px stroke) in Charcoal. The active state is indicated by a shift to Gold and a small dot below the icon.
- **Top Bar:** Features the Source Serif 4 headline for the current section (e.g., "Daily Bread") to maintain the editorial feel.