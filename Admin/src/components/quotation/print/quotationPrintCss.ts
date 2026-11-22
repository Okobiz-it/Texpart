export const QUOTATION_CSS = `
  /* Core quotation typography & layout */
  .quotation-document {
    --q-page-h: 297mm;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
  }
  .quotation-page {
    box-sizing: border-box !important;
    width: 210mm !important;
    min-width: 210mm !important;
    max-width: 210mm !important;
    height: var(--q-page-h, 297mm) !important;
    min-height: var(--q-page-h, 297mm) !important;
    max-height: var(--q-page-h, 297mm) !important;
    overflow: hidden !important;
    position: relative !important;
  }
  .quotation-pad-artwork {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    height: 100% !important;
    pointer-events: none !important;
    user-select: none !important;
    z-index: 0 !important;
    overflow: hidden !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .quotation-footer,
  .quotation-header,
  .quotation-watermark {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .quotation-page-body {
    box-sizing: border-box !important;
    width: 100% !important;
    height: 100% !important;
    min-height: 100% !important;
    max-height: 100% !important;
    padding-left: 14mm !important;
    padding-right: 14mm !important;
    padding-top: 33mm !important;    /* Clears top crystals & blue accent rule */
    padding-bottom: 17mm !important; /* Clears bottom footer banner & contacts with sleek balanced gap */
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    overflow: hidden !important;
    position: relative !important;
    z-index: 10 !important;
  }
  .quotation-table,
  .quotation-table-wrapper {
    table-layout: fixed !important;
    height: auto !important;
    min-height: 0 !important;
    flex-grow: 0 !important;
    flex-shrink: 0 !important;
  }
  .quotation-table,
  .quotation-table tbody,
  .quotation-table tr,
  .quotation-table tfoot {
    border-collapse: collapse !important;
    width: 100% !important;
    background-color: transparent !important;
  }
  .quotation-table tr,
  .quotation-table td,
  .quotation-table th {
    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;
  }
  .quotation-page thead,
  .quotation-page th,
  .quotation-table thead,
  .quotation-table th {
    background-color: #2363ad !important;
    color: #ffffff !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .quotation-page th *,
  .quotation-table th * {
    color: #ffffff !important;
  }
  .quotation-table td.particulars-cell,
  .particulars-cell {
    color: #000000 !important;
    font-weight: 500 !important;
  }
  .quotation-narrative-flow {
    font-size: 11.5px !important;
    line-height: 1.38 !important;
    color: #1e293b !important;
  }
  .quotation-narrative-flow h1 {
    display: block !important;
    font-size: 15px !important;
    font-weight: 800 !important;
    color: #09090b !important;
    margin-top: 7px !important;
    margin-bottom: 3px !important;
    line-height: 1.25 !important;
  }
  .quotation-narrative-flow h2 {
    display: block !important;
    font-size: 13.5px !important;
    font-weight: 700 !important;
    color: #09090b !important;
    margin-top: 6px !important;
    margin-bottom: 2px !important;
    line-height: 1.25 !important;
  }
  .quotation-narrative-flow h3 {
    display: block !important;
    font-size: 12.5px !important;
    font-weight: 700 !important;
    color: #09090b !important;
    margin-top: 5px !important;
    margin-bottom: 2px !important;
    line-height: 1.25 !important;
  }
  .quotation-narrative-flow h4,
  .quotation-narrative-flow h5,
  .quotation-narrative-flow h6 {
    display: block !important;
    font-size: 11.5px !important;
    font-weight: 700 !important;
    color: #09090b !important;
    margin-top: 4px !important;
    margin-bottom: 2px !important;
    line-height: 1.25 !important;
  }
  .quotation-narrative-flow p {
    margin-top: 0 !important;
    margin-bottom: 2.5px !important;
  }
  .quotation-narrative-flow ul,
  .quotation-narrative-flow ol {
    margin-top: 0 !important;
    margin-bottom: 2.5px !important;
    padding-left: 14px !important;
  }
  .quotation-narrative-flow li {
    margin-bottom: 1.5px !important;
  }
  .quotation-narrative-flow blockquote {
    border-left: 2.5px solid #2363ad !important;
    padding-left: 8px !important;
    margin: 4px 0 !important;
    color: #475569 !important;
    font-style: italic !important;
  }
  @media print {
    @page {
      size: A4 portrait;
      margin: 0 !important;
    }
    body {
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .no-print,
    .no-print * {
      display: none !important;
    }
    .quotation-page {
      page-break-after: always !important;
      break-after: page !important;
      border: none !important;
      box-shadow: none !important;
      margin: 0 !important;
    }
  }
`;
