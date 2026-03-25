import '../src/index.css'
import type { Preview } from '@storybook/react-vite'

// Load Poppins font for Storybook
const link = document.createElement('link')
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap'
link.rel = 'stylesheet'
document.head.appendChild(link)

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;