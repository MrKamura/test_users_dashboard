export const USERS_PAGE_SIZE = 12

export const DUMMYJSON_LINKS = {
  users: 'https://dummyjson.com/users',
  usersDocs: 'https://dummyjson.com/docs/users',
} as const

export const USERS_DEFAULT_SORT = {
  sortBy: 'firstName' as const,
  order: 'asc' as const,
}
