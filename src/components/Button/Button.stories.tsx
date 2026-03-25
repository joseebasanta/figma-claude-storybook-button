import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

// Simple heart icon matching Figma's icon placeholder
const HeartIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 17s-7-4.35-7-9a4 4 0 0 1 7-2.646A4 4 0 0 1 17 8c0 4.65-7 9-7 9z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant:  { control: 'select', options: ['primary', 'secondary'] },
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    pill:     { control: 'boolean' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label:    { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// ─── Primary ──────────────────────────────────────────────────────────────────

export const PrimaryDefault: Story = {
  name: 'Primary / Default',
  args: { variant: 'primary', size: 'md', label: 'Label' },
}

export const PrimaryHover: Story = {
  name: 'Primary / Hover (bg #bea0ed)',
  args: { variant: 'primary', size: 'md', label: 'Label' },
  parameters: { pseudo: { hover: true } },
}

export const PrimaryFocus: Story = {
  name: 'Primary / Focus (ring #eadff9)',
  args: { variant: 'primary', size: 'md', label: 'Label' },
  parameters: { pseudo: { focusVisible: true } },
}

export const PrimarySelected: Story = {
  name: 'Primary / Selected (bg #52239e)',
  args: { variant: 'primary', size: 'md', label: 'Label', selected: true },
}

export const PrimaryDisabled: Story = {
  name: 'Primary / Disabled',
  args: { variant: 'primary', size: 'md', label: 'Label', disabled: true },
}

// ─── Secondary ────────────────────────────────────────────────────────────────

export const SecondaryDefault: Story = {
  name: 'Secondary / Default',
  args: { variant: 'secondary', size: 'md', label: 'Label' },
}

export const SecondaryHover: Story = {
  name: 'Secondary / Hover (border #52239e)',
  args: { variant: 'secondary', size: 'md', label: 'Label' },
  parameters: { pseudo: { hover: true } },
}

export const SecondaryFocus: Story = {
  name: 'Secondary / Focus (ring #eadff9)',
  args: { variant: 'secondary', size: 'md', label: 'Label' },
  parameters: { pseudo: { focusVisible: true } },
}

export const SecondarySelected: Story = {
  name: 'Secondary / Selected (bg #f5effc)',
  args: { variant: 'secondary', size: 'md', label: 'Label', selected: true },
}

export const SecondaryDisabled: Story = {
  name: 'Secondary / Disabled',
  args: { variant: 'secondary', size: 'md', label: 'Label', disabled: true },
}

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Size / Small (36px)',
  args: { variant: 'primary', size: 'sm', label: 'Label' },
}

export const SizeMedium: Story = {
  name: 'Size / Medium (48px)',
  args: { variant: 'primary', size: 'md', label: 'Label' },
}

export const SizeLarge: Story = {
  name: 'Size / Large (56px)',
  args: { variant: 'primary', size: 'lg', label: 'Label' },
}

// ─── Pill ─────────────────────────────────────────────────────────────────────

export const PillPrimary: Story = {
  name: 'Pill / Primary',
  args: { variant: 'primary', size: 'md', label: 'Label', pill: true },
}

export const PillSecondary: Story = {
  name: 'Pill / Secondary',
  args: { variant: 'secondary', size: 'md', label: 'Label', pill: true },
}

// ─── Icons ────────────────────────────────────────────────────────────────────

export const IconRight: Story = {
  name: 'Icon / Right',
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Label',
    iconRight: <HeartIcon size={24} />,
  },
}

export const IconLeft: Story = {
  name: 'Icon / Left',
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Label',
    iconLeft: <HeartIcon size={24} />,
  },
}

export const IconOnly: Story = {
  name: 'Icon / Only (square)',
  args: {
    variant: 'primary',
    size: 'md',
    iconLeft: <HeartIcon size={24} />,
  },
}

export const IconOnlySecondary: Story = {
  name: 'Icon / Only Secondary',
  args: {
    variant: 'secondary',
    size: 'md',
    iconLeft: <HeartIcon size={24} />,
  },
}

// ─── All variants grid ────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: '— All Variants Overview',
  render: () => (
    <div className="flex flex-col gap-8 p-8 bg-white">
      {/* Sizes */}
      <section>
        <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Sizes</p>
        <div className="flex items-center gap-4">
          <Button variant="primary" size="sm" label="Small" />
          <Button variant="primary" size="md" label="Medium" />
          <Button variant="primary" size="lg" label="Large" />
        </div>
      </section>

      {/* Primary states */}
      <section>
        <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Primary States</p>
        <div className="flex items-center gap-4 flex-wrap">
          <Button variant="primary" size="md" label="Default" />
          <Button variant="primary" size="md" label="Selected" selected />
          <Button variant="primary" size="md" label="Disabled" disabled />
        </div>
      </section>

      {/* Secondary states */}
      <section>
        <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Secondary States</p>
        <div className="flex items-center gap-4 flex-wrap">
          <Button variant="secondary" size="md" label="Default" />
          <Button variant="secondary" size="md" label="Selected" selected />
          <Button variant="secondary" size="md" label="Disabled" disabled />
        </div>
      </section>

      {/* Pill */}
      <section>
        <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">Pill Shape</p>
        <div className="flex items-center gap-4">
          <Button variant="primary"   size="md" label="Primary Pill"   pill />
          <Button variant="secondary" size="md" label="Secondary Pill" pill />
        </div>
      </section>

      {/* Icons */}
      <section>
        <p className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-widest">With Icons</p>
        <div className="flex items-center gap-4 flex-wrap">
          <Button variant="primary" size="md" label="Icon Right" iconRight={<HeartIcon size={20} />} />
          <Button variant="primary" size="md" label="Icon Left"  iconLeft={<HeartIcon size={20} />} />
          <Button variant="primary" size="md" iconLeft={<HeartIcon size={20} />} />
          <Button variant="secondary" size="md" label="Secondary Icon" iconRight={<HeartIcon size={20} />} />
          <Button variant="secondary" size="md" iconLeft={<HeartIcon size={20} />} />
        </div>
      </section>
    </div>
  ),
}
