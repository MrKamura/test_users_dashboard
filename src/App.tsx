import { AppHeader } from '@/components/AppHeader'
import { UsersList } from '@/components/UsersList'
import { useSearchInput } from '@/hooks/useSearchInput'

function App() {
  const { value, setValue, debounced, hasQuery } = useSearchInput()
  const contextHint = hasQuery
    ? ` · поиск: «${debounced}»`
    : ' · сортировка по имени (A–Я)'

  return (
    <div className="min-h-dvh">
      <AppHeader
        searchValue={value}
        onSearchChange={setValue}
        contextHint={contextHint}
      />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* key сбрасывает страницу пагинации при новом поиске */}
        <UsersList key={debounced} search={debounced} />
      </main>
    </div>
  )
}

export default App
