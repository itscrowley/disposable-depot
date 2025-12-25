"use client";
import React, { useState } from 'react';
import { ShoppingCart, Check, Trash2, Send, Sparkles } from 'lucide-react';

// --- DATA ---
const menuData = [
  {
    id: "soup",
    category: "Starters & Soups",
    items: [
      { id: "soup_hot", name: "Hot Soup", icon: "🥣", rec: { name: "250ml Silver Bowl", type: "Silver Paper" } },
      { id: "snacks_dry", name: "Dry Snacks/Tikka", icon: "🍢", rec: { name: "6-inch Bio Plate", type: "Eco-Friendly" } }
    ]
  },
  {
    id: "main_course",
    category: "Main Course",
    items: [
      { id: "full_meal", name: "Roti + Sabji + Dal", icon: "🍱", rec: { name: "5-CP Heavy Partition Plate", type: "Hard Plastic" } },
      { id: "rice_only", name: "Biryani/Rice", icon: "🍛", rec: { name: "10-inch Round Bio Plate", type: "Bagasse" } }
    ]
  },
  {
    id: "beverages",
    category: "Drinks & Desserts",
    items: [
      { id: "tea", name: "Tea/Coffee", icon: "☕", rec: { name: "150ml Ripple Cup", type: "Paper" } },
      { id: "cold_drink", name: "Cold Drink/Water", icon: "🥤", rec: { name: "250ml Clear Glass", type: "Plastic" } },
      { id: "ice_cream", name: "Ice Cream", icon: "🍦", rec: { name: "100ml Paper Cup + Spoon", type: "Paper" } }
    ]
  }
];

export default function SmartMenuPlanner() {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    if (selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const generateWhatsAppLink = () => {
    if (selectedItems.length === 0) return;
    let message = "Hello Disposable Depot! I need a quote for these items based on my menu:\n\n";
    selectedItems.forEach((item, index) => {
      message += `${index + 1}. Menu: ${item.name} -> Need: ${item.rec.name}\n`;
    });
    message += "\n Please share wholesale rates.";
    // Apna phone number yaha change karein (bina + ke)
    const phoneNumber = "919876543210"; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 font-sans">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Smart <span className="text-blue-600">Menu Matcher</span>
        </h2>
        <p className="text-gray-500">Select your food menu, and we'll tell you exactly which disposables you need.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-8">
          {menuData.map((section) => (
            <div key={section.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">{section.category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {section.items.map((item) => {
                  const isSelected = selectedItems.find((i) => i.id === item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item)}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-2 text-center
                        ${isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-md transform scale-105' 
                          : 'border-gray-100 bg-gray-50 hover:border-blue-200 hover:bg-white'}`}
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <span className={`text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                        {item.name}
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                          <Check size={12} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side (Sticky Cart) */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={20} />
                <h3 className="font-bold text-lg">Your Smart List</h3>
              </div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                {selectedItems.length} Items
              </span>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
              {selectedItems.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <ShoppingCart size={48} className="mx-auto mb-3 opacity-20" />
                  <p>Select menu items to generate list.</p>
                </div>
              ) : (
                selectedItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 border-b border-gray-100">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 flex items-center gap-1">For: {item.icon} {item.name}</p>
                      <h4 className="font-bold text-blue-900 leading-tight mt-1">{item.rec.name}</h4>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded">{item.rec.type}</span>
                    </div>
                    <button onClick={() => toggleItem(item)} className="text-gray-300 hover:text-red-500 p-1"><Trash2 size={16} /></button>
                  </div>
                ))
              )}
            </div>

            {selectedItems.length > 0 && (
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <button onClick={generateWhatsAppLink} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg">
                  <Send size={18} /> Get Quote on WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
