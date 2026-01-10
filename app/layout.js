import { Inter } from 'next/font/google';
import './globals.css';
// Footer import kar rahe hain (path dhyan se dekhein)
import Footer from '../components/Footer'; 
import BackToTop from '../components/BackToTop';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});
export const viewport = {
  themeColor: '#ffffff', // Aapka brand orange color
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Zoom rokne ke liye
};
export const metadata = {
  metadataBase: new URL('https://www.thedisposabledepot.in'), 
  manifest: '/manifest.json', // 🔥 PWA connection added
  alternates: {
    canonical: 'https://www.thedisposabledepot.in', // Ye automatically har page ka sahi canonical bana dega
  },
  // 1. Google ko explicit Site Name batana zaroori hai
  applicationName: 'The Disposable Depot', // <--- YE ADD KARO (Bohot Zaroori)
  

  // --- 🔥 LOGO FIX ---
  icons: {
    icon: '/logo.png',       // Google yahan se favicon uthayega
    apple: '/logo.png',      // Apple devices ke liye
    shortcut: '/logo.png',
  },
  title: {
    default: 'The Disposable Depot | Disposables & Water Jalandhar',
    template: '%s | The Disposable Depot',
  },
  description: 'The Disposable Depot is your one-stop shop for wholesale disposable items, eco-friendly plates, cups, packaged water and cold drinks in Jalandhar.',
  keywords: ['disposable items', 'bulk disposable items', 'packaging water cups', 'wholesale paper cups', 'The Disposable Depot', 'disposle water supplier Jalandhar', 'disposal glass', 'eco-friendly disposable plates', 'wholesale disposable cups', 'packaged water Jalandhar', 'disposable plates near me', 'disposable cups near me', 'disposable supplier Jalandhar', 'disposable water glass near me', 'kala sanghian road disposable items', 'wholesale disposable supplier Jalandhar', 'kala sangha road disposable items', 'kanshi nagar disposable items', 'kot sadiq disposable items', 'dhaliwal disposable items', 'kotla disposable items', 'offers on disposable items'],
  
  // 2. OpenGraph tags bhi add karo, ye social media aur Google dono dekhte hain
  openGraph: {
    title: 'The Disposable Depot',
    description: 'Wholesale supplier of disposable items in Jalandhar.',
    siteName: 'The Disposable Depot', // <--- YE BHI ZAROORI HAI
    type: 'website',
    locale: 'en_IN',
  },

  verification: {
    google: '0FXzGslm68PUTKUEvhhH2jiFeHAj5lP8uqCa7meTYKg', // Apna Google Search Console verification code yahan dalein
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({ children }) {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'WholesaleStore', // Google ko batayega ye Wholesale ki dukaan hai
    'name': 'The Disposable Depot',
    'image': 'https://www.thedisposabledepot.in/logo.png', // Agar logo ka URL hai to yahan dalein
    'description': 'Wholesale supplier of disposable items, paper plates, paper cups, and packaged water in Jalandhar.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'The Disposable Depot, Kot Sadiq, Kala Sanghian Road, Jalandhar, Punjab 144002, India', // EDIT HERE
      'addressLocality': 'Jalandhar',
      'addressRegion': 'Punjab',
      'postalCode': '144002', // Apna Pincode check karke dalein
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '31.306516', // Jalandhar ka latitude (Apni shop ka exact map se lein)
      'longitude': '75.536728' // Jalandhar ka longitude
    },
    'url': 'https://www.thedisposabledepot.in',
    'sameAs': [
       // Apna Google Maps ka link yahan dalein (Share button se copy karke)
       'https://maps.app.goo.gl/PSboiThYn5pDE8rc6', 
       // Agar Facebook/Insta hai to wo bhi yahan dal sakte hain
       'https://www.instagram.com/the_disposable_depot',
        'https://www.facebook.com/TheDisposableDepot'
    ],
    'telephone': '+91-9814812623', // Apna Mobile Number Yahan Dalein // EDIT HERE
    'priceRange': '₹₹',
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '09:00',
        'closes': '20:00'
      }
    ]
  };
  // 3. Ye naya 'WebSite' schema hai jo specifically Site Name fix karne ke liye hota hai
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'The Disposable Depot',
    'alternateName': ['TDD', 'The Disposable Depot Jalandhar'],
    'url': 'https://www.thedisposabledepot.in/',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://www.thedisposabledepot.in/?s={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Icons ke liye FontAwesome Link */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
        
      </head>
      <body className={inter.className}>
        {/* Ye script Google Bot ke liye hai (User ko nahi dikhegi) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
          />
          <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
        
        {/* Footer yahan lagaya */}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
