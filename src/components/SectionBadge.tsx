import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function SectionBadge({ icon, children, className }: { icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn('relative inline-flex items-center', className)}>
      <span
        aria-hidden="true"
        className="absolute top-1/2 -left-24 hidden h-px w-20 bg-linear-to-r from-transparent to-[#2e8bff]/70 sm:block"
      />
      <span className="badge-glow">
        {icon}
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-1/2 -right-24 hidden h-px w-20 bg-linear-to-l from-transparent to-[#2e8bff]/70 sm:block"
      />
    </div>
  )
}
