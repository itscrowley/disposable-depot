export default function manifest() {
  return {
    name: 'The Disposable Depot',
    short_name: 'TDD',
    description: 'Wholesale supplier of disposable items & packaged water in Jalandhar.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/logo.png',
        sizes: '48x48',
        type: 'image/png',
      },
    ],
  }
}