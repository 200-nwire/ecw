export default {
  root: ({ props }) => ({
    class: [
      // Flexbox
      'flex flex-col',

      // Position
      'relative',
      { '!transition-none !transform-none !w-screen !h-screen !max-h-full !top-0 !left-0': props.position == 'full' },

      // Size
      {
        'h-full w-[56%]': props.position == 'left' || props.position == 'right',
        'h-auto w-full': props.position == 'top' || props.position == 'bottom',
      },

      // Shape

      'border-0',
      {
        'rounded-r-md': props.position == 'left',
        'rounded-l-md': props.position == 'right',
      },

      'shadow-lg',

      // Colors
      'bg-base-white',
      'text-primary',

      // Transitions
      'transition-transform',
      'duration-300',

      // Misc
      'pointer-events-auto',
    ],
  }),
  header: {
    class: [
      // Flexbox and Alignment
      'flex items-center justify-between',
      'shrink-0',

      // Spacing
      'px-11 py-6',

      // Colors
      'text-primary',

      // border
      'border-b border-light',
    ],
  },
  title: {
    class: ['font-semibold text-xl'],
  },
  icons: {
    class: ['flex items-center'],
  },
  // closeButton: {
  //     class: [
  //         'relative',

  //         // Flexbox and Alignment
  //         'flex items-center justify-center',

  //         // Size and Spacing
  //         'mr-2',
  //         'last:mr-0',
  //         'w-7 h-7',

  //         // Shape
  //         'border-0',
  //         'rounded-full',

  //         // Colors
  //         'text-primary',
  //         'bg-transparent',

  //         // Transitions
  //         'transition duration-200 ease-in-out',

  //         // States
  //         'hover:text-primary',
  //         'hover:bg-',
  //         'focus:outline-none focus:outline-offset-0 focus:ring-0',

  //         // Misc
  //         'overflow-hidden'
  //     ]
  // },
  // closeButtonIcon: {
  //     class: [
  //         // Display
  //         'inline-block',

  //         // Size
  //         'w-4',
  //         'h-4'
  //     ]
  // },
  content: {
    class: [
      // Spacing and Size
      'h-full',
      'w-full',

      // Growth and Overflow
      'grow',
      'overflow-y-auto',
    ],
  },
  mask: ({ props }) => ({
    class: [
      // Transitions
      'transition-all',
      'duration-300',
      { 'p-5': !props.position == 'full' },
      {
        '!justify-end': props.position == 'left',
        '!justify-start': props.position == 'right',
      },

      // Background and Effects
      { 'has-[.mask-active]:bg-transparent bg-[#25283969]': props.modal },
    ],
  }),
  transition: ({ props }) => {
    return props.position === 'top'
      ? {
          enterFromClass: 'translate-x-0 -translate-y-full translate-z-0 mask-active',
          leaveToClass: 'translate-x-0 -translate-y-full translate-z-0 mask-active',
        }
      : props.position === 'bottom'
        ? {
            enterFromClass: 'translate-x-0 translate-y-full translate-z-0 mask-active',
            leaveToClass: 'translate-x-0 translate-y-full translate-z-0 mask-active',
          }
        : props.position === 'left'
          ? {
              enterFromClass: '-translate-x-full translate-y-0 translate-z-0 mask-active',
              leaveToClass: '-translate-x-full translate-y-0 translate-z-0 mask-active',
            }
          : props.position === 'right'
            ? {
                enterFromClass: 'translate-x-full translate-y-0 translate-z-0 mask-active',
                leaveToClass: 'translate-x-full translate-y-0 translate-z-0 mask-active',
              }
            : {
                enterFromClass: 'opacity-0 mask-active',
                enterActiveClass: 'transition-opacity duration-400 ease-in',
                leaveActiveClass: 'transition-opacity duration-400 ease-in',
                leaveToClass: 'opacity-0 mask-active',
              }
  },
}
