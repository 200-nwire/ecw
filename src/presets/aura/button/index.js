export default {
  root: ({ props, context, parent }) => ({
    class: [
      'relative',

      // Alignments
      'items-center inline-flex text-center align-bottom justify-center',

      { 'gap-4': props.label != null },

      // Sizes & Spacing
      'leading-[normal]',
      {
        'px-7 py-2 min-w-[5.4rem]': props.size === 'xsmall' && props.label != null,
        'p-2': props.size === 'xsmall' && props.label == null,
        'px-7 py-4 min-w-[6rem]': props.size === 'small' && props.label != null,
        'p-3': props.size === 'small' && props.label == null,
        'px-7 py-5 min-w-[6.5rem]': props.size == null && props.label != null,
        'p-4': props.size == null && props.label == null,
        'px-7 py-6 min-w-[6.75rem]': props.size === 'large' && props.label != null,
        'p-5': props.size === 'large' && props.label == null,
      },

      // Shapes
      { 'shadow-sm': props.raised },

      {
        'rounded-sm': !props.rounded && props.size !== 'xsmall',
        'rounded-xs': !props.rounded && props.size === 'xsmall',
        'rounded-full': props.rounded,
      },

      // Plain button
      { 'bg-transparent': props.plain },
      { 'focus:ring-0': props.plain },

      // Text Button
      { 'bg-base-white border-white': props.text && !props.plain },

      // Outlined Button
      { 'bg-base-white border': props.outlined && !props.plain },

      // --- Severity Buttons ---

      // Primary Button
      {
        'text-inverted': !props.link && props.severity == null && !props.text && !props.outlined && !props.plain,
        'bg-primary': !props.link && props.severity == null && !props.text && !props.outlined && !props.plain,
        'border border-primary-500':
          !props.link && props.severity == null && !props.text && !props.outlined && !props.plain,
      },
      // Primary actions
      {
        'hover:bg-primary-hover hover:border-primary-hover':
          !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
      },
      {
        'focus:ring-primary-press focus:bg-primary-press focus:border-primary-press':
          props.severity === null && !props.outlined && !props.text,
      },

      // Primary Text Button
      { 'text-on-action': props.text && props.severity === null && !props.plain },
      // Primary text button actions
      {
        'hover:bg-primary-level-3 hover:border-primary-level-3':
          !props.link && props.severity === null && props.text && !props.outlined && !props.plain,
      },
      {
        'focus:ring-primary-level-4 focus:bg-primary-level-4 focus:border-primary-level-4':
          props.severity === null && props.text && !props.outlined,
      },

      // Primary Outlined Button
      {
        'text-on-action border border-primary':
          props.outlined && (props.severity === null || props.severity === 'primary') && !props.plain,
      },
      // Primary outlined button actions
      {
        'hover:bg-neutral-level-1 hover:border-primary':
          !props.link && props.severity === null && !props.text && props.outlined && !props.plain,
      },
      {
        'focus:ring-primary focus:bg-neutral-level-2 focus:border-primary':
          props.severity === null && !props.text && props.outlined,
      },

      // Light Button
      {
        'text-on-action': props.severity === 'light' && !props.text && !props.plain,
        'bg-primary-level-1': props.severity === 'light' && !props.text && !props.outlined && !props.plain,
        'border border-primary-level-1': props.severity === 'light' && !props.text && !props.outlined && !props.plain,
      },

      // Light
      {
        'text-on-action border hover:border-primary-level-3 hover:bg-primary-level-3':
          props.severity === 'light' && !props.text && !props.outlined && !props.plain,
      },
      {
        'focus:ring-primary-level-4 focus:bg-primary-level-4 focus:border-primary-level-4': props.severity === 'light',
      },

      // Neutral Button
      {
        'text-secondary': props.severity === 'neutral' && !props.text && !props.outlined && !props.plain,
        'bg-neutral-level-1': props.severity === 'neutral' && !props.text && !props.outlined && !props.plain,
        'border border-neutral-level-1': props.severity === 'neutral' && !props.text && !props.outlined && !props.plain,
      },
      // Neutral Actions
      {
        'hover:bg-neutral-level-2 hover:border-neutral-level-2':
          props.severity === 'neutral' && !props.text && !props.outlined && !props.plain,
      },
      {
        'focus:ring-neutral-level-3 focus:bg-neutral-level-3 focus:border-neutral-level-3':
          props.severity === 'neutral' && !props.outlined && !props.text,
      },

      // Neutral Outlined Button
      {
        'text-secondary border border-light hover:bg-neutral-level-1':
          props.outlined && props.severity === 'neutral' && !props.plain,
      },
      {
        'focus:ring-light focus:bg-neutral-level-2 focus:border-neutral-level-2':
          props.severity === 'neutral' && props.outlined && !props.text,
      },

      // Neutral text Button
      {
        'text-black hover:bg-neutral-level-4':
          props.text && !props.outlined && props.severity === 'neutral' && !props.plain,
      },
      {
        'focus:ring-neutral-level-4 focus:bg-neutral-level-4':
          props.text && !props.outlined && props.severity === 'neutral' && !props.plain,
      },

      // --- Severity Button States ---
      'focus:outline-none focus:outline-offset-0 focus:ring-1',

      // Plain
      { 'hover:bg-grey-600 hover:border-grey-600': props.plain && !props.outlined && !props.text },
      // Text & Outlined Button
      { 'hover:bg-surface-300/10': props.plain && (props.text || props.outlined) },

      // Text & Outlined Button
      { 'hover:bg-primary-300/10': (props.text || props.outlined) && props.severity === null && !props.plain },

      // Text & Outlined Button
      { 'hover:bg-surface-300/10': (props.text || props.outlined) && props.severity === 'neutral' && !props.plain },

      // Disabled
      { 'opacity-60 pointer-events-none cursor-default': context.disabled },

      // Transitions
      'transition duration-200 ease-in-out',

      // Misc
      'cursor-pointer overflow-hidden select-none',
    ],
  }),
  label: ({ props }) => ({
    class: [
      'duration-200',
      { 'text-body-1-semi': props.size !== 'xsmall' },
      { 'text-body-1': props.size === 'xsmall' },
      {
        'hover:underline': props.link,
      },
      { 'flex-1': props.label !== null, 'invisible w-0': props.label == null },
    ],
  }),
  icon: ({ props }) => ({
    class: [
      'mx-0',
      {
        'ml-4': props.iconPos == 'right' && props.label != null,
        'mr-4 order-1': props.iconPos == 'left' && props.label != null,
        'mb-4': props.iconPos == 'top' && props.label != null,
        'mt-4': props.iconPos == 'bottom' && props.label != null,
      },
    ],
  }),
  loadingicon: ({ props }) => ({
    class: [
      'h-4 w-4',
      'mx-0',
      {
        'mr-2': props.iconPos == 'left' && props.label != null,
        'ml-2 order-1': props.iconPos == 'right' && props.label != null,
        'mb-2': props.iconPos == 'top' && props.label != null,
        'mt-2': props.iconPos == 'bottom' && props.label != null,
      },
      'animate-spin',
    ],
  }),
  badge: ({ props }) => ({
    class: [{ 'ml-2 w-4 h-4 leading-none flex items-center justify-center': props.badge }],
  }),
}

// { 'rounded-none first:rounded-l-md last:rounded-r-md': parent.instance.$name == 'InputGroup' },

// // Link
// { 'focus:ring-primary': props.link },

// // Success Button
// {
//     'text-white': props.severity === 'success' && !props.text && !props.outlined && !props.plain,
//     'bg-green-500 dark:bg-green-400': props.severity === 'success' && !props.text && !props.outlined && !props.plain,
//     'border border-green-500 dark:border-green-400': props.severity === 'success' && !props.text && !props.outlined && !props.plain
// },
// // Success Text Button
// { 'text-green-500': props.text && props.severity === 'success' && !props.plain },
// // Success Outlined Button
// { 'text-green-500 border border-green-500 hover:bg-green-300/10': props.outlined && props.severity === 'success' && !props.plain },

// // Info Button
// {
//     'text-white dark:text-surface-900': props.severity === 'info' && !props.text && !props.outlined && !props.plain,
//     'bg-blue-500 dark:bg-blue-400': props.severity === 'info' && !props.text && !props.outlined && !props.plain,
//     'border border-blue-500 dark:border-blue-400': props.severity === 'info' && !props.text && !props.outlined && !props.plain
// },
// // Info Text Button
// { 'text-blue-500 dark:text-blue-400': props.text && props.severity === 'info' && !props.plain },
// // Info Outlined Button
// { 'text-blue-500 border border-blue-500 hover:bg-blue-300/10 ': props.outlined && props.severity === 'info' && !props.plain },

// // Warning Button
// {
//     'text-white dark:text-surface-900': props.severity === 'warning' && !props.text && !props.outlined && !props.plain,
//     'bg-orange-500 dark:bg-orange-400': props.severity === 'warning' && !props.text && !props.outlined && !props.plain,
//     'border border-orange-500 dark:border-orange-400': props.severity === 'warning' && !props.text && !props.outlined && !props.plain
// },
// // Warning Text Button
// { 'text-orange-500 dark:text-orange-400': props.text && props.severity === 'warning' && !props.plain },
// // Warning Outlined Button
// { 'text-orange-500 border border-orange-500 hover:bg-orange-300/10': props.outlined && props.severity === 'warning' && !props.plain },

// // Help Button
// {
//     'text-white dark:text-surface-900': props.severity === 'help' && !props.text && !props.outlined && !props.plain,
//     'bg-purple-500 dark:bg-purple-400': props.severity === 'help' && !props.text && !props.outlined && !props.plain,
//     'border border-purple-500 dark:border-purple-400': props.severity === 'help' && !props.text && !props.outlined && !props.plain
// },
// // Help Text Button
// { 'text-purple-500 dark:text-purple-400': props.text && props.severity === 'help' && !props.plain },
// // Help Outlined Button
// { 'text-purple-500 border border-purple-500 hover:bg-purple-300/10': props.outlined && props.severity === 'help' && !props.plain },

// // Danger Button
// {
//     'text-white dark:text-surface-900': props.severity === 'danger' && !props.text && !props.outlined && !props.plain,
//     'bg-red-500 dark:bg-red-400': props.severity === 'danger' && !props.text && !props.outlined && !props.plain,
//     'border border-red-500 dark:border-red-400': props.severity === 'danger' && !props.text && !props.outlined && !props.plain
// },
// // Danger Text Button
// { 'text-red-500 dark:text-red-400': props.text && props.severity === 'danger' && !props.plain },
// // Danger Outlined Button
// { 'text-red-500 border border-red-500 hover:bg-red-300/10': props.outlined && props.severity === 'danger' && !props.plain },

// // Contrast Button
// {
//     'text-white dark:text-surface-900': props.severity === 'contrast' && !props.text && !props.outlined && !props.plain,
//     'bg-surface-900 dark:bg-surface-0': props.severity === 'contrast' && !props.text && !props.outlined && !props.plain,
//     'border border-surface-900 dark:border-surface-0': props.severity === 'contrast' && !props.text && !props.outlined && !props.plain
// },
// // Contrast Text Button
// { 'text-surface-900 dark:text-surface-0': props.text && props.severity === 'contrast' && !props.plain },
// // Contrast Outlined Button
// { 'text-surface-900 dark:text-surface-0 border border-surface-900 dark:border-surface-0': props.outlined && props.severity === 'contrast' && !props.plain },

// // Success
// { 'hover:bg-green-600 dark:hover:bg-green-300 hover:border-green-600 dark:hover:border-green-300': props.severity === 'success' && !props.text && !props.outlined && !props.plain },
// { 'focus:ring-green-500 dark:focus:ring-green-400': props.severity === 'success' },
// // Text & Outlined Button
// { 'hover:bg-green-300/10': (props.text || props.outlined) && props.severity === 'success' && !props.plain },

// // Info
// { 'hover:bg-blue-600 dark:hover:bg-blue-300 hover:border-blue-600 dark:hover:border-blue-300': props.severity === 'info' && !props.text && !props.outlined && !props.plain },
// { 'focus:ring-blue-500 dark:focus:ring-blue-400': props.severity === 'info' },
// // Text & Outlined Button
// { 'hover:bg-blue-300/10': (props.text || props.outlined) && props.severity === 'info' && !props.plain },

// // Warning
// { 'hover:bg-orange-600 dark:hover:bg-orange-300 hover:border-orange-600 dark:hover:border-orange-300': props.severity === 'warning' && !props.text && !props.outlined && !props.plain },
// { 'focus:ring-orange-500 dark:focus:ring-orange-400': props.severity === 'warning' },
// // Text & Outlined Button
// { 'hover:bg-orange-300/10': (props.text || props.outlined) && props.severity === 'warning' && !props.plain },

// // Help
// { 'hover:bg-purple-600 dark:hover:bg-purple-300 hover:border-purple-600 dark:hover:border-purple-300': props.severity === 'help' && !props.text && !props.outlined && !props.plain },
// { 'focus:ring-purple-500 dark:focus:ring-purple-400': props.severity === 'help' },
// // Text & Outlined Button
// { 'hover:bg-purple-300/10': (props.text || props.outlined) && props.severity === 'help' && !props.plain },

// // Danger
// { 'hover:bg-red-600 dark:hover:bg-red-300 hover:border-red-600 dark:hover:border-red-300': props.severity === 'danger' && !props.text && !props.outlined && !props.plain },
// { 'focus:ring-red-500 dark:focus:ring-red-400': props.severity === 'danger' },
// // Text & Outlined Button
// { 'hover:bg-red-300/10': (props.text || props.outlined) && props.severity === 'danger' && !props.plain },

// // Contrast
// { 'hover:bg-surface-800 dark:hover:bg-surface-100 hover:border-surface-800 dark:hover:border-surface-100': props.severity === 'contrast' && !props.text && !props.outlined && !props.plain },
// { 'focus:ring-surface-500 dark:focus:ring-surface-400': props.severity === 'contrast' },
// // Text & Outlined Button
// { 'hover:bg-surface-900/10 dark:hover:bg-[rgba(255,255,255,0.03)]': (props.text || props.outlined) && props.severity === 'contrast' && !props.plain },
