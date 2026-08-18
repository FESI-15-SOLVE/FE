type MutationMeta = {
  toastMessage?: string | ((vars: unknown, data: unknown) => string);
  errorMessage?: string | ((vars: unknown, error: unknown) => string);
};

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: MutationMeta;
  }
}

export type { MutationMeta };
