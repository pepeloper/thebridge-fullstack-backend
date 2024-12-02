import express from 'express'
import snippetsRouter from './snippets/snippets.router.js'

const router = express.Router()

router.use('/snippets', snippetsRouter)

export default router