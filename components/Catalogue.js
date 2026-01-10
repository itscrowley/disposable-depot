"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';

// --- HELPERS (Unchanged) ---
const getCategoryIcon = (category) => {
  const lower = category ? category.toLowerCase() : '';
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

const getWhatsAppLink = (product) => {
  const text = `Hi, I am interested in *${product.title}*.\n\nImage: ${product.images[0]}\n\nWhat is the wholesale price?`;
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/919814812623?text=${encodedText}`;
};

const optimizeImage = (url, isLightbox = false) => {
  if (!url) return '/images/default.jpg';
  if (!url.includes('cloudinary.com')) return url;
  const parts = url.split('/upload/');
  if (parts.length !== 2) return url;
  let params;
  if (isLightbox) {
    params = 'f_auto,q_auto:best,w_1600,e_sharpen:50,e_trim';
  } else {
    params = 'f_auto,q_auto:best,w_800,h_800,c_pad,b_white,e_trim';
  }
  return `${parts[0]}/upload/${params}/${parts[1]}`;
};

export default function Catalogue() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubCategory, setActiveSubCategory] = useState('All');

  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Swipe States for Lightbox
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrqOVzDxQxS_qLSscWFtMck9wLXOZOqON7dx58EWCRP2ZXhxfsT9_bgjEZ5PT5VbMbNrS3z84CLVbt/pub?gid=0&single=true&output=csv';

  useEffect(() => {
    const timestamp = new Date().getTime();
    fetch(`${SHEET_URL}&t=${timestamp}`, { 
      cache: 'no-store',
      headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
    })
      .then((response) => response.text())
      .then((csvText) => {
        const rows = csvText.split('\n').slice(1);
        const products = rows.map((row) => {
          const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          if (columns.length < 2) return null;
          
          const clean = (text) => text ? text.replace(/^"|"$/g, '').trim() : '';
          
          const id = clean(columns[0]);           
          const title = clean(columns[1]);        
          const category = clean(columns[2]);     
          const subCategory = clean(columns[3]);  

          const desc = clean(columns[4]);         
          const tag = clean(columns[5]);          
          const alt = clean(columns[6]);          
          
          const rawSheetImages = clean(columns[7]); 
          let sheetImagesArray = rawSheetImages 
            ? rawSheetImages.split(',').map(l => l.trim()).filter(l => l.length > 0) 
            : ['/images/default.jpg'];

          const btnText = clean(columns[8]) || 'Ask Price';     
          const isAvailable = clean(columns[9]).toLowerCase() !== 'out of stock'; 
          const price = clean(columns[10]);       
          const specialBadge = clean(columns[11]);
          const keywords = clean(columns[12]);    
          
          const stockQty = parseInt(clean(columns[14])) || 0; 
          const lowLimit = parseInt(clean(columns[15])) || 0; 
          const unit = clean(columns[16]) || '';              

          return {
            id, title, category, subCategory, 
            desc, tag, alt,
            images: sheetImagesArray,
            btnText, isAvailable, price, specialBadge, keywords,
            stockQty,
            unit: unit.toUpperCase(),
            isLowStock: stockQty > 0 && stockQty <= lowLimit
          };
        }).filter(item => item !== null && item.title);
        
        setItems(products);
        setLoading(false);
      });
  }, []);

  const subCategoriesMap = useMemo(() => {
    const map = {};
    items.forEach(item => {
      if (item.category && item.subCategory) {
        if (!map[item.category]) {
          map[item.category] = new Set(); 
        }
        map[item.category].add(item.subCategory);
      }
    });

    const finalMap = {};
    Object.keys(map).forEach(cat => {
      finalMap[cat] = Array.from(map[cat]); 
    });
    return finalMap;
  }, [items]); 

  const categories = ['All', ...new Set(items.map(item => item.category).filter(Boolean))];

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSubCategory = activeSubCategory === 'All' || 
                               (item.subCategory && item.subCategory.toLowerCase() === activeSubCategory.toLowerCase());
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.keywords && item.keywords.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setActiveSubCategory('All'); 
  };

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
  
  // Navigation
  const nextImg = (e) => { 
    if(e) e.stopPropagation(); 
    setCurrentIndex((prev) => (prev + 1) % currentProduct.images.length); 
  };
  const prevImg = (e) => { 
    if(e) e.stopPropagation(); 
    setCurrentIndex((prev) => (prev - 1 + currentProduct.images.length) % currentProduct.images.length); 
  };

  // 🔥 SWIPE LOGIC FOR LIGHTBOX ONLY
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextImg(); // Next
    if (isRightSwipe) prevImg(); // Prev
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
        .search-input { width: 100%; padding: 12px 45px 12px 45px; border-radius: 50px; border: 2px solid var(--card-border); background: var(--card-bg); color: var(--card-title); outline: none; }
        .search-input:focus { border-color: #e46338; }
        
        .suggestions-list { position: absolute; top: 100%; left: 0; width: 100%; background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 15px; z-index: 200; box-shadow: 0 10px 20px rgba(0,0,0,0.1); list-style: none; padding: 10px 0; margin-top: 5px; }
        .suggestion-item { padding: 10px 20px; cursor: pointer; color: var(--card-title); }
        .suggestion-item:hover { background: #f0f0f0; }

        .modern-card { background-color: var(--card-bg); border: 1px solid var(--card-border); box-shadow: 0 4px 15px var(--card-shadow); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.3s ease; }
        .img-container { 
          background-color: #ffffff; border-bottom: 1px solid var(--card-border); 
          position: relative; width: 100%; aspect-ratio: 1 / 1; overflow: hidden; 
          padding: 10px; display: flex; align-items: center; justify-content: center;
        }
        @media (min-width: 1024px) { .img-container { padding: 15px; } }
        
        .special-badge { position: absolute; top: 10px; right: 10px; background: #22c55e; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: bold; z-index: 10; }
        .price-val { font-size: 1.2rem; font-weight: 800; color: #e46338; margin: 5px 0; }

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

        /* 🔥 LIGHTBOX DOTS STYLE */
        .lb-dots-container {
          position: absolute; bottom: 80px; left: 0; right: 0;
          display: flex; justify-content: center; gap: 8px; z-index: 2002;
        }
        .lb-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.3s;
        }
        .lb-dot.active {
          background: #e46338; width: 10px; height: 10px; transform: scale(1.2);
        }
        /* Mobile adjustment for dots */
        @media (max-width: 768px) {
           .lb-dots-container { bottom: 60px; }
        }

        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <section className="catalogue-section" id="catalogue">
        <div style={{textAlign: 'center', marginBottom: '30px'}}>
          <h2 className="main-title" style={{fontSize: '2rem', marginBottom: '10px'}}>Our Catalogue</h2>
        </div>

        {/* --- SEARCH BAR --- */}
        <div className="search-container" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' }}>
            <Search size={20} />
          </div>

          <input 
            type="text" 
            placeholder="Search for coffee cups, bowls or plates..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => {setSearchQuery(e.target.value); setShowSuggestions(true);}}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />

          {searchQuery && (
            <button 
              onClick={() => { setSearchQuery(""); setShowSuggestions(false); }}
              style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px' }}
            >
              <X size={20} />
            </button>
          )}

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
        
        {/* --- MAIN CATEGORIES --- */}
        {!loading && (
          <div className="category-scroll" style={{ display: 'flex', overflowX: 'auto', gap: '12px', padding: '10px 5px 20px 5px', marginBottom: '10px' }}>
            <div style={{display:'flex', gap:'12px', margin: '0 auto'}}> 
            {categories.map((cat) => (
              <button key={cat} onClick={() => handleCategoryClick(cat)}
                style={{
                  padding: '10px 24px', borderRadius: '50px', cursor: 'pointer',
                  background: activeCategory === cat ? 'linear-gradient(135deg, #e46338 0%, #ff8e53 100%)' : 'var(--card-bg)',
                  color: activeCategory === cat ? '#fff' : 'var(--card-title)',
                  border: activeCategory === cat ? 'none' : '1px solid var(--card-border)',
                  fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, transition: 'all 0.3s ease',
                  boxShadow: activeCategory === cat ? '0 4px 12px rgba(228, 99, 56, 0.3)' : 'none'
                }}
              >
                <span>{getCategoryIcon(cat)}</span> {cat}
              </button>
            ))}
            </div>
          </div>
        )}

        {/* --- SUB-CATEGORIES --- */}
        {!loading && activeCategory !== 'All' && subCategoriesMap[activeCategory] && subCategoriesMap[activeCategory].length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '30px', animation: 'fadeInDown 0.4s ease-out' }}>
            <button
               onClick={() => setActiveSubCategory('All')}
               style={{
                 padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s',
                 background: activeSubCategory === 'All' ? '#333' : 'transparent',
                 color: activeSubCategory === 'All' ? '#fff' : '#666',
                 border: activeSubCategory === 'All' ? '1px solid #333' : '1px solid #ddd'
               }}
            >
              All {activeCategory}
            </button>

            {subCategoriesMap[activeCategory].map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubCategory(sub)}
                style={{
                  padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s',
                  background: activeSubCategory === sub ? '#fff3e0' : 'transparent',
                  color: activeSubCategory === sub ? '#e46338' : '#666',
                  border: activeSubCategory === sub ? '1px solid #e46338' : '1px solid #ddd',
                  fontWeight: activeSubCategory === sub ? 'bold' : 'normal'
                }}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* --- PRODUCTS GRID --- */}
        <div className="catalogue-grid">
          {!loading && filteredItems.length > 0 ? (
            filteredItems.map((product) => (
              <div key={product.id} className="modern-card" style={{ opacity: product.isAvailable ? 1 : 0.8 }}>
                <div className="img-container" onClick={() => product.isAvailable && openGallery(product)} style={{cursor: product.isAvailable ? 'pointer' : 'default'}}>
                  {product.specialBadge && <span className="special-badge">{product.specialBadge}</span>}
                  {!product.isAvailable && <div className="out-of-stock-overlay">OUT OF STOCK</div>}
                  {product.tag && (
                    <span style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 11, backgroundColor: '#e46338', color: 'white', padding: '3px 10px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 'bold' }}>
                      {product.tag}
                    </span>
                  )}
                  <img 
                    src={optimizeImage(product.images[0], false)} 
                    alt={product.alt} 
                    loading="lazy" 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  />
                </div>

                <div style={{ padding: '15px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span style={{fontSize:'0.75rem', color:'#888', fontWeight:'600'}}>{product.category}</span>
                    {product.subCategory && <span style={{fontSize:'0.7rem', color:'#e46338', background:'#fff3e0', padding:'2px 6px', borderRadius:'4px'}}>{product.subCategory}</span>}
                  </div>
                  
                  <h3 className="card-title" style={{ margin: '5px 0', fontSize: '1.1rem' }}>{product.title}</h3>
                  
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
            ))
          ) : (
             !loading && <div style={{gridColumn: '1 / -1', textAlign:'center', padding:'40px', color:'#888'}}>
                <p style={{fontSize:'1.2rem'}}>No products found in this category.</p>
                <button onClick={() => {setActiveCategory('All'); setActiveSubCategory('All'); setSearchQuery('');}} style={{marginTop:'10px', padding:'8px 20px', borderRadius:'20px', border:'1px solid #ccc', background:'transparent', cursor:'pointer'}}>Reset Filters</button>
             </div>
          )}
        </div>
      </section>

      {/* Lightbox with Swipe & Dots */}
      <div id="lightbox" className={lightboxOpen ? "active" : ""} style={{ display: lightboxOpen ? "flex" : "none" }} onClick={closeLightbox}>
        <button id="close" onClick={closeLightbox}>&times;</button>
        <div className="lb-content">
          <button id="prev" className="nav-btn" onClick={prevImg}>&#10094;</button>
          {currentProduct && (
            <div 
              style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
                <img 
                  id="lightImg" 
                  src={optimizeImage(currentProduct.images[currentIndex], true)} 
                  alt={currentProduct.alt} 
                  draggable="false"
                />
            </div>
          )}
          <button id="next" className="nav-btn" onClick={nextImg}>&#10095;</button>

          {/* 🔥 LIGHTBOX DOTS INDICATOR */}
          {currentProduct && currentProduct.images.length > 1 && (
            <div className="lb-dots-container" onClick={(e) => e.stopPropagation()}>
              {currentProduct.images.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`lb-dot ${currentIndex === idx ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}