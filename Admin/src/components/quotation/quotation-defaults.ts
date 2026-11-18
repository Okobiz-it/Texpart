export interface QuotationColumn {
  key: string;
  label: string;
  width?: string;
}

export interface SoftwareRow {
  sl: number | string;
  scope: string;
  particulars: string;
  amount?: number | string;
}

export const DEFAULT_SOFTWARE_COLUMNS: QuotationColumn[] = [
  { key: "sl", label: "SL", width: "7%" },
  { key: "scope", label: "Scope of Work / Item", width: "28%" },
  { key: "particulars", label: "PARTICULARS & SPECIFICATIONS", width: "51%" },
  { key: "amount", label: "AMOUNT", width: "14%" },
];

export const DEFAULT_SOFTWARE_ROWS: SoftwareRow[] = [
  {
    sl: 1,
    scope: "Custom Garment Packaging Boxes",
    particulars: "Rigid magnetic closure luxury gift boxes with custom gold foil stamping, debossed logo, 1200 GSM recycled greyboard.",
  },
  {
    sl: 2,
    scope: "Premium Apparel Hang Tags & Price Labels",
    particulars: "700 GSM duplex art card with matte lamination, UV spot varnish, metal eyelet & wax cord string.",
  },
  {
    sl: 3,
    scope: "Custom Polybags & Self-Adhesive Bags",
    particulars: "Biodegradable LDPE with warning print, custom branding, ventilation holes and high-tack resealable tape.",
  },
  {
    sl: 4,
    scope: "Woven & Satin Brand Labels",
    particulars: "High-density damask woven labels with ultrasonic soft cut edges for collar branding and care instructions.",
  },
  {
    sl: 5,
    scope: "Branded Tissue Paper & Wrapping Sheets",
    particulars: "17 GSM acid-free luxury translucent tissue paper with repeated pattern pantone brand print.",
  },
  {
    sl: 6,
    scope: "Quality Assurance & Direct Factory Delivery",
    particulars: "100% piece-by-piece QC inspection against signed golden seal master sample, moisture-proof bulk carton packing, and factory delivery.",
  },
];

export const DEFAULT_UNIFIED_TERMS_AND_CONDITIONS = `
<h3>Production & Delivery Timeline Breakdown</h3>
<p><strong>Step 1: Sampling & Digital Mockups (3-5 Days)</strong><br/>Digital layout finalization, CAD die-line preparation, color separation, and physical pre-production sample development for client sign-off.</p>
<p><strong>Step 2: Raw Material Sourcing & Cylinder / Plate Preparation (3-4 Days)</strong><br/>Procurement of certified GSM boards, pantone-matched inks, eco-friendly foils, and precision cutting dies.</p>
<p><strong>Step 3: Mass Production & Finishing (7-10 Days)</strong><br/>High-speed offset printing, hot foil stamping, embossing, matte/gloss lamination, automatic die-cutting, folding, and gluing.</p>
<p><strong>Step 4: Quality Control & Packing (2-3 Days)</strong><br/>100% piece-by-piece inspection against approved master sample, moisture-proof poly wrapping, and corrugated master carton packaging.</p>

<p><strong>Compliance & Quality Standards:</strong> FSC Certified raw materials, OEKO-TEX Standard 100 compliant inks, REACH compliant eco-adhesives.</p>

<h3>Commercial Terms & Conditions:</h3>
<ol>
  <li>All prices quoted are in Bangladeshi Taka (BDT) and exclude Government VAT/AIT unless explicitly specified.</li>
  <li>Quotation validity is 15 (fifteen) business days from the date of issuance due to fluctuating raw material paper market rates.</li>
  <li><strong>Payment Terms:</strong> 50% advance along with confirmed Work Order / Purchase Order, and remaining 50% balance upon delivery handover.</li>
  <li>Production lead time begins strictly from the date of final artwork approval and advance payment confirmation.</li>
  <li>Standard printing industry tolerance of &plusmn;5% on final delivered quantity will apply and will be invoiced accordingly.</li>
  <li>Client must provide vector artwork files (AI, PDF, or EPS) with converted outlines/curves and embedded Pantone color codes.</li>
  <li>Goods once delivered in sound condition according to the signed sample are non-returnable.</li>
</ol>

<h3>What We Require From You:</h3>
<ul>
  <li>a. High-resolution brand logo in vector format (AI, EPS, or SVG with fonts converted to outlines).</li>
  <li>b. Approved dimension specifications, die-cut blueprints, and material GSM guidelines.</li>
  <li>c. Color references (Pantone Matching System solid coated numbers).</li>
  <li>d. Official Purchase Order (PO) / Work Order sign-off with authorized signature.</li>
</ul>

<h3>What You Will Receive From Texpart:</h3>
<ul>
  <li>a. Pre-production physical golden sample for tactile & color sign-off before mass production.</li>
  <li>b. Batch quality assurance certificate and compliance documentation.</li>
  <li>c. Pristine, securely packaged goods delivered directly to your manufacturing floor or warehouse.</li>
</ul>
`.trim();
