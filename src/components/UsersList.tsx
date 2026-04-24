import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'
import { USERS_PAGE_SIZE } from '@/constants'
import type { UsersListResponse } from '@/types/user'
import { useUsersList } from '@/hooks/useUsersList'
import { rtkErrorMessage } from '@/utils/rtkErrorMessage'
import { UserCard } from './UserCard'

type Props = { search: string }

export function UsersList({ search }: Props) {
  const {
    page,
    totalPages,
    total,
    isSearchMode,
    users,
    payload,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    prevPage,
    nextPage,
  } = useUsersList(search)

  return (
    <>
      <StatsLine
        isSearchMode={isSearchMode}
        data={payload}
        isLoading={isLoading}
        isFetching={isFetching}
      />

      {isError && <ErrorPanel error={error} onRetry={() => void refetch()} />}

      {isLoading && <ListSkeleton />}

      {!isLoading && !isError && users.length === 0 && (
        <p className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
          {isSearchMode ? 'Нет пользователей по этому запросу.' : 'Нет данных.'}
        </p>
      )}

      {!isLoading && !isError && users.length > 0 && (
        <>
          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${isFetching && !isLoading ? 'opacity-80' : ''} transition-opacity`}
          >
            {users.map((u) => (
              <UserCard key={u.id} user={u} />
            ))}
          </div>

          {total > USERS_PAGE_SIZE && (
            <nav
              className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/90 pt-6 dark:border-slate-800"
              aria-label="Страницы"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Страница{' '}
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {page + 1}
                </span>{' '}
                из {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 0 || isFetching}
                  onClick={prevPage}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Назад
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages - 1 || isFetching}
                  onClick={nextPage}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Вперёд
                </button>
              </div>
            </nav>
          )}
        </>
      )}
    </>
  )
}

function StatsLine({
  isSearchMode,
  data,
  isLoading,
  isFetching,
}: {
  isSearchMode: boolean
  data: UsersListResponse | undefined
  isLoading: boolean
  isFetching: boolean
}) {
  const n = data?.total ?? 0
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm tabular-nums text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
        Всего:{' '}
        <strong className="font-semibold text-slate-900 dark:text-slate-100">
          {isLoading ? '…' : n}
        </strong>
      </div>
      {!isSearchMode && !isLoading && data && (
        <div className="text-sm text-slate-500 dark:text-slate-500">
          Показано {data.skip + 1}–
          {Math.min(data.skip + data.users.length, data.total)} из {data.total}
        </div>
      )}
      {isSearchMode && !isLoading && data && (
        <div className="text-sm text-slate-500 dark:text-slate-500">
          На странице: {data.users.length} из {data.total} найденных
        </div>
      )}
      {isFetching && !isLoading && (
        <span className="text-xs text-slate-500 dark:text-slate-500">
          Обновление…
        </span>
      )}
    </div>
  )
}

function ListSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      aria-hidden
    >
      {Array.from({ length: USERS_PAGE_SIZE }).map((_, i) => (
        <div
          key={i}
          className="h-52 animate-pulse rounded-2xl border border-slate-200/80 bg-slate-200/50 dark:border-slate-800 dark:bg-slate-800/50"
        />
      ))}
    </div>
  )
}

function ErrorPanel({
  error,
  onRetry,
}: {
  error: FetchBaseQueryError | SerializedError | undefined
  onRetry: () => void
}) {
  return (
    <div
      className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
      role="alert"
    >
      <p className="font-medium">Не удалось загрузить данные</p>
      <p className="mt-1 text-red-700/90 dark:text-red-300/90">
        {rtkErrorMessage(error)}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-900 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-100 dark:hover:bg-red-900"
      >
        Повторить
      </button>
    </div>
  )
}
