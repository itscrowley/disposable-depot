'use client'; // 👈 Ye line sabse zaroori hai App Router me
import React, { useState } from 'react';
import styles from '../../styles/FaqPage.module.css'; // CSS path

const faqData = [
  {
    question: "📦 Do you offer wholesale/bulk discounts?",
    answer: "Yes! We are primarily a wholesale supplier. If you need items in bulk for a shop or event, please WhatsApp us for the best rates."
  },
  {
    question: "🚚 Do you provide Home Delivery?",
    answer: "Yes, for local orders within 2 kms, we provide direct delivery."
  },
  {
    question: "📍 Can I pick up my order from the shop?",
    answer: "Absolutely! Order via WhatsApp/Website and pick up directly from our store in Jalandhar."
  },
  {
    question: "♻️ Are your products Eco-Friendly?",
    answer: "We offer a complete variety to suit your budget. We have a premium range of Eco-Friendly products (Paper, Wooden, Bagasse), and we also stock standard regular disposable items."
  },
  {
    question: "💳 What are the payment options?",
    answer: "We accept UPI (GPay/Paytm), Bank Transfers, and Cash on Delivery (COD) for local orders."
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.pageWrapper}>
      
      {/* Main Content */}
      <main className={styles.container}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <p className={styles.subtitle}>Common questions about orders, delivery, and products.</p>

        <div className={styles.faqList}>
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
      </main>
    </div>
  );
}
