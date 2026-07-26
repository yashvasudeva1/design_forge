import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://the-design-forge.vercel.app'
const DEFAULT_IMAGE = `${SITE_URL}/Graphic%20(11).png`

export const SEO = ({
  title = 'Design Forge | Visual Identity & Logo Design Studio Delhi',
  description = 'Design Forge is a Delhi-based design studio specializing in logo design, brand identity, UI/UX design, and digital experiences.',
  keywords = 'design studio delhi, logo design delhi, brand identity design, UI UX designer delhi, visual identity studio, graphic design agency india',
  type = 'website',
  schema = null,
}) => {
  const location = useLocation()
  const currentUrl = `${SITE_URL}${location.pathname}`

  useEffect(() => {
    // Update Title
    document.title = title

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = description

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.name = 'keywords'
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.content = keywords

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = currentUrl

    // Update Open Graph Tags
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:url': currentUrl,
      'og:type': type,
      'og:image': DEFAULT_IMAGE,
      'og:site_name': 'Design Forge',
    }

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.content = content
    })

    // Update Twitter Card Tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': DEFAULT_IMAGE,
    }

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.name = name
        document.head.appendChild(tag)
      }
      tag.content = content
    })

    // Inject/Update Dynamic JSON-LD Schema
    let schemaScript = document.getElementById('dynamic-schema')
    if (schemaScript) {
      schemaScript.remove()
    }

    if (schema) {
      schemaScript = document.createElement('script')
      schemaScript.id = 'dynamic-schema'
      schemaScript.type = 'application/ld+json'
      schemaScript.text = JSON.stringify(schema)
      document.head.appendChild(schemaScript)
    }

    // Window scroll to top on navigation
    window.scrollTo(0, 0)
  }, [title, description, keywords, currentUrl, type, schema])

  return null
}

export default SEO
