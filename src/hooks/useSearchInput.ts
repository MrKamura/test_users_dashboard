import { useDeferredValue, useState } from 'react'

export function useSearchInput() {
  const [value, setValue] = useState('')
  const debounced = useDeferredValue(value.trim())
  return { value, setValue, debounced, hasQuery: debounced.length > 0 }
}
