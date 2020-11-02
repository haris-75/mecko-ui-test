export const supportedFilesByGroups = {
  unstructured: ["pdf", "html", "htm", "doc", "docx", "rtf", "md"],
  structured: ["csv", "xlsx", "xls"]
};
export const transformationOptions = [
  {
    displayName: "Compliance Flagger",
    value: "STANFORD_NER", // directed by backend.
    default: true,
    disabled: false,
    group: "unstructured",
    type: "local",
    description: "Compliance flagger runs pdf files"
  },
  {
    displayName: "Excel Lineage",
    value: "FETCH_HEADERS", // directed by backend.
    disabled: false,
    group: "structured",
    type: "local",
    description: "Excel Lineage"
  },
  {
    displayName: "Fraud Patterns",
    value: "TPM", // directed by backend.
    disabled: false,
    group: "unstructured",
    type: "local",
    description: "Fraud Patterns"
  },
  {
    displayName: "Counterparty 360",
    value: "STANFORD_NER_WITH_INCLUSION", // directed by backend.
    disabled: false,
    group: "all",
    type: "local",
    description: "CounterParty 360"
  },
  {
    displayName: "GDPR",
    value: "GDPR",
    disabled: false,
    group: "unstructured",
    type: "local",
    description: "GDPR Complaint Check"
  },
  {
    displayName: "Box Permissions",
    value: "BOX_PERMISSION",
    disabled: false,
    type: "box",
    description: "Box Permissions"
  },

  /* Inactive models below this */
  {
    displayName: "Resume Reader",
    value: "TO_BE_REPLACED", // directed by backend.
    disabled: true,
    type: "local",
    description: "Some really long text"
  },
  {
    displayName: "Transaction Anomalies",
    value: "TO_BE_REPLACED", // directed by backend.
    disabled: true,
    type: "local",
    description: "Some really long text"
  },
  {
    displayName: "Fraud Analytics",
    value: "TO_BE_REPLACED", // directed by backend.
    disabled: true,
    type: "local",
    description: "Some really long text"
  },
  {
    displayName: "NDA Terms",
    value: "TO_BE_REPLACED", // directed by backend.
    disabled: true,
    type: "local",
    description: "Some really long text"
  },
  {
    displayName: "Contracts",
    value: "TO_BE_REPLACED", // directed by backend.
    disabled: true,
    type: "local",
    description: "Some really long text"
  },
  {
    displayName: "Client360",
    value: "TO_BE_REPLACED", // directed by backend.
    disabled: true,
    type: "local",
    description: "Some really long text"
  },
  {
    displayName: "Liquidity Risk",
    value: "TO_BE_REPLACED", // directed by backend.
    disabled: true,
    type: "local",
    description: "Some really long text"
  },
  {
    displayName: "Credit Risk",
    value: "TO_BE_REPLACED", // directed by backend.
    disabled: true,
    type: "local",
    description: "Some really long text"
  },
  {
    displayName: "Big Data Discovery",
    value: "TO_BE_REPLACED", // directed by backend.
    disabled: true,
    type: "local",
    description: "Some really long text"
  }
];
