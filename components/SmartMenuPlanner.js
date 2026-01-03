"use client";
import React, { useState } from 'react';
import { ShoppingCart, Check, Trash2, ChevronRight, Users, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';

const menuData = [
  {
    id: "starters",
    category: "Starters & Soups",
    items: [
      { id: "soup", name: "Tomato/Corn Soup", icon: "🥣", rec: { name: "250ml Silver Bowl", type: "Silver Paper", factor: 1.1 } },
      { id: "tikka", name: "Paneer Tikka/Snacks", icon: "🍢", rec: { name: "6-inch Bio Plate", type: "Eco-Friendly", factor: 1.2 } }
    ]
  },
  {
    id: "main",
    category: "Main Course",
    items: [
      { id: "thali", name: "Full Roti-Sabji Meal", icon: "🍱", rec: { name: "5-CP Heavy Partition", type: "Hard Plastic", factor: 1.05 } },
      { id: "rice", name: "Biryani/Rice Only", icon: "🍛", rec: { name: "10-inch Round Bio", type: "Bagasse", factor: 1.1 } }
    ]
  },
  {
    id: "drinks",
    category: "Beverages & Desserts",
    items: [
      { id: "coffee", name: "Hot Coffee/Tea", icon: "☕", rec: { name: "150ml Ripple Cup", type: "Premium Paper", factor: 1.2 } },
      { id: "water", name: "Water/Cold Drink", icon: "🥤", rec: { name: "250ml Clear Glass", type: "Plastic", factor: 1.5 } },
      { id: "sweet", name: "Ice Cream/Halwa", icon: "🍦", rec: { name: "100ml Cup + Spoon", type: "Paper", factor: 1.1 } }
    ]
  }
];

export default function SmartMenuPlanner() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [guestCount, setGuestCount] = useState(100);
  const [showCartMobile, setShowCartMobile] = useState(false);

  const toggleItem = (item) => {
    if (selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const generateWhatsAppLink = () => {
    if (selectedItems.length === 0) return;
    let message = `👋 Hi Disposable Depot! \n🎉 I am planning an event for *${guestCount} Guests*.\n\nHere is my requirement:\n`;
    selectedItems.forEach((item) => {
      const qty = Math.ceil(guestCount * item.rec.factor);
      message += `-------------------\n🍱 Menu: ${item.name}\n📦 Need: *${item.rec.name}*\n🔢 Approx Qty: ~${qty} pcs\n`;
    });
    message += `\n-------------------\nPlease share best available rates.`;
    const phoneNumber = "919814812623"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    // MAIN CONTAINER: Dark Gradient Background for contrast
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-20">
      
      {/* HEADER SECTION with Glow */}
      <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 pb-10 pt-10 px-4 rounded-b-[3rem] shadow-2xl overflow-hidden">
        {/* Abstract Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-orange-400 text-sm font-semibold mb-6 shadow-lg">
            <Sparkles size={14} /> AI-Powered Calculator
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white">
            Smart Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Planner</span>
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg">
            Choose your menu, set guests, and get an instant disposables list.
          </p>

          {/* Guest Counter Card */}
          <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-3xl max-w-xl mx-auto shadow-xl flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-slate-700 p-3 rounded-full text-orange-400">
                <Users size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Guest Count</p>
                <p className="text-2xl font-bold text-white">{guestCount}</p>
              </div>
            </div>
            
            <div className="flex-1 w-full px-2">
              <input 
                type="range" 
                min="10" max="1000" step="10" 
                value={guestCount} 
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500 hover:accent-orange-400 transition-all"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2 font-medium">
                <span>10</span>
                <span>500</span>
                <span>1000+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: MENU ITEMS */}
        <div className="lg:col-span-2 space-y-10">
          {menuData.map((section) => (
            <div key={section.id}>
              <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                <span className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full block"></span>
                {section.category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item) => {
                  const isSelected = selectedItems.find((i) => i.id === item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item)}
                      className={`relative flex items-center p-4 rounded-2xl border transition-all duration-200 group text-left overflow-hidden
                        ${isSelected 
                          ? 'bg-slate-800 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.15)]' 
                          : 'bg-slate-800/40 border-slate-700 hover:bg-slate-800 hover:border-slate-600'}`}
                    >
                      {/* Selection Glow */}
                      {isSelected && <div className="absolute inset-0 bg-orange-500/5 pointer-events-none"></div>}

                      <span className="text-4xl mr-4 filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                      
                      <div className="flex-1">
                        <p className={`font-bold text-base ${isSelected ? 'text-orange-400' : 'text-slate-200'}`}>
                          {item.name}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                           <span>Best with:</span>
                           <span className="bg-slate-700/50 px-1.5 py-0.5 rounded text-slate-300">{item.rec.name}</span>
                        </div>
                      </div>

                      {isSelected ? (
                        <div className="bg-orange-500 text-white p-1.5 rounded-full shadow-lg scale-100 transition-transform">
                          <Check size={16} strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-slate-600 group-hover:border-slate-400 transition-colors"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: FLOATING SUMMARY (Glassmorphism) */}
        <div className={`fixed inset-0 z-50 lg:static lg:z-auto bg-slate-900/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-0 transition-transform duration-300 flex flex-col
          ${showCartMobile ? 'translate-y-0' : 'translate-y-full lg:translate-y-0'}`}>
          
          <div className="lg:sticky lg:top-6 flex flex-col h-full lg:h-auto">
            {/* Mobile Header */}
            <div className="lg:hidden p-4 flex justify-between items-center border-b border-slate-800">
              <h2 className="font-bold text-white">Your List</h2>
              <button onClick={() => setShowCartMobile(false)} className="text-slate-400 hover:text-white p-2">Close</button>
            </div>

            <div className="bg-slate-800 border border-slate-700 lg:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-lg text-white flex items-center gap-2">
                    <Sparkles size={18} className="text-orange-400" /> Requirement List
                  </h3>
                  <span className="text-xs font-bold bg-slate-700 text-slate-300 px-2 py-1 rounded-md">{selectedItems.length} Items</span>
                </div>
                <p className="text-xs text-slate-400">Auto-calculated for {guestCount} guests</p>
              </div>

              {/* Scrollable List */}
              <div className="p-4 overflow-y-auto flex-1 space-y-3 min-h-[300px] lg:max-h-[500px]">
                {selectedItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12">
                    <ShoppingCart size={40} className="mb-4 opacity-20" />
                    <p className="text-sm">Your list is empty.</p>
                    <p className="text-xs mt-1">Select items to start.</p>
                  </div>
                ) : (
                  selectedItems.map((item, idx) => {
                    const qty = Math.ceil(guestCount * item.rec.factor);
                    return (
                      <div key={idx} className="bg-slate-700/30 p-3 rounded-xl border border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{item.name}</span>
                          <button onClick={() => toggleItem(item)} className="text-slate-500 hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-lg shadow-inner">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-orange-300 font-bold text-sm">{item.rec.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] bg-slate-600 text-slate-300 px-1.5 rounded">{item.rec.type}</span>
                              <span className="text-[10px] text-slate-400">x {guestCount} guests</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-600/50 flex justify-between items-center">
                          <span className="text-xs text-slate-400">Estimated Need:</span>
                          <span className="text-sm font-bold text-white bg-green-500/20 text-green-400 px-2 py-0.5 rounded">~{qty} pcs</span>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              {/* Footer Action */}
              {selectedItems.length > 0 && (
                <div className="p-4 bg-slate-800 border-t border-slate-700">
                  <button 
                    onClick={generateWhatsAppLink}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                  >
                    <MessageCircle size={20} className="fill-white" />
                    <span>Get Quote on WhatsApp</span>
                    <ChevronRight size={16} className="opacity-70" />
                  </button>
                  <p className="text-[10px] text-center text-slate-500 mt-2">
                    *Quantities are estimates. Final quote may vary.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Mobile Trigger */}
      {!showCartMobile && selectedItems.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 lg:hidden animate-bounce">
          <button 
            onClick={() => setShowCartMobile(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-2xl flex items-center gap-2"
          >
            <ShoppingCart size={24} fill="currentColor" />
            <span className="bg-white text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold">{selectedItems.length}</span>
          </button>
        </div>
      )}

    </div>
  );
    }
    
