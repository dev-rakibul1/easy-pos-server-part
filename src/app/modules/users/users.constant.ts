export const UserRoleEnum = [
  'super_admin',
  'admin',
  'user',
  'moderator',
  'content_manager',
  'marketing_manager',
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
