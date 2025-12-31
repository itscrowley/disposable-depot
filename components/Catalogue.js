"use client";
import React, { useState, useEffect } from 'react';

// --- DATA ---
const localImages = {
  waterGlass: [
    "https://res.cloudinary.com/dxojtisjb/image/upload/v1767123874/glass_r2yqwe.jpg", 
    "https://res.cloudinary.com/dxojtisjb/image/upload/v1767124116/glass2_mwgoiq.jpg", 
    "https://res.cloudinary.com/dxojtisjb/image/upload/v1767124624/1000061763_vpbb6d.jpg"
  ],
  waterBottles: [
    "https://res.cloudinary.com/dxojtisjb/image/upload/v1767124584/1000061959-1_zm5waw.jpg",
    "https://res.cloudinary.com/dxojtisjb/image/upload/v1767124590/1000061764_hnfg1v.png",
    "https://res.cloudinary.com/dxojtisjb/image/upload/v1767124587/pngwing6438797669442483392_msydqb.jpg",
    "https://res.cloudinary.com/dxojtisjb/image/upload/v1767124582/1000061750_ddtktp.png"
  ],
  coffeeGlass: [
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061745-1.png",
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061754.png",
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061751.png",
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000079749.jpg"
  ],
  pingPongGlass: [
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061752.png",
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/pngwing.com_.png"
  ],
  disposablePlates: [
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061802.png",
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061804.png"
  ],
  roundPlate: [
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061934.jpg",
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061940.jpg"
  ],
  glassWithLid: [
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061944.jpg",
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061806.png",
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061896.jpg"
  ],
  plasticBowl: [
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061809.png",
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061899.jpg"
  ],
  foils: [
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061919.png",
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061917.jpg"
  ],
  napkins: [
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061920.jpg?w=400",
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061922.jpg"
  ],
  plasticSpoons: [
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061936.jpg",
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061931.jpg"
  ],
  softDrinks: [
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/pngwing.com-1.png",
    "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061756.png"
  ]
};

const getCategoryIcon = (category) => {
  const lower = category.toLowerCase();
  if (lower.includes('cup') || lower.includes('glass')) return '🥤';
  if (lower.includes('plate') || lower.includes('thali')) return '🍽️';
  if (lower.includes('bowl') || lower.includes('katori')) return '🥣';
  if (lower.includes('spoon') || lower.includes('fork')) return '🍴';
  if (lower.includes('napkin') || lower.includes('tissue')) return '🧻';
  if (lower.includes('foil') || lower.includes('wrap')) return '🌯';
  if (lower.includes('bottle') || lower.includes('drink')) return '🍾';
  if (lower === 'all') return '✨';
  return '📦';
};
// --- 🔥 CLOUDINARY HELPER FUNCTION 🔥 ---
// Ye function check karega agar link Cloudinary ka hai toh use optimize karega
const optimizeImage = (url, isLightbox = false) => {
  if (!url) return '/images/default.jpg';
  if (url.includes('cloudinary.com')) {
    const targetWidth = isLightbox ? 'w_1600' : 'w_800';
    // f_auto: best format (webp), q_auto: compression, w_1000: size control
    return url.replace('/upload/', `/upload/f_auto,q_auto:best,${targetWidth},dpr_auto/`);
  }
  return url;
};
export default function Catalogue() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrqOVzDxQxS_qLSscWFtMck9wLXOZOqON7dx58EWCRP2ZXhxfsT9_bgjEZ5PT5VbMbNrS3z84CLVbt/pub?gid=0&single=true&output=csv';

  useEffect(() => {
    fetch(SHEET_URL)
      .then((response) => response.text())
      .then((csvText) => {
        const rows = csvText.split('\n').slice(1);
        const products = rows.map((row) => {
          const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          if (columns.length < 2) return null;
          const clean = (text) => text ? text.replace(/^"|"$/g, '').trim() : '';
          const id = clean(columns[0]);
          const rawSheetImages = clean(columns[6]); 
          let sheetImagesArray = rawSheetImages ? rawSheetImages.split(',').map(l => l.trim()).filter(l => l) : ['/images/default.jpg'];
          const finalImages = localImages[id] ? localImages[id] : sheetImagesArray;
          return {
            id: id, title: clean(columns[1]), category: clean(columns[2]),
            desc: clean(columns[3]), tag: clean(columns[4]), alt: clean(columns[5]),
            images: finalImages
          };
        }).filter(item => item !== null && item.title);
        setItems(products);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...new Set(items.map(item => item.category).filter(Boolean))];
  const filteredItems = activeCategory === 'All' ? items : items.filter(item => item.category === activeCategory);

  const openGallery = (product) => {
    if (product.images.length > 0) {
      setCurrentProduct(product);
      setCurrentIndex(0);
      setLightboxOpen(true);
    }
  };
  const closeLightbox = () => setLightboxOpen(false);
  const nextImg = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % currentProduct.images.length); };
  const prevImg = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + currentProduct.images.length) % currentProduct.images.length); };

  // WhatsApp Link Helper
  const getWhatsAppLink = (product) => {
    const text = `Hi, I am interested in *${product.title}*.\n\nImage: ${product.images[0]}\n\nWhat is the wholesale price?`;
    const encodedText = encodeURIComponent(text);
    return `https://wa.me/919814812623?text=${encodedText}`;
  };

  return (
    <>
      <style jsx global>{`
        /* --- 🛡️ ROBUST CSS VARIABLES --- */
        :root {
          --cat-bg: #f8f9fa;
          --cat-title: #333333;
          --cat-sub: #666666;
          --card-bg: #ffffff;
          --card-border: #eeeeee;
          --card-shadow: rgba(0,0,0,0.05);
          --card-title: #222222;
          --card-desc: #666666;
          --btn-bg-inactive: #ffffff;
          --btn-text-inactive: #444444;
          --btn-border: #e0e0e0;
        }

        /* --- 🔥 PREMIUM DARK MODE (#0F172A) 🔥 --- */
        html.dark, body.dark, [data-theme='dark'], .dark-mode {
          --cat-bg: #0F172A !important;  
          --cat-title: #F8FAFC !important;
          --cat-sub: #94A3B8 !important;
          --card-bg: #1E293B !important; 
          --card-border: #334155 !important;
          --card-shadow: rgba(0,0,0,0.4) !important;
          --card-title: #F1F5F9 !important;
          --card-desc: #CBD5E1 !important;
          --btn-bg-inactive: #1E293B !important;
          --btn-text-inactive: #E2E8F0 !important;
          --btn-border: #475569 !important;
        }

        .catalogue-section {
          background-color: var(--cat-bg);
          padding: 50px 20px;
          transition: background-color 0.3s ease;
        }
        
        .main-title { color: var(--cat-title); }
        .sub-title { color: var(--cat-sub); }

        .modern-card {
          background-color: var(--card-bg);
          border: 1px solid var(--card-border);
          box-shadow: 0 4px 15px var(--card-shadow);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
        }

        .img-container {
          background-color: #ffffff;
          border-bottom: 1px solid var(--card-border);
          position: relative;
          height: 180px; /* Thoda chota kiya taaki mobile me 2 fit ho jaye */
          overflow: hidden;
          padding: 10px;
        }

        @media (min-width: 1024px) {
          .img-container { height: 220px; padding: 15px; }
        }

        .card-title { color: var(--card-title); }
        .card-desc { color: var(--card-desc); }

        .cat-btn-base {
          background-color: var(--btn-bg-inactive);
          color: var(--btn-text-inactive);
          border: 1px solid var(--btn-border);
        }

        .category-scroll::-webkit-scrollbar { display: none; }
        .category-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        /* --- 🔥 FIXED GRID SYSTEM 🔥 --- */
        
        /* DEFAULT (MOBILE): 2 ITEMS PER ROW */
        .catalogue-grid {
          display: grid;
          gap: 12px; /* Small gap for mobile */
          grid-template-columns: repeat(2, 1fr); /* Zabardasti 2 columns */
        }

        /* DESKTOP (Large Screens): 4 ITEMS PER ROW */
        @media (min-width: 1024px) {
          .catalogue-grid {
            gap: 30px;
            grid-template-columns: repeat(4, 1fr); /* Zabardasti 4 columns */
          }
        }
      `}</style>

      <section className="catalogue-section" id="catalogue">
        <div style={{textAlign: 'center', marginBottom: '30px'}}>
          <h2 className="main-title" style={{fontSize: '2rem', marginBottom: '10px'}}>Our Catalogue</h2>
          <p className="sub-title" style={{fontSize: '1rem'}}>Select a category to explore</p>
        </div>
        
        {loading && <div style={{textAlign: 'center', padding: '40px', color: '#e46338'}}>Loading products...</div>}

        {!loading && (
          <div style={{position: 'relative', zIndex: 100}}>
            <div className="category-scroll" style={{ display: 'flex', overflowX: 'auto', gap: '12px', padding: '10px 5px 20px 5px', marginBottom: '20px', whiteSpace: 'nowrap' }}>
              <div style={{display:'flex', gap:'12px', margin: '0 auto'}}> 
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={!isActive ? "cat-btn-base" : ""}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      background: isActive 
                        ? 'linear-gradient(135deg, #e46338 0%, #ff8e53 100%)' 
                        : undefined,
                      color: isActive ? '#fff' : undefined,
                      border: isActive ? 'none' : undefined,
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      boxShadow: isActive ? '0 4px 12px rgba(228, 99, 56, 0.3)' : 'none',
                      display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span style={{fontSize: '1.2rem'}}>{getCategoryIcon(cat)}</span> {cat}
                  </button>
                );
              })}
              </div>
            </div>
          </div>
        )}

        <div className="catalogue-grid">
          {!loading && filteredItems.map((product) => (
            <div 
              key={product.id} 
              className="modern-card"
              style={{
                borderColor: product.tag ? '#e46338' : undefined,
                borderWidth: product.tag ? '2px' : '1px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div className="img-container" onClick={() => openGallery(product)} style={{cursor:'pointer'}}>
                {product.tag && (
                  <span style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, backgroundColor: '#e46338', color: 'white', padding: '3px 10px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                    {product.tag}
                  </span>
                )}
                <img src={optimizeImage(product.images[0])} alt={product.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.5s ease' }} 
                     onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                     onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              <div style={{ padding: '15px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div onClick={() => openGallery(product)} style={{cursor:'pointer'}}>
                  <span style={{fontSize:'0.75rem', color:'#888', textTransform:'uppercase', letterSpacing:'0.5px', fontWeight:'600'}}>
                    {product.category}
                  </span>
                  {/* Title font size responsive */}
                  <h3 className="card-title" style={{ margin: '5px 0 5px 0', fontSize: '1.1rem', lineHeight: '1.3' }}>
                    {product.title}
                  </h3>
                  {/* Desc hide/show logic or smaller font for mobile could be here, but keeping simple */}
                  <p className="card-desc" style={{ fontSize: '0.85rem', marginBottom: '15px', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {product.desc}
                  </p>
                </div>

                <div style={{ marginTop: 'auto' }}>
                   <a href={getWhatsAppLink(product)} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%', padding: '10px',
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)', color: 'white', borderRadius: '50px',
                      textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem', boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)'
                    }}
                   >
                     <i className="fab fa-whatsapp" style={{fontSize:'1rem'}}></i> Ask Price
                   </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <div id="lightbox" className={lightboxOpen ? "active" : ""} style={{ display: lightboxOpen ? "flex" : "none" }} onClick={(e) => { if(e.target.id === 'lightbox' || e.target.classList.contains('lb-content')) closeLightbox() }}>
        <button id="close" onClick={closeLightbox}>&times;</button>
        <div className="lb-content">
          <button id="prev" className="nav-btn" onClick={prevImg}>&#10094;</button>
          {currentProduct && <img id="lightImg" src={optimizeImage(currentProduct.images[currentIndex], true)} alt={currentProduct.alt} />}
          <button id="next" className="nav-btn" onClick={nextImg}>&#10095;</button>
        </div>
      </div>
    </>
  );
}