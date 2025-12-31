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
export const metadata = {
  // 1. Google ko explicit Site Name batana zaroori hai
  applicationName: 'The Disposable Depot', // <--- YE ADD KARO (Bohot Zaroori)
  
  title: {
    default: 'The Disposable Depot | Best Disposable & Packaged Water Supplier in Jalandhar',
    template: '%s | The Disposable Depot',
  },
  description: 'The Disposable Depot is your one-stop shop for wholesale disposable items, eco-friendly plates, cups, packaged water and cold drinks in Jalandhar.',
  keywords: ['disposable items', 'bulk disposable items', 'packaging water cups', 'wholesale paper cups', 'The Disposable Depot', 'disposle water supplier Jalandhar', 'disposal glass', 'eco-friendly disposable plates', 'wholesale disposable cups', 'packaged water Jalandhar', 'disposable plates near me', 'disposable cups near me', 'disposable supplier Jalandhar', 'disposable water glass near me'],
  
  // 2. OpenGraph tags bhi add karo, ye social media aur Google dono dekhte hain
  openGraph: {
    title: 'The Disposable Depot',
    description: 'Wholesale supplier of disposable items in Jalandhar.',
    siteName: 'The Disposable Depot', // <--- YE BHI ZAROORI HAI
    type: 'website',
    locale: 'en_IN',
  },

  verification: {
    google: 'jzmkX4222t9LnPQYRo_K7EeSPY5R6wLC8WXsNRyR3m4',
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
    'image': 'https://thedisposabledepot.vercel.app/logo.png', // Agar logo ka URL hai to yahan dalein
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
    'url': 'https://thedisposabledepot.vercel.app',
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
    'alternateName': 'The Disposable Depot Jalandhar',
    'url': 'https://thedisposabledepot.vercel.app/',
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
