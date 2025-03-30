module.exports = {
    theme: {
      extend: {
        lineClamp: {
          2: '2',
        }
      }
    },
    plugins: [
      require('@tailwindcss/line-clamp'),
    ]
  }