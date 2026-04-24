import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  GetUsersParams,
  SearchUsersParams,
  UsersListResponse,
} from '@/types/user'

const BASE = 'https://dummyjson.com/'

function toUsersQueryString(p: {
  limit: number
  skip: number
  sortBy?: string
  order?: 'asc' | 'desc'
}) {
  const u = new URLSearchParams()
  u.set('limit', String(p.limit))
  u.set('skip', String(p.skip))
  if (p.sortBy) {
    u.set('sortBy', p.sortBy)
    u.set('order', p.order ?? 'asc')
  }
  return u.toString()
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE }),
  endpoints: (builder) => ({
    getUsers: builder.query<UsersListResponse, GetUsersParams>({
      query: (p) => `users?${toUsersQueryString(p)}`,
    }),
    searchUsers: builder.query<UsersListResponse, SearchUsersParams>({
      query: (p) => {
        const u = new URLSearchParams()
        u.set('q', p.q)
        u.set('limit', String(p.limit))
        u.set('skip', String(p.skip))
        return `users/search?${u.toString()}`
      },
    }),
  }),
})

export const { useGetUsersQuery, useSearchUsersQuery } = usersApi
