import { defineConfig } from 'windicss/helpers';
import formsPlugin from 'windicss/plugin/forms';

export default defineConfig({
  darkMode: 'class',
  safelist: 'p-3 p-4 p-5',
  theme: {
    extend: {
      colors: {
        teal: {
          100: '#096',
        },
        primary: "#31c77f",
        'primary-dark': "#05966a",
      },
      backgroundColor: {
        primary: "#31c77f",
      },
      minHeight: {
        'view': '100vh',
      },
      
    },
  },
  plugins: [formsPlugin],
});
