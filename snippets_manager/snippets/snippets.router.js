import express from 'express'
import snippetsController from './snippets.controller.js'

const router = express.Router()

router.get('/', snippetsController.getSnippets.bind(snippetsController))
router.post('/', snippetsController.createSnippet.bind(snippetsController))
router.get('/:id', snippetsController.getSnippet.bind(snippetsController))
router.put('/:id', snippetsController.updateSnippet.bind(snippetsController))
router.delete('/:id', snippetsController.deleteSnippet.bind(snippetsController))

export default router