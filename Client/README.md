# TEXPART — DESIGN & PACKAGING SOLUTIONS
### Premium Garments Manufacturing, Apparel Accessories & Commercial Printing Digital Platform
**Concept:** "THE ART OF MAKING"  
**Built with:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons

---

## 1. Project Overview & Business Positioning

Texpart is a Bangladesh-based garments industry company serving international fashion brands and corporate institutions. The website is positioned not as an ordinary corporate template, but as a luxury international manufacturing portfolio and B2B inquiry engine.

The platform clearly differentiates the two core business divisions:
1. **Private Jobs** &mdash; End-to-end apparel product development and manufacturing (Jackets, outerwear, sportswear, woven & knitwear; from tech pack to production).
2. **Commercial Jobs** &mdash; High-precision commercial printing and customized promotional products (Option 01: Printing from client artwork; Option 02: Design + Printing creative services).

---

## 2. Source of Truth Product Catalog (Both Brochures Included)

All 22 product categories from both official Texpart brochures are authored into the system with detailed specifications, sub-items, material compositions, and finishing options:

### Collection 01: Apparel Accessories & Packaging Solutions
- **Labels** (High-density Damask woven labels, printed cotton, care labels, size tabs)
- **Hangtags** (Thick kraft board, FSC art card, brand tags, price tags with barcodes)
- **Trims & Tapes** (Jacquard elastic waistbands, herringbone twill tape, ribbons, elastics)
- **Cords & Drawstrings** (Hood drawcords, round waxed cords, shoelaces, metal aglets)
- **Zippers** (Metal brass, nylon coil, vislon plastic, waterproof PU zippers, pullers)
- **Buttons & Buckles** (Natural horn, corozo nut, resin, jeans tack buttons, copper rivets)
- **Patches & Badges** (Woven patches, 3D puff embroidery, embossed leather, silicone badges)
- **Others & Hardware** (Metal/fabric buckles, D-rings, O-rings, alloy connectors)
- **Poly Bags** (Self-adhesive garment bags, printed warning poly bags, D2W biodegradable)
- **Paper Bags** (Recycled kraft bags, luxury retail boutique eurototes with rope handles)
- **Stickers & Seals** (Size strip stickers, carton barcode labels, holographic security seals)
- **Boxes & Cartons** (Inner garment presentation boxes, corrugated export master cartons)
- **Tissue & Wrapping** (Custom printed acid-free gift tissue, moisture-proof parchment)

### Collection 02: Commercial Printing / Printed Promotional Products
- **Leaflets & Flyers** (Single sheet, bi-fold, tri-fold, promotional handouts)
- **Brochures & Catalogues** (Corporate annual reports, product catalogues, lookbooks)
- **Business Card & Stationery** (Embossed cards, letterheads, presentation folders)
- **Diaries & Notebooks** (Executive thermo-PU bound diaries, spiral wire-o notebooks)
- **Wall & Desk Calendars** (Triangular tent desk calendars, multi-leaf wall calendars)
- **Posters & Banners** (High-res commercial posters, roll-up banner stands, vinyl displays)
- **Stickers & Labels** (Die-cut vinyl, roll labels, barcode stickers, security seals)
- **Paper Bags & Printed Boxes** (Retail folding cartons, pharmaceutical packaging, bags)
- **Gift Boxes & Premium Packaging** (Rigid magnetic closure luxury setup boxes with EVA foam)

---

## 3. Architecture & Page Structure

```
Client/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Global fonts, metadata, QuoteProvider, shell components
│   │   ├── globals.css        # Tailwind directives, custom scrollbars, typography
│   │   ├── page.tsx           # Home page (9 cinematic sections)
│   │   ├── about/page.tsx     # About Us (Story, 5 Expertises, Core Values, Philosophy)
│   │   ├── services/page.tsx  # Services (Private Jobs 6-step timeline & Commercial Options)
│   │   ├── gallery/page.tsx   # Masonry visual archive with category filters & lightbox
│   │   ├── contact/page.tsx   # Contact hub with B2B inquiry form, Dhaka address & map
│   │   └── products/[id]/     # Dynamic SSG pre-rendered product detail pages (22 products)
│   ├── components/
│   │   ├── Header.tsx         # Sticky glassmorphic navigation with scroll detection
│   │   ├── Footer.tsx         # Dark editorial footer with Dhaka HQ details
│   │   ├── MobileDrawer.tsx   # Off-canvas animated mobile menu
│   │   ├── QuoteModal.tsx     # B2B quotation engine with pre-filling & file upload
│   │   ├── ProductDetailsModal.tsx # Quick-view interactive product drawer
│   │   ├── LightboxModal.tsx  # Fullscreen image viewer with caption & metadata
│   │   ├── ProductCard.tsx    # Interactive product card with quote trigger
│   │   └── ProductDetailView.tsx # Client interactive component for SSG product pages
│   ├── context/
│   │   └── QuoteContext.tsx   # Centralized UI state for quotes, modals & lightboxes
│   ├── data/
│   │   ├── products.ts        # Authoritative catalog data for all 22 products
│   │   └── gallery.ts         # Curated manufacturing photography archive
│   └── types/
│       └── index.ts           # Strict TypeScript interfaces
├── public/
│   ├── logo.svg               # Vector brand logo matching brochure (dark text)
│   └── logo-white.svg         # Inverted brand logo for dark backgrounds
├── tailwind.config.ts         # Brand color tokens & editorial typography
├── tsconfig.json              # TypeScript compilation settings
├── next.config.mjs            # Next.js configuration (Unsplash remote patterns)
└── package.json               # Dependencies & build scripts
```

---

## 4. Brand Color Palette

- **Deep Charcoal**: `#171A19` (Dominant dark foundation)
- **Warm Off-White**: `#F5F3ED` (Dominant editorial background)
- **Forest Green**: `#234B3B` (Manufacturing & quality accent)
- **Fabric Beige**: `#D8C9B5` (Textile warmth & card accent)
- **Muted Grey**: `#858782` (Secondary captions & borders)
- **Warm Orange**: `#E58B48` (Primary conversion accent & CTAs)
- **Cyan / Blue**: `#0EA5E9` / `#0284C7` (Brochure logo swatch accent)

---

## 5. B2B Quotation System (Strict Non-Ecommerce Rules)

As per business requirements:
- **NO Shopping Cart, NO Checkout, NO Online Payments, NO Fixed Retail Prices.**
- "Request a Quote" CTAs are present in the sticky header, hero banners, product cards, service cards, and footer.
- When clicked from any product card or details page, the modal automatically pre-populates the target product name and category.
- Form fields capture Full Name, Company Name, Business Email, WhatsApp Number, Order Quantity, Technical Specifications, Customization Options, and Reference Artwork/Tech Pack file attachments.
- Submissions trigger a confirmation state: *"Thank you for your inquiry! Our team will review your requirements and contact you shortly."*

---

## 6. Development & Production Commands

Inside `d:\Texpert\Client`:

```bash
# 1. Start development server
npm run dev

# 2. Build optimized production bundle (pre-renders all 30 static pages)
npm run build

# 3. Serve production build locally
npm run start
```
The server will run on `http://localhost:3000`.

