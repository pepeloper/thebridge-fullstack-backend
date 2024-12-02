document.getElementById('create-form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        language: document.getElementById('language').value,
        code: document.getElementById('code').value
    }

    try {
        const response = await fetch('/api/snippets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (response.ok) {
            window.location.href = '/'
        } else {
            throw new Error('Failed to create snippet')
        }
    } catch (error) {
        console.error('Error creating snippet:', error)
        alert('Failed to create snippet. Please try again.')
    }
})