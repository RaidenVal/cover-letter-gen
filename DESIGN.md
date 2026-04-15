# Design System - Claude-Inspired with Newsreader Font

## 1. Visual Theme & Atmosphere

Warm, unhurried, and quietly intellectual. The entire experience is built on a parchment-toned canvas (`#f5f4ed`) that evokes high-quality paper rather than a digital surface. Newsreader, a transitional serif from Google Fonts, stands in for Anthropic Serif and gives every headline the gravitas of a book title.

The warm neutral palette ensures every gray has a yellow-brown undertone. Borders are cream-tinted, shadows use warm transparent blacks, and even the darkest surfaces carry a subtle olive warmth. Terracotta (`#c96442`) is the singular accent color, reserved for primary CTAs and high-signal brand moments.

**Key Characteristics:**
- Warm parchment canvas (`#f5f4ed`) evoking premium paper
- Newsreader serif for headlines, system sans-serif for UI labels
- Terracotta accent (`#c96442`), warm, earthy, deliberately un-tech
- Exclusively warm-toned neutrals, every gray has a yellow-brown undertone
- Ring-based shadow system (`0px 0px 0px 1px`) for depth without heavy borders
- Editorial pacing with generous section spacing and serif-driven hierarchy
- Body text at 1.60 line-height for literary reading comfort

## 2. Color Palette & Roles

### Primary
- **Near Black** (`#141413`): Primary text, headings
- **Terracotta** (`#c96442`): Primary CTA, brand accent
- **Coral** (`#d97757`): Text links, secondary emphasis

### Surface
- **Parchment** (`#f5f4ed`): Page background
- **Ivory** (`#faf9f5`): Card surfaces, elevated containers
- **Pure White** (`#ffffff`): Specific button surfaces

### Neutrals
- **Charcoal Warm** (`#4d4c48`): Button text on light surfaces
- **Olive Gray** (`#5e5d59`): Secondary text
- **Stone Gray** (`#87867f`): Tertiary text, placeholders
- **Warm Silver** (`#b0aea5`): Disabled states

### Borders & Rings
- **Border Cream** (`#f0eee6`): Standard card borders
- **Border Warm** (`#e8e6dc`): Section dividers, prominent borders
- **Ring Warm** (`#d1cfc5`): Button hover/focus ring shadows
- **Focus Blue** (`#3898ec`): Focus ring (the only cool color)

### Shadows
- **Ring Shadow**: `0px 0px 0px 1px` using warm grays
- **Whisper Shadow**: `rgba(0,0,0,0.05) 0px 4px 24px`

## 3. Typography Rules

### Font Family
- **Headlines**: `Newsreader`, fallback: `Georgia, "Times New Roman", Times, serif`
- **UI / Body**: System sans via Tailwind defaults for labels and buttons, Newsreader for body prose

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Display Hero | 56px | 500 | 1.10 | normal |
| Section Heading | 40px | 500 | 1.20 | normal |
| Sub-heading | 28px | 500 | 1.14 | normal |
| Card Title | 22px | 500 | 1.25 | normal |
| Body Large | 20px | 400 | 1.60 | normal |
| Body | 17px | 400 | 1.60 | normal |
| Body Small | 15px | 400 | 1.60 | normal |
| Caption | 14px | 400 | 1.43 | normal |
| Label | 12px | 500 | 1.25 | 0.12px |

## 4. Component Stylings

### Buttons
**Terracotta (Primary CTA)**
- Background: `#c96442`
- Text: `#faf9f5`
- Radius: 8px
- Ring shadow: `#c96442 0px 0px 0px 0px, #c96442 0px 0px 0px 1px`

**Warm Sand (Secondary)**
- Background: `#e8e6dc`
- Text: `#4d4c48`
- Radius: 8px
- Ring shadow: `#e8e6dc 0px 0px 0px 0px, #d1cfc5 0px 0px 0px 1px`

**Dark (Emphasis)**
- Background: `#30302e`
- Text: `#faf9f5`
- Radius: 8px

### Cards
- Background: `#faf9f5`
- Border: `1px solid #f0eee6`
- Radius: 12px
- Shadow: `rgba(0,0,0,0.05) 0px 4px 24px` for elevated cards

### Inputs
- Background: `#ffffff`
- Border: `1px solid #e8e6dc`
- Radius: 12px
- Focus: `2px solid #3898ec`
- Placeholder: `#87867f`

### Navigation
- Background: `#f5f4ed` with cream border bottom
- Height: 56px
- Brand: Newsreader 20px weight 500
- Links: 15px, color `#5e5d59`, active `#141413`

### Tags / Badges
- Background: `#e8e6dc`
- Text: `#4d4c48`
- Radius: 8px
- Font: 12px weight 500

## 5. Layout Principles

- Base unit: 8px
- Max content width: 980px, centered
- Section spacing: 80-120px between major sections
- Parchment/dark section alternation for chapter-like rhythm
- Border radius: 8px standard, 12px cards/inputs, 16px featured, 32px hero

## 6. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: `#c96442`
- Page background: `#f5f4ed`
- Card surface: `#faf9f5`
- Primary text: `#141413`
- Secondary text: `#5e5d59`
- Tertiary text: `#87867f`
- Border (light): `#f0eee6`
- Border (prominent): `#e8e6dc`
- Focus ring: `#3898ec`

### Key Rules
1. Parchment (`#f5f4ed`) is the page background, never pure white
2. Terracotta (`#c96442`) is the only saturated color, for CTAs only
3. All neutrals must be warm-toned, no cool grays
4. Ring shadows (`0px 0px 0px 1px`) for interactive states, not drop shadows
5. Newsreader serif at weight 500 for all headlines
6. Body text at 1.60 line-height for editorial comfort
7. Cards on Ivory (`#faf9f5`) with cream borders (`#f0eee6`)
8. Focus Blue (`#3898ec`) is the only cool color, used only for focus rings
