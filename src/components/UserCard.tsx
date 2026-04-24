import type { User } from '@/types/user'
import { userDisplayName, userLocationLine } from '@/utils/userFormat'

type Props = { user: User }

export function UserCard({ user }: Props) {
  const name = userDisplayName(user)
  const location = userLocationLine(user.address)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:border-sky-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-sky-800">
      <div className="flex items-start gap-4 p-4 sm:p-5">
        <div className="relative shrink-0">
          <img
            src={user.image}
            alt=""
            className="size-16 rounded-2xl object-cover ring-1 ring-slate-200/80 dark:ring-slate-700"
            width={64}
            height={64}
            loading="lazy"
            decoding="async"
          />
          <span
            className="absolute -bottom-0.5 -end-0.5 rounded-md bg-sky-600 px-1.5 py-0.5 text-[10px] font-semibold uppercase leading-none text-white shadow-sm dark:bg-sky-500"
            title="Роль"
          >
            {user.role}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
            {name}
          </h2>
          <p className="mt-0.5 truncate text-sm text-sky-600 dark:text-sky-400">
            {user.email}
          </p>
          <p className="mt-1.5 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {user.company?.title}
            </span>
            {user.company?.name && <span> · {user.company.name}</span>}
          </p>
        </div>
      </div>
      <dl className="mt-auto grid grid-cols-2 gap-2 border-t border-slate-100 bg-slate-50/80 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900/50 sm:px-5">
        <div>
          <dt className="text-xs text-slate-500 dark:text-slate-500">
            Телефон
          </dt>
          <dd className="truncate text-slate-800 dark:text-slate-200">
            {user.phone}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500 dark:text-slate-500">
            Возраст
          </dt>
          <dd className="text-slate-800 dark:text-slate-200">{user.age}</dd>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <dt className="text-xs text-slate-500 dark:text-slate-500">
            Локация
          </dt>
          <dd
            className="truncate text-slate-800 dark:text-slate-200"
            title={location || undefined}
          >
            {location || '—'}
          </dd>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <dt className="text-xs text-slate-500 dark:text-slate-500">@</dt>
          <dd className="truncate font-mono text-slate-800 dark:text-slate-200">
            {user.username}
          </dd>
        </div>
      </dl>
    </article>
  )
}
