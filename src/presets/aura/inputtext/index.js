export default {
  root: ({ props, context, parent }) => ({
    class: [
      // Font
      'leading-none',

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
      { filled: parent.instance?.$name == 'FloatLabel' && context.filled },

      // Misc
      'appearance-none',
      'transition-colors duration-200',
    ],
  }),
}
