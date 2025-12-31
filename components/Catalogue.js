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

// --- AAPKE ORIGINAL EMOJIS ---
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

const optimizeImage = (url, isLightbox = false) => {
  if (!url) return '/images/default.jpg';
  if (url.includes('cloudinary.com')) {
    const targetWidth = isLightbox ? 'w_1600' : 'w_800';
    return url.replace('/upload/', `/upload/f_auto,q_auto:best,${targetWidth},dpr_auto/`);
  }
  return url;
};

export default function Catalogue() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrqOVzDxQxS_qLSscWFtMck9wLXOZOqON7dx58EWCRP2ZXhxfsT9_bgjEZ5PT5VbMbNrS3z84CLVbt/pub?gid=0&single=true&output=csv';

  useEffect(() => {
    const timestamp = new Date().getTime();
    fetch(`${SHEET_URL}&t=${timestamp}`, { 
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })
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

          // --- STOCK QUANTITY & UNIT LOGIC ---
          const stockQty = parseInt(clean(columns[13])) || 0; // Col N
          const lowLimit = parseInt(clean(columns[14])) || 0; // Col O
          const unit = clean(columns[15]) || '';              // Col P

          return {
            id: id, 
            title: clean(columns[1]), 
            category: clean(columns[2]),
            desc: clean(columns[3]), 
            tag: clean(columns[4]), 
            alt: clean(columns[5]),
            images: finalImages,
            btnText: clean(columns[7]) || 'Ask Price',
            isAvailable: clean(columns[8]).toLowerCase() !== 'out of stock',
            price: clean(columns[9]),
            specialBadge: clean(columns[10]),
            keywords: clean(columns[11]),
            stockQty: stockQty,
            unit: unit.toUpperCase(), // Unit added here
            isLowStock: stockQty > 0 && stockQty <= lowLimit
          };
        }).filter(item => item !== null && item.title);
        setItems(products);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...new Set(items.map(item => item.category).filter(Boolean))];

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.keywords && item.keywords.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const suggestions = searchQuery.length > 1 
    ? items.filter(i => i.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const openGallery = (product) => {
    if (product.isAvailable && product.images.length > 0) {
      setCurrentProduct(product);
      setCurrentIndex(0);
      setLightboxOpen(true);
    }
  };
  const closeLightbox = () => setLightboxOpen(false);
  const nextImg = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % currentProduct.images.length); };
  const prevImg = (e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + currentProduct.images.length) % currentProduct.images.length); };

  const getWhatsAppLink = (product) => {
    const text = `Hi, I am interested in *${product.title}*.\n\nImage: ${product.images[0]}\n\nWhat is the wholesale price?`;
    const encodedText = encodeURIComponent(text);
    return `https://wa.me/919814812623?text=${encodedText}`;
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --cat-bg: #f8f9fa; --cat-title: #333333; --cat-sub: #666666;
          --card-bg: #ffffff; --card-border: #eeeeee; --card-shadow: rgba(0,0,0,0.05);
          --card-title: #222222; --card-desc: #666666; --btn-bg-inactive: #ffffff;
          --btn-text-inactive: #444444; --btn-border: #e0e0e0;
        }

        html.dark, body.dark, [data-theme='dark'], .dark-mode {
          --cat-bg: #0F172A !important; --cat-title: #F8FAFC !important;
          --cat-sub: #94A3B8 !important; --card-bg: #1E293B !important; 
          --card-border: #334155 !important; --card-shadow: rgba(0,0,0,0.4) !important;
          --card-title: #F1F5F9 !important; --card-desc: #CBD5E1 !important;
          --btn-bg-inactive: #1E293B !important; --btn-text-inactive: #E2E8F0 !important;
          --btn-border: #475569 !important;
        }

        .catalogue-section { background-color: var(--cat-bg); padding: 50px 20px; transition: background-color 0.3s ease; }
        .search-container { width: 100%; max-width: 500px; margin: 0 auto 30px auto; position: relative; }
        .search-input { width: 100%; padding: 12px 25px; border-radius: 50px; border: 2px solid var(--card-border); background: var(--card-bg); color: var(--card-title); outline: none; }
        .search-input:focus { border-color: #e46338; }
        
        .suggestions-list { position: absolute; top: 100%; left: 0; width: 100%; background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 15px; z-index: 200; box-shadow: 0 10px 20px rgba(0,0,0,0.1); list-style: none; padding: 10px 0; margin-top: 5px; }
        .suggestion-item { padding: 10px 20px; cursor: pointer; color: var(--card-title); }
        .suggestion-item:hover { background: #f0f0f0; }

        .modern-card { background-color: var(--card-bg); border: 1px solid var(--card-border); box-shadow: 0 4px 15px var(--card-shadow); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.3s ease; }
        .img-container { background-color: #ffffff; border-bottom: 1px solid var(--card-border); position: relative; height: 180px; overflow: hidden; padding: 10px; }
        .special-badge { position: absolute; top: 10px; right: 10px; background: #22c55e; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; z-index: 10; }
        .price-val { font-size: 1.2rem; font-weight: 800; color: #e46338; margin: 5px 0; }

        /* --- BLINKING LOW STOCK CSS --- */
        .low-stock-warning {
          background: #fff3cd; color: #856404; padding: 4px 10px; border-radius: 6px;
          font-size: 0.75rem; font-weight: 800; border: 1px solid #ffeeba;
          margin-bottom: 10px; display: inline-block;
          animation: blinker 1.5s linear infinite;
        }
        @keyframes blinker { 50% { opacity: 0.4; } }

        .out-of-stock-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255, 255, 255, 0.7); display: flex; align-items: center; justify-content: center; z-index: 10; color: #cc0000; font-weight: 800; font-size: 1.1rem; }
        @media (min-width: 1024px) { .img-container { height: 220px; padding: 15px; } }
        .catalogue-grid { display: grid; gap: 12px; grid-template-columns: repeat(2, 1fr); }
        @media (min-width: 1024px) { .catalogue-grid { gap: 30px; grid-template-columns: repeat(4, 1fr); } }
      `}</style>

      <section className="catalogue-section" id="catalogue">
        <div style={{textAlign: 'center', marginBottom: '30px'}}>
          <h2 className="main-title" style={{fontSize: '2rem', marginBottom: '10px'}}>Our Catalogue</h2>
        </div>

        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search for coffee cups, bowls or plates..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value); setShowSuggestions(true);}}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map(s => (
                <li key={s.id} className="suggestion-item" onClick={() => {setSearchQuery(s.title); setShowSuggestions(false);}}>
                  {s.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {!loading && (
          <div className="category-scroll" style={{ display: 'flex', overflowX: 'auto', gap: '12px', padding: '10px 5px 20px 5px', marginBottom: '20px' }}>
            <div style={{display:'flex', gap:'12px', margin: '0 auto'}}> 
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 24px', borderRadius: '50px', cursor: 'pointer',
                  background: activeCategory === cat ? 'linear-gradient(135deg, #e46338 0%, #ff8e53 100%)' : 'var(--card-bg)',
                  color: activeCategory === cat ? '#fff' : 'var(--card-title)',
                  border: activeCategory === cat ? 'none' : '1px solid var(--card-border)',
                  fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, transition: 'all 0.3s ease'
                }}
              >
                <span>{getCategoryIcon(cat)}</span> {cat}
              </button>
            ))}
            </div>
          </div>
        )}

        <div className="catalogue-grid">
          {!loading && filteredItems.map((product) => (
            <div key={product.id} className="modern-card" style={{ opacity: product.isAvailable ? 1 : 0.8 }}>
              <div className="img-container" onClick={() => product.isAvailable && openGallery(product)} style={{cursor: product.isAvailable ? 'pointer' : 'default'}}>
                {product.specialBadge && <span className="special-badge">{product.specialBadge}</span>}
                {!product.isAvailable && <div className="out-of-stock-overlay">OUT OF STOCK</div>}
                {product.tag && (
                  <span style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 11, backgroundColor: '#e46338', color: 'white', padding: '3px 10px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 'bold' }}>
                    {product.tag}
                  </span>
                )}
                <img src={optimizeImage(product.images[0])} alt={product.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>

              <div style={{ padding: '15px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{fontSize:'0.75rem', color:'#888', fontWeight:'600'}}>{product.category}</span>
                <h3 className="card-title" style={{ margin: '5px 0', fontSize: '1.1rem' }}>{product.title}</h3>
                
                {/* --- SCRARCITY BADGE --- */}
                {product.isLowStock && product.isAvailable && (
                  <div className="low-stock-warning">
                    ⚠️ ONLY {product.stockQty} {product.unit} LEFT!
                  </div>
                )}

                {product.price && <div className="price-val">₹{product.price}</div>}

                <p className="card-desc" style={{ fontSize: '0.85rem', marginBottom: '15px' }}>{product.desc}</p>

                <div style={{ marginTop: 'auto' }}>
                   <a href={product.isAvailable ? getWhatsAppLink(product) : "#"} target={product.isAvailable ? "_blank" : "_self"}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%', padding: '10px',
                      background: product.isAvailable ? 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' : '#cccccc', 
                      color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontSize: '0.85rem',
                      pointerEvents: product.isAvailable ? 'auto' : 'none'
                    }}
                   >
                     <i className="fab fa-whatsapp"></i> {product.isAvailable ? product.btnText : "Sold Out"}
                   </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox remain same */}
      <div id="lightbox" className={lightboxOpen ? "active" : ""} style={{ display: lightboxOpen ? "flex" : "none" }} onClick={closeLightbox}>
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