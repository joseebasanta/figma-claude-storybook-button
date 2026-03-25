import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

// ─── Icon placeholder (matches Figma's icon slot) ─────────────────────────────
const Icon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 17s-7-4.35-7-9a4 4 0 0 1 7-2.646A4 4 0 0 1 17 8c0 4.65-7 9-7 9z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// ─── Meta ──────────────────────────────────────────────────────────────────────
const meta = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary interactive element. Supports **2 variants**, **3 sizes**, **pill shape**, **4 icon positions** and **5 interactive states** — matching the Figma component set (240 variants total).',
      },
    },
  },
  argTypes: {
    // ── Appearance ──
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: 'Visual style — filled (primary) or outlined (secondary)',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Height token — `sm` 36px · `md` 48px · `lg` 56–64px',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'md' },
      },
    },
    pill: {
      control: 'boolean',
      description: 'Switches border-radius to `radius/full` (999px)',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'false' },
      },
    },
    // ── State ──
    selected: {
      control: 'boolean',
      description: 'Active / pressed state — sets `aria-pressed` and darker palette',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interaction and applies the muted greyscale palette',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },
    // ── Content ──
    label: {
      control: 'text',
      description: 'Button text. Omit entirely for icon-only buttons.',
      table: { category: 'Content' },
    },
    iconLeft: {
      control: false,
      description: 'Node rendered **before** the label (icon-left / icon-alone)',
      table: { category: 'Content' },
    },
    iconRight: {
      control: false,
      description: 'Node rendered **after** the label (icon-right)',
      table: { category: 'Content' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ─── 1. Playground ────────────────────────────────────────────────────────────
// The single interactive story — use the Controls panel to explore every prop.

export const Playground: Story = {
  name: '⚡ Playground',
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Label',
    pill: false,
    selected: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive — tweak every prop from the Controls panel below.',
      },
    },
  },
}

// ─── 2. Variants ──────────────────────────────────────────────────────────────
// One story per visual variant for quick reference and visual regression.

export const Primary: Story = {
  name: 'Variant / Primary',
  args: { variant: 'primary', size: 'md', label: 'Label' },
  parameters: {
    docs: { description: { story: 'Filled button — main call-to-action.' } },
  },
}

export const Secondary: Story = {
  name: 'Variant / Secondary',
  args: { variant: 'secondary', size: 'md', label: 'Label' },
  parameters: {
    docs: { description: { story: 'Outlined button — secondary action.' } },
  },
}

// ─── 3. States ────────────────────────────────────────────────────────────────
// All 5 interactive states shown for both variants at medium size.
// Hover and Focus are forced visually via className so they render correctly
// inside a render() grid (pseudo: true only works on single-button stories).

const focusClass = 'ring-4 ring-[#eadff9] outline-none'
const hoverClass = (variant: 'primary' | 'secondary') =>
  variant === 'primary' ? '!bg-[#bea0ed]' : '!border-[#52239e]'

export const States: Story = {
  name: 'States / All',
  parameters: {
    docs: {
      description: {
        story:
          'All 5 states (Default · Hover · Focus · Selected · Disabled) for Primary and Secondary at `md` size.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      {(['primary', 'secondary'] as const).map(variant => (
        <div key={variant}>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">{variant}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex flex-col items-center gap-1">
              <Button variant={variant} size="md" label="Label" />
              <span className="text-[9px] text-gray-400">Default</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Button variant={variant} size="md" label="Label" className={hoverClass(variant)} />
              <span className="text-[9px] text-gray-400">Hover</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Button variant={variant} size="md" label="Label" className={focusClass} />
              <span className="text-[9px] text-gray-400">Focus</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Button variant={variant} size="md" label="Label" selected />
              <span className="text-[9px] text-gray-400">Selected</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Button variant={variant} size="md" label="Label" disabled />
              <span className="text-[9px] text-gray-400">Disabled</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
}

// Individual state stories — useful for pseudo-state visual regression tests.

export const StateHoverPrimary: Story = {
  name: 'States / Hover — Primary',
  args: { variant: 'primary', size: 'md', label: 'Label' },
  parameters: { pseudo: { hover: true } },
}
export const StateHoverSecondary: Story = {
  name: 'States / Hover — Secondary',
  args: { variant: 'secondary', size: 'md', label: 'Label' },
  parameters: { pseudo: { hover: true } },
}
export const StateFocusPrimary: Story = {
  name: 'States / Focus — Primary',
  args: { variant: 'primary', size: 'md', label: 'Label' },
  parameters: { pseudo: { focusVisible: true } },
}
export const StateFocusSecondary: Story = {
  name: 'States / Focus — Secondary',
  args: { variant: 'secondary', size: 'md', label: 'Label' },
  parameters: { pseudo: { focusVisible: true } },
}
export const StateSelectedPrimary: Story = {
  name: 'States / Selected — Primary',
  args: { variant: 'primary', size: 'md', label: 'Label', selected: true },
}
export const StateSelectedSecondary: Story = {
  name: 'States / Selected — Secondary',
  args: { variant: 'secondary', size: 'md', label: 'Label', selected: true },
}
export const StateDisabledPrimary: Story = {
  name: 'States / Disabled — Primary',
  args: { variant: 'primary', size: 'md', label: 'Label', disabled: true },
}
export const StateDisabledSecondary: Story = {
  name: 'States / Disabled — Secondary',
  args: { variant: 'secondary', size: 'md', label: 'Label', disabled: true },
}

// Focus grid — all icon positions × pill × sizes × both variants
export const FocusAll: Story = {
  name: 'States / Focus — All Combinations',
  parameters: {
    docs: {
      description: {
        story:
          'Focus ring (`ring-4 · #eadff9`) across **all combinations**: 2 variants × 2 pill × 3 sizes × 4 icon positions.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-10 p-6 bg-white">
      {(['primary', 'secondary'] as const).map(variant => (
        <section key={variant}>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 border-b border-gray-100 pb-1">
            {variant}
          </p>
          {([false, true] as const).map(pill => (
            <div key={String(pill)} className="mb-6">
              <p className="text-[9px] uppercase text-gray-400 mb-3">{pill ? 'Pill' : 'No Pill'}</p>
              <div className="grid grid-cols-3 gap-4">
                {(['sm', 'md', 'lg'] as const).map(size => (
                  <div key={size} className="flex flex-col gap-2 items-start">
                    <p className="text-[9px] text-gray-400 uppercase font-medium">{size}</p>
                    <Button variant={variant} size={size} pill={pill} label="Label"                                    className={focusClass} />
                    <Button variant={variant} size={size} pill={pill} label="Label" iconRight={<Icon />}               className={focusClass} />
                    <Button variant={variant} size={size} pill={pill} label="Label" iconLeft={<Icon />}                className={focusClass} />
                    <Button variant={variant} size={size} pill={pill}               iconLeft={<Icon />}                className={focusClass} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
}

// Hover grid — all icon positions × pill × sizes × both variants
export const HoverAll: Story = {
  name: 'States / Hover — All Combinations',
  parameters: {
    docs: {
      description: {
        story:
          'Hover state across **all combinations**: 2 variants × 2 pill × 3 sizes × 4 icon positions.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-10 p-6 bg-white">
      {(['primary', 'secondary'] as const).map(variant => (
        <section key={variant}>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-4 border-b border-gray-100 pb-1">
            {variant}
          </p>
          {([false, true] as const).map(pill => (
            <div key={String(pill)} className="mb-6">
              <p className="text-[9px] uppercase text-gray-400 mb-3">{pill ? 'Pill' : 'No Pill'}</p>
              <div className="grid grid-cols-3 gap-4">
                {(['sm', 'md', 'lg'] as const).map(size => (
                  <div key={size} className="flex flex-col gap-2 items-start">
                    <p className="text-[9px] text-gray-400 uppercase font-medium">{size}</p>
                    <Button variant={variant} size={size} pill={pill} label="Label"                                    className={hoverClass(variant)} />
                    <Button variant={variant} size={size} pill={pill} label="Label" iconRight={<Icon />}               className={hoverClass(variant)} />
                    <Button variant={variant} size={size} pill={pill} label="Label" iconLeft={<Icon />}                className={hoverClass(variant)} />
                    <Button variant={variant} size={size} pill={pill}               iconLeft={<Icon />}                className={hoverClass(variant)} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
}

// ─── 4. Sizes ─────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: 'Sizes / All',
  parameters: {
    docs: {
      description: {
        story: '`sm` 36px · `md` 48px · `lg` 56–64px — shown for both variants.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      {(['primary', 'secondary'] as const).map(variant => (
        <div key={variant}>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">{variant}</p>
          <div className="flex items-end gap-4">
            <Button variant={variant} size="sm" label="Small" />
            <Button variant={variant} size="md" label="Medium" />
            <Button variant={variant} size="lg" label="Large" />
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── 5. Pill ──────────────────────────────────────────────────────────────────

export const Pill: Story = {
  name: 'Pill / All',
  parameters: {
    docs: {
      description: {
        story: 'Pill shape (`border-radius: 999`) across all states and both variants.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      {(['primary', 'secondary'] as const).map(variant => (
        <div key={variant}>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">{variant} pill</p>
          <div className="flex items-center gap-3 flex-wrap">
            <Button variant={variant} size="sm"  label="Small"    pill />
            <Button variant={variant} size="md"  label="Medium"   pill />
            <Button variant={variant} size="lg"  label="Large"    pill />
            <Button variant={variant} size="md"  label="Selected" pill selected />
            <Button variant={variant} size="md"  label="Disabled" pill disabled />
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── 6. Icons ─────────────────────────────────────────────────────────────────

export const Icons: Story = {
  name: 'Icons / All',
  parameters: {
    docs: {
      description: {
        story:
          '4 icon positions (None · Left · Right · Alone) × 2 variants × 3 sizes.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {(['primary', 'secondary'] as const).map(variant => (
        <div key={variant}>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">{variant}</p>
          <div className="grid grid-cols-3 gap-4">
            {(['sm', 'md', 'lg'] as const).map(size => (
              <div key={size} className="flex flex-col gap-2 items-start">
                <p className="text-[10px] text-gray-400 uppercase">{size}</p>
                <Button variant={variant} size={size} label="Icon Right" iconRight={<Icon />} />
                <Button variant={variant} size={size} label="Icon Left"  iconLeft={<Icon />} />
                <Button variant={variant} size={size} iconLeft={<Icon />} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── 7. Pill + Icons ──────────────────────────────────────────────────────────

export const PillIcons: Story = {
  name: 'Pill + Icons / All',
  parameters: {
    docs: {
      description: {
        story: 'Icon positions combined with pill shape — both variants × all sizes.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {(['primary', 'secondary'] as const).map(variant => (
        <div key={variant}>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3">{variant} pill</p>
          <div className="grid grid-cols-3 gap-4">
            {(['sm', 'md', 'lg'] as const).map(size => (
              <div key={size} className="flex flex-col gap-2 items-start">
                <p className="text-[10px] text-gray-400 uppercase">{size}</p>
                <Button variant={variant} size={size} label="Icon Right" pill iconRight={<Icon />} />
                <Button variant={variant} size={size} label="Icon Left"  pill iconLeft={<Icon />} />
                <Button variant={variant} size={size} pill iconLeft={<Icon />} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

// ─── 8. Full Matrix ───────────────────────────────────────────────────────────
// Complete 240-variant matrix — mirrors the Figma component set exactly.

export const FullMatrix: Story = {
  name: '📐 Full Matrix (240 variants)',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Complete matrix: 2 Types × 5 States × 2 Pill × 3 Sizes × 4 Icon positions = **240 variants**.',
      },
    },
  },
  render: () => {
    const sizes   = ['sm', 'md', 'lg'] as const
    const variants = ['primary', 'secondary'] as const

    return (
      <div className="flex flex-col gap-12 p-8 bg-white">

        {variants.map(variant => (
          <section key={variant}>
            <h2 className="text-sm font-semibold text-gray-700 mb-6 uppercase tracking-widest border-b border-gray-100 pb-2">
              {variant}
            </h2>

            {([false, true] as const).map(pill => (
              <div key={String(pill)} className={pill ? '' : 'mb-10'}>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4">
                  {pill ? 'Pill' : 'No Pill'}
                </p>
                <div className="grid grid-cols-3 gap-6">
                  {sizes.map(size => (
                    <div key={size} className="flex flex-col gap-2">
                      <p className="text-[10px] text-gray-400 uppercase font-medium mb-1">{size}</p>

                      {/* ── None ── */}
                      <span className="text-[8px] text-gray-300 uppercase tracking-widest">none</span>
                      <Button variant={variant} size={size} pill={pill} label="Default" />
                      <Button variant={variant} size={size} pill={pill} label="Hover"    className={hoverClass(variant)} />
                      <Button variant={variant} size={size} pill={pill} label="Focus"    className={focusClass} />
                      <Button variant={variant} size={size} pill={pill} label="Selected" selected />
                      <Button variant={variant} size={size} pill={pill} label="Disabled" disabled />

                      {/* ── Icon Right ── */}
                      <span className="text-[8px] text-gray-300 uppercase tracking-widest mt-1">icon right</span>
                      <Button variant={variant} size={size} pill={pill} label="Default"  iconRight={<Icon />} />
                      <Button variant={variant} size={size} pill={pill} label="Hover"    iconRight={<Icon />} className={hoverClass(variant)} />
                      <Button variant={variant} size={size} pill={pill} label="Focus"    iconRight={<Icon />} className={focusClass} />
                      <Button variant={variant} size={size} pill={pill} label="Selected" iconRight={<Icon />} selected />
                      <Button variant={variant} size={size} pill={pill} label="Disabled" iconRight={<Icon />} disabled />

                      {/* ── Icon Left ── */}
                      <span className="text-[8px] text-gray-300 uppercase tracking-widest mt-1">icon left</span>
                      <Button variant={variant} size={size} pill={pill} label="Default"  iconLeft={<Icon />} />
                      <Button variant={variant} size={size} pill={pill} label="Hover"    iconLeft={<Icon />} className={hoverClass(variant)} />
                      <Button variant={variant} size={size} pill={pill} label="Focus"    iconLeft={<Icon />} className={focusClass} />
                      <Button variant={variant} size={size} pill={pill} label="Selected" iconLeft={<Icon />} selected />
                      <Button variant={variant} size={size} pill={pill} label="Disabled" iconLeft={<Icon />} disabled />

                      {/* ── Icon Alone ── */}
                      <span className="text-[8px] text-gray-300 uppercase tracking-widest mt-1">icon alone</span>
                      <Button variant={variant} size={size} pill={pill} iconLeft={<Icon />} />
                      <Button variant={variant} size={size} pill={pill} iconLeft={<Icon />} className={hoverClass(variant)} />
                      <Button variant={variant} size={size} pill={pill} iconLeft={<Icon />} className={focusClass} />
                      <Button variant={variant} size={size} pill={pill} iconLeft={<Icon />} selected />
                      <Button variant={variant} size={size} pill={pill} iconLeft={<Icon />} disabled />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}

      </div>
    )
  },
}
