export default {
  root: ({ props }) => ({
    class: [
      // Sizing and Shape
      'min-w-[8rem]',

      { 'rounded-sm': props.popup },

      // Spacing
      'py-3',

      // Colors
      'bg-base-white',
      'text-primary',

      { 'shadow-xl': props.popup },
    ],
  }),
  menu: {
    class: [
      // Spacings and Shape
      'list-none',
      'm-0',
      'p-0',
      'outline-none',
    ],
  },
  menuitem: {
    class: 'relative my-[2px] [&:first-child]:mt-0',
  },
  content: ({ context }) => ({
    class: [
      'text-body-1',

      // Colors
      'text-primary',
      {
        'text-primary': !context.focused && !context.active,
        'text-primary bg-surface-200': context.focused && !context.active,
        'text-primary-highlight-inverse bg-primary-highlight':
          (context.focused && context.active) || context.active || (!context.focused && context.active),
      },

      // Transitions
      'transition-shadow',
      'duration-200',

      // States
      {
        'hover:bg-neutral-level-2 hover:bg-[rgba(255,255,255,0.03)]': !context.active,
        'hover:bg-primary-highlight-hover text-primary-highlight-inverse': context.active,
      },

      // Disabled
      { 'opacity-60 pointer-events-none cursor-default': context.disabled },
    ],
  }),
  action: {
    class: [
      'relative',
      // Flexbox

      'flex',
      'items-center',

      // Spacing
      'py-3',
      'px-4',

      // Color
      'text-primary',

      // Misc
      'no-underline',
      'overflow-hidden',
      'cursor-pointer',
      'select-none',
    ],
  },
  icon: {
    class: [
      // Spacing
      'mr-2',

      // Color
      'text-primary',
    ],
  },
  label: {
    class: ['leading-[normal]'],
  },
  submenuheader: {
    class: [
      // Font
      'font-bold',

      // Spacing
      'm-0',
      'py-2 px-3',

      // Shape
      'rounded-tl-none',
      'rounded-tr-none',

      // Colors
      'bg-surface-0',
      'text-primary',
    ],
  },
  transition: {
    enterFromClass: 'opacity-0 scale-y-[0.8]',
    enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
    leaveActiveClass: 'transition-opacity duration-100 ease-linear',
    leaveToClass: 'opacity-0',
  },
}
