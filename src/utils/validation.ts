// src/ilstu / validation.ts;
// Form validation utility functions

/**
 * Email validation
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation (minimum 8 characters, at least one letter and one number)
 */
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Required field validation
 */
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Minimum length validation
 */
export const minLength = (value: string, min: number): boolean => {
  return value.trim().length >= min;
};

/**
 * Maximum length validation
 */
export const maxLength = (value: string, max: number): boolean => {
  return value.trim().length <= max;
};

/**
 * Year validation (4 digits)
 */
export const isValidYear = (year: number | string): boolean => {
  const yearStr = year.toString();
  return (
    /^\d{4}$/.test(yearStr) &&
    parseInt(yearStr, 10) > 1900 &&
    parseInt(yearStr, 10) <= new Date().getFullYear() + 10
  );
};
