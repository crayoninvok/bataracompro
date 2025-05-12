// src/utils/format.ts
// Formatting utility functions

/**
 * Format date to display format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

/**
 * Format currency
 */
export const formatCurrency = (amount?: number): string => {
  if (amount === undefined || amount === null) return "-";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format salary range
 */
export const formatSalaryRange = (min?: number, max?: number): string => {
  if (!min && !max) return "Negotiable";

  if (min && !max) return `${formatCurrency(min)}+`;

  if (!min && max) return `Up to ${formatCurrency(max)}`;

  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  // Basic phone formatting for Indonesian numbers
  if (!phone) return "";

  // Remove non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Check if it starts with country code
  if (cleaned.startsWith("62")) {
    return `+${cleaned}`;
  }

  // If it starts with 0, replace with country code
  if (cleaned.startsWith("0")) {
    return `+62${cleaned.substring(1)}`;
  }

  return cleaned;
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

/**
 * Check if file is a valid image
 */
export const isValidImage = (file: File): boolean => {
  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  return validTypes.includes(file.type);
};

/**
 * Check if file is a valid document
 */
export const isValidDocument = (file: File): boolean => {
  const validTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return validTypes.includes(file.type);
};

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
