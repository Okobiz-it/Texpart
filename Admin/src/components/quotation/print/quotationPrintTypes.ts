import { QuotationColumn, SoftwareRow } from "../quotation-defaults";

export interface QuotationPrintData {
  id?: number | string;
  _id?: string;
  ref_no: string;
  quote_date: string | Date;
  client_name: string;
  organization_name?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  subject: string;
  software_columns?: QuotationColumn[];
  software_rows?: SoftwareRow[];
  software_amount?: number | string;
  grand_total: number | string;
  in_words?: string | null;
  project_breakdown?: string | null;
  terms_conditions?: string | null;
  client_requirements?: string | null;
  deliverables?: string | null;
  additional_notes?: string | null;
  company_signatory_name?: string;
  company_signatory_title?: string;
  company_phone?: string;
  company_email?: string;
  status?: string;
  email_sent_at?: string | Date | null;
}

export interface QuotationPrintSheetProps {
  data: QuotationPrintData;
  className?: string;
}

export interface QuotationPageModel {
  pageNumber: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  tableChunk?: {
    rows: SoftwareRow[];
    isFirstChunk: boolean;
    isLastChunk: boolean;
  } | null;
  narrativeHtml?: string | null;
  showSignatory?: boolean;
}

export interface AtomicBlock {
  type: string;
  html: string;
  isListItem: boolean;
  listType?: "ol" | "ul";
  itemIndex?: number;
  height: number;
}
