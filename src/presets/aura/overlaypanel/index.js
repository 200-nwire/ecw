export default {
  root: {
    class: [
      // Shape
      '!rounded-md shadow-xl',

      // Position
      'absolute left-0 top-0 mt-2',
      'z-40 transform origin-center',

      // Color
      'bg-base-white',
      'text-primary',
    ],
  },
  content: {
    class: ['p-0 items-center flex', 'rounded-md'],
  },
  transition: {
    enterFromClass: 'opacity-0 scale-y-[0.8]',
    enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
    leaveActiveClass: 'transition-opacity duration-100 ease-linear',
    leaveToClass: 'opacity-0',
  },
}
