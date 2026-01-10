// app/admin/components/AdminUI.js
import React from 'react';
import AdminLogin from './AdminLogin';
import DashboardHeader from './DashboardHeader';
import ProductForm from './ProductForm';
import ListManagerModal from './ListManagerModal';
import SettingsModal from './SettingsModal';

export default function AdminUI({ state, actions }) {
  const { darkMode, isAuthenticated, showSettingsModal, listManager } = state;

  // Global Theme Object (Sabko pass karenge)
  const theme = { 
    card: darkMode ? "bg-black/40 border-white/10" : "bg-white/80 border-white/60 shadow-xl", 
    textMain: darkMode ? "text-white" : "text-slate-900", 
    textSub: darkMode ? "text-slate-400" : "text-slate-600", 
    input: darkMode ? "bg-black/30 border-white/10 text-white placeholder-slate-500" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400", 
    uploadBox: darkMode ? "bg-white/5 border-white/10 hover:border-orange-500" : "bg-white/50 border-slate-300 hover:bg-orange-50 hover:border-orange-500", 
    uploadIconBg: darkMode ? "bg-white/10" : "bg-white shadow-sm", 
    addNewBtn: darkMode ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200" 
  };

  // 1. Agar login nahi hai, to Login Screen
  if (!isAuthenticated) {
    return <AdminLogin state={state} actions={actions} theme={theme} />;
  }

  // 2. Main Dashboard
  return (
    <div className={`fixed inset-0 z-[99999] overflow-y-auto overflow-x-hidden py-0 px-0 md:py-8 md:px-3 flex justify-center items-start font-sans transition-all duration-500 ${darkMode ? "bg-slate-950" : "bg-slate-50"} overscroll-none`}>
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${darkMode ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50 via-white to-slate-100"}`}></div>
      
      <div className={`${theme.card} w-full max-w-4xl md:rounded-3xl rounded-none shadow-2xl overflow-hidden border backdrop-blur-xl relative z-10 transition-colors duration-300 mx-auto min-h-screen md:min-h-fit flex flex-col`}>
        
        {/* Components ko jod rahe hain */}
        <DashboardHeader state={state} actions={actions} theme={theme} />
        
        <ProductForm state={state} actions={actions} theme={theme} />

        {listManager.isOpen && <ListManagerModal state={state} actions={actions} theme={theme} />}
        
        {showSettingsModal && <SettingsModal state={state} actions={actions} theme={theme} />}
        
      </div>
    </div>
  );
}