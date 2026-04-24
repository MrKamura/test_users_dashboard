import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'

/** Показать что-то внятное из ошибки fetch в RTK Query */
export function rtkErrorMessage(
  err: FetchBaseQueryError | SerializedError | undefined
) {
  if (!err) return 'Сеть или сервер недоступны.'
  if ('status' in err && err.status != null) return `Код: ${String(err.status)}`
  if ('message' in err && err.message) return err.message
  return 'Сеть или сервер недоступны.'
}
