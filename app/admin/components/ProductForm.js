// app/admin/components/ProductForm.js
import React from 'react';
import { ChevronDown, Settings, Image as ImageIcon, Trash2, CheckCircle, Loader2, Sparkles } from 'lucide-react';

export default function ProductForm({ state, actions, theme }) {
  const { darkMode, existingProducts, formData, categories, tags, badges, icons, isEditMode, isDuplicateId, loading, progress, previewUrls, fileInputRef } = state;
  const { handleChange, openListManager, handleImageChange, removeImage, handleSubmit, handleDelete, generateAutoContent } = actions;

  return (
    <>
      {loading && (<div className={`w-full h-1.5 ${darkMode ? 'bg-slate-800/50' : 'bg-slate-200'}`}><div className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-all duration-300 ease-out relative overflow-hidden" style={{ width: `${progress}%` }}></div></div>)}

      <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-5 flex-1 pb-24 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
              <div className="flex justify-between items-center mb-1">
                  <label className={`block text-[10px] font-bold uppercase tracking-wide ${theme.textSub}`}>Unique ID (Auto)</label>
                  <div className="flex items-center gap-2">
                      {isEditMode ? <span className="text-[10px] font-bold text-green-500">Editing ✅</span> : (!isDuplicateId ? <span className="text-[10px] font-bold text-blue-500">New 🆕</span> : <span className="text-[10px] font-bold text-red-500">⚠️ ID Exists</span>)}
                      <button type="button" onClick={() => openListManager("Manage IDs (Select to Edit)", existingProducts.map(p => p.id), 'id')} className={`text-[10px] font-bold flex items-center px-2 py-0.5 rounded border transition-colors ${theme.addNewBtn}`}><Settings size={10} className="mr-1"/> Manage</button>
                  </div>
              </div>
              <input type="text" name="id" readOnly value={formData.id} className={`w-full p-3.5 md:p-2 text-base md:text-sm rounded-xl md:rounded-lg outline-none transition-all border ${theme.input} opacity-70 cursor-not-allowed`} />
          </div>
          <div>
              <div className="flex justify-between items-center mb-1"><label className={`block text-[10px] font-bold uppercase tracking-wide ${theme.textSub}`}>Title</label><button type="button" onClick={() => openListManager("Manage Titles (Select to Edit)", existingProducts.map(p => p.title), 'title')} className={`text-[10px] font-bold flex items-center px-2 py-0.5 rounded border transition-colors ${theme.addNewBtn}`}><Settings size={10} className="mr-1"/> Manage</button></div>
              <input list="titleOptions" type="text" name="title" required value={formData.title} className={`w-full p-3.5 md:p-2 text-base md:text-sm rounded-xl md:rounded-lg outline-none transition-all border ${theme.input} focus:border-orange-500 active:scale-[0.99] transition-transform`} placeholder="Product Name..." onChange={handleChange} />
              <datalist id="titleOptions">{existingProducts.map(p => <option key={p.id} value={p.title} />)}</datalist>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
             <div className="flex justify-between items-center mb-1"><label className={`text-[10px] font-bold uppercase tracking-wide ${theme.textSub}`}>Category</label><button type="button" onClick={() => openListManager("Manage Categories", categories, 'category')} className={`text-[10px] font-bold flex items-center px-2 py-0.5 rounded border transition-colors ${theme.addNewBtn}`}><Settings size={10} className="mr-1"/> Manage</button></div>
             <div className="relative group"><select name="category" value={formData.category} onChange={handleChange} className={`w-full p-3.5 md:p-2 text-base md:text-sm rounded-xl md:rounded-lg outline-none border appearance-none transition-all duration-300 cursor-pointer ${theme.input} focus:border-orange-500 pr-8`}>{categories.map((cat, i) => <option key={i} value={cat} className="text-slate-900 bg-white">{cat}</option>)}</select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none group-hover:text-orange-500 transition-colors" /></div>
          </div>
          <div>
             <label className={`block text-[10px] font-bold mb-1 uppercase tracking-wide ${theme.textSub}`}>Sub Category (Size)</label>
             <input list="subCatOptions" type="text" name="subCategory" value={formData.subCategory} onChange={handleChange} placeholder="e.g. 150ml, 10 Inch" className={`w-full p-3.5 md:p-2 text-base md:text-sm rounded-xl md:rounded-lg outline-none transition-all border ${theme.input} focus:border-orange-500 active:scale-[0.99] transition-transform`} />
             <datalist id="subCatOptions"><option value="150ml" /><option value="200ml" /><option value="250ml" /><option value="300ml" /><option value="6 Inch" /><option value="8 Inch" /><option value="10 Inch" /><option value="Paper" /><option value="Plastic" /></datalist>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
             <div className="flex justify-between items-center mb-1"><label className={`text-[10px] font-bold uppercase tracking-wide ${theme.textSub}`}>Tag</label><button type="button" onClick={() => openListManager("Manage Tags", tags, 'tag')} className={`text-[10px] font-bold flex items-center px-2 py-0.5 rounded border transition-colors ${theme.addNewBtn}`}><Settings size={10} className="mr-1"/> Manage</button></div>
             <div className="relative group"><select name="tag" value={formData.tag} onChange={handleChange} className={`w-full p-3.5 md:p-2 text-base md:text-sm rounded-xl md:rounded-lg outline-none border appearance-none transition-all duration-300 cursor-pointer ${theme.input} focus:border-orange-500 pr-8`}>{tags.map((tag) => <option key={tag} className="text-slate-900 bg-white">{tag}</option>)}</select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none group-hover:text-orange-500 transition-colors" /></div>
          </div>
          <div>
             <div className="flex justify-between items-center mb-1"><label className={`text-[10px] font-bold uppercase tracking-wide ${theme.textSub}`}>Badge</label><button type="button" onClick={() => openListManager("Manage Badges", badges, 'badge')} className={`text-[10px] font-bold flex items-center px-2 py-0.5 rounded border transition-colors ${theme.addNewBtn}`}><Settings size={10} className="mr-1"/> Manage</button></div>
             <div className="relative group"><select name="badge" value={formData.badge} onChange={handleChange} className={`w-full p-3.5 md:p-2 text-base md:text-sm rounded-xl md:rounded-lg outline-none border appearance-none transition-all duration-300 cursor-pointer ${theme.input} focus:border-orange-500 pr-8`}>{badges.map((badge) => <option key={badge} className="text-slate-900 bg-white">{badge}</option>)}</select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none group-hover:text-orange-500 transition-colors" /></div>
          </div>
          <div>
             <div className="flex justify-between items-center mb-1"><label className={`text-[10px] font-bold uppercase tracking-wide ${theme.textSub}`}>Icon</label><button type="button" onClick={() => openListManager("Manage Icons", icons, 'icon')} className={`text-[10px] font-bold flex items-center px-2 py-0.5 rounded border transition-colors ${theme.addNewBtn}`}><Settings size={10} className="mr-1"/> Manage</button></div>
             <div className="relative group"><select name="categoryIcon" value={formData.categoryIcon} onChange={handleChange} className={`w-full p-3.5 md:p-2 text-base md:text-sm pl-10 rounded-xl md:rounded-lg outline-none border appearance-none transition-all duration-300 cursor-pointer ${theme.input} focus:border-orange-500`}>{icons.map((icon) => <option key={icon} className="text-xl bg-white">{icon}</option>)}</select><div className="absolute left-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none">{formData.categoryIcon}</div><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none group-hover:text-orange-500 transition-colors" /></div>
          </div>
        </div>

        {/* 🔥 AI AUTO FILL BUTTON HERE */}
        <div className="flex justify-end -mb-3">
            <button 
                type="button" 
                onClick={generateAutoContent}
                className="text-[10px] flex items-center gap-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full hover:scale-105 transition-transform shadow-md font-bold"
            >
                <Sparkles size={12} /> Auto-Fill (AI)
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={`block text-[10px] font-bold mb-1 uppercase tracking-wide ${theme.textSub}`}>Description</label><textarea name="desc" rows="2" className={`w-full p-3.5 md:p-2 text-base md:text-sm rounded-xl md:rounded-lg outline-none border ${theme.input} focus:border-orange-500`} placeholder="Details..." value={formData.desc} onChange={handleChange}></textarea></div>
          <div><label className={`block text-[10px] font-bold mb-1 uppercase tracking-wide ${theme.textSub}`}>Alt Text (SEO)</label><textarea name="alt" rows="2" className={`w-full p-3.5 md:p-2 text-base md:text-sm rounded-xl md:rounded-lg outline-none border ${theme.input} focus:border-orange-500`} placeholder="SEO Desc..." value={formData.alt} onChange={handleChange}></textarea></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={`block text-[10px] font-bold mb-1 uppercase tracking-wide ${theme.textSub}`}>Keywords</label><input type="text" name="keywords" value={formData.keywords} className={`w-full p-3.5 md:p-2 text-base md:text-sm rounded-xl md:rounded-lg outline-none border ${theme.input} focus:border-orange-500`} placeholder="tags..." onChange={handleChange} /></div>
          <div className="flex gap-4"><div className="w-1/2"><label className={`block text-[10px] font-bold mb-1 uppercase ${theme.textSub}`}>Stock</label><input type="number" name="stockQty" value={formData.stockQty} className={`w-full p-3.5 md:p-2 text-base md:text-sm rounded-xl md:rounded-lg font-bold outline-none border ${theme.input} focus:border-orange-500`} onChange={handleChange} /></div><div className="w-1/2"><label className={`block text-[10px] font-bold mb-1 uppercase ${theme.textSub}`}>Unit</label><input type="text" name="unit" value={formData.unit} className={`w-full p-3.5 md:p-2 text-base md:text-sm rounded-xl md:rounded-lg font-bold outline-none border ${theme.input} focus:border-orange-500`} onChange={handleChange} /></div></div>
        </div>

        <div className="space-y-2">
          <label className={`block text-[10px] font-bold uppercase tracking-wide ${theme.textSub}`}>Images</label>
          <div className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all active:scale-95 ${theme.uploadBox}`} onClick={() => fileInputRef.current.click()}><div className={`p-3 rounded-full ${theme.uploadIconBg}`}><ImageIcon className="w-8 h-8 text-orange-500" /></div><p className={`font-semibold mt-2 text-sm ${theme.textMain}`}>Add Photos</p><input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} /></div>
          {previewUrls.length > 0 && (<div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">{previewUrls.map((url, index) => (<div key={index} className={`snap-start relative flex-shrink-0 w-20 h-20 rounded-xl border overflow-hidden shadow-sm ${darkMode ? 'border-white/10' : 'border-slate-200'}`}><img src={url} alt="Preview" className="w-full h-full object-cover" /><button type="button" onClick={() => removeImage(index)} className="absolute top-0.5 right-0.5 bg-black/60 backdrop-blur-md text-white p-1 rounded-full hover:bg-red-600 transition"><Trash2 size={12} /></button></div>))}</div>)}
        </div>
        
        <div className={`flex gap-3 pt-4 pb-6 sticky bottom-0 z-30 transition-colors duration-300 backdrop-blur-xl border-t ${darkMode ? 'bg-slate-950/80 border-white/10' : 'bg-slate-50/80 border-orange-200'} md:static md:bg-transparent md:border-none md:p-0`}>
          {isEditMode && (
              <button type="button" onClick={handleDelete} className={`flex-1 py-4 rounded-xl font-bold text-lg text-white shadow-lg bg-red-600 hover:bg-red-700 transition active:scale-95 border border-white/10 flex items-center justify-center gap-2`}> <Trash2 size={20}/> <span className="hidden md:inline">Delete</span></button>
          )}
          <button type="submit" disabled={loading} className={`flex-[2] py-4 rounded-xl font-bold text-lg text-white shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2 transition-transform active:scale-95 border border-white/10 ${loading ? 'bg-slate-700' : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500'}`}> {loading ? <><Loader2 className="animate-spin w-5 h-5"/> Processing...</> : <><CheckCircle className="w-5 h-5"/> {isEditMode ? "Update Product" : "Launch Product"}</>} </button>
        </div>
      </form>
    </>
  );
}