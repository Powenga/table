export const removeEmptyFields = (
  obj: Record<string, string | null | undefined>
) => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
      delete obj[key];
    }
  }
};
