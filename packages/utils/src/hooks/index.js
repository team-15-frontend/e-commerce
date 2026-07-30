import { useEffect } from 'react'

let gtranslateLoadPromise = null

function loadGtranslateOnce() {
  if (gtranslateLoadPromise) return gtranslateLoadPromise

  gtranslateLoadPromise = new Promise((resolve, reject) => {
    window.gtranslateSettings = {
      default_language: 'en',
      native_language_names: true,
      languages: ['ar', 'en', 'fr', 'de', 'ko'],
      wrapper_selector: '.gtranslate_wrapper',
    }
    const script = document.createElement('script')
    script.id = 'gtranslate_script'
    script.src = 'https://cdn.gtranslate.net/widgets/latest/dropdown.js'
    script.defer = true
    script.onload = () => resolve()
    script.onerror = reject
    document.body.appendChild(script)
  })

  return gtranslateLoadPromise
}

export function useGTranslate() {
  useEffect(() => {
    let cancelled = false
    let selector = null
    let updateDirection = null
    let waitForSelector = null

    loadGtranslateOnce().then(() => {
      if (cancelled) return
      waitForSelector = setInterval(() => {
        const found = document.querySelector('.gt_selector')
        if (!found) return
        clearInterval(waitForSelector)
        selector = found
        updateDirection = () => {
          const val = selector.value || ''
          const isArabic = val === 'ar' || val.endsWith('ar') || val === 'ar|ar'
          document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
          document.documentElement.lang = isArabic ? 'ar' : 'en'
        }
        setTimeout(updateDirection, 100)
        selector.addEventListener('change', updateDirection)
      }, 300)
    })

    return () => {
      cancelled = true
      if (waitForSelector) clearInterval(waitForSelector)
      if (selector && updateDirection) {
        selector.removeEventListener('change', updateDirection)
      }
    }
  }, [])
}
