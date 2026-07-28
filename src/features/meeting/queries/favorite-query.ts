export const favoriteQueries = {
  all: ['favorites'] as const,
  countKey: () => [...favoriteQueries.all, 'count'] as const,
};
