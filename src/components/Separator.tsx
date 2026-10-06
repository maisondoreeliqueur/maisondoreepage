import React from 'react'

export interface SeparatorProps {
  /** Space in pixels for desktop screens */
  desktopSpace?: number | string
  /** Space in pixels for mobile screens (defaults to desktopSpace if omitted) */
  mobileSpace?: number | string
  /** Alias for desktopSpace */
  desktop?: number | string
  /** Alias for mobileSpace */
  mobile?: number | string
  /** Space alias (applies to both if mobile is not entered) */
  space?: number | string
  /** Height alias */
  height?: number | string
  /** Mobile height alias */
  mobileHeight?: number | string
  /** Optional additional CSS classes */
  className?: string
  id?: string
  blockType?: string
}

function formatPixelValue(value?: number | string): string {
  if (value === undefined || value === null) return '0px'
  if (typeof value === 'number') return `${value}px`
  const trimmed = String(value).trim()
  if (!trimmed) return '0px'
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return `${trimmed}px`
  return trimmed
}

export const Separator: React.FC<SeparatorProps> = ({
  desktopSpace,
  mobileSpace,
  desktop,
  mobile,
  space,
  height,
  mobileHeight,
  className = '',
  id,
}) => {
  // Resolve desktop space
  const resolvedDesktop = desktopSpace ?? desktop ?? height ?? space ?? 0
  // Resolve mobile space: if mobile is not entered, use the same as desktop
  const resolvedMobile = mobileSpace ?? mobile ?? mobileHeight ?? resolvedDesktop

  const desktopHeightStyle = formatPixelValue(resolvedDesktop)
  const mobileHeightStyle = formatPixelValue(resolvedMobile)

  return (
    <div
      id={id}
      aria-hidden="true"
      role="separator"
      className={`w-full pointer-events-none select-none clear-both ${className}`}
    >
      {/* Desktop spacer (md breakpoint and up) */}
      <div className="hidden md:block w-full" style={{ height: desktopHeightStyle }} />
      {/* Mobile spacer (below md breakpoint) */}
      <div className="block md:hidden w-full" style={{ height: mobileHeightStyle }} />
    </div>
  )
}

export default Separator
