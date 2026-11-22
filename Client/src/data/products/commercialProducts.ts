import { Product } from "@/types";

// ==========================================
// COLLECTION 02: COMMERCIAL PRINTING / PROMOTIONAL
// ==========================================
export const commercialProducts: Product[] = [
  {
    id: "leaflets-flyers",
    name: "Leaflets & Flyers",
    collection: "Commercial Printing / Promotional",
    collectionId: "commercial",
    category: "Marketing Collateral",
    brochureRef: "Commercial Printing Brochure — Page 1",
    heroBadge: "High-Volume Precision Offset",
    shortDesc: "Single-sheet, bi-fold, tri-fold, and promotional flyers engineered for high-impact campaigns.",
    fullDesc: "Vibrant promotional flyers produced on Heidelberg multi-color speedmasters. Delivers brilliant color saturation, razor-sharp photographic fidelity, and clean mechanical folds for corporate promotions and retail launches.",
    subItems: [
      "Single Sheet Handouts (A6, A5, A4 formats, DL format)",
      "Folded Leaflets (Bi-fold, C-fold, Z-fold, Gate-fold, Accordion fold)",
      "Special Promotional Cutouts (Die-cut coupon tabs, perforated tearaways)"
    ],
    materials: [
      "100gsm to 170gsm Gloss Coated Art Paper",
      "120gsm to 250gsm Silk & Matte Coated Stock",
      "Recycled Uncoated Offset Paper for writable forms"
    ],
    finishes: [
      "Full coverage aqueous gloss coating",
      "Velvet matte lamination with Spot UV gloss highlights",
      "Machine precision scoring and folding with zero spine cracking"
    ],
    specifications: {
      "Sizes": "A6, A5, A4, DL, or custom marketing dimensions",
      "Print Process": "CMYK Full Color Double-sided Offset / Digital Short Runs",
      "Turnaround": "Fast turnaround 3 - 5 business days",
      "Sampling Time": "2 - 3 business days",
      "MOQ Consultation": "1,000 pcs"
    },
    image: "/images/products/comm-flyers.jpg",
    galleryImages: [
      "/images/products/comm-boxes.jpg",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: true
  },
  {
    id: "brochures-catalogues",
    name: "Brochures & Catalogues",
    collection: "Commercial Printing / Promotional",
    collectionId: "commercial",
    category: "Publications & Corporate",
    brochureRef: "Commercial Printing Brochure — Page 1",
    heroBadge: "Executive Editorial Binding",
    shortDesc: "Saddle-stitched lookbooks, perfect-bound corporate annual reports, and comprehensive product catalogues.",
    fullDesc: "World-class editorial publications designed to present complex product portfolios and brand narratives with prestige. Featuring lay-flat binding options, heavyweight covers, and exquisite page-turn dynamics.",
    subItems: [
      "Product Catalogues (Comprehensive 2026 collections with tab dividers)",
      "Corporate Brochures (Annual reports, company profiles, investor prospectuses)",
      "Fashion Lookbooks (High-gamut photographic reproductions, landscape spreads)"
    ],
    materials: [
      "Cover: 300gsm - 350gsm C2S Coated Art Card",
      "Inner Pages: 120gsm - 170gsm Silk Matte Coated Art Paper",
      "FSC Certified eco-conscious printing papers"
    ],
    finishes: [
      "PUR Perfect Bound, Saddle Stitch, Wire-O, or Hardcover Case Bound",
      "Soft-touch velvet cover lamination with metallic foil stamping",
      "Die-cut chapter thumb indexes and clear spot varnishing"
    ],
    specifications: {
      "Page Count": "From 8 pages up to 300+ page catalogues",
      "Color Precision": "ISO 12647-2 certified color management",
      "Proofing": "Digital calibrated color proofs and bound wet proofs",
      "Sampling Time": "4 - 6 business days",
      "MOQ Consultation": "500 copies"
    },
    image: "/images/products/comm-brochures.jpg",
    galleryImages: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
      "/images/products/comm-boxes.jpg"
    ],
    featured: true
  },
  {
    id: "business-card-stationery",
    name: "Business Card & Stationery",
    collection: "Commercial Printing / Promotional",
    collectionId: "commercial",
    category: "Corporate Identity",
    brochureRef: "Commercial Printing Brochure — Page 1",
    heroBadge: "Embossed Luxury Stock",
    shortDesc: "Embossed business cards, executive letterheads, branded corporate envelopes, and presentation folders.",
    fullDesc: "Complete corporate identity printing suites that command instant respect in executive boardrooms. Built on cotton-rich watermarked stocks with precision edge gilding and multi-level debossed typography.",
    subItems: [
      "Business Cards (400gsm to 700gsm multi-ply sandwich cards, edge-painted)",
      "Stationery Suites (Executive letterheads, continuation sheets, matching envelopes)",
      "Presentation Folders (Die-cut card slots, expanding spine pockets)"
    ],
    materials: [
      "Conqueror, G.F Smith, & Fedrigoni textured uncoated boards",
      "100gsm to 120gsm Premium Executive Watermarked Bond Paper",
      "100% Recycled Cotton Rag Board"
    ],
    finishes: [
      "Sculpted 3D blind embossing and micro-debossing",
      "Hot stamped foil (Gold, Silver, Copper, Holographic)",
      "Painted color edges matching brand Pantone code",
      "Precision die-cut business card holder slots inside folders"
    ],
    specifications: {
      "Card Formats": "85x55mm (European), 90x50mm, or bespoke sizes",
      "Folder Sizing": "Oversized A4 with single or double pockets, 5mm capacity spine",
      "Envelopes": "DL, C5, C4 self-seal with interior security tint printing",
      "Sampling Time": "3 - 5 business days",
      "MOQ Consultation": "500 sets / 1,000 cards"
    },
    image: "/images/products/comm-stationery.jpg",
    galleryImages: [
      "/images/products/comm-boxes.jpg",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: false
  },
  {
    id: "diaries-notebooks",
    name: "Diaries & Notebooks",
    collection: "Commercial Printing / Promotional",
    collectionId: "commercial",
    category: "Corporate Gifting",
    brochureRef: "Commercial Printing Brochure — Page 1",
    heroBadge: "Executive Thermo-PU Binding",
    shortDesc: "Leatherette hardbound executive diaries, wire-o spiral notebooks, and branded day planners.",
    fullDesc: "Bespoke corporate diaries and premium notebooks engineered for executives, conference delegates, and promotional campaigns. Available with customized date pads, ribbon bookmarks, pen loops, and blind debossed covers.",
    subItems: [
      "Executive Hardbound Diaries (Thermo-PU color change leatherette, gilded page edges)",
      "Spiral Wire-O Notebooks (Durable polypropylene or rigid chipboard covers)",
      "Custom Planners (Day-to-a-page, week-to-view, project management milestones)"
    ],
    materials: [
      "Italian Thermo-Reactive PU Leatherette",
      "70gsm - 80gsm Cream / Ivory Woodfree Paper (Fountain-pen friendly, zero bleed)",
      "Rigid 2mm Kappa Board cores",
      "Satin ribbon place markers and elastic closure bands"
    ],
    finishes: [
      "Heat-activated blind debossing creating contrasting darker impressions",
      "Custom full-color tip-in introductory company profile pages",
      "Perforated memo corners and expanding back document pocket",
      "Magnetic flap or elastic wrap-around closure"
    ],
    specifications: {
      "Standard Sizes": "A4, A5, B5, or pocket size",
      "Page Formats": "Lined, dot-grid, blank sketch, or custom dated agenda layout",
      "Accessories": "Custom metal pen holder loop and integrated metal corner protectors",
      "Sampling Time": "5 - 7 business days",
      "MOQ Consultation": "500 pcs"
    },
    image: "/images/products/comm-notebooks.jpg",
    galleryImages: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: true
  },
  {
    id: "wall-desk-calendars",
    name: "Wall & Desk Calendars",
    collection: "Commercial Printing / Promotional",
    collectionId: "commercial",
    category: "Promotional Collateral",
    brochureRef: "Commercial Printing Brochure — Page 1",
    heroBadge: "Year-Round Brand Visibility",
    shortDesc: "Triangular desk tent calendars, wire-o desktop calendars, and multi-leaf wall calendars.",
    fullDesc: "Strategic brand building calendars delivering 365 days of desk presence in client offices. Crafted with heavyweight rigid tent bases, smooth twin-wire binding, and rich seasonal brand photography.",
    subItems: [
      "Desk Tent Calendars (Triangular rigid easel stands, 13-leaf monthly format)",
      "Wall Calendars (A3 / A2 hanging format with metal tinning or thumb hook hangers)",
      "Desk Planners (Large format monthly tear-off blotting desk pads)"
    ],
    materials: [
      "210gsm to 250gsm Silk Coated Art Paper",
      "1000gsm Heavy Hardboard Easel Base wrapped in linen or coated paper",
      "Durable twin-loop wire-o binding in black, white, gold, or silver"
    ],
    finishes: [
      "Spot UV gloss over monthly feature imagery",
      "Individual date block customization (marking company holidays and milestone dates)",
      "Soft-touch lamination on desktop calendar stand",
      "Individual cardboard protective mailing envelopes"
    ],
    specifications: {
      "Desktop Sizing": "210x150mm, 200x120mm landscape or square stands",
      "Wall Calendar Sizing": "A3 (297x420mm) or A2 (420x594mm)",
      "Leaf Configuration": "7-leaf (bi-monthly) or 13-leaf (monthly) double-sided",
      "Sampling Time": "4 - 6 business days",
      "MOQ Consultation": "500 pcs"
    },
    image: "/images/products/comm-calendars.jpg",
    galleryImages: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80",
      "/images/products/comm-boxes.jpg"
    ],
    featured: false
  },
  {
    id: "posters-banners",
    name: "Posters & Banners",
    collection: "Commercial Printing / Promotional",
    collectionId: "commercial",
    category: "Large Format Display",
    brochureRef: "Commercial Printing Brochure — Page 1",
    heroBadge: "Wide-Gamut Ultra-HD Resolution",
    shortDesc: "High-resolution commercial posters, roll-up pull banner stands, and architectural presentations.",
    fullDesc: "Large format visual displays engineered for trade exhibitions, retail storefronts, and real estate showrooms. Printed using fade-resistant eco-solvent and UV-curable inks with exceptional chromatic pop.",
    subItems: [
      "Commercial Posters (A2, A1, A0 high-definition gallery posters)",
      "Roll-Up Banners (Aluminum retractable cassette stands with padded travel bags)",
      "Promotional Banners (Durable outdoor vinyl eyeleted banners, fabric tension displays)"
    ],
    materials: [
      "200gsm Heavy Photo Satin Paper",
      "Anti-curl blockout polyester film (Grey-back roll-up film)",
      "510gsm High-tensile PVC Frontlit Vinyl",
      "Recycled aluminum hardware with twin stabilizing feet"
    ],
    finishes: [
      "Matte or crystal gloss laminate protection against fingerprints",
      "Reinforced welded perimeter hems with brass eyelets",
      "UV-inhibited outdoor inks rated for up to 3 years sunlight exposure",
      "Retractable spring mechanism for rapid 30-second assembly"
    ],
    specifications: {
      "Roll-Up Sizes": "85x200cm standard, 100x200cm, 120x200cm wide formats",
      "Poster Sizes": "A2, A1, A0, and continuous length rolls",
      "Print Resolution": "Up to 1440 DPI photographic micro-droplet quality",
      "Sampling Time": "2 - 3 business days",
      "MOQ Consultation": "10 pcs roll-ups / 50 pcs posters"
    },
    image: "/images/products/comm-flyers.jpg",
    galleryImages: [
      "/images/products/comm-boxes.jpg",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: false
  },
  {
    id: "stickers-labels-commercial",
    name: "Stickers & Labels",
    collection: "Commercial Printing / Promotional",
    collectionId: "commercial",
    category: "Promotional & Packaging",
    brochureRef: "Commercial Printing Brochure — Page 1",
    heroBadge: "Custom Die-Cut Shapes",
    shortDesc: "Die-cut individual stickers, roll labels, barcode labels, and transparent vinyl graphics.",
    fullDesc: "Versatile commercial stickers engineered for product packaging, promotional giveaways, and retail branding. Available on continuous rolls for automatic labeling or individual kiss-cut and die-cut sheets.",
    subItems: [
      "Die-Cut Stickers (Contour kiss-cut shapes, heavy crack-and-peel backing)",
      "Roll Labels (Industrial machine-applied product packaging labels)",
      "Security Holograms (Anti-counterfeiting seals with serialized numbers)"
    ],
    materials: [
      "Gloss & Matte Polypropylene (BOPP)",
      "Weatherproof Waterproof White Vinyl",
      "Metallic Silver, Gold, and Rainbow Holographic Foil",
      "Eco-friendly Biodegradable Kraft Paper Label Stock"
    ],
    finishes: [
      "Protective scratch-proof gloss or matte laminate overlay",
      "Laser die-cutting with micrometer accuracy",
      "Cold foil metallic accents and spot UV enhancements",
      "Strong permanent adhesive or clean-removable adhesive"
    ],
    specifications: {
      "Format": "Supplied on rolls (3-inch core) or individually cut pieces",
      "Weather Resistance": "Waterproof, oil-resistant, chemical resistant",
      "Colors": "Full CMYK + White ink backing on transparent vinyl",
      "Sampling Time": "3 - 5 business days",
      "MOQ Consultation": "2,000 pcs"
    },
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: false
  },
  {
    id: "paper-bags-printed-boxes-commercial",
    name: "Paper Bags & Printed Boxes",
    collection: "Commercial Printing / Promotional",
    collectionId: "commercial",
    category: "Retail & Product Packaging",
    brochureRef: "Commercial Printing Brochure — Page 1",
    heroBadge: "Custom Structural Engineering",
    shortDesc: "Retail branded paper bags, folding product cartons, and pharmaceutical/cosmetic packaging.",
    fullDesc: "Retail packaging solutions designed to elevate consumer goods, fashion apparel, pharmaceuticals, and lifestyle merchandise. Combining structural integrity with premium printing finishes.",
    subItems: [
      "Paper Bags (Kraft retail carriers, luxury eurotote shopping bags with rope handles)",
      "Printed Boxes (Folding carton product packaging, tuck-end pharmaceutical boxes)"
    ],
    materials: [
      "250gsm to 400gsm C1S Ivory Folding Box Board (FBB)",
      "Brown & White Virgin Kraft Paper (140gsm - 220gsm)",
      "Recycled Duplex Board with grey or kraft back",
      "Cotton twill, polyester rope, or satin ribbon handles"
    ],
    finishes: [
      "Precision crash-lock bottoms for instantaneous assembly",
      "Matte velvet film lamination with selective high-gloss UV",
      "Clear PET window cutouts to showcase product inside",
      "Metallic hot foil stamping and debossed logos"
    ],
    specifications: {
      "Box Styles": "Straight tuck end, reverse tuck, auto-bottom, sleeve and tray",
      "Certifications": "Food-grade and pharmaceutical-grade ink safety compliant",
      "Load Testing": "Bags tested up to 8kg; boxes tested for top-compression stack strength",
      "Sampling Time": "4 - 6 business days",
      "MOQ Consultation": "2,000 pcs"
    },
    image: "/images/products/comm-boxes.jpg",
    galleryImages: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
      "/images/products/comm-boxes.jpg"
    ],
    featured: true
  },
  {
    id: "gift-boxes-premium-packaging",
    name: "Gift Boxes & Premium Packaging",
    collection: "Commercial Printing / Promotional",
    collectionId: "commercial",
    category: "Luxury Rigid Packaging",
    brochureRef: "Commercial Printing Brochure — Page 1",
    heroBadge: "Magnetic Closure Luxury Setup",
    shortDesc: "Rigid magnetic gift boxes, presentation packaging, custom EVA velvet inserts, and luxury gift suites.",
    fullDesc: "The pinnacle of packaging craftsmanship. Heavyweight rigid setup boxes with seamless corner mitering, hidden magnetic closures, and precision-cut interior inserts designed for luxury watches, leather goods, perfumes, and VIP corporate gifts.",
    subItems: [
      "Rigid Setup Boxes (Magnetic flap book-style boxes, two-piece lid & base boxes)",
      "Custom Protective Inserts (High-density EVA foam lined with velvet, die-cut card trays)",
      "Luxury Presentation Suites (Collapsible flat-pack rigid boxes with ribbon closures)"
    ],
    materials: [
      "1200gsm to 1800gsm Heavy Grey Kappa Board Core",
      "Specialty Wrapped Outer Papers: Leatherette paper, bookcloth linen, soft-touch art paper",
      "Laser-cut High-Density EVA Foam with Flocked Velvet Face",
      "Neodymium Rare-Earth Hidden Magnets"
    ],
    finishes: [
      "Precision V-groove sharp 90-degree corner folding",
      "Full metallic foil block stamping (Gold, Rose Gold, Matte Silver)",
      "Embossed textured leatherette patterns",
      "Integrated satin pull-ribbons and custom interior lid foil print"
    ],
    specifications: {
      "Board Thickness": "1.5mm, 2.0mm, 2.5mm, 3.0mm solid rigid core",
      "Closure Mechanism": "Dual concealed magnetic snap closures",
      "Customization": "Fully tailored cavity dimensions for any product geometry",
      "Sampling Time": "5 - 7 business days",
      "MOQ Consultation": "1,000 pcs"
    },
    image: "/images/products/comm-boxes.jpg",
    galleryImages: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: true
  }
];
