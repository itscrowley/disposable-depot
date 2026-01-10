import React from 'react';

const stats = [
  {
    id: 1,
    number: "2+",
    label: "Years Experience",
    icon: "📅" 
  },
  {
    id: 2,
    number: "100+",
    label: "Happy Clients",
    icon: "🤝"
  },
  {
    id: 3,
    number: "2+",
    label: "Cities Served",
    icon: "🚚"
  },
  {
    id: 4,
    number: "100%",
    label: "Quality Promise",
    icon: "✅"
  }
];

const Stats = () => {
  return (
    <div className="why-us-wrapper parallax-bg">
      <div className="why-us-glass">
        {/* Title agar aap dena chahen, varna is div ko hata sakte hain */}
        <h2 className="section-title" style={{ marginBottom: "30px" }}>Our Achievements</h2>
        
        <div className="swipe-container">
          {stats.map((stat) => (
            <div key={stat.id} className="swipe-card">
              <div className="swipe-icon">{stat.icon}</div>
              <div className="swipe-text">
                <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.number}</h4>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;