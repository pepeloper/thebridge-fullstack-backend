import snippetsService from './snippets.service.js'

class SnippetsController {
  async getSnippets(req, res) {
    try {
      const snippets = await snippetsService.getAllSnippets()
      res.json({ snippets })
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch snippets' })
    }
  }

  async createSnippet(req, res) {
    try {
      const { title, code, language, description } = req.body

      if (!title || !code || !language) {
        return res.status(400).json({ message: 'Missing required fields' })
      }

      const newSnippet = await snippetsService.createSnippet({
        title,
        code,
        language,
        description
      })

      res.status(201).json(newSnippet)
    } catch (error) {
      res.status(500).json({ message: 'Failed to create snippet' })
    }
  }

  async getSnippet(req, res) {
    try {
      const snippet = await snippetsService.getSnippetById(req.params.id)
      if (!snippet) {
        return res.status(404).json({ message: 'Snippet not found' })
      }
      res.json(snippet)
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch snippet' })
    }
  }

  async updateSnippet(req, res) {
    try {
      const { title, code, language, description } = req.body
      const updatedSnippet = await snippetsService.updateSnippet(req.params.id, {
        title,
        code,
        language,
        description
      })

      if (!updatedSnippet) {
        return res.status(404).json({ message: 'Snippet not found' })
      }

      res.json(updatedSnippet)
    } catch (error) {
      res.status(500).json({ message: 'Failed to update snippet' })
    }
  }

  async deleteSnippet(req, res) {
    try {
      const deleted = await snippetsService.deleteSnippet(req.params.id)
      if (!deleted) {
        return res.status(404).json({ message: 'Snippet not found' })
      }
      res.json({ message: 'Snippet deleted' })
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete snippet' })
    }
  }
}

export default new SnippetsController()