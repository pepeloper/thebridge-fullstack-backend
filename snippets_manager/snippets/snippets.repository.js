import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, 'data', 'snippets.json')

class SnippetsRepository {
  async ensureDbFile() {
    try {
      await fs.mkdir(path.dirname(dbPath), { recursive: true })
      try {
        await fs.access(dbPath)
      } catch {
        await fs.writeFile(dbPath, JSON.stringify([], null, 2))
      }
    } catch (error) {
      console.error('Failed to ensure database file:', error)
      throw error
    }
  }

  async getAll() {
    await this.ensureDbFile()
    const data = await fs.readFile(dbPath, 'utf8')
    return JSON.parse(data)
  }

  async save(snippets) {
    await this.ensureDbFile()
    await fs.writeFile(dbPath, JSON.stringify(snippets, null, 2))
  }
}

export default new SnippetsRepository()