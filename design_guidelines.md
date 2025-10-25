# ServiceKart Design Guidelines

## Design Approach

**Selected System:** Material Design principles with marketplace-focused customization
**Rationale:** ServiceKart requires clear information hierarchy, trustworthy visual language, and efficient user flows. Material Design provides structured patterns for forms, cards, and data display while maintaining the clean, minimal aesthetic requested.

**Core Principles:**
- Trust through clarity and transparency
- Efficiency in connecting buyers and sellers
- Accessibility and simplicity for diverse users
- Professional yet approachable aesthetic

---

## Typography

**Font Family:**
- Primary: Inter (via Google Fonts) - clean, highly legible for UI
- Secondary: Poppins (via Google Fonts) - friendly headlines

**Hierarchy:**
- Hero Headline: Poppins Bold, 3xl-4xl (mobile), 5xl-6xl (desktop)
- Section Headers: Poppins SemiBold, 2xl-3xl
- Subheadings: Inter SemiBold, lg-xl
- Body Text: Inter Regular, base (16px)
- Small Text/Labels: Inter Medium, sm
- Buttons: Inter SemiBold, base

---

## Layout System

**Spacing Units:** Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 or p-8
- Section spacing: py-16 to py-24
- Card gaps: gap-6 or gap-8
- Form fields: space-y-4 or space-y-6

**Container Strategy:**
- Full-width sections with inner max-w-7xl
- Content areas: max-w-6xl
- Forms: max-w-md centered
- Dashboard grids: max-w-7xl

---

## Component Library

### Navigation & Sidebar
- Fixed sidebar on desktop (w-64), collapsible on mobile
- Register/Login buttons prominently placed at top
- Clean white background with subtle border
- User type toggle (Buyer/Seller) with pill-style buttons

### Landing Page Structure
**Hero Section (80vh):**
- Left: Compelling headline + subheadline + dual CTA buttons (Register as Buyer / Register as Seller)
- Right: Hero image showing diverse service professionals or happy customers
- Background: Subtle gradient overlay

**Problem Section:**
- 2-column layout: Icon + description pairs
- Pain points illustrated with icons from Heroicons
- Clean cards with subtle shadows

**Solution/How It Works:**
- 3-step process visualization
- Numbered cards with icons
- Separate flows for buyers and sellers shown side-by-side

**Service Categories Grid:**
- 4-column grid (responsive: 1 col mobile, 2 tablet, 4 desktop)
- Category cards with icons, title, brief description
- Include: Plumbing, Electrical, Tutoring, Housekeeping, Carpentry, Cleaning, Gardening, Appliance Repair

**Trust Indicators:**
- Statistics row: "500+ Verified Providers", "1000+ Happy Customers", "50+ Service Categories"
- Verification badge showcase
- Brief testimonial cards (2-3 columns)

**Final CTA Section:**
- Centered, prominent "Get Started" section
- Dual buttons for buyer/seller registration
- Trust badges or partner logos if applicable

### Registration Forms
**Buyer Registration:**
- Clean modal or dedicated page
- Google OAuth button (prominent, with icon)
- Divider "OR"
- Email/password fields with clear labels
- "Already have an account? Login" link

**Seller Registration:**
- Multi-step form with progress indicator (4 steps)
- Step 1: Business/Owner name, Service category dropdown
- Step 2: Service description (textarea), Contact number, Address
- Step 3: Experience (years dropdown), Service area radius
- Step 4: Optional ID proof upload placeholder, Terms acceptance
- Each step with "Continue" button
- Save and complete later option

### Dashboard Components
**Buyer Dashboard:**
- Search bar with filters (service type, location, rating)
- Service provider cards grid (3 columns desktop)
- Card contents: Profile photo placeholder, Name, Service category, Rating stars, Experience, "Verified" badge, Price range, "Contact" button
- Sidebar filters: Category, Location, Availability, Price range

**Seller Dashboard:**
- Profile completion percentage widget
- Stats cards: Views this week, Enquiries, Rating
- Quick actions: Edit profile, Add photos, Update availability
- Recent enquiries list (placeholder)
- Profile preview card

### Cards & Listings
- Service provider cards: Rounded corners (rounded-lg), subtle shadow (shadow-md), white background
- Hover state: slight lift (shadow-lg transition)
- "Verified" badge: Small teal chip with checkmark icon
- Rating display: Gold stars with numerical rating

### Buttons & CTAs
**Primary Buttons (Teal/Blue):**
- Solid fill with white text
- Rounded corners (rounded-lg)
- Padding: px-6 py-3
- Hover: Slightly darker shade
- Use for: Register, Login, Contact Seller

**Secondary Buttons (Outlined):**
- Border with teal color, teal text
- Same padding and rounding
- Hover: Light teal background
- Use for: Learn More, View Details

**Blurred Buttons (on hero images):**
- Backdrop blur with semi-transparent background
- White text with drop shadow for legibility
- No additional hover effects beyond standard button states

### Form Elements
- Input fields: Border (border-gray-300), rounded corners (rounded-md), padding (px-4 py-2.5)
- Focus state: Teal border, subtle shadow
- Labels: Above field, Inter Medium, text-sm
- Error states: Red border, small error text below
- Dropdown selects: Matching input style with chevron icon

---

## Animations

**Minimal, Purposeful Animations:**
- Fade-in on scroll for landing page sections (subtle, 0.3s)
- Button hover scale (1.02) and shadow transition
- Card hover lift effect
- Modal/sidebar slide-in transitions (0.2s ease)
- No complex scroll-driven or parallax effects

---

## Images

**Hero Image:**
- Large, high-quality image showing service professionals at work or happy customers
- Position: Right side of hero section (50% width on desktop)
- Treatment: Slight overlay for text contrast if needed
- Aspect ratio: 16:9 or 4:3
- Description: Diverse group of service professionals (plumber, electrician, tutor) or satisfied customers interacting with service providers

**Service Category Icons:**
- Use Heroicons for category illustrations
- Icons: Wrench (plumbing), Bolt (electrical), AcademicCap (tutoring), Home (housekeeping), Hammer (carpentry), Sparkles (cleaning), TreeEvergreen (gardening), Cog (repairs)
- Size: Consistent 48px-64px

**Profile Placeholders:**
- Circular avatars for service providers
- Generic user silhouette or initials on colored background
- Size: 80px-120px depending on context

**Trust Badge Graphics:**
- Verification checkmark icon in teal circle
- Partner/association logos if applicable (placeholder boxes)

---

## Accessibility & Quality Standards

- All interactive elements keyboard accessible
- Form fields with proper labels and ARIA attributes
- Color contrast ratio minimum 4.5:1 for text
- Focus indicators visible on all interactive elements
- Responsive breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch targets minimum 44x44px for mobile

**Color Palette Note:**
Colors will be specified separately, focusing on teal/blue for trust and warm accents for affordability as per branding requirements.