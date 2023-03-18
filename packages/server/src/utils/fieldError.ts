type FieldError = {
  field: string;
  message: string;
};

const fieldError = (field: string, message: string) => {
  return { error: { field, message } };
};

export type { FieldError };
export { fieldError };
