import { useEffect, useRef } from 'react'

export function ClonedGTranslate() {
  const containerRef = useRef(null)

  useEffect(() => {
    const waitForOriginal = setInterval(() => {
      const original = document.querySelector('.gt_selector')
      if (!original || !containerRef.current) return

      clearInterval(waitForOriginal)

      const clone = original.cloneNode(true)

      if (original.value) {
        clone.value = original.value
      }

      clone.addEventListener('change', (e) => {
        const val = e.target.value

        original.value = val

        document.cookie = `googtrans=/${val.replace('|', '/')}; path=/; domain=${location.hostname};`
        document.cookie = `googtrans=/${val.replace('|', '/')}; path=/;`

        original.dispatchEvent(new Event('input', { bubbles: true }))
        original.dispatchEvent(new Event('change', { bubbles: true }))

        const isArabic = val.endsWith('ar')
        document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
        document.documentElement.style.direction = isArabic ? 'rtl' : 'ltr'
      })

      containerRef.current.innerHTML = ''
      containerRef.current.appendChild(clone)
    }, 300)

    return () => clearInterval(waitForOriginal)
  }, [])

  return <div ref={containerRef}>Loading translator...</div>
}
