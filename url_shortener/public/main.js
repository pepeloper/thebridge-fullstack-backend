const ENDPOINT = 'http://localhost:3000/api/links'

function createLinkCard(link) {
  return `
    <div class="link-card">
      <div class="link-card__header">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.9917 7.24C11.5332 7.49855 12.0048 7.88327 12.3668 8.36186C12.7288 8.84046 12.9706 9.39893 13.072 9.99038C13.1735 10.5818 13.1314 11.189 12.9495 11.7608C12.7676 12.3327 12.4512 12.8525 12.0267 13.2767L8.27669 17.0267C7.57342 17.7299 6.61959 18.125 5.62502 18.125C4.63046 18.125 3.67662 17.7299 2.97336 17.0267C2.27009 16.3234 1.875 15.3696 1.875 14.375C1.875 13.3804 2.27009 12.4266 2.97336 11.7233L4.43752 10.2592M15.5625 9.74083L17.0267 8.27667C17.73 7.5734 18.125 6.61957 18.125 5.625C18.125 4.63043 17.73 3.6766 17.0267 2.97333C16.3234 2.27007 15.3696 1.87498 14.375 1.87498C13.3805 1.87498 12.4266 2.27007 11.7234 2.97333L7.97336 6.72333C7.54889 7.1475 7.23241 7.66734 7.05051 8.23919C6.86861 8.81103 6.82659 9.41817 6.928 10.0096C7.0294 10.6011 7.27126 11.1595 7.63327 11.6381C7.99527 12.1167 8.46683 12.5015 9.00836 12.76" stroke="#181D1F" style="stroke:#181D1F;stroke:color(display-p3 0.0941 0.1137 0.1216);stroke-opacity:1;" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <a href="${link.shortUrl}" class="link-card__short-url" target="_blank">${link.shortUrl}</a>
      </div>
      <div class="link-card__body">
        <div class="link-card__visits">
          <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 2A1.5 1.5 0 0 0 14 3.5v13a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 16.5 2h-1Zm-6 4A1.5 1.5 0 0 0 8 7.5v9A1.5 1.5 0 0 0 9.5 18h1a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-1Zm-6 4A1.5 1.5 0 0 0 2 11.5v5A1.5 1.5 0 0 0 3.5 18h1A1.5 1.5 0 0 0 6 16.5v-5A1.5 1.5 0 0 0 4.5 10h-1Z" fill="#181D1F" style="fill:color(display-p3 .0941 .1137 .1216);fill-opacity:1"/>
          </svg>
          <span class="link-card__visits-count">${link.visits} visitas</span>
        </div>
        <a href="${link.originalUrl}" target="_blank" class="link-card__original-url">${link.originalUrl}</a>
      </div>
    </div>
  `
}

async function fetchLinks() {
  try {
    const response = await fetch(ENDPOINT)
    const links = await response.json()

    const linksContainer = document.querySelector('.links')
    linksContainer.innerHTML = links.map(createLinkCard).join('')
  } catch (error) {
    console.error('Error fetching links:', error)
  }
}

document.querySelector('.hero__form').addEventListener('submit', async (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)
  const url = formData.get('url')

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })

    if (!response.ok) throw new Error('Error creating link')

    event.target.reset()
    await fetchLinks()
  } catch (error) {
    console.error('Error:', error)
  }
})

// Initial load
fetchLinks()
