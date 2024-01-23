import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(() => {
  return {
    plugins: [react(), basicSsl()],
    resolve: {
      alias: [
        { find: /^~/, replacement: '' }, // 处理less ～引入
        { find: '@', replacement: path.resolve(__dirname) },
        { find: '@src', replacement: path.resolve(__dirname, 'src/') },
      ],
    },
    server: {
      open: true,
      port: 3000,
      strictPort: true,
      https: true,
      host: `local.zhenguanyu.com`,
      proxy: {
        '/conan-config/api': {
          target: `https://ytkconan-sg.zhenguanyu.com`,
          changeOrigin: true,
        },
        '^.*api': {
          target: `https://conan.zhenguanyu.com`,
          changeOrigin: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };
});
