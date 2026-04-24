import { DUMMYJSON_LINKS } from '@/constants'

type Props = {
  searchValue: string
  onSearchChange: (v: string) => void
  contextHint: string
}

export function AppHeader({ searchValue, onSearchChange, contextHint }: Props) {
  return (
    <header className="border-b border-slate-200/90 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
              DummyJSON
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
              Пользователи
            </h1>
            <p className="mt-1 max-w-xl text-sm text-slate-600 dark:text-slate-400">
              Данные{' '}
              <a
                className="text-sky-600 underline decoration-sky-500/30 underline-offset-2 hover:decoration-sky-500/60 dark:text-sky-400"
                href={DUMMYJSON_LINKS.users}
                target="_blank"
                rel="noreferrer"
              >
                dummyjson.com/users
              </a>
              {' · '}
              <a
                className="text-sky-600 underline decoration-sky-500/30 underline-offset-2 hover:decoration-sky-500/60 dark:text-sky-400"
                href={DUMMYJSON_LINKS.usersDocs}
                target="_blank"
                rel="noreferrer"
              >
                документация
              </a>
              {contextHint}
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-1 sm:max-w-xs">
            <label
              htmlFor="user-search"
              className="text-xs font-medium text-slate-500 dark:text-slate-500"
            >
              Поиск
            </label>
            <input
              id="user-search"
              type="search"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Имя, фамилия, email…"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
