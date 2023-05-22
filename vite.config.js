import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import UnoCSS from 'unocss/vite'

import { wrapperEnv } from './src/util/wrapperEnv'
import { createProxy } from './src/util/proxy'

import { createVitePlugins } from './src/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  // 可以拿到定义好的环境变量了，可以使用process.env.xxx这种方式进行访问
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv

  return {
    plugins: createVitePlugins(viteEnv, isBuild),
    base: VITE_PUBLIC_PATH || '/',
    server: {
      host: '0.0.0.0',  // 默认为'127.0.0.1'，如果将此设置为 `0.0.0.0` 或者 `true` 将监听所有地址，包括局域网和公网地址
      port: VITE_PORT,  // 端口
      proxy: createProxy(VITE_PROXY), // 代理
    },
    resolve: {
      // 设置别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        //define global scss variable
        scss: {
          additionalData: `@import '@/styles/variables.scss';`,
        },
      },
    },
  }
})
