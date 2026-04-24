import type { User, UserAddress } from '@/types/user'

export function userDisplayName(user: User) {
  const s = [user.firstName, user.lastName].filter(Boolean).join(' ')
  return s || '—'
}

export function userLocationLine(address: UserAddress | undefined) {
  if (!address) return ''
  return [address.city, address.state].filter(Boolean).join(', ')
}
