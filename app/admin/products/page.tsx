'use client';
import { useState } from 'react';

export default function ProductsPage() {
  const [images, setImages] = useState<string[]>([]);
  const categories = ['Plastic Containers', 'Paper Cups', 'Plates', 'Foil & Wraps', 'Tissues'];

  const handleUpload = (e: any) => {
    if (e.target.files[0]) {
      setImages([...images, URL.createObjectURL(e.target.files[0])]);
    }
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* ✅ Added 'admin-card' class here for force styling */}
      <div className="admin-card p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        
        <h3 className="text-lg font-bold mb-6 border-b border-gray-100 dark:border-gray-700 pb-2 m-0 opacity-90">
          Add New Product
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-2 opacity-80">Product Name</label>
            <input type="text" className="w-full rounded-lg px-4 py-3 outline-none" placeholder="e.g. 250ml Container" />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2 opacity-80">Price (₹)</label>
            <input type="number" className="w-full rounded-lg px-4 py-3 outline-none" placeholder="0.00" />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2 opacity-80">Category</label>
            <select className="w-full rounded-lg px-4 py-3 outline-none cursor-pointer">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-bold mb-2 opacity-80">Description</label>
            <textarea className="w-full rounded-lg px-4 py-3 outline-none" rows={3} placeholder="Product details..."></textarea>
          </div>
        </div>
      </div>

      {/* Image Upload - Added 'admin-card' here too */}
      <div className="admin-card p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-6 border-b border-gray-100 dark:border-gray-700 pb-2 m-0 opacity-90">
          Product Images
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center h-40 cursor-pointer hover:border-orange-400 transition-all opacity-70 hover:opacity-100">
            <span className="text-4xl text-orange-500">+</span>
            <span className="text-sm mt-2 font-medium">Upload Image</span>
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>

          {images.map((img, i) => (
            <div key={i} className="relative h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 shadow-sm group">
              <img src={img} className="w-full h-full object-cover" />
              <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm shadow-md">✕</button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pb-10">
        <button className="bg-orange-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-orange-700 shadow-lg active:scale-95">
          Save Product
        </button>
      </div>

    </div>
  );
}
