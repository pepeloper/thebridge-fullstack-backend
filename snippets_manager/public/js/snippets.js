function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

function createSnippetListItem(snippet, isActive = false) {
  console.log(snippet);
    return `
        <div class="snippet-item ${isActive ? 'active' : ''}"
             data-id="${snippet.id}"
             tabindex="0"
             role="button"
             aria-selected="${isActive}">
            <div class="snippet-item-title-wrapper">
                <img class="snippet-item-author-img" src="/${snippet.author.toLowerCase()}.png" alt="${snippet.author}">
                <p class="snippet-item-title">${snippet.title}</p>
            </div>
            <div class="snippet-item-meta">
                <span class="snippet-item-language">${snippet.language}</span>
                <span>${formatDate(snippet.createdAt)}</span>
            </div>
        </div>
    `
}

function createSnippetView(snippet) {
    return `
        <div class="snippet-view">
            <div class="snippet-header">
                <h2 class="snippet-title">${snippet.title}</h2>
                <div class="snippet-meta">
                    <span class="language-tag">${snippet.language}</span>
                    <span>Creado el ${formatDate(snippet.createdAt)}</span>
                </div>
            </div>
            <div class="snippet-description-wrapper">
                <p class="snippet-description">${snippet.description}</p>
            </div>
            <div class="code-wrapper">
                <button class="copy-button" onclick="copySnippetCode(this, ${JSON.stringify(snippet.code)})">
                    <span class="copy-text">Copiar</span>
                </button>
                <pre><code class="language-${snippet.language}">${escapeHtml(snippet.code)}</code></pre>
            </div>
        </div>
    `
}

function createEmptyState() {
    return `
        <div class="empty-state">
            <div class="empty-state-icon">📝</div>
            <h2>Ningún Snippet Seleccionado</h2>
            <p>Selecciona un snippet de la barra lateral o crea uno nuevo</p>
        </div>
    `
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
}

async function loadSnippets() {
    try {
        const response = await fetch('/api/snippets')
        const data = await response.json()
        return data.snippets
    } catch (error) {
        console.error('Failed to load snippets:', error)
        return []
    }
}

let selectedSnippetId = null
let focusedSnippetId = null
let currentFilter = ''

function handleSnippetClick(snippet) {
    if (selectedSnippetId === snippet.id) {
        selectedSnippetId = null
    } else {
        selectedSnippetId = snippet.id
    }
    focusedSnippetId = snippet.id
    renderSnippets()
}

function handleFilterChange(e) {
    currentFilter = e.target.value
    selectedSnippetId = null
    renderSnippets()
}

async function renderSnippets() {
    const snippets = await loadSnippets()
    const listContainer = document.getElementById('snippets-list')
    const contentContainer = document.getElementById('snippet-content')

    // Filter snippets
    const filteredSnippets = currentFilter
        ? snippets.filter(s => s.language.toLowerCase() === currentFilter.toLowerCase())
        : snippets

    // Render sidebar list
    listContainer.innerHTML = filteredSnippets
        .map(snippet => createSnippetListItem(
            snippet,
            snippet.id === selectedSnippetId
        ))
        .join('')

    // Render main content
    const selectedSnippet = filteredSnippets.find(s => s.id === selectedSnippetId)
    contentContainer.innerHTML = selectedSnippet
        ? createSnippetView(selectedSnippet)
        : createEmptyState()

    // Add click handlers
    listContainer.querySelectorAll('.snippet-item').forEach(item => {
        item.addEventListener('click', () => {
            const snippet = filteredSnippets.find(s => s.id === item.dataset.id)
            handleSnippetClick(snippet)
        })
    })

    Prism.highlightAll()
}

async function copySnippetCode(button, code) {
    try {
        await navigator.clipboard.writeText(code)

        // Visual feedback
        button.classList.add('copied')
        const textSpan = button.querySelector('.copy-text')
        textSpan.textContent = '¡Copiado!'

        // Reset after 2 seconds
        setTimeout(() => {
            button.classList.remove('copied')
            textSpan.textContent = 'Copiar'
        }, 2000)
    } catch (err) {
        console.error('Error al copiar:', err)
        // Show error feedback
        const textSpan = button.querySelector('.copy-text')
        textSpan.textContent = 'Error al copiar'
        setTimeout(() => {
            textSpan.textContent = 'Copiar'
        }, 2000)
    }
}

// Make the function available globally
window.copySnippetCode = copySnippetCode

// Initial render
renderSnippets()

// Add event listener for filter
document.addEventListener('DOMContentLoaded', () => {
    const filterSelect = document.getElementById('language-filter')
    filterSelect.addEventListener('change', handleFilterChange)
})