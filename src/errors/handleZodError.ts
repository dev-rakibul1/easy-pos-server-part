import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorResponse } from '../app/interfaces/common'
import { IGenericErrorMessage } from '../app/interfaces/error'

const HandleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    }
  })

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default HandleZodError
