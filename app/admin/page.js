"use client";
import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, Loader2, Image as ImageIcon, Plus, Trash2, Lock, KeyRound, Eye, EyeOff, Sun, Moon, X } from 'lucide-react';

export default function AdminPanel() {
  // --- THEME STATE ---
  const [darkMode, setDarkMode] = useState(true);

  // --- AUTH STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // --- 🔒 DUAL PASSWORD LOGIC (SECURED) ---
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Uses Env Var in Production, 'dev123' in Local
  const ADMIN_PASSWORD = isDevelopment 
    ? "dev123" 
    : process.env.NEXT_PUBLIC_ADMIN_PASSWORD; 

  // --- EXISTING STATES ---
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  // --- CONFIGURATION ---
  const CLOUDINARY_CLOUD_NAME = "dxojtisjb"; 
  const CLOUDINARY_PRESET = "ml_default"; 
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx9JLKPvml0rEFhdaRlWcXEQecEUmi7UNM7nTdRpLUGXre8Bw-rcJ05i2UiS3WV3-oUKg/exec";

  // --- DATA ---
  const [categories, setCategories] = useState([
    "Packaged Water Glass", "Packaged Water Bottles", "Disposable Coffee Cups",
    "Ping Pong / Party Glass", "Standard Plates", "Premium Round Plate",
    "Glass with Dome Lid", "Plastic Bowls", "Aluminium & Cling Foils",
    "Paper Napkins", "Disposable Spoons", "Soft Drinks"
  ]);

  const [tags, setTags] = useState([
    "Hot Seller", "Travel Ready", "Party Essential", 
    "Eco Friendly", "Bulk Pack", "Premium Quality", "Daily Use"
  ]);

  const [formData, setFormData] = useState({
    id: '', title: '', category: 'Packaged Water Glass',
    desc: '', tag: 'Hot Seller', alt: '', keywords: '', stockQty: '100', unit: 'PCS'
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  // UI Toggles
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState("");

  // --- HANDLERS ---
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Safety check for Production
    if (!isDevelopment && !ADMIN_PASSWORD) {
      alert("⚠️ Security Error: Admin Password is NOT set in Vercel Environment Variables.");
      return;
    }

    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("❌ Wrong Password! Access Denied.");
      setPasswordInput("");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- CRASH PREVENTION (Duplicate Check) ---
  const handleAddCategory = () => {
    const trimmedCat = newCategory.trim();
    if (!trimmedCat) return; 

    if (categories.includes(trimmedCat)) {
      alert("⚠️ Yeh Category pehle se list mein hai!");
      return;
    }

    setCategories([...categories, trimmedCat]);
    setFormData({ ...formData, category: trimmedCat });
    setNewCategory(""); 
    setIsAddingCategory(false);
  };

  const handleAddTag = () => {
    const trimmedTag = newTag.trim();
    if (!trimmedTag) return;

    if (tags.includes(trimmedTag)) {
      alert("⚠️ Yeh Tag pehle se list mein hai!");
      return;
    }

    setTags([...tags, trimmedTag]);
    setFormData({ ...formData, tag: trimmedTag });
    setNewTag(""); 
    setIsAddingTag(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
      setPreviewUrls((prev) => [...prev, ...filesArray.map((file) => URL.createObjectURL(file))]);
    }
  };

  const removeImage = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(newFiles); setPreviewUrls(newPreviews);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) { alert("Please select at least one image!"); return; }

    setLoading(true); setProgress(0);
    const uploadedImageUrls = [];

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const formData = new FormData();
        formData.append('file', selectedFiles[i]);
        formData.append('upload_preset', CLOUDINARY_PRESET);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: formData });
        if (!res.ok) throw new Error(`Image ${i + 1} failed`);
        const data = await res.json();
        uploadedImageUrls.push(data.secure_url);
        setProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
      }

      const finalData = { ...formData, price: "", image: uploadedImageUrls.join(', ') };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData)
      });

      alert("🎉 Product is Live!");
      setFormData({ id: '', title: '', category: categories[0], desc: '', tag: tags[0], alt: '', keywords: '', stockQty: '100', unit: 'PCS' });
      setSelectedFiles([]); setPreviewUrls([]); setProgress(0);

    } catch (error) { alert("Error: " + error.message); } finally { setLoading(false); }
  };

  // --- THEME STYLES (Fixed Light Mode) ---
  const theme = {
    // Inner Card Styles
    card: darkMode 
      ? "bg-black/40 border-white/10" 
      : "bg-white/80 border-white/60 shadow-xl", 
    
    textMain: darkMode ? "text-white" : "text-slate-900",
    textSub: darkMode ? "text-slate-400" : "text-slate-600",
    
    input: darkMode 
      ? "bg-black/30 border-white/10 text-white placeholder-slate-500" 
      : "bg-white border-slate-300 text-slate-900 placeholder-slate-400", 
    
    uploadBox: darkMode 
      ? "bg-white/5 border-white/10 hover:border-orange-500" 
      : "bg-white/50 border-slate-300 hover:bg-orange-50 hover:border-orange-500",
    
    uploadIconBg: darkMode ? "bg-white/10" : "bg-white shadow-sm",
    
    addNewBtn: darkMode 
      ? "bg-white/10 text-white" 
      : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
  };

  // --- 🎨 THEME SWITCH ---
  const ThemeSwitch = () => (
    <div 
      onClick={() => setDarkMode(!darkMode)}
      className={`
        w-14 h-8 rounded-full p-1 cursor-pointer transition-all duration-300 ease-in-out
        border backdrop-blur-md shadow-inner flex items-center
        ${darkMode ? 'bg-slate-800/60 border-white/20' : 'bg-white/60 border-slate-300'}
      `}
    >
      <div 
        className={`
          w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center
          ${darkMode ? 'translate-x-6' : 'translate-x-0'}
        `}
      >
        {darkMode 
          ? <Moon size={12} className="text-slate-800 fill-slate-800" /> 
          : <Sun size={14} className="text-orange-500 fill-orange-500" />
        }
      </div>
    </div>
  );

  // --- LOGIN SCREEN RENDER ---
  if (!isAuthenticated) {
    return (
      <div className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 transition-colors duration-500
        ${darkMode 
          ? "bg-slate-950"  // Solid Dark for Night
          : "bg-slate-100"  // Solid Light for Day (Hides Footer)
        }
      `}>
        
        {/* Background Gradient Layer (Absolute) */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500
          ${darkMode 
            ? "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-950 to-slate-950 opacity-100"
            : "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100 via-white to-slate-100 opacity-100"
          }
        `}></div>

        {/* Ambient Glows */}
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] animate-pulse ${darkMode ? 'bg-orange-500/20' : 'bg-orange-400/20'}`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[100px] animate-pulse delay-700 ${darkMode ? 'bg-blue-500/10' : 'bg-blue-400/10'}`}></div>

        {/* Glass Card */}
        <div className={`${theme.card} backdrop-blur-xl border shadow-2xl max-w-sm w-full rounded-3xl overflow-hidden relative z-10 transition-colors duration-300`}>
          
          {/* Header */}
          <div className={`p-8 flex flex-col items-center relative border-b ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
            
            {/* Toggle Position */}
            <div className="absolute top-6 right-6 z-20 scale-[0.8] origin-top-right">
              <ThemeSwitch />
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl mb-4 shadow-lg shadow-orange-500/30">
              <Lock className="text-white w-8 h-8" />
            </div>
            <h2 className={`text-2xl font-bold tracking-tight ${theme.textMain}`}>Admin Access</h2>
            <p className={`text-sm mt-1 font-medium ${theme.textSub}`}>Enter PIN to manage inventory</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <div className="relative group">
                {/* Glow Effect only in Dark Mode */}
                {darkMode && <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>}
                
                <div className="relative">
                  <KeyRound className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className={`w-full pl-12 pr-12 p-4 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all ${theme.input}`}
                    placeholder="Secret PIN"
                    autoFocus
                  />
                  <button
                    type="button"
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'}`}
                    onMouseDown={() => setShowPassword(true)}   
                    onMouseUp={() => setShowPassword(false)}    
                    onMouseLeave={() => setShowPassword(false)}  
                    onTouchStart={() => setShowPassword(true)}  
                    onTouchEnd={() => setShowPassword(false)}   
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>
            </div>
            
            <button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-900/20 transform transition active:scale-95 border border-white/10">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- MAIN ADMIN PANEL RENDER (FOOTER HIDDEN) ---
  return (
    <div className={`fixed inset-0 z-[99999] overflow-y-auto py-4 px-3 md:py-12 md:px-4 flex justify-center items-start font-sans transition-all duration-500 
      ${darkMode 
        ? "bg-slate-950" 
        : "bg-slate-50"
      }
    `}>
      
      {/* Background Gradient Layer (Dynamic) */}
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-500
        ${darkMode 
          ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"
          : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50 via-white to-slate-100"
        }
      `}></div>

      {/* Background Ambience */}
      <div className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-500 ${darkMode ? 'opacity-100' : 'opacity-60'}`}>
         <div className={`absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] ${darkMode ? 'bg-orange-600/10' : 'bg-orange-400/20'}`}></div>
         <div className={`absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] ${darkMode ? 'bg-blue-600/10' : 'bg-blue-400/10'}`}></div>
      </div>

      <div className={`${theme.card} w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border backdrop-blur-xl relative z-10 transition-colors duration-300`}>
        
        {/* Header - ALWAYS ORANGE NOW */}
        <div className="backdrop-blur-md p-6 md:p-8 flex items-center justify-between sticky top-0 z-20 border-b bg-gradient-to-r from-orange-600/90 to-red-600/90 border-white/10 text-white">
          <div>
            <h1 className="text-xl md:text-3xl font-bold tracking-tight">Add Product</h1>
            <p className="text-xs md:text-base mt-1 text-orange-100 opacity-90">Inventory Manager</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="scale-[0.8] origin-right">
                <ThemeSwitch />
             </div>
             {/* Logo Box - Replaced Cloud Icon with Image */}
             <div className="p-0.05 md:p-0.02 rounded-2xl backdrop-blur-md border bg-white/10 border-white/1">
                {/* 🔴 Yahan Apni Logo File ka naam likhein */}
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="w-6 h-6 md:w-28 md:h-28 object-contain"
                />
             </div>
          </div>
        </div>

        {/* Progress Bar */}
        {loading && (
          <div className={`w-full h-1.5 md:h-2 ${darkMode ? 'bg-slate-800/50' : 'bg-slate-200'}`}>
            <div className="bg-green-500 h-full shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-6 md:space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            <div>
              <label className={`block text-sm font-bold mb-2 uppercase tracking-wide ${theme.textSub}`}>Unique ID</label>
              <input type="text" name="id" required value={formData.id}
                className={`w-full p-3 md:p-4 rounded-xl outline-none transition-all border ${theme.input} focus:border-orange-500 focus:ring-1 focus:ring-orange-500`}
                placeholder="e.g. cup_150ml"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={`block text-sm font-bold mb-2 uppercase tracking-wide ${theme.textSub}`}>Title</label>
              <input type="text" name="title" required value={formData.title}
                className={`w-full p-3 md:p-4 rounded-xl outline-none transition-all border ${theme.input} focus:border-orange-500 focus:ring-1 focus:ring-orange-500`}
                placeholder="e.g. 150ml Coffee Cup"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className={`text-sm font-bold uppercase tracking-wide ${theme.textSub}`}>Category</label>
                {!isAddingCategory && (
                  <button type="button" onClick={() => setIsAddingCategory(true)} className={`text-xs font-bold flex items-center p-2 rounded-lg border transition-colors ${theme.addNewBtn}`}>
                    <Plus size={14} className="mr-1"/> New
                  </button>
                )}
              </div>
              {isAddingCategory ? (
                <div className="flex gap-2">
                  <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="New Cat..." className={`flex-1 p-3 rounded-xl outline-none border ${theme.input}`}/>
                  <button type="button" onClick={handleAddCategory} className="bg-orange-600 text-white px-4 rounded-xl font-bold hover:bg-orange-500 transition">Add</button>
                  <button type="button" onClick={() => setIsAddingCategory(false)}><X size={20} className="text-slate-400"/></button>
                </div>
              ) : (
                <div className="relative">
                  <select name="category" value={formData.category} onChange={handleChange} className={`w-full p-3 md:p-4 rounded-xl appearance-none outline-none border ${theme.input} focus:border-orange-500`}>
                    {categories.map((cat) => <option key={cat} className="text-slate-900 bg-white">{cat}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                </div>
              )}
            </div>

            <div>
               <div className="flex justify-between items-center mb-2">
                <label className={`text-sm font-bold uppercase tracking-wide ${theme.textSub}`}>Tag / Badge</label>
                {!isAddingTag && (
                  <button type="button" onClick={() => setIsAddingTag(true)} className={`text-xs font-bold flex items-center p-2 rounded-lg border transition-colors ${theme.addNewBtn}`}>
                    <Plus size={14} className="mr-1"/> New
                  </button>
                )}
              </div>
              {isAddingTag ? (
                <div className="flex gap-2">
                  <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="New Tag..." className={`flex-1 p-3 rounded-xl outline-none border ${theme.input}`}/>
                  <button type="button" onClick={handleAddTag} className="bg-orange-600 text-white px-4 rounded-xl font-bold hover:bg-orange-500 transition">Add</button>
                  <button type="button" onClick={() => setIsAddingTag(false)}><X size={20} className="text-slate-400"/></button>
                </div>
              ) : (
                 <div className="relative">
                  <select name="tag" value={formData.tag} onChange={handleChange} className={`w-full p-3 md:p-4 rounded-xl appearance-none outline-none border ${theme.input} focus:border-orange-500`}>
                    {tags.map((tag) => <option key={tag} className="text-slate-900 bg-white">{tag}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className={`block text-sm font-bold mb-2 uppercase tracking-wide ${theme.textSub}`}>Description</label>
            <textarea name="desc" rows="3"
              className={`w-full p-3 md:p-4 rounded-xl outline-none border ${theme.input} focus:border-orange-500 focus:ring-1 focus:ring-orange-500`}
              placeholder="Details..."
              value={formData.desc}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            <div>
              <label className={`block text-sm font-bold mb-2 uppercase tracking-wide ${theme.textSub}`}>Keywords (SEO)</label>
              <input type="text" name="keywords" value={formData.keywords}
                className={`w-full p-3 md:p-4 rounded-xl outline-none border ${theme.input} focus:border-orange-500 focus:ring-1 focus:ring-orange-500`}
                placeholder="e.g. disposable, party"
                onChange={handleChange}
              />
            </div>
            
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className={`block text-xs font-bold mb-1 uppercase ${theme.textSub}`}>Stock</label>
                <input type="number" name="stockQty" value={formData.stockQty}
                  className={`w-full p-3 rounded-xl font-bold outline-none border ${theme.input} focus:border-orange-500`}
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2">
                <label className={`block text-xs font-bold mb-1 uppercase ${theme.textSub}`}>Unit</label>
                <input type="text" name="unit" value={formData.unit}
                  className={`w-full p-3 rounded-xl font-bold outline-none border ${theme.input} focus:border-orange-500`}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className={`block text-sm font-bold uppercase tracking-wide ${theme.textSub}`}>Images</label>
            
            <div 
              className={`border-2 border-dashed rounded-xl p-6 md:p-10 flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95 ${theme.uploadBox}`}
              onClick={() => fileInputRef.current.click()}
            >
              <div className={`p-3 md:p-4 rounded-full ${theme.uploadIconBg}`}>
                <ImageIcon className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
              </div>
              <p className={`font-semibold text-base md:text-lg ${theme.textMain}`}>Add Photos</p>
              <p className={`text-xs md:text-sm ${theme.textSub}`}>Multiple Allowed</p>
              <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />
            </div>

            {previewUrls.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {previewUrls.map((url, index) => (
                  <div key={index} className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl border overflow-hidden shadow-sm ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-black/60 backdrop-blur-md text-white p-1.5 rounded-full hover:bg-red-600 transition">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            type="submit" disabled={loading}
            className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl text-white shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2 transition-transform active:scale-95 border border-white/10 ${loading ? 'bg-slate-700' : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500'}`}
          >
            {loading ? <><Loader2 className="animate-spin w-5 h-5"/> Uploading...</> : <><CheckCircle className="w-5 h-5"/> Launch Product</>}
          </button>
        </form>
      </div>
    </div>
  );
}