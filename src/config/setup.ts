import { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { exceptionHandler, sendError } from '../utils'

const express = (app: Application) => {
  app.use('*', cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use((_: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-methods', 'GET, POST, PUT, PATCH, DELETE, OPTION')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Accept , Content-Type')
    next()
  })
}

const handler = (app: Application) => {
  // 404 not found
  app.use((_: Request, res: Response) => {
    return sendError(res, 404, 'API not found')
  })

  // error handling
  app.use((err: exceptionHandler, _: Request, res: Response, __: NextFunction) => {
    const status = err.status || 400
    const message = err.message || 'Error server.'
    return sendError(res, status, message)
  })
}

export default {
  express,
  handler,
}
