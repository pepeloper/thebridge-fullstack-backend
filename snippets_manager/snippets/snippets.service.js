import repository from './snippets.repository.js'

class SnippetsService {
  async getAllSnippets() {
    return await repository.getAll()
  }

  async getSnippetById(id) {
    const snippets = await repository.getAll()
    return snippets.find(s => s.id === id)
  }

  async createSnippet(snippetData) {
    const snippets = await repository.getAll()
    const newSnippet = {
      id: (snippets.length + 1).toString(),
      ...snippetData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    snippets.push(newSnippet)
    await repository.save(snippets)
    return newSnippet
  }

  async updateSnippet(id, updateData) {
    const snippets = await repository.getAll()
    const index = snippets.findIndex(s => s.id === id)

    if (index === -1) return null

    snippets[index] = {
      ...snippets[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    }

    await repository.save(snippets)
    return snippets[index]
  }

  async deleteSnippet(id) {
    const snippets = await repository.getAll()
    const index = snippets.findIndex(s => s.id === id)

    if (index === -1) return false

    snippets.splice(index, 1)
    await repository.save(snippets)
    return true
  }
}

export default new SnippetsService()