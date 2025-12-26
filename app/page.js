"use client"; // Ye line bahut zaroori hai interactivity ke liye
import { useState, useEffect } from "react";
import Stats from '../components/Stats';
// --- IMAGE DATA (Aapki original script se) ---
const galleries = {
  waterGlass: ["https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061753.jpg", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/drinking-water-glass-3038849766770950486076.jpg", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061901.jpg"],
  waterBottles: ["https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061959-1.jpg", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061764.png", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/pngwing.com-3.png"],
  coffeeGlass: ["https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061745-1.png", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061754.png", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061751.png", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000079749.jpg"],
  pingPongGlass: ["https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061752.png", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/pngwing.com_.png"],
  disposablePlates: ["https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061802.png", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061804.png"],
  roundPlate: ["https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061934.jpg", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061940.jpg"],
  glassWithLid: ["https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061944.jpg", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061806.png", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061896.jpg"],
  plasticBowl: ["https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061809.png", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061899.jpg"],
  foils: ["https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061919.png", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061917.jpg"],
  napkins: ["https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061920.jpg?w=400", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061922.jpg"],
  plasticSpoons: ["https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061936.jpg", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061931.jpg"],
  softDrinks: ["https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/pngwing.com-1.png", "https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000061756.png"]
};

export default function Home() {
  // --- STATES (Variables) ---
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  
  // Lightbox States
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Form States
  const [category, setCategory] = useState("");
  const [qty, setQty] = useState("");
  const [notes, setNotes] = useState("");
  const [qtyOptions, setQtyOptions] = useState([]);

  // --- LOGIC ---

  // Scroll Event handle karna
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
        setShowBackTop(true);
      } else {
        setScrolled(false);
        setShowBackTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark Mode Toggle Logic
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  // Quantity Options calculate karna
  useEffect(() => {
    let unit = "Packets/Units";
    const max = 100;

    if (category.includes("Water") || category.includes("Box")) {
      unit = "Box";
      if (category.includes("Water")) { unit = "Boxes"; }
    }

    const options = [];
    for (let i = 1; i <= max; i++) {
      let labelUnit = i === 1 ? unit.replace("es", "") : unit;
      if (unit === "Boxes" && i === 1) labelUnit = "Box";
      options.push(`${i} ${labelUnit}`);
    }
    setQtyOptions(options);
    setQty(""); // Reset qty jab product change ho
  }, [category]);


  // --- FUNCTIONS ---

  const toggleTheme = (e) => {
    setIsDarkMode(e.target.checked);
  };

  const openGallery = (key) => {
    const gallery = galleries[key] || [];
    if (gallery.length > 0) {
      setCurrentGallery(gallery);
      setCurrentIndex(0);
      setLightboxOpen(true);
    }
  };

  const nextImg = (e) => {
    e.stopPropagation();
    if (!currentGallery.length) return;
    setCurrentIndex((prev) => (prev + 1) % currentGallery.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    if (!currentGallery.length) return;
    setCurrentIndex((prev) => (prev - 1 + currentGallery.length) % currentGallery.length);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const sendOrder = (e) => {
    e.preventDefault();
    if (!category) { alert("Please select a product"); return; }
    if (!qty) { alert("Please select quantity"); return; }

    const message = 
`🧾 *NEW ORDER REQUEST*
----------------------------------
📅 Date: ${new Date().toLocaleDateString()}
🏭 To: *The Disposable Depot*

📦 *ITEM DETAILS*
• Product: *${category}*
• Quantity: *${qty}*

📝 *CUSTOMER NOTES*
${notes ? `"${notes}"` : "None"}

----------------------------------
💡 Please confirm availability & price.`;

    const encodedMsg = encodeURIComponent(message);
    window.open("https://wa.me/919814812623?text=" + encodedMsg, "_blank");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header id="mainHeader" className={scrolled ? "scrolled" : ""}>
        <div className="brand">
          <img src="https://thedisposabledepot.wordpress.com/wp-content/uploads/2025/02/1000062278.jpg?w=1024" alt="The Disposable Depot" className="logo-img" />
        </div>
      </header>

      <div className="parallax-wrapper">
        <section className="hero parallax-bg">
          <div className="hero-content">
            <h1>Best Wholesale Prices in <br /> Your Area for <br /><span>Packaged Water & Disposables</span></h1>
            <p>Premium Quality Paper Cups, Glasses, Plates, Foils & Tissues Available.</p>
            <a href="#order" className="hero-cta-whatsapp">Order On WhatsApp</a>
          </div>

          <div className="hero-actions-row">
            <a href="tel:+919814812623" className="btn-hero-call">Call Now 📞</a>
            
            <label className="theme-switch" htmlFor="checkbox">
              <input type="checkbox" id="checkbox" onChange={toggleTheme} checked={isDarkMode} />
              <div className="slider round">
                <span className="icon-sun">☀&#xFE0E;</span>
                <span className="icon-moon">🌙</span>
              </div>
            </label>
          </div>

          <div className="marquee-strip glow-effect">
            <div className="marquee-track">
              <span>🔥 Special Offer: Bulk Discounts Available! &nbsp;•&nbsp; </span>
              <span>⚡ Limited Time Offer &nbsp;•&nbsp; </span>
              <span>🔥 Special Offer: Bulk Discounts Available! &nbsp;•&nbsp; </span>
              <span>⚡ Limited Time Offer &nbsp;•&nbsp; </span>
              <span>🔥 Special Offer: Bulk Discounts Available! &nbsp;•&nbsp; </span>
              <span>⚡ Limited Time Offer &nbsp;•&nbsp; </span>
              <span>🔥 Special Offer: Bulk Discounts Available! &nbsp;•&nbsp; </span>
              <span>⚡ Limited Time Offer &nbsp;•&nbsp; </span>
              <span>🔥 Special Offer: Bulk Discounts Available! &nbsp;•&nbsp; </span>
              <span>⚡ Limited Time Offer &nbsp;•&nbsp; </span>
              <span>🔥 Special Offer: Bulk Discounts Available! &nbsp;•&nbsp; </span>
              <span>⚡ Limited Time Offer &nbsp;•&nbsp; </span>
            </div>
          </div>
        </section>
      </div>

      <section className="section" id="catalogue">
        <h2 className="section-title">Our Catalogue</h2>
        <div className="grid">
          {/* PRODUCT CARDS */}
          
          <div className="card highlight" onClick={() => openGallery('waterGlass')}>
            <div className="card-body">
              <span className="card-tag">Hot Seller</span>
              <h3>Packaged Water Glass</h3>
              <p>Box wise – perfect for events & offices.</p>
            </div>
            <div className="card-img-container">
              <img src={galleries.waterGlass[0]} alt="" />
              <img src={galleries.waterGlass[1]} alt="" />
            </div>
          </div>

          <div className="card highlight" onClick={() => openGallery('waterBottles')}>
            <div className="card-body">
              <span className="card-tag">Travel Ready</span>
              <h3>Packaged Water Bottles</h3>
              <p>Small bottles, box packing – ideal for functions.</p>
            </div>
            <div className="card-img-container">
                <img src={galleries.waterBottles[0]} alt="" />
                <img src={galleries.waterBottles[1]} alt="" />
            </div>
          </div>

          <div className="card" onClick={() => openGallery('coffeeGlass')}>
            <div className="card-body">
              <h3>Disposable Coffee Cups</h3>
              <p>Ribbed, plain & printed hot cups.</p>
            </div>
            <div className="card-img-container">
                <img src={galleries.coffeeGlass[0]} alt="" />
                <img src={galleries.coffeeGlass[1]} alt="" />
            </div>
          </div>

          <div className="card" onClick={() => openGallery('pingPongGlass')}>
            <div className="card-body">
              <h3>Ping Pong / Party Glass</h3>
              <p>Colourful plastic glasses.</p>
            </div>
            <div className="card-img-container">
                <img src={galleries.pingPongGlass[0]} alt="" />
                <img src={galleries.pingPongGlass[1]} alt="" />
            </div>
          </div>

          <div className="card" onClick={() => openGallery('disposablePlates')}>
            <div className="card-body">
              <h3>Standard Plates</h3>
              <p>Round plates for general serving.</p>
            </div>
            <div className="card-img-container">
                <img src={galleries.disposablePlates[0]} alt="" />
                <img src={galleries.disposablePlates[1]} alt="" />
            </div>
          </div>

          <div className="card" onClick={() => openGallery('roundPlate')}>
            <div className="card-body">
              <h3>Premium Round Plate</h3>
              <p>Sturdy, eco-friendly feel.</p>
            </div>
            <div className="card-img-container">
                <img src={galleries.roundPlate[0]} alt="" />
                <img src={galleries.roundPlate[1]} alt="" />
            </div>
          </div>

          <div className="card" onClick={() => openGallery('glassWithLid')}>
            <div className="card-body">
              <h3>Glass with Dome Lid</h3>
              <p>For Cold Coffee, Shakes & Juices.</p>
            </div>
            <div className="card-img-container">
                <img src={galleries.glassWithLid[0]} alt="" />
                <img src={galleries.glassWithLid[1]} alt="" />
            </div>
          </div>

          <div className="card" onClick={() => openGallery('plasticBowl')}>
            <div className="card-body">
              <h3>Plastic Bowls</h3>
              <p>Katoris for gravies & desserts.</p>
            </div>
            <div className="card-img-container">
                <img src={galleries.plasticBowl[0]} alt="" />
                <img src={galleries.plasticBowl[1]} alt="" />
            </div>
          </div>

           <div className="card" onClick={() => openGallery('foils')}>
            <div className="card-body">
              <h3>Aluminium & Cling Foils</h3>
              <p>Food wrapping & storage rolls.</p>
            </div>
            <div className="card-img-container">
                <img src={galleries.foils[0]} alt="" />
                <img src={galleries.foils[1]} alt="" />
            </div>
          </div>

           <div className="card" onClick={() => openGallery('napkins')}>
            <div className="card-body">
              <h3>Paper Napkins</h3>
              <p>Cocktail, dispenser & tissue napkins.</p>
            </div>
            <div className="card-img-container">
                <img src={galleries.napkins[0]} alt="" />
                <img src={galleries.napkins[1]} alt="" />
            </div>
          </div>

          <div className="card" onClick={() => openGallery('plasticSpoons')}>
            <div className="card-body">
              <h3>Disposable Spoons</h3>
              <p>Bulk packing spoons.</p>
            </div>
            <div className="card-img-container">
                <img src={galleries.plasticSpoons[0]} alt="" />
                <img src={galleries.plasticSpoons[1]} alt="" />
            </div>
          </div>

          <div className="card" onClick={() => openGallery('softDrinks')}>
            <div className="card-body">
              <h3>Soft Drinks</h3>
              <p>Bulk brand packs for parties.</p>
            </div>
            <div className="card-img-container">
                <img src={galleries.softDrinks[0]} alt="" />
                <img src={galleries.softDrinks[1]} alt="" />
            </div>
          </div>
        </div>
      </section>

      <div className="why-us-wrapper parallax-bg">
        <div className="why-us-glass">
          <h2 className="section-title" style={{ marginBottom: "30px" }}>The Wholesale Advantage</h2>
          <div className="swipe-container">
            <div className="swipe-card">
              <div className="swipe-icon">📦</div>
              <div className="swipe-text">
                <h4>Consistent Stock Availability</h4>
                <p>Reliable supply so your daily operations never stop..</p>
              </div>
            </div>
            <div className="swipe-card">
              <div className="swipe-icon">💰</div>
              <div className="swipe-text">
                <h4>Factory Rates</h4>
                <p>Best wholesale pricing guaranteed.</p>
              </div>
            </div>
            <div className="swipe-card">
              <div className="swipe-icon">✨</div>
              <div className="swipe-text">
                <h4>Premium Quality</h4>
                <p>Hygiene-first durable packaging.</p>
              </div>
            </div>
            <div className="swipe-card">
              <div className="swipe-icon">🤝</div>
              <div className="swipe-text">
                <h4>Bulk Support</h4>
                <p>Special deals for caterers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mid-banner parallax-bg">
        <div className="mid-content">
          <h2>Bulk Orders? We've got you covered.</h2>
          <p>Reliable Supply for Events & Caterers in Nearyby Areas.</p>
          <a href="tel:+919814812623" className="btn-glow-gold">Call for Bulk Rates 📞</a>
        </div>
      </section>
  {/* 👇👇 CLEAR IMAGE PARALLAX SECTION 👇👇 */}
      <section style={{
          position: 'relative',
          padding: '0px 0', /* 👈 100px se 50px kar diya (Height kam ho gayi) */
          marginTop: '30px', /* Thoda margin bhi kam kiya taaki gap kam ho */
          marginBottom: '30px',
          
          /* Background Image */
          backgroundImage: `url('https://images.unsplash.com/photo-1761481755390-83999d790b95?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundAttachment: 'fixed', /* Parallax Effect */
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
      }}>
          
          {/* Dark Overlay (Taaki text padha jaye) */}
          <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0)', /* Sirf Kala Rang (No Blur) */
              zIndex: '0'
          }}></div>

          {/* Stats Content */}
          <div style={{ position: 'relative', zIndex: '1' }}>
               <Stats />
          </div>
      </section>
      {/* 👆👆 SECTION END 👆👆 */}

      <section className="section" id="order">
        <h2 className="section-title">Quick WhatsApp Order</h2>
        
        <div className="wa-card">
          <div className="wa-header">
            <div className="wa-profile-pic">
              <img src="logo.png" alt="DP" />
            </div>
            <div className="wa-info">
              <h3 className="wa-name">The Disposable Depot <span className="wa-verified">✔</span></h3>
              <p className="wa-status">online</p>
            </div>
            <div className="wa-actions">
              <span>📹</span><span>📞</span><span>⋮</span>
            </div>
          </div>

          <div className="wa-body">
            
            <div className="msg-row incoming">
              <div className="msg-bubble">
                <p>Hello! 👋 Welcome to our online portal. Please select your order below.</p>
                <span className="msg-time">10:00 AM</span>
              </div>
            </div>

            <form onSubmit={sendOrder} className="wa-form">
              
              <div className="msg-row outgoing">
                <div className="msg-bubble green-bubble">
                  <label className="bubble-label">Product</label>
                  <select 
                    id="category" 
                    required 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">👇 Select Item...</option>
                    <option>Packaged Water Cups (Box)</option>
                    <option>Water Bottles - 250ml</option>
                    <option>Water Bottles - 1 Ltr</option>
                    <option>Water Bottles - 5 Ltr</option>
                    <option>Disposable Coffee Glass</option>
                    <option>Ping Pong Glass</option>
                    <option>Disposable Plates</option>
                    <option>Disposable Round Plate</option>
                    <option>Glass with Lid</option>
                    <option>Plastic Bowls</option>
                    <option>Aluminium & Cling Foils</option>
                    <option>Paper Napkins</option>
                    <option>Plastic Spoons</option>
                    <option>Soft Drinks</option>
                    <option>Other / Mixed Order</option>
                  </select>
                  <div className="msg-meta">
                    <span className="msg-time">Now</span>
                    <span className="double-tick">✓✓</span>
                  </div>
                </div>
              </div>

              <div className="msg-row outgoing">
                <div className="msg-bubble green-bubble">
                  <label className="bubble-label">Quantity</label>
                  <select 
                    id="qtySelect" 
                    required 
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    <option value="">👇 Select Qty...</option>
                    {qtyOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="msg-meta">
                    <span className="msg-time">Now</span>
                    <span className="double-tick">✓✓</span>
                  </div>
                </div>
              </div>

              <div className="msg-row outgoing">
                <div className="msg-bubble green-bubble">
                  <label className="bubble-label">Notes</label>
                  <textarea 
                    id="notes" 
                    rows="1" 
                    placeholder="Type special instructions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                  <div className="msg-meta">
                    <span className="msg-time">Now</span>
                    <span className="double-tick">✓✓</span>
                  </div>
                </div>
              </div>

                            {/* --- REPLACE OLD WA-FOOTER-BAR WITH THIS --- */}
              <div className="wa-footer-bar">
                {/* 1. Fake Input (Message text yahan dikhega) */}
                <div className="wa-spoof-input">Send Order on WhatsApp</div>
                
                {/* 2. Send Button (Sirf Icons) */}
                <button type="submit" className="btn-whatsapp-send">
                  {/* Smiley Icon (Grey) */}
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="#9ca3af" className="wa-icon">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                  </svg>
                  
                  {/* Send Arrow (Green) */}
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="#075E54" className="wa-icon">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                  </svg>
                </button>
              </div>
              {/* --- END REPLACE --- */}


            </form>
          </div>
        </div>
      </section>

      <div style={{ height: "50px" }}></div>

      {/* LIGHTBOX COMPONENT */}
      <div 
        id="lightbox" 
        className={lightboxOpen ? "active" : ""} 
        style={{ display: lightboxOpen ? "flex" : "none" }}
        onClick={(e) => { if(e.target.id === 'lightbox' || e.target.classList.contains('lb-content')) closeLightbox() }}
      >
        <button id="close" onClick={closeLightbox}>&times;</button>
        <div className="lb-content">
          <button id="prev" className="nav-btn" onClick={prevImg}>&#10094;</button>
          <img id="lightImg" src={currentGallery[currentIndex]} alt="" />
          <button id="next" className="nav-btn" onClick={nextImg}>&#10095;</button>
        </div>
      </div>

      <button 
        id="backTop" 
        className={`float-btn ${showBackTop ? "show" : ""}`} 
        onClick={scrollToTop}
      >
        ↑
      </button>
    </>
  );
}
