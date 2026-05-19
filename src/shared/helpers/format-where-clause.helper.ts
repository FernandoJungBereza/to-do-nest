export function formatWhereClause(where: Record<string, any>): string {
  if (!where || Object.keys(where).length === 0) {
    return 'sem critérios';
  }

  return Object.entries(where)
    .map(([key, value]) => `${key} = ${value}`)
    .join(', ');
}
