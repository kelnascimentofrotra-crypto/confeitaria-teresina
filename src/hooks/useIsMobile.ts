import { useEffect, useState } from 'react'

const QUERY = '(max-width: 767px)'

/** true em celulares (até 767 px). Lido de forma síncrona para não piscar o layout. */
export function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(() => window.matchMedia(QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = () => setMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}
