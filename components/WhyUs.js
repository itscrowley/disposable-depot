import React from 'react';

export default function WhyUs() {
  return (
    <div className="why-us-wrapper parallax-bg">
        <div className="why-us-glass">
          <h2 className="section-title" style={{ marginBottom: "30px" }}>Why Choose The Disposable Depot?</h2>
          <div className="swipe-container">
            
            {/* --- POINT 1: WALK-IN (Sabse Important) --- */}
            <div className="swipe-card">
              <div className="swipe-icon">🏬</div>
              <div className="swipe-text">
                <h4>Visit Our Store</h4>
                <p>Check quality personally & buy instantly.</p>
              </div>
            </div>

            {/* --- POINT 2: DELIVERY LIMIT (Clear Expectation) --- */}
            <div className="swipe-card">
              <div className="swipe-icon">🚚</div>
              <div className="swipe-text">
                <h4>Local Convenience</h4>
                <p>Free delivery within <strong>2km radius</strong>.</p>
              </div>
            </div>

            {/* --- POINT 3: PRICE (SEO Keyword) --- */}
            <div className="swipe-card">
              <div className="swipe-icon">💰</div>
              <div className="swipe-text">
                <h4>Factory Rates</h4>
                <p>Best wholesale prices in Your Area guaranteed. No middleman costs.</p>
              </div>
            </div>

            {/* --- POINT 4: STOCK --- */}
            <div className="swipe-card">
              <div className="swipe-icon">📦</div>
              <div className="swipe-text">
                <h4>Always in Stock</h4>
                <p>Bulk quantity ready for Parties, Langar & Catering events.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}