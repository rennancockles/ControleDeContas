import { IController } from '@/presentation/protocols'

import { Request, Response } from 'express'

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {})
      // accountId: req.accountId
    }

    const httpResponse = await controller.handle(request)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}

// export const adaptRoute = (controller: IController) => {
//   return async (req: Request, res: Response) => {
//     console.log(req.body)
//     console.log(req.params)
//     const httpResponse = await controller.handle(req)
//     res.status(httpResponse.statusCode).json(httpResponse.body)
//   }
// }