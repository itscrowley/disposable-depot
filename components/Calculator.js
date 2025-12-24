'use client';
import { useState } from 'react';

const Calculator = () => {
  const [guests, setGuests] = useState(100);

  // Logic: 1 Banda kitna use karega
  const items = {
    plates: guests * 1,
    cups: guests * 2,
    spoons: guests * 1.5,
    napkins: guests * 2,
    glasses: guests * 1.5
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>🎉 Party Material Planner</h2>
      <p style={styles.subtext}>Enter number of guests to estimate estimate requirements.</p>

      {/* Slider */}
      <div style={styles.inputContainer}>
        <label style={styles.label}>Guests: <strong>{guests}</strong></label>
        <input 
          type="range" min="10" max="1000" step="10" 
          value={guests} 
          onChange={(e) => setGuests(Number(e.target.value))}
          style={styles.slider}
        />
      </div>

      {/* Result Cards */}
      <div style={styles.grid}>
        <div style={styles.card}><div style={styles.icon}>🍽️</div><div style={styles.count}>{Math.ceil(items.plates)}</div><div style={styles.name}>Plates</div></div>
        <div style={styles.card}><div style={styles.icon}>☕</div><div style={styles.count}>{Math.ceil(items.cups)}</div><div style={styles.name}>Cups</div></div>
        <div style={styles.card}><div style={styles.icon}>🥄</div><div style={styles.count}>{Math.ceil(items.spoons)}</div><div style={styles.name}>Spoons</div></div>
        <div style={styles.card}><div style={styles.icon}>🧻</div><div style={styles.count}>{Math.ceil(items.napkins)}</div><div style={styles.name}>Napkins</div></div>
      </div>
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
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' },
  card: { background: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  count: { fontSize: '20px', fontWeight: 'bold', color: '#ff6600' },
  name: { fontSize: '13px', color: '#555' }
};

export default Calculator;
