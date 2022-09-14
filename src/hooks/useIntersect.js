import { useCallback, useEffect, useRef } from 'react'

const defaultOptions = {
  root: null,
  rootMargin: '1px',
  threshold: '0.5',
}

export const useIntersect = (onIntersect, options = defaultOptions) => {
  const ref = useRef(null)
  const callback = useCallback(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) onIntersect(entry, observer)
      })
    },
    [onIntersect],
  )

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(callback, options)
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, options, callback])

  return ref
}
