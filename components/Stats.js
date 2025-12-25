'use client';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Stats.module.css';

const statsData = [
  { id: 1, target: 2, label: "Years Experience", icon: "🗓️", suffix: "+" },
  { id: 2, target: 100, label: "Happy Clients", icon: "🤝", suffix: "+" },
  { id: 3, target: 2, label: "Cities Served", icon: "🚚", suffix: "+" },
  { id: 4, target: 100, label: "Quality Promise", icon: "✅", suffix: "%" },
];

const Stats = () => {
  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        {statsData.map((stat) => (
          <Counter key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
};

// Chhota sa Component jo Number ko Count karega
const Counter = ({ stat }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = stat.target;
    // Agar number bada hai to tezi se chalega, chhota hai to dheere
    const duration = 2000; // 2 seconds animation
    const increment = end / (duration / 16); 

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [stat.target]);

  return (
    <div className={styles.card}>
      <div className={styles.icon}>{stat.icon}</div>
      <h3 className={styles.number}>
        {count}{stat.suffix}
      </h3>
      <p className={styles.label}>{stat.label}</p>
    </div>
  );
};

export default Stats;
