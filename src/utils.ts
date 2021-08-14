// * Validation function returns empty|null if valid, error if invalid; const error = validate, if error
export const validateRequestNumbers = (...args: number[]): Error | null => {
  for (let i = 0; i < args.length; i++) {
    if (isNaN(args[i])) {
      const err = `Invalid: ${args[i]} must be a number`;
      console.error(err);
      return new Error(err);
    }
  }
  return null;
};

// TODO: Validate length
export const validateRequestStrings = (...args: string[]): Error | null => {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '') {
      const err = `Invalid: ${args[i]} cannot be empty!`;
      console.error(err);
      return new Error(err);
    }
  }
  return null;
};

export const composeQuery = (
  baseQuery: string,
  count: number,
  page: number,
): string => {
  return `${baseQuery} LIMIT ${count} OFFSET ${(page - 1) * count};`;
};

interface PageCount {
  fixedPage: number;
  fixedCount: number;
  error: Error | null;
}

export const fixPageAndCount = (page: string, count: string): PageCount => {
  const fixedCount = parseInt(count);
  const fixedPage = parseInt(page);
  const error = validateRequestNumbers(fixedCount, fixedPage);
  return {
    fixedPage,
    fixedCount,
    error,
  };
};
