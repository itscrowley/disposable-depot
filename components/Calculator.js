'use client';
import { useState } from 'react';

const Calculator = () => {
  const [guests, setGuests] = useState(100);

  // --- SETTINGS ---
  const NAPKINS_IN_PACKET = 100; // Ek packet mein kitne tissues hote hain (Yahan change kar sakte ho)
  
  // --- CALCULATION LOGIC ---
  const items = {
    plates: Math.ceil(guests * 1),           // 1 Plate per person
    cups: Math.ceil(guests * 2),             // 2 Cups per person (Tea + Water)
    spoons: Math.ceil(guests * 1.5),         // Thode extra spoons
    glasses: Math.ceil(guests * 1.5),        // 1.5 Glasses
    // Napkins calculation: Total Tissues / 100 = Packets
    napkinPackets: Math.ceil((guests * 2) / NAPKINS_IN_PACKET) 
  };

  // --- WHATSAPP SEND FUNCTION ---
  const sendToWhatsApp = () => {
    const message = `Hello, I checked the Party Planner on your website.%0A%0A` +
                    `For *${guests} Guests*, here is the estimate:%0A` +
                    `🍽️ Plates: ${items.plates} pcs%0A` +
                    `☕ Cups: ${items.cups} pcs%0A` +
                    `🥄 Spoons: ${items.spoons} pcs%0A` +
                    `🧻 Napkins: ${items.napkinPackets} Packets%0A%0A` +
                    `I want to order this. Please confirm price.`;

    // Apna number yahan check kar lein
    window.open(`https://wa.me/919814812623?text=${message}`, '_blank');
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>🎉 Party Material Planner</h2>
      <p style={styles.subtext}>Enter guests to calculate material & send order.</p>

      {/* Slider Section */}
      <div style={styles.inputContainer}>
        <label style={styles.label}>Guests: <strong>{guests}</strong></label>
        <input 
          type="range" min="10" max="1000" step="10" 
          value={guests} 
          onChange={(e) => setGuests(Number(e.target.value))}
          style={styles.slider}
        />
      </div>

      {/* Results Grid */}
      <div style={styles.grid}>
        {/* Plates */}
        <div style={styles.card}>
            <div style={styles.icon}>🍽️</div>
            <div style={styles.count}>{items.plates}</div>
            <div style={styles.name}>Plates</div>
        </div>
        
        {/* Glasses */}
        <div style={styles.card}>
            <div style={styles.icon}>🥤</div>
            <div style={styles.count}>{items.glasses}</div>
            <div style={styles.name}>Glasses</div>
        </div>
        
        {/* Spoons */}
        <div style={styles.card}>
            <div style={styles.icon}>🥄</div>
            <div style={styles.count}>{items.spoons}</div>
            <div style={styles.name}>Spoons</div>
        </div>
        
        {/* Napkins (Packets) */}
        <div style={styles.card}>
            <div style={styles.icon}>🧻</div>
            <div style={styles.count}>{items.napkinPackets}</div>
            <div style={styles.name}>Packets <span style={{fontSize:'10px', color:'#999'}}>(Napkins)</span></div>
        </div>
      </div>

      {/* WHATSAPP BUTTON */}
      <button onClick={sendToWhatsApp} style={styles.waButton}>
        <i className="fab fa-whatsapp" style={{marginRight: '8px', fontSize: '18px'}}></i>
        Send Estimate on WhatsApp
      </button>

      <p style={styles.note}>*1 Napkin Packet = {NAPKINS_IN_PACKET} pcs approx.</p>
    </div>
  );
};

const styles = {
  wrapper: {
    background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.5)', borderRadius: '20px',
    padding: '30px', maxWidth: '500px', width: '100%', margin: '0 auto',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textAlign: 'center'
  },
  heading: { color: '#ff6600', marginBottom: '10px', fontSize: '22px' },
  subtext: { color: '#666', marginBottom: '20px', fontSize: '14px' },
  inputContainer: { marginBottom: '25px' },
  label: { display: 'block', marginBottom: '10px', fontSize: '16px', color: '#333' },
  slider: { width: '100%', accentColor: '#ff6600', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '25px' },
  card: { background: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  count: { fontSize: '20px', fontWeight: 'bold', color: '#ff6600' },
  name: { fontSize: '13px', color: '#555' },
  icon: { fontSize: '24px', marginBottom: '5px' },
  
  // New Button Style
  waButton: {
    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(37, 211, 102, 0.4)',
    transition: 'transform 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '10px'
  },
  note: { fontSize: '11px', color: '#999', marginTop: '15px', fontStyle: 'italic' }
};

export default Calculator;
