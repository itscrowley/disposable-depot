import React from 'react';
import styles from '../styles/Stats.module.css';

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
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {stats.map((stat) => (
            <div key={stat.id} className={styles.card}>
              {/* Icon */}
              <div className={styles.icon}>{stat.icon}</div>
              
              {/* Number (Orange & Bold) */}
              <span className={styles.number}>{stat.number}</span>
              
              {/* Label (Grey & Clean) */}
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
