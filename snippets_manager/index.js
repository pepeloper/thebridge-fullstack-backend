import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import router from './router.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', router)

app.listen(port, () => {
  console.log(`Snippets Manager running on port ${port}`)
})