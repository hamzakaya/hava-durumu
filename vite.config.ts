import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import svgLoader from "vite-plugin-react-svg";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    svgLoader({
      svgoConfig: {
        multipass: true,
      },
    }),
  ],
});
