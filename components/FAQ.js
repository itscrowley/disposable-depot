import React, { useState } from 'react';
import styles from '../styles/FAQ.module.css';

const faqData = [
  {
    question: "📦 Do you offer wholesale/bulk discounts?",
    answer: "Yes! We are primarily a wholesale supplier. If you need items in bulk for a shop or event, please WhatsApp us for the best rates."
  },
  {
    question: "🚚 Do you provide Home Delivery?",
    answer: "Yes, for local orders within 2 kms, we provide direct delivery. For other cities, we can arrange transport or courier services (charges may apply)."
  },
  {
    question: "♻️ Are your products Eco-Friendly?",
    answer: "We offer a complete variety to suit your budget. We have a premium range of Eco-Friendly products (Paper, Wooden, Bagasse), and we also stock standard regular disposable items."
  },
  {
    question: "📍 Can I pick up my order from the shop?",
    answer: "Absolutely! You can place your order via WhatsApp or Website and pick it up directly from our store in Jalandhar to save on shipping time."
  },
  {
    question: "💳 What are the payment options?",
    answer: "We accept UPI (GPay/Paytm), Bank Transfers, and Cash on Delivery (COD) for local deliveries."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.heading}>Frequently Asked Questions</h2>
      <div className={styles.faqContainer}>
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className={styles.question}>
              {item.question}
              <span className={styles.icon}>{activeIndex === index ? '−' : '+'}</span>
            </div>
            <div className={styles.answer}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
