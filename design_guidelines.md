# Project Chimera Design Guidelines

## Design Approach

**Hybrid System-Based Approach**: Carbon Design System principles for enterprise data applications, enhanced with Linear's clean typography and Stripe's trust-building patterns. This creates a professional, analytical environment suitable for pharmaceutical BD teams making high-stakes investment decisions.

**Core Principles**:
- Data transparency over decoration
- Credibility through clarity
- Precision in every interaction
- Trust through traceability

---

## Typography

**Primary Font**: Inter (via Google Fonts CDN)
- Headings: 600-700 weight
- Body: 400-500 weight
- Data/Numbers: 500-600 weight (tabular figures)
- Code/Citations: 400 weight monospace (JetBrains Mono)

**Hierarchy**:
- Page Titles: text-4xl md:text-5xl font-semibold
- Section Headers: text-2xl md:text-3xl font-semibold
- Card Titles: text-xl font-semibold
- Body Text: text-base leading-relaxed
- Metadata/Labels: text-sm font-medium uppercase tracking-wide
- Data Points: text-lg md:text-xl font-semibold tabular-nums

---

## Layout System

**Spacing Units**: Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistency
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-24
- Card gaps: gap-6 to gap-8
- Tight groupings: space-y-2 or gap-2

**Grid Structure**:
- Dashboard: 12-column grid with sidebar (aside: col-span-3, main: col-span-9)
- Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Data tables: Full-width with horizontal scroll on mobile
- Chat interface: Single column, max-w-4xl centered

---

## Component Library

### Navigation
- **Top Bar**: Fixed header with logo, navigation links, user profile (h-16, px-6, border-b)
- **Sidebar**: Collapsible left nav for dashboard (w-64, py-6, px-4)
- Active states: subtle background tint, left border accent

### Multi-Agent Chat Interface
- **Agent Cards**: Differentiated by subtle left border color (Bioinformatics: teal accent, Market: amber accent, IP/Patent: purple accent)
- **Message Bubbles**: Rounded-lg with agent icon, timestamp, evidence links
- **Evidence Links**: Inline badges with external link icon (text-sm, rounded, border, hover:underline)
- **Input Area**: Fixed bottom with textarea (min-h-20, max-h-40), send button, attachment options

### Scoring & Analytics
- **MCDA Scorecard**: Horizontal progress bars for each dimension (h-3, rounded-full, with numeric label)
- **Competitor Comparison**: Side-by-side cards with score differential highlighted
- **Score Badge**: Large circular or pill-shaped score display (text-3xl font-bold tabular-nums)
- **Assumption Sliders**: Range inputs with real-time value display, min/max labels, lock/unlock toggle

### Data Visualization
- **Knowledge Graph**: SVG-based node-link diagram (use D3.js or similar, referenced via CDN)
- **Timeline**: Vertical or horizontal with milestone markers
- **Trend Charts**: Line/bar charts using Chart.js (via CDN)

### Reports & Documents
- **Report Card**: White/light background, structured sections, collapsible detail panels
- **Citation List**: Numbered list with source type icons (PubMed, Google Patents, etc.)
- **Export Actions**: Button group for PDF, CSV, JSON downloads

### Dashboard Tables
- **Opportunity Grid**: Sortable, filterable table with row hover states
- **Columns**: Drug name, indication, overall score, dimension scores, status, actions
- **Filters**: Dropdown and range selectors (top of table, sticky)
- **Pagination**: Bottom-center with page numbers and prev/next

### Forms & Controls
- **Input Fields**: rounded-md, border, focus:ring-2, p-3
- **Buttons**: 
  - Primary: solid background, rounded-md, px-6 py-3, font-medium
  - Secondary: border, background on hover
  - Icon buttons: p-2, rounded-md
- **Toggles/Switches**: For enabling human-in-the-loop mode
- **Dropdowns**: Custom select with chevron icon, max-h-60 overflow-y-auto

---

## Landing Page Structure

**Hero Section** (h-screen or min-h-[600px]):
- Large hero image: Abstract pharmaceutical/molecular visualization (dark overlay for text contrast)
- Centered headline + subheadline + CTA buttons with backdrop blur (backdrop-blur-md bg-white/10)
- Trust indicator: "Trusted by leading pharmaceutical BD teams"

**Problem Statement**: Single column, max-w-4xl, centered, py-24
**Solution Overview**: 3-column feature grid with icons (Heroicons), titles, descriptions
**Multi-Agent Showcase**: Visual diagram of three agents with connecting lines
**Live Evidence Demo**: Screenshot or mockup showing linked citations
**Competitor Comparison Preview**: Side-by-side score comparison widget
**Human-in-the-Loop Feature**: Interactive slider demo (non-functional visual)
**Trust & Compliance**: Logos, certifications, security badges (if applicable)
**CTA Section**: Centered, py-20, "Request Demo" + "View Documentation"
**Footer**: 4-column layout (Product, Company, Resources, Legal) + newsletter signup

---

## Images

**Hero Image**: High-resolution abstract visualization - molecular structures, network graphs, or pharmaceutical research imagery. Dark gradient overlay (from black/80 to transparent) to ensure text legibility. Image should convey scientific precision and innovation.

**Feature Section Icons**: Use Heroicons (beaker, chart-bar, shield-check, etc.) rather than images

**Dashboard Screenshots**: In landing page "See It In Action" section - show actual UI with blurred/anonymized data

---

## Animation & Interaction

**Use Sparingly**:
- Score counter animation on load (count-up effect for MCDA scores)
- Subtle fade-in for chat messages
- Smooth scroll for anchor links
- Hover states: slight scale (scale-105) or shadow increase
- Loading spinners for AI processing

**No Animations For**:
- Page transitions
- Background effects
- Decorative movement

---

## Accessibility

- All interactive elements: min-height 44px (touch target)
- Form labels: Always visible, not placeholder-only
- Focus indicators: ring-2 ring-offset-2 on all interactive elements
- Color contrast: WCAG AA minimum for all text
- ARIA labels for icon-only buttons
- Keyboard navigation for all workflows