import type { AxiosError } from 'axios'

export interface ApiError {
  message: string
  statusCode: number
  details?: unknown
}

export const extractApiError = (error: unknown): ApiError => {
  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    const axiosError = error as AxiosError
    const responseData = axiosError.response?.data as any
    const message = responseData?.message || axiosError.message || 'An unexpected error occurred'
    const statusCode = axiosError.response?.status || 500
    const details = responseData?.details
    return { message, statusCode, details }
  }
  return {
    message: error instanceof Error ? error.message : 'Unknown error',
    statusCode: 500,
  }
}

export const handleApiError = (error: unknown): never => {
  const apiError = extractApiError(error)
  console.error('[API Error]', apiError)
  throw apiError
}
