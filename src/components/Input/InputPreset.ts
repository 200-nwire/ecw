export type InputStyle = 'offwhite' | 'white' | 'neutral' | undefined

export const preset = style => ({
  root: ({ props, context, parent }) => ({
    class: [
      // background
      {
        '!bg-base-white': style === 'white',
        '!bg-base-offwhite': style === 'offwhite',
        '!bg-neutral-level-1': style === 'neutral',
      },

      // border
      {
        '!border-light': style === 'white' && !props.invalid,
        '!border-neutral-level-4': style === 'offwhite' && !props.invalid,
        '!border-neutral-level-2': style === 'neutral' && !props.invalid,
      },
    ],
  }),
})
