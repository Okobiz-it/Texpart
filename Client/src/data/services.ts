export interface ServiceDetail {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  headline: string;
  divisionLabel: string;
  badge: string;
  heroImage: string;
  description: string;
  longDescription: string[];
  capabilities: {
    title: string;
    description: string;
    metric?: string;
  }[];
  videos: {
    title: string;
    caption: string;
    thumbnail: string;
    duration: string;
    videoType: "machinery" | "inspection" | "finishing";
  }[];
  photos: {
    url: string;
    title: string;
    caption: string;
    tag: string;
  }[];
  workflowSteps: {
    step: string;
    name: string;
    summary: string;
    deliverables: string[];
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  "private-jobs": {
    slug: "private-jobs",
    id: "private-jobs",
    title: "Private Jobs — Apparel Development & Manufacturing",
    subtitle: "End-to-End Fashion & Technical Garment Production",
    headline: "From Tech Pack To Finished Product.",
    divisionLabel: "DIVISION 01",
    badge: "Export Grade Manufacturing",
    heroImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2000&q=85",
    description: "We provide comprehensive apparel product development and manufacturing solutions. Starting from initial concepts, sketches, and technical specifications (tech packs) through to material sourcing, pattern drafting, sampling, grading, mass production, and final export shipment.",
    longDescription: [
      "Our Private Jobs division serves international fashion labels, outerwear designers, workwear contractors, and corporate uniform clients worldwide. Operating out of Dhaka, Bangladesh, we bring together world-class garment manufacturing infrastructure with bespoke artisanal attention to every stitch.",
      "Whether you arrive with a fully realized Gerber/Optitex CAD tech pack or a preliminary design brief with hand sketches, our dedicated technical merchandising team collaborates with you through every milestone. We source certified fabrics, manufacture custom branded trims (zippers, buttons, elastics, woven labels), engineer fit samples, conduct physical wash tests, and schedule automated assembly lines for on-time export delivery."
    ],
    capabilities: [
      {
        title: "Technical Outerwear & Jackets",
        description: "Down jackets, technical windbreakers, parkas, softshells, bonded fleece garments, and seam-sealed waterproof rainwear.",
        metric: "50,000 pcs / mo"
      },
      {
        title: "Knitwear & Premium Activewear",
        description: "Heavyweight French terry hoodies, interlock sweatshirts, organic cotton tees, performance leggings, and seamless activewear.",
        metric: "120,000 pcs / mo"
      },
      {
        title: "Woven Bottoms & Denim",
        description: "Tailored utility trousers, cargo pants, 14oz raw selvedge denim, enzyme-washed chinos, and stretch twill pants.",
        metric: "80,000 pcs / mo"
      },
      {
        title: "Integrated Trims & Accessories",
        description: "Internal production of matching OEKO-TEX woven labels, metal zippers, molded patches, and FSC retail hangtags.",
        metric: "100% In-House"
      }
    ],
    videos: [
      {
        title: "Automated Vacuum Cutting Floor",
        caption: "Multi-ply computer-controlled fabric spreading and precision robotic blade cutting at 4,000 RPM.",
        thumbnail: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
        duration: "02:14",
        videoType: "machinery"
      },
      {
        title: "Twin-Needle Outerwear Seam Sealing",
        caption: "Hot-air tape welding process ensuring 10,000mm hydrostatic waterproof resistance on technical outerwear.",
        thumbnail: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80",
        duration: "01:45",
        videoType: "machinery"
      },
      {
        title: "In-Line Needle Detection & AQL 1.5 Inspection",
        caption: "9-point automated electromagnetic scanning and final dimensional measurement audit prior to polybagging.",
        thumbnail: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
        duration: "03:02",
        videoType: "inspection"
      }
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80",
        title: "Pattern Drafting & Spreading",
        caption: "CAD pattern digitizing and laser grain line alignment on 60-meter spreading tables.",
        tag: "Pre-Production"
      },
      {
        url: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80",
        title: "Heavy-Duty Sewing Line",
        caption: "Brother & Juki industrial lockstitch machines configured for heavy twill and technical synthetics.",
        tag: "Assembly"
      },
      {
        url: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=1200&q=80",
        title: "Fabric Strike-Off & Lab Dips",
        caption: "Spectrophotometer color matching under D65, TL84, and Store Light conditions.",
        tag: "Material R&D"
      },
      {
        url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
        title: "AQL 1.5 Quality Inspection",
        caption: "Comprehensive 100% light table check for seam slippage, puckering, and thread tails.",
        tag: "Quality Control"
      },
      {
        url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80",
        title: "Finished Garment Ironing & Pressing",
        caption: "Steam form-finishing stations ensuring crisp lapels, seams, and showroom drape.",
        tag: "Finishing"
      },
      {
        url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
        title: "Carton Packing & Palletizing",
        caption: "Individual polybag packaging with barcode scanning into moisture-resistant export master cartons.",
        tag: "Export Logistics"
      }
    ],
    workflowSteps: [
      {
        step: "01",
        name: "Idea & Tech Pack Review",
        summary: "We analyze your CAD sketches, measurement grading sheets, Bill of Materials (BOM), and target price point.",
        deliverables: ["Grading chart validation", "BOM pricing breakdown", "Fabric feasibility report"]
      },
      {
        step: "02",
        name: "Design & Pattern Drafting",
        summary: "Our master pattern makers generate 2D digital patterns and 3D virtual garment draping simulations.",
        deliverables: ["Gerber/Optitex digital pattern", "Virtual 3D avatar fit test", "Marker layout optimization"]
      },
      {
        step: "03",
        name: "Material & Trim Sourcing",
        summary: "Sourcing certified yarns, shell textiles, technical linings, custom dyed zippers, and branded hardware.",
        deliverables: ["Lab dip swatches", "Trim strike-offs", "OEKO-TEX & GRS certificates"]
      },
      {
        step: "04",
        name: "Sampling & Fit Approval",
        summary: "Handcrafting proto samples, size sets, and pre-production (PP) samples for hands-on fitting validation.",
        deliverables: ["1st Proto Sample", "Fit comments revision", "Approved Golden Seal sample"]
      },
      {
        step: "05",
        name: "Bulk Production & In-Line QA",
        summary: "Fabric relaxation, multi-ply automated cutting, dedicated assembly lines, and 100% in-line inspection.",
        deliverables: ["Daily inline inspection logs", "Wash test shrinkage reports", "Tensile pull test logs"]
      },
      {
        step: "06",
        name: "Finishing, Packaging & Export",
        summary: "Tunnel steaming, hangtag application, metal detection, polybagging, and ocean/air freight booking.",
        deliverables: ["Final AQL 1.5 audit certificate", "Export packing list & C/O", "FOB/CIF container dispatch"]
      }
    ],
    specifications: [
      { label: "Minimum Order Quantity (MOQ)", value: "Flexible (from 500 pcs pilot runs up to 100,000+ units)" },
      { label: "Sampling Lead Time", value: "7 to 10 working days from tech pack approval" },
      { label: "Bulk Production Lead Time", value: "35 to 60 days depending on fabric availability" },
      { label: "Quality Standard", value: "AQL 1.5 / AQL 2.5 Major/Minor international standard" },
      { label: "Compliance & Safety", value: "OEKO-TEX Standard 100, GRS, BSCI, WRAP audit certified facilities" },
      { label: "Export Ports", value: "Chittagong Seaport (Ocean) / Dhaka Hazrat Shahjalal International Airport (Air)" }
    ],
    faqs: [
      {
        q: "What format should our tech pack be submitted in?",
        a: "We accept Adobe Illustrator (.AI), PDF, Gerber, or standard Excel tech pack templates containing measurement specs, fabric composition, and bill of materials."
      },
      {
        q: "Can you source specific custom fabrics or recycled fibers?",
        a: "Yes. We work closely with premier domestic and international spinning and weaving mills to develop custom GSM weights, jacquard weaves, organic cotton, GRS recycled polyester, and specialized coatings (DWR, PU, Teflon)."
      },
      {
        q: "Do you produce the trims and packaging in the same facility?",
        a: "Yes. Our Apparel Accessories division produces woven labels, care tags, FSC hangtags, elastics, drawstrings, zippers, and packaging boxes in-house, ensuring color harmony across all garment components."
      }
    ]
  },

  "commercial-jobs": {
    slug: "commercial-jobs",
    id: "commercial-jobs",
    title: "Commercial Jobs — Printing & Customized Promotional Products",
    subtitle: "High-Definition Commercial Offset & Structural Packaging",
    headline: "Your Design. Our Printing Expertise.",
    divisionLabel: "DIVISION 02",
    badge: "Heidelberg Speedmaster Precision",
    heroImage: "https://images.unsplash.com/photo-1589363460779-cd717d7e8fa5?auto=format&fit=crop&w=2000&q=85",
    description: "Whether you already have finalized artwork or need creative brand design support from scratch, we deliver high-precision commercial printing, marketing collateral, corporate stationery, and luxury rigid packaging.",
    longDescription: [
      "Our Commercial Jobs division empowers businesses, multinational corporations, retail chains, and creative agencies with world-class printing services. Equipped with state-of-the-art German Heidelberg offset presses, automated die-cutting tables, and luxury foil stamping units, we produce print collateral that reflects corporate prestige.",
      "We operate through two flexible workflow options: Option 01 allows clients with print-ready artwork to benefit from pre-flight color separation and high-speed production. Option 02 provides complete creative studio support, where our structural and graphic designers engineer bespoke dielines, premium typography, and branded presentation packaging."
    ],
    capabilities: [
      {
        title: "Luxury Rigid Packaging & Gift Boxes",
        description: "Heavyweight Kappa board setup boxes, magnetic closure book boxes, velvet-lined EVA cavities, and gold foil stamping.",
        metric: "15,000 boxes / day"
      },
      {
        title: "Publications, Catalogues & Books",
        description: "Hardcover case-bound books, PUR perfect-bound corporate catalogues, saddle-stitched lookbooks, and annual reports.",
        metric: "30,000 copies / day"
      },
      {
        title: "Marketing Collateral & Stationery",
        description: "Embossed business cards, executive letterheads, multi-fold brochures, DL leaflets, and presentation pocket folders.",
        metric: "100,000 sheets / day"
      },
      {
        title: "Large Format Displays & Promotional",
        description: "Retractable roll-up banners, wide-gamut exhibition posters, executive diaries, and desktop tent calendars.",
        metric: "Wide Format 1440 DPI"
      }
    ],
    videos: [
      {
        title: "Heidelberg 6-Color Offset Printing Press",
        caption: "High-speed CMYK + dual spot color offset printing running at 15,000 sheets per hour with spectrophotometric ink monitoring.",
        thumbnail: "https://images.unsplash.com/photo-1589363460779-cd717d7e8fa5?auto=format&fit=crop&w=1200&q=80",
        duration: "02:40",
        videoType: "machinery"
      },
      {
        title: "Automated Rigid Box V-Groove & Corner Taping",
        caption: "90-degree knife V-grooving on 2mm Kappa board and automated magnetic closure assembly line.",
        thumbnail: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
        duration: "01:50",
        videoType: "machinery"
      },
      {
        title: "Hot Foil Stamping & Precision Embossing",
        caption: "High-temperature pneumatic foil stamping with brass dies, applying metallic gold and holographic foils.",
        thumbnail: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
        duration: "01:30",
        videoType: "finishing"
      }
    ],
    photos: [
      {
        url: "https://images.unsplash.com/photo-1589363460779-cd717d7e8fa5?auto=format&fit=crop&w=1200&q=80",
        title: "Heidelberg Speedmaster Console",
        caption: "Computer-controlled ink fountain zone balancing for absolute Pantone consistency across millions of impressions.",
        tag: "Press Hall"
      },
      {
        url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
        title: "Hardcover Book & Catalogue Binding",
        caption: "Automatic gathering, thread sewing, and PUR glue application for lay-flat reading durability.",
        tag: "Bindery"
      },
      {
        url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
        title: "Luxury Rigid Box Wrapping",
        caption: "Linen paper and soft-touch laminates wrapped over rigid boards with crisp bubble-free edges.",
        tag: "Rigid Packaging"
      },
      {
        url: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1200&q=80",
        title: "Roll Label & Hologram Printing",
        caption: "Rotary die-cutting and inline UV varnishing for packaging labels and tamper-evident security seals.",
        tag: "Label Printing"
      },
      {
        url: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=1200&q=80",
        title: "Foil Stamping & 3D Debossing",
        caption: "Precision copper block embossing creating sculptural multi-level relief on executive cards.",
        tag: "Luxury Embellishment"
      },
      {
        url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
        title: "Automatic Paper Bag Folding",
        caption: "High-speed kraft and art paper shopping bag manufacturing with reinforced twisted paper handles.",
        tag: "Carrier Packaging"
      }
    ],
    workflowSteps: [
      {
        step: "01",
        name: "Artwork Pre-Flight or Creative Brief",
        summary: "We inspect your digital artwork (CMYK, bleeds, vector curves) or take your creative brief to develop original designs.",
        deliverables: ["Artwork pre-flight diagnostic", "Color separation profile", "Structural CAD dieline"]
      },
      {
        step: "02",
        name: "Paper Stock & Finish Selection",
        summary: "Selecting from thousands of paper grades: FSC certified art cards, unbleached virgin kraft, or Fedrigoni specialty boards.",
        deliverables: ["Paper sample swatch pack", "Finishing mockups (Foil/UV/Emboss)", "Material specification sheet"]
      },
      {
        step: "03",
        name: "Proofing & Wet Proof Sign-Off",
        summary: "Generating ISO calibrated GMG color digital proofs or short-run wet proofs on the actual production paper stock.",
        deliverables: ["Calibrated contract digital proof", "Physical dummy sample", "Written color tolerance approval"]
      },
      {
        step: "04",
        name: "Plate Output & Offset Press Run",
        summary: "High-resolution CTP thermal plates and high-speed Heidelberg offset printing with continuous spectrophotometer scanning.",
        deliverables: ["Thermal CTP plate exposure", "Ink density calibration logs", "Continuous sheet inspection"]
      },
      {
        step: "05",
        name: "Surface Embellishment & Die-Cutting",
        summary: "Applying thermal matte/gloss laminates, spot UV varnishes, hot foil stamps, and computerized platen die-cutting.",
        deliverables: ["Zero-crack scoring & folding", "Foil adhesion rub test", "Precision laser die registration"]
      },
      {
        step: "06",
        name: "Bindery, Assembly & Distribution",
        summary: "PUR binding, manual luxury box assembly, shrink-wrapping, carton packaging, and scheduled door delivery.",
        deliverables: ["Finished goods QA audit", "Shrink-wrapped bundle packaging", "Nationwide & export dispatch"]
      }
    ],
    specifications: [
      { label: "Printing Machinery", value: "Heidelberg Speedmaster 6-Color + Coater (Germany)" },
      { label: "Maximum Sheet Size", value: "720mm x 1020mm (B1 format)" },
      { label: "Paper Weights Supported", value: "60gsm lightweight papers up to 1800gsm rigid boards" },
      { label: "Color Standards", value: "ISO 12647-2 process control / Full Pantone Matching System (PMS)" },
      { label: "Finishing Capabilities", value: "Hot foil, 3D blind emboss, Spot UV, Velvet soft-touch, V-grooving" },
      { label: "Production Turnaround", value: "3 to 5 business days for standard print / 7 to 12 days for luxury rigid boxes" }
    ],
    faqs: [
      {
        q: "What file formats should we supply for Option 01 (Print from artwork)?",
        a: "We recommend high-resolution print-ready PDFs (PDF/X-1a or PDF/X-4), with fonts outlined, images at 300+ DPI in CMYK color space, and a minimum 3mm bleed on all sides."
      },
      {
        q: "How does Option 02 (Creative Support + Printing) work?",
        a: "Our in-house packaging and graphic designers work directly from your product dimensions and brand guidelines. We create 3D virtual prototypes and physical white dummies so you can test fit before any ink is applied."
      },
      {
        q: "Can you produce eco-friendly or plastic-free packaging?",
        a: "Yes. We offer 100% plastic-free packaging options using FSC recycled unbleached kraft papers, biodegradable soy-based inks, water-based coatings, and molded paper pulp inserts instead of plastic blisters."
      }
    ]
  }
};

