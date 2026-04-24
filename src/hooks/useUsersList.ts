import { useState } from 'react'
import { useGetUsersQuery, useSearchUsersQuery } from '@/api/usersApi'
import { USERS_DEFAULT_SORT, USERS_PAGE_SIZE } from '@/constants'

/**
 * Список + пагинация. Всё с limit/skip уходит на DummyJSON.
 * RTK `skip: true` на одном из двух хуков — чтобы не дергать оба запроса сразу.
 */
export function useUsersList(search: string) {
  const [page, setPage] = useState(0)
  const isSearchMode = search.length > 0
  const offset = page * USERS_PAGE_SIZE

  const listQuery = useGetUsersQuery(
    {
      limit: USERS_PAGE_SIZE,
      skip: offset,
      sortBy: USERS_DEFAULT_SORT.sortBy,
      order: USERS_DEFAULT_SORT.order,
    },
    { skip: isSearchMode }
  )

  const searchQuery = useSearchUsersQuery(
    { q: search, limit: USERS_PAGE_SIZE, skip: offset },
    { skip: !isSearchMode }
  )

  const active = isSearchMode ? searchQuery : listQuery
  const total = active.data?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / USERS_PAGE_SIZE))

  return {
    page,
    totalPages,
    total,
    isSearchMode,
    users: active.data?.users ?? [],
    payload: active.data,
    isLoading: active.isLoading,
    isFetching: active.isFetching,
    isError: active.isError,
    error: active.error,
    refetch: active.refetch,
    prevPage: () => setPage((p) => Math.max(0, p - 1)),
    nextPage: () => setPage((p) => Math.min(totalPages - 1, p + 1)),
  }
}
