import { Product } from "@/types";

// ==========================================
// COLLECTION 01: APPAREL ACCESSORIES & PACKAGING
// ==========================================
export const accessoriesProducts: Product[] = [
  {
    id: "labels",
    name: "Labels",
    collection: "Apparel Accessories & Packaging",
    collectionId: "accessories",
    category: "Garment Identification",
    brochureRef: "Apparel Accessories Brochure — Page 1",
    heroBadge: "Export Quality Grade A",
    shortDesc: "Premium woven, printed, care, and micro size labels engineered for global export garments.",
    fullDesc: "Our garment labels are produced with high-definition Swiss looms and precision digital printing presses. Engineered to withstand rigorous industrial laundering and dry cleaning while retaining ultra-soft skin feel, crisp text definition, and vibrant color fidelity.",
    subItems: [
      "Woven Labels (High-density Damask, Satin, Taffeta)",
      "Printed Labels (100% Cotton, Satin Ribbon, TPU)",
      "Care Labels (Multi-language wash instructions, QR code, OEKO-TEX Standard 100)",
      "Size Labels (Micro woven tabs, loop folds, heat-transfer size indicators)"
    ],
    materials: [
      "100% Recycled Polyester (GRS Certified)",
      "Organic Combed Cotton Tape",
      "Soft Satin Weave & Taffeta",
      "Eco-friendly Thermoplastic Polyurethane (TPU)"
    ],
    finishes: [
      "Ultra-sonic soft sealed edges (zero scratchiness)",
      "End-fold, center-fold, miter-fold, or laser cut",
      "Metallic lurex gold/silver thread weave",
      "Sublimation & rotary silk screen printing"
    ],
    specifications: {
      "Width Range": "10mm to 120mm custom widths",
      "Colors": "Up to 12 weave colors per label / Pantone matching",
      "Compliance": "OEKO-TEX® Standard 100 Class I, GRS certified",
      "Sampling Time": "3 - 5 business days",
      "MOQ Consultation": "5,000 pcs standard (flexible pilot runs available)"
    },
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: true
  },
  {
    id: "hangtags",
    name: "Hangtags",
    collection: "Apparel Accessories & Packaging",
    collectionId: "accessories",
    category: "Branding & Retail",
    brochureRef: "Apparel Accessories Brochure — Page 1",
    heroBadge: "FSC Certified Paper Stocks",
    shortDesc: "Architectural paperboard hangtags, brand tags, price tags, and custom multi-ply cards.",
    fullDesc: "High-impact retail hangtags that define luxury and brand pedigree at point-of-sale. Available in textured artisanal stocks, heavyweight duplex cards, and FSC-certified virgin kraft boards with bespoke stringing and custom metal eyelet finishes.",
    subItems: [
      "Hang Tags (Thick kraft board, coated art board, uncoated textured cotton)",
      "Price Tags (Barcode printable, perforated tear-off vouchers)",
      "Brand Tags (Multi-layered sandwich cards, debossed logos, spot UV)",
      "Custom Tags (Die-cut silhouettes, folded booklet tags, wax seal attachments)"
    ],
    materials: [
      "350gsm to 900gsm Duplex & Triplex Paperboard",
      "Unbleached Virgin Craft Board",
      "FSC Recycled Cotton Rag Paper",
      "Translucent Vellum & Parchment Overlays"
    ],
    finishes: [
      "Hot foil stamping (Gold, Rose Gold, Matte Silver, Copper)",
      "Deep sculptural blind embossing and debossing",
      "Soft-touch velvet matte lamination",
      "Brass, gunmetal, and matte black eyelets"
    ],
    specifications: {
      "Board Thickness": "0.4mm up to 2.5mm rigid thickness",
      "Attachments": "Waxed cotton string, jute rope, grosgrain ribbon, metal safety pins",
      "Printing": "High-fidelity Heidelberg 6-color offset + Spot UV",
      "Sampling Time": "4 - 6 business days",
      "MOQ Consultation": "3,000 pcs (custom combinations available)"
    },
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80",
      "/images/products/comm-boxes.jpg"
    ],
    featured: true
  },
  {
    id: "trims-tapes",
    name: "Trims & Tapes",
    collection: "Apparel Accessories & Packaging",
    collectionId: "accessories",
    category: "Garment Construction",
    brochureRef: "Apparel Accessories Brochure — Page 1",
    heroBadge: "High Tensile Elasticity",
    shortDesc: "Jacquard waistbands, herringbone tapes, grossgrain ribbons, and silicone grip elastics.",
    fullDesc: "Precision-engineered woven trims, binding tapes, and elastics formulated for sportswear, denim, underwear, and high-fashion outerwear. Designed to retain elasticity over hundreds of wash cycles without fraying or deformation.",
    subItems: [
      "Waistbands (Jacquard woven logos, plush back waistband elastic)",
      "Tapes (Herringbone twill tape, grosgrain seam tape, reflective piping)",
      "Ribbons (Double-face satin, printed cotton tape, velvet edge ribbons)",
      "Elastic (Knitted elastic, woven flat elastic, non-slip silicone coated)"
    ],
    materials: [
      "Natural Combed Cotton",
      "High-grade Natural Rubber & Spandex",
      "Nylon 6.6 & Spun Polyester",
      "Medical-grade Non-toxic Silicone Gel"
    ],
    finishes: [
      "Custom jacquard weave pattern and raised lettering",
      "Continuous rotary screen print or heat transfer branding",
      "Wave or linear silicone grip application",
      "Anti-bacterial and quick-dry chemical treatment"
    ],
    specifications: {
      "Width Range": "6mm to 80mm standard widths",
      "Elongation Rate": "100% to 180% dynamic recovery",
      "Color Fastness": "Grade 4-5 to washing (AATCC standards)",
      "Sampling Time": "5 - 7 business days",
      "MOQ Consultation": "2,000 meters"
    },
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: false
  },
  {
    id: "cords-drawstrings",
    name: "Cords & Drawstrings",
    collection: "Apparel Accessories & Packaging",
    collectionId: "accessories",
    category: "Functional Trims",
    brochureRef: "Apparel Accessories Brochure — Page 1",
    heroBadge: "Custom Metal & Dip Aglets",
    shortDesc: "Braided hood drawcords, round waxed cords, shoelaces, and bungee shock cords.",
    fullDesc: "Functional and decorative drawstrings tailored for activewear, hoodies, track pants, and outerwear. Features bespoke terminal finishing including engraved metal aglets, matte silicone dip ends, and reflective threading.",
    subItems: [
      "Drawcords (Flat braided cotton cords, round core knit cords)",
      "Cords (Waxed cotton cords, nautical polyester piping)",
      "Shoelaces (Flat woven sneaker laces, round dress shoelaces)",
      "Elastic Cords (Bungee shock cords, adjustable toggled cords)"
    ],
    materials: [
      "100% Combed Natural Cotton",
      "Recycled Poly Braided Strands",
      "Natural Latex Rubber Core",
      "Zinc Alloy & Brass Terminal Aglets"
    ],
    finishes: [
      "Laser engraved metal tip aglets (Gunmetal, Brass, Chrome)",
      "Silicone dip-coated color-blocked tips",
      "Clear cellulose acetate transparent tipping",
      "Integrated 3M reflective threads"
    ],
    specifications: {
      "Diameter / Width": "3mm to 12mm diameters",
      "Length": "Custom cut-to-length from 60cm to 160cm",
      "Tensile Strength": "Exceeds international pull-test safety standards",
      "Sampling Time": "4 - 6 business days",
      "MOQ Consultation": "2,000 pairs / sets"
    },
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: false
  },
  {
    id: "zippers",
    name: "Zippers",
    collection: "Apparel Accessories & Packaging",
    collectionId: "accessories",
    category: "Fasteners & Hardware",
    brochureRef: "Apparel Accessories Brochure — Page 1",
    heroBadge: "Heavy-Duty Smooth Gliding",
    shortDesc: "Metal teeth, nylon coil, vislon molded plastic, and waterproof PU taped zippers.",
    fullDesc: "Industrial grade zipper assemblies built for harsh outerwear environments, high-fashion jackets, and workwear. Certified for 10,000+ open-close cycles with zero tooth slippage or separation.",
    subItems: [
      "Zippers (Metal brass, nylon coil #3/#5/#8, vislon molded teeth, waterproof PU taped)",
      "Sliders (Auto-lock, non-lock, reversible outerwear sliders)",
      "Pullers (Bespoke debossed zinc pullers, leather tab pullers, ergonomic cord pullers)"
    ],
    materials: [
      "Solid Brass, Antique Bronze & Copper Teeth",
      "High tenacity nylon filament coil",
      "POM (Polyoxymethylene) molded plastic teeth",
      "TPU matte waterproof laminated tape"
    ],
    finishes: [
      "Electroplated finishes: Antique brass, shiny silver, matte black, gunmetal",
      "Submerged matte waterproof taping with welded teeth",
      "Custom branded logo molds on sliders and pull tabs",
      "Ozone resistant and salt-spray corrosion tested"
    ],
    specifications: {
      "Sizes": "#3, #5, #8, #10 open-end, close-end, two-way zipper chains",
      "Cycle Durability": "10,000+ test cycles (ASTM D2061 certified)",
      "Standards": "Nickel-free, Lead-free, REACH compliant",
      "Sampling Time": "5 - 7 business days",
      "MOQ Consultation": "1,000 pcs per length/color"
    },
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: true
  },
  {
    id: "buttons-buckles",
    name: "Buttons & Buckles",
    collection: "Apparel Accessories & Packaging",
    collectionId: "accessories",
    category: "Fasteners & Hardware",
    brochureRef: "Apparel Accessories Brochure — Page 1",
    heroBadge: "Artisanal Natural & Alloy Castings",
    shortDesc: "Natural horn, corozo nut, resin, jeans tack buttons, copper rivets, and metal snaps.",
    fullDesc: "Complete fastener hardware collection spanning timeless organic materials to heavy-duty denim hardware. Engineered with precision shank attachments, rust-proof anti-oxidation coatings, and bespoke logo engraving.",
    subItems: [
      "Buttons (Real horn, vegetable corozo, resin polyester, 4-hole tailored buttons)",
      "Rivets (Copper, brass, anti-rust denim capped rivets)",
      "Metal Accessories (Jeans tack buttons, spring snaps, prong snap fasteners)"
    ],
    materials: [
      "Authentic Water Buffalo Horn & Natural Corozo Nut",
      "Polyester Unsaturated Resin",
      "Heavy-duty Zinc Alloy & Solid Brass",
      "Lead-free Stainless Steel Rivet Posts"
    ],
    finishes: [
      "Laser radial logo engraving on button rims",
      "Antique stonewashed vintage denim patinas",
      "High-gloss polish, matte velvet touch, or tortoise shell mottle",
      "Enamel color-fill branding"
    ],
    specifications: {
      "Sizes": "14L to 60L (9mm to 38mm)",
      "Attachment Pull": "> 90N pull-strength meeting infant/children safety laws",
      "Eco Compliance": "100% biodegradable natural buttons available",
      "Sampling Time": "5 - 7 business days",
      "MOQ Consultation": "5,000 pcs"
    },
    image: "/images/products/range-buttons.jpg",
    galleryImages: [
      "/images/products/comm-boxes.jpg",
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: false
  },
  {
    id: "patches-badges",
    name: "Patches & Badges",
    collection: "Apparel Accessories & Packaging",
    collectionId: "accessories",
    category: "Embellishments",
    brochureRef: "Apparel Accessories Brochure — Page 1",
    heroBadge: "3D High-Definition Relief",
    shortDesc: "Woven patches with merrowed edges, 3D puff embroidery, genuine leather, and silicone badges.",
    fullDesc: "Tactile brand identifiers engineered to add dimensional texture to jackets, caps, denim, and outdoor apparel. Available in needlework embroidery, high-frequency molded TPU, and genuine Italian leather.",
    subItems: [
      "Woven Patches (Merrowed edge borders, laser heat-seal cut edges)",
      "Embroidery Patches (3D puff foam embroidery, chenille letterman patches)",
      "Rubber / HTV / Leather Patches (Embossed genuine leather, molded 3D silicone, TPU badges)"
    ],
    materials: [
      "High-density Madeira Rayon & Poly Embroidery Thread",
      "Genuine Vegetable Tanned Leather & Premium Microfiber Suede",
      "Food-grade Eco Liquid Silicone",
      "Heat-activated Polyurethane Film (HTV)"
    ],
    finishes: [
      "Overlock merrowed border or clean laser contour cut",
      "Deep debossed hot-press branding on leather",
      "3D micro-injection multi-color molded silicone relief",
      "Iron-on heat seal, self-adhesive, or sew-on backing"
    ],
    specifications: {
      "Dimensions": "Custom silhouettes up to 250mm x 250mm",
      "Backing Options": "Sew-on fabric back, iron-on glue, Velcro hook-and-loop",
      "Wash Resistance": "Commercial laundering proof, heat resistant up to 160°C",
      "Sampling Time": "4 - 6 business days",
      "MOQ Consultation": "1,000 pcs"
    },
    image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: true
  },
  {
    id: "others-accessories",
    name: "Others — Metal & Fabric Buckles",
    collection: "Apparel Accessories & Packaging",
    collectionId: "accessories",
    category: "Hardware & Connectors",
    brochureRef: "Apparel Accessories Brochure — Page 1",
    heroBadge: "Precision Die-Cast Alloy",
    shortDesc: "Metal & fabric buckles, slider adjusters, D-rings, O-rings, and specialized garment hardware.",
    fullDesc: "Structural strap hardware and connecting accessories for utility vests, backpacks, trenches, and activewear. Crafted with die-cast zinc alloy for superior structural integrity and luxury hand weight.",
    subItems: [
      "Metal / Fabric Buckles (Ladder lock buckles, quick-release side buckles, roller buckles)",
      "Loops / D-Ring / O-Ring (Seamless welded D-rings, zinc alloy rings, triglides)",
      "Other Accessories (Suspender clips, metal chain tags, alloy cord stoppers)"
    ],
    materials: [
      "Die-cast Zamak 3 Zinc Alloy",
      "Solid Brass Wire",
      "High-impact Polyoxymethylene (POM)",
      "Aircraft-grade Anodized Aluminum"
    ],
    finishes: [
      "Matte galvanic electroplating (Gunmetal, Matte Black, Rose Gold)",
      "Laser engraved logo micro-marking",
      "Acid resistance and nickel-free skin contact coating",
      "Scratch-resistant PVD treatment"
    ],
    specifications: {
      "Inner Widths": "15mm, 20mm, 25mm, 32mm, 38mm, 50mm",
      "Break Strength": "Tested up to 150kg tensile break force",
      "Standards": "RoHS, REACH, and OEKO-TEX Standard 100",
      "Sampling Time": "5 - 7 business days",
      "MOQ Consultation": "2,000 pcs"
    },
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: false
  },
  {
    id: "poly-bags",
    name: "Poly Bags",
    collection: "Apparel Accessories & Packaging",
    collectionId: "accessories",
    category: "Garment Packaging",
    brochureRef: "Apparel Accessories Brochure — Page 1 (Packaging Solutions)",
    heroBadge: "D2W Biodegradable Options",
    shortDesc: "Self-adhesive garment poly bags, printed warning bags, and biodegradable compostable poly bags.",
    fullDesc: "Factory-grade protective garment polybags built to safeguard textiles during global transit, ocean freight, and warehousing. Features high-clarity films, anti-static easy-open lips, and permanent/resealable adhesive closures.",
    subItems: [
      "Printed Poly Bags (Multi-language child suffocation safety warnings, brand logos)",
      "Self-Adhesive Bags (Resealable release liner or permanent tamper-evident glue line)",
      "Biodegradable Poly Bags (D2W oxo-biodegradable or cornstarch PLA compostable)"
    ],
    materials: [
      "Virgin LDPE (Low-Density Polyethylene) for crystal clarity",
      "Post-Consumer Recycled (PCR) LDPE up to 100%",
      "Certified Compostable PLA + PBAT film",
      "CPP High-gloss display film"
    ],
    finishes: [
      "Flexographic multi-color rotary surface printing",
      "Die-cut breathable air vent holes",
      "Anti-fog and anti-static coating",
      "Punched handle or hanger hole cutouts"
    ],
    specifications: {
      "Thickness Range": "0.03mm to 0.08mm (30 to 80 microns)",
      "Size Customization": "From 15x20cm up to 60x90cm garment bags",
      "Safety": "Standard ASTM D6868 and EN 13432 compostability",
      "Sampling Time": "3 - 5 business days",
      "MOQ Consultation": "10,000 pcs"
    },
    image: "/images/products/comm-boxes.jpg",
    galleryImages: [
      "/images/products/comm-boxes.jpg",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: false
  },
  {
    id: "packaging-paper-bags",
    name: "Paper Bags",
    collection: "Apparel Accessories & Packaging",
    collectionId: "accessories",
    category: "Garment Packaging",
    brochureRef: "Apparel Accessories Brochure — Page 1 (Packaging Solutions)",
    heroBadge: "FSC 100% Recycled Kraft",
    shortDesc: "Natural brown/white kraft bags, twisted paper handles, and luxury boutique shopping bags.",
    fullDesc: "Sustainable, sturdy retail paper bags designed for fashion boutiques and global apparel brands. Engineered with reinforced cardboard bottoms and top fold turnovers for superior carrying weight capacity.",
    subItems: [
      "Kraft Paper Bags (Natural unbleached brown kraft, bleached clean white)",
      "Boutique Shopping Bags (Laminated art board with soft cotton twill handles)",
      "Flat Handle Grocery & Retail Bags (Machine-made high-speed production)"
    ],
    materials: [
      "120gsm to 250gsm Virgin Kraft Paper",
      "FSC Recycled Kraft Fiber",
      "210gsm to 300gsm Heavy Coated C1S Art Paper",
      "Twisted paper, cotton rope, or grosgrain ribbon handles"
    ],
    finishes: [
      "Water-based eco flexo printing or high-definition offset",
      "Matte velvet or gloss film lamination",
      "Metallic foil stamping and debossed logo crests",
      "Reinforced base and mouth fold cardboards"
    ],
    specifications: {
      "Weight Capacity": "Tested safely up to 10kg load capacity",
      "Custom Dimensions": "Full custom width, height, and side gussets",
      "Certifications": "FSC Chain of Custody certified",
      "Sampling Time": "4 - 6 business days",
      "MOQ Consultation": "3,000 pcs"
    },
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
      "/images/products/comm-boxes.jpg"
    ],
    featured: true
  },
  {
    id: "stickers-seals",
    name: "Stickers & Seals",
    collection: "Apparel Accessories & Packaging",
    collectionId: "accessories",
    category: "Packaging Security & Labeling",
    brochureRef: "Apparel Accessories Brochure — Page 1 (Packaging Solutions)",
    heroBadge: "Precision Roll & Die-Cut",
    shortDesc: "Size strip stickers, carton barcode labels, and tamper-evident security holographic seals.",
    fullDesc: "Self-adhesive specialty labels for retail apparel presentation and logistics tracking. Formulated with fabric-safe adhesives that leave zero sticky residue on delicate textiles when peeled by consumers.",
    subItems: [
      "Size Strip Stickers (Clear vinyl transparent strips for folded trousers and shirts)",
      "Barcode & Logistics Labels (Thermal transfer compatible shipping labels)",
      "Security Seals (Holographic tamper-evident, void-if-opened box seals)"
    ],
    materials: [
      "Clear & White Polypropylene (BOPP)",
      "FSC Semi-Gloss Coated Paper",
      "Laser Hologram Security Foil",
      "Removable Textile-Grade Acrylic Adhesive"
    ],
    finishes: [
      "Roll format for automated applicator machines or sheet format",
      "Gloss or matte UV varnish protective coating",
      "Custom die-cutting into geometric and organic shapes",
      "Sequential serial numbering and QR code matrix printing"
    ],
    specifications: {
      "Core Size": "25mm, 40mm, or 76mm standard cardboard cores",
      "Adhesive Properties": "Zero residue on cotton, wool, silk, and polyester",
      "Durability": "Resistant to moisture, friction, and UV yellowing",
      "Sampling Time": "3 - 5 business days",
      "MOQ Consultation": "5,000 pcs (roll minimums depend on dimensions)"
    },
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: false
  },
  {
    id: "boxes-cartons",
    name: "Boxes & Cartons",
    collection: "Apparel Accessories & Packaging",
    collectionId: "accessories",
    category: "Garment Packaging",
    brochureRef: "Apparel Accessories Brochure — Page 1 (Packaging Solutions)",
    heroBadge: "Corrugated Structural Strength",
    shortDesc: "Inner garment folding presentation boxes and heavy-duty corrugated export shipping master cartons.",
    fullDesc: "Engineered box packaging designed to protect garments from factory floor in Bangladesh to retail distribution centers in North America and Europe. Built with moisture-resistant fluting and high ECT crush resistance.",
    subItems: [
      "Boxes (Folding garment presentation boxes, windowed shirt boxes)",
      "Cartons (3-ply and 5-ply corrugated master shipping cartons, B-flute and C-flute)"
    ],
    materials: [
      "Virgin Kraft Linerboard (300gsm - 450gsm)",
      "Recycled Semi-Chemical Fluting Medium",
      "High-caliper CCNB / Duplex Board with white back",
      "Biodegradable cornstarch adhesive"
    ],
    finishes: [
      "Flexo printed handling marks, barcoding, and destination shipping stencils",
      "Waterproof wax or varnish outer coating for ocean freight",
      "Interlocking auto-lock bottom for rapid factory assembly",
      "Die-cut hand-carry holes with reinforced edges"
    ],
    specifications: {
      "Edge Crush Test (ECT)": "32 ECT up to 55 ECT heavy-duty export grade",
      "Flute Types": "E-flute (fine presentation), B-flute, C-flute, BC double-wall",
      "Custom Sizing": "Engineered to optimize standard 20ft / 40ft container loading",
      "Sampling Time": "5 - 7 business days",
      "MOQ Consultation": "1,000 master cartons / 3,000 presentation boxes"
    },
    image: "/images/products/comm-boxes.jpg",
    galleryImages: [
      "/images/products/comm-boxes.jpg",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: false
  },
  {
    id: "tissue-wrapping",
    name: "Tissue & Wrapping",
    collection: "Apparel Accessories & Packaging",
    collectionId: "accessories",
    category: "Garment Packaging",
    brochureRef: "Apparel Accessories Brochure — Page 1 (Packaging Solutions)",
    heroBadge: "Acid-Free & Bleed-Proof",
    shortDesc: "Custom printed acid-free gift wrapping tissue paper and protective garment parchment interlinings.",
    fullDesc: "Ultra-refined tissue wrapping that transforms garment unboxing into a tactile luxury ritual. Chemically neutral and acid-free to ensure inks never transfer onto white or delicate silk and cotton textiles during extended sea freight storage.",
    subItems: [
      "Custom Printed Tissue (Continuous pattern wallpaper print, metallic ink branding)",
      "Parchment & Glassine Wrapping (Moisture-proof translucent protective sheets)"
    ],
    materials: [
      "17gsm to 28gsm Acid-Free Virgin Wood Pulp Tissue",
      "35gsm Translucent Parchment & Glassine Paper",
      "Soy-based, non-bleeding environmental inks",
      "FSC Certified sustainable fiber"
    ],
    finishes: [
      "Single or dual color gravure roll printing with razor sharp resolution",
      "Metallic gold and silver ink shimmer printing",
      "Custom flat cut sheets or continuous roll formats",
      "Crisp, quiet luxury unboxing crinkle texture"
    ],
    specifications: {
      "Standard Sheet Sizes": "50x70cm, 50x75cm, or custom trimmed",
      "Acid Level": "pH Neutral (pH 7.0 - 7.5) certified zero fabric discoloration",
      "Ink Safety": "Certified non-toxic, non-bleeding under high humidity",
      "Sampling Time": "4 - 6 business days",
      "MOQ Consultation": "5,000 sheets"
    },
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1000&q=80"
    ],
    featured: false
  }
];
