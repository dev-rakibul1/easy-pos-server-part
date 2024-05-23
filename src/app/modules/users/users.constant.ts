export const UserRoleEnum = [
  'SUPER_ADMIN',
  'ADMIN',
  'USER',
  'MODERATOR',
  'CONTENT_MANAGER',
  'MARKETING_MANAGER',
]

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const userFilterableKey = [
  'firstName',
  'middleName',
  'lastName',
  'email',
  'gender',
  'uniqueId',
  'nid',
]
export const userFilterableQuery = [
  'searchTerm',
  'firstName',
  'middleName',
  'lastName',
  'email',
  'gender',
  'role',
  'uniqueId',
  'nid',
]
