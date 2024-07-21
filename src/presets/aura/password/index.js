export default {
  root: ({ props }) => ({
    class: ['inline-flex relative', { '[&>input]:pl-11': props.toggleMask }],
  }),
  panel: {
    class: [
      // Spacing
      'p-3',

      // Shape
      'border',
      'shadow-md rounded-md',

      // Colors
      'bg-surface-0',
      'text-surface-700',
      'border-surface-200',
    ],
  },
  meter: {
    class: [
      // Position and Overflow
      'overflow-hidden',
      'relative',

      // Shape and Size
      'border-0',
      'h-[10px]',
      'rounded-md',

      // Spacing
      'mb-3',

      // Colors
      'bg-surface-100',
    ],
  },
  meterlabel: ({ instance }) => ({
    class: [
      // Size
      'h-full',

      // Colors
      {
        'bg-red-500': instance?.meter?.strength == 'weak',
        'bg-orange-500': instance?.meter?.strength == 'medium',
        'bg-green-500': instance?.meter?.strength == 'strong',
      },

      // Transitions
      'transition-all duration-1000 ease-in-out',
    ],
  }),
  showicon: {
    class: ['absolute left-6 flex justify-center h-full z-10 cursor-pointer', 'text-neutral-500'],
  },
  hideicon: {
    class: ['absolute left-6 flex justify-center h-full z-10 cursor-pointer', 'text-neutral-500'],
  },
  input: {
    root: ({ props, context, parent }) => ({
      class: [
        // Font
        'leading-none',

        'w-full',

        // Flex
        { 'flex-1 w-[1%]': parent.instance.$name == 'InputGroup' },

        // Spacing
        'm-0',
        {
          'py-3 px-3.5': props.size == 'large',
          'py-1.5 px-2': props.size == 'small',
          'py-4 px-6': props.size == null,
        },

        // Shape
        { 'rounded-sm': parent.instance.$name !== 'InputGroup' },
        { 'first:rounded-l-md rounded-none last:rounded-r-md': parent.instance.$name == 'InputGroup' },
        { 'border-0 border-y border-l last:border-r': parent.instance.$name == 'InputGroup' },
        { 'first:ml-0 -ml-px': parent.instance.$name == 'InputGroup' && !props.showButtons },

        // Colors
        'text-secondary',
        'placeholder:text-placeholder',
        { 'bg-white': !context.disabled },
        'border',
        { 'border-light': !props.invalid },

        // Invalid State
        'invalid:focus:ring-error',
        'invalid:hover:border-error',
        { 'border-error': props.invalid },

        // States
        {
          // 'hover:border-surface-400': !context.disabled && !props.invalid,
          'focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-primary focus:border-primary focus:z-10':
            !context.disabled,
          '!text-disabled bg-neutral-level-1 select-none pointer-events-none cursor-default': context.disabled,
        },

        // Filled State *for FloatLabel
        {
          filled:
            parent.instance?.$parentInstance?.$name == 'FloatLabel' &&
            parent.props.modelValue !== null &&
            parent.props.modelValue?.length !== 0,
        },

        // Misc
        'appearance-none',
        'transition-colors duration-200',
      ],
    }),
  },
  transition: {
    enterFromClass: 'opacity-0 scale-y-[0.8]',
    enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
    leaveActiveClass: 'transition-opacity duration-100 ease-linear',
    leaveToClass: 'opacity-0',
  },
}
