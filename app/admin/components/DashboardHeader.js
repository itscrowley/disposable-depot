import React from 'react';
import { PlusCircle, Settings, Sun, Moon } from 'lucide-react';

export default function DashboardHeader({ state, actions, theme }) {
  const { isEditMode, darkMode } = state;
  const { startNewProduct, setShowSettingsModal, setDarkMode } = actions;

  const ThemeSwitch = () => ( <div onClick={() => setDarkMode(!darkMode)} className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-all duration-300 ease-in-out border backdrop-blur-md shadow-inner flex items-center ${darkMode ? 'bg-slate-800/60 border-white/20' : 'bg-white/60 border-slate-300'}`}> <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}> {darkMode ? <Moon size={10} className="text-slate-800 fill-slate-800" /> : <Sun size={12} className="text-orange-500 fill-orange-500" />} </div> </div> );

  return (
    <div className="backdrop-blur-md p-5 flex items-center justify-between sticky top-0 z-20 border-b bg-gradient-to-r from-orange-600/90 to-red-600/90 border-white/10 text-white shadow-sm">
      <div>
        <h1 className="text-lg md:text-2xl font-bold tracking-tight">{isEditMode ? 'Edit Product' : 'Add Product'}</h1>
        <p className="text-xs text-orange-100 opacity-90">Inventory Manager</p>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <div className="scale-[0.8] origin-right"><ThemeSwitch /></div>
        <button onClick={startNewProduct} className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1 transition active:scale-95 border border-white/20 shadow-sm whitespace-nowrap" title="Start Fresh Entry">
            <PlusCircle size={14} /> <span className="hidden md:inline">Add New</span><span className="md:hidden">New</span>
        </button>
        <button onClick={() => setShowSettingsModal(true)} className="p-2 rounded-xl backdrop-blur-md border bg-white/10 border-white/20 hover:bg-white/20 transition active:scale-95"> 
            <Settings className="w-5 h-5 text-white" /> 
        </button>
        <div className="hidden md:block"><img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" /></div>
      </div>
    </div>
  );
}