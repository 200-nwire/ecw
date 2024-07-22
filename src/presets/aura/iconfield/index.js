export default {
  root: ({ props }) => ({
    class: [
      'relative',
      '[&>input]:w-full',

      '[&>*:first-child]:absolute',
      '[&>*:first-child]:flex',
      '[&>*:first-child]:justify-center',
      '[&>*:first-child]:items-center',
      '[&>*:first-child]:h-full',
      '[&>*:first-child]:leading-none',
      '[&>*:first-child]:text-neutral-400',
      {
        '[&>*:first-child]:right-6': props.iconPosition === 'right',
        '[&>*:first-child]:left-6': props.iconPosition === 'left',
      },
      {
        '[&>*:last-child]:pr-11': props.iconPosition === 'right',
        '[&>*:last-child]:pl-11': props.iconPosition === 'left',
      },
    ],
  }),
}
