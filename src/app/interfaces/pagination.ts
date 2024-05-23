export type IPaginationOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export const paginationQueryKeys = ['limit', 'page', 'sortby', 'sortOrder']
