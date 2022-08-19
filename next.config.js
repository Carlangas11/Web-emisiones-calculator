const ContentSecurityPolicy = `default-src 'none'; script-src 'self'; connect-src 'self'; img-src 'self'; style-src 'self';font-src 'self';`

module.exports = {
  poweredByHeader: false,
  images: {
    domains: ['i.imgur.com', 'www.google.com', 'imgur.com']
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    })

    return config
  },

  webpackDevMiddleware: config => config,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
          // {
          //   key: 'Content-Security-Policy',
          //   value: ContentSecurityPolicy,
          // },
          // {
          //   key: 'Permissions-Policy',
          //   value: `camera=(); battery=(self); geolocation=*; microphone=()`,
          // },
        ]
      }
    ]
  }
}
