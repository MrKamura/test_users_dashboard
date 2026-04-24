/** Модель пользователя из ответа DummyJSON /users */

export type UserAddress = {
  city: string
  state: string
  country: string
}

export type UserCompany = {
  title: string
  name: string
  department: string
}

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  image: string
  company: UserCompany
  address: UserAddress
  role: string
  gender: string
  age: number
  username: string
}

export type UsersListResponse = {
  users: User[]
  total: number
  skip: number
  limit: number
}

export type GetUsersParams = {
  limit: number
  skip: number
  sortBy?: string
  order?: 'asc' | 'desc'
}

export type SearchUsersParams = {
  q: string
  limit: number
  skip: number
}
