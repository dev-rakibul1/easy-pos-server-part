export type IAuthLoginTypes = {
  uniqueId: string
  password: string
  email?: string
}

export type IUserLoginResponse = {
  accessToken: string
  refreshToken?: string
}

export type IRefreshToken = {
  accessToken: string
}
