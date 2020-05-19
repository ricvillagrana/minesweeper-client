
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/axios.js', ssr: false },
    { src: '~/plugins/sweet-modal-vue', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3000/api/v1'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  generate: {
    fallback: true
  },
  purgeCSS: {
    enabled: true,
    content: [
      './pages/**/*.vue',
      './components/**/*.vue',
      './layouts/**/*.vue',
      './node_modules/sweet-modal-vue/src/**/*.vue'
    ],
    options: {
      whitelist: () =>  [
        'w-8',
        'h-8',
        'sweet-box-actions',
        'sweet-action-close',
        'sweet-content',
        'sweet-modal-overlay',
        'sweet-modal',
        'sweet-content-content',
        'bg-teal-700',
        'bg-teal-500'
      ],
      whitelistPatterns: [
        /sweet-/,
        /w-/,
        /bg-/,
        /text-/
      ]
    }
  }
}
