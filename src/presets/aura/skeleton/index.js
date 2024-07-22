export default {
  root: ({ props }) => ({
    class: [
      'overflow-hidden',
      {
        'animate-pulse': props.animation !== 'none',
      },

      // Round
      { 'rounded-full': props.shape === 'circle', 'rounded-md': props.shape !== 'circle' },

      // Colors
      'bg-neutral-200',
    ],
  }),
}
