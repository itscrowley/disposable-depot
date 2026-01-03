'use client'; 

import React, { useState, useEffect } from 'react'; // useEffect wapis le aaye
import { Send, Phone, MoreVertical, Video } from 'lucide-react'; 

export default function WhatsAppOrder() {
  // --- 1. STATES ---
  const [category, setCategory] = useState('');
  const [qty, setQty] = useState('');
  const [notes, setNotes] = useState('');
  
  // Naya State: Options store karne ke liye
  const [qtyOptions, setQtyOptions] = useState([]); 

  // --- 2. LOGIC: QUANTITY CALCULATOR (AAPKA PURANA CODE) ---
  useEffect(() => {
    let unit = "Packets/Units";
    const max = 100; // 1 se 100 tak ginti

    // Agar Water ya Box wala item hai to "Box" likhega
    if (category.includes("Water") || category.includes("Box")) {
      unit = "Box";
      if (category.includes("Water")) { unit = "Boxes"; }
    }

    const options = [];
    // Loop chalaya 1 se 100 tak
    for (let i = 1; i <= max; i++) {
      let labelUnit = i === 1 ? unit.replace("es", "") : unit; // Singular/Plural fix
      if (unit === "Boxes" && i === 1) labelUnit = "Box";
      options.push(`${i} ${labelUnit}`);
    }
    
    setQtyOptions(options);
    setQty(""); // Jab product badle to quantity reset ho jaye
  }, [category]);


  // --- 3. FUNCTION (Send to WhatsApp) ---
  const sendOrder = (e) => {
    e.preventDefault();

    if (!category || !qty) {
      alert("Please select a Product and Quantity!");
      return;
    }

    // Aapka Phone Number
    const phoneNumber = "919814812623"; 

    // Message Format
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
    const url = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;
    window.open(url, '_blank');
  };

  return (
    <section className="section" id="order">
        <h2 className="section-title">Quick WhatsApp Order</h2>
        
        <div className="wa-card">
          <div className="wa-header">
            <div className="wa-profile-pic">
              {/* Image path ab seedha '/logo.png' kar diya hai */}
              <img 
                src="/logo.png" 
                alt="DP" 
                style={{ height: '50px', width: '50px', objectFit: 'cover', borderRadius: '50%' }} 
              />
            </div>
            <div className="wa-info">
              <h3 className="wa-name">The Disposable Depot <span className="wa-verified">✔</span></h3>
              <p className="wa-status">online</p>
            </div>
            <div className="flex gap-3 text-white">
                 <Video size={20} />
                 <Phone size={20} />
                 <MoreVertical size={20} />
            </div>
          </div>

          <div className="wa-body">
            
            <div className="msg-row incoming">
              <div className="msg-bubble">
                <p>Hello! 👋 Welcome to our online portal. Please select your order below.</p>
                <span className="msg-time">10:10 AM</span>
              </div>
            </div>

            <form onSubmit={sendOrder} className="wa-form">
              
              {/* Product Select */}
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

              {/* Quantity Select (OLD LOGIC RESTORED) */}
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
                    {/* Yahan ab wahi 1-100 wala loop chalega */}
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

              {/* Notes Input */}
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

              {/* Footer / Send Button */}
              <div className="wa-footer-bar">
                <div className="wa-spoof-input">Send Order on WhatsApp</div>
                
                <button type="submit" className="btn-whatsapp-send">
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="#9ca3af" className="wa-icon">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                  </svg>
                  
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="#075E54" className="wa-icon">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                  </svg>
                </button>
              </div>

            </form>
          </div>
        </div>

        <div style={{ height: "50px" }}></div>
    </section>
  );
}