import React from 'react'

export type ButtonVariant = 'primary' | 'secondary'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Primary (filled) or Secondary (outlined) */
  variant?: ButtonVariant
  /** sm = 36px height · md = 48px · lg = 56–64px */
  size?: ButtonSize
  /** Fully rounded (pill) vs rounded corners */
  pill?: boolean
  /** Active/selected state (darker background or stronger border) */
  selected?: boolean
  /** Button label — omit for icon-only buttons */
  label?: string
  /** Icon rendered before the label */
  iconLeft?: React.ReactNode
  /** Icon rendered after the label */
  iconRight?: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  pill = false,
  selected = false,
  label,
  iconLeft,
  iconRight,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isIconOnly = !label && (!!iconLeft || !!iconRight)

  // ─── Border radius ────────────────────────────────────────────────
  const radiusMap: Record<ButtonSize, string> = {
    sm: 'rounded-lg',   // 8px
    md: 'rounded-xl',   // 12px
    lg: 'rounded-2xl',  // 16px
  }
  const radius = pill ? 'rounded-full' : radiusMap[size]

  // ─── Size tokens ──────────────────────────────────────────────────
  const paddingMap: Record<ButtonSize, { normal: string; iconOnly: string }> = {
    sm: { normal: 'px-[16px] py-[8px]',  iconOnly: 'p-[8px]'  },
    md: { normal: 'px-[20px] py-[12px]', iconOnly: 'p-[12px]' },
    lg: { normal: 'px-[24px] py-[16px]', iconOnly: 'p-[16px]' },
  }
  const textMap: Record<ButtonSize, string> = {
    sm: 'text-[13px] leading-[19.5px]',
    md: 'text-[16px] leading-[24px]',
    lg: 'text-[20px] leading-[24px]',
  }
  const iconSizeMap: Record<ButtonSize, string> = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  const padding  = isIconOnly ? paddingMap[size].iconOnly : paddingMap[size].normal
  const textSize = textMap[size]
  const iconSize = iconSizeMap[size]

  // ─── Color tokens ─────────────────────────────────────────────────
  // Disabled overrides everything
  const disabledPrimary   = 'bg-[#cbc4d5] text-[#b9b0c7] cursor-not-allowed'
  const disabledSecondary = 'bg-[#ecebf2] text-[#b9b0c7] cursor-not-allowed border-transparent'

  // Primary interactive states
  const primaryBase = selected
    ? 'bg-[#52239e] text-[#f7f6f8]'                                         // selected
    : [
        'bg-[#8a62d8] text-[#f7f6f8]',                                       // default
        'hover:bg-[#bea0ed]',                                                 // hover
        'focus-visible:ring-4 focus-visible:ring-[#eadff9] focus-visible:outline-none', // focus
        'active:bg-[#52239e]',                                                // active ≈ selected
      ].join(' ')

  // Secondary interactive states
  const secondaryBase = selected
    ? 'bg-[#f5effc] text-[#433b52] border border-[#8a62d8]'                 // selected
    : [
        'bg-[#ecebf2] text-[#433b52] border border-[#8a62d8]',               // default
        'hover:border-[#52239e]',                                             // hover
        'focus-visible:ring-4 focus-visible:ring-[#eadff9] focus-visible:outline-none', // focus
      ].join(' ')

  const variantClasses = disabled
    ? variant === 'primary' ? disabledPrimary : disabledSecondary
    : variant === 'primary' ? primaryBase     : secondaryBase

  return (
    <button
      {...props}
      disabled={disabled}
      aria-pressed={selected}
      className={[
        'inline-flex items-center justify-center font-[Poppins,sans-serif] font-normal',
        'transition-colors duration-150',
        radius,
        padding,
        textSize,
        'gap-[4px]',
        variantClasses,
        className,
      ].filter(Boolean).join(' ')}
    >
      {iconLeft  && <span className={`${iconSize} flex items-center justify-center shrink-0`}>{iconLeft}</span>}
      {label     && <span className="whitespace-nowrap">{label}</span>}
      {iconRight && <span className={`${iconSize} flex items-center justify-center shrink-0`}>{iconRight}</span>}
    </button>
  )
}
