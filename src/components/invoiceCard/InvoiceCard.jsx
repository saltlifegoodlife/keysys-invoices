import React from "react";
import "./InvoiceCard.css";

const InvoiceCard = ({ invoice }) => {
  return (
    <div className="card">
      <p className="data">
        <span>Invoice Type:</span> {invoice.invoiceTypeCode} -{" "}
        {invoice.invoiceTypeDescription}
      </p>
      <p className="data">
        <span>Line Item Code:</span> {invoice.categoryId}.
        {invoice.subCategoryId}
      </p>
      <p className="data">
        <span>Line Item Description:</span> {invoice.categoryDescription} -{" "}
        {invoice.subCategoryDescription}
      </p>
    </div>
  );
};

export default InvoiceCard;
