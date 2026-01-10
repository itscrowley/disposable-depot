// app/admin/components/SettingsModal.js
import React from 'react';
import { Settings, X, AlertTriangle, Smile } from 'lucide-react';

export default function SettingsModal({ state, actions, theme }) {
  const { configData, configLoading, darkMode } = state;
  const { setShowSettingsModal, setConfigData, handleUpdateConfig } = actions;

  return (
    <div className="fixed inset-0 z-[100000] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4 animate-in fade-in duration-200">
      <div className={`w-full md:max-w-md max-h-[90vh] flex flex-col p-6 rounded-t-3xl md:rounded-2xl shadow-2xl relative border ${theme.card} ${darkMode ? 'bg-slate-900' : 'bg-white'} animate-in slide-in-from-bottom-10 duration-300`}>
        <div className="w-12 h-1.5 bg-slate-500/30 rounded-full mx-auto mb-4 md:hidden"></div>
        <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-bold flex items-center gap-2 ${theme.textMain}`}><Settings className="text-orange-500"/> Website Settings</h2>
            <button onClick={() => setShowSettingsModal(false)} className="text-slate-400 hover:text-red-500"><X size={24} /></button>
        </div>
        
        <div className="space-y-5 overflow-y-auto pr-2 scrollbar-hide flex-1 min-h-0 pb-safe md:pb-0">
          <div><label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${theme.textSub}`}>Glow Strip Text</label><input type="text" value={configData.glowText} onChange={(e) => setConfigData({...configData, glowText: e.target.value})} placeholder="Sale! | Discount" className={`w-full p-3.5 md:p-2 text-sm rounded-xl md:rounded-lg border ${theme.input} focus:border-orange-500`} /><p className="text-[10px] text-slate-500 mt-1">Use <b>|</b> to separate.</p></div>
          <div><label className={`block text-xs font-bold mb-1.5 uppercase tracking-wide ${theme.textSub}`}>Hero Banner Text</label><input type="text" value={configData.heroTitle} onChange={(e) => setConfigData({...configData, heroTitle: e.target.value})} className={`w-full p-3.5 md:p-2 text-sm rounded-xl md:rounded-lg border ${theme.input} focus:border-orange-500`} /></div>
          
          <div className="flex items-center justify-between p-4 rounded-xl border border-red-500/30 bg-red-500/10">
            <span className={`font-bold flex items-center gap-3 ${theme.textMain}`}><AlertTriangle size={20} className="text-red-500"/> Maintenance Mode</span>
            <button onClick={() => setConfigData({...configData, maintenanceMode: !configData.maintenanceMode})} className={`w-14 h-7 rounded-full p-1 transition-colors ${configData.maintenanceMode ? 'bg-red-500' : 'bg-slate-600'}`}><div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${configData.maintenanceMode ? 'translate-x-7' : 'translate-x-0'}`} /></button>
          </div>
          
          {configData.maintenanceMode && (<div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-2 animate-in fade-in slide-in-from-top-2"><div className={`text-xs p-2 rounded-lg border ${darkMode ? 'bg-black/20 border-white/10' : 'bg-white border-slate-200'}`}><span className={`font-mono ${theme.textMain}`}>Current: {configData.maintenanceEndTime || "Not Set"}</span></div><input type="text" value={configData.maintenanceEndTime} onChange={(e) => setConfigData({...configData, maintenanceEndTime: e.target.value})} placeholder="YYYY-MM-DDTHH:MM:SS" className={`w-full p-3.5 md:p-2 text-xs rounded-xl md:rounded-lg border ${theme.input} focus:border-red-500`} /></div>)}
          
          <div className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5">
            <span className={`font-bold text-sm ${theme.textMain}`}>Show Glow Strip</span>
            <button onClick={() => setConfigData({...configData, showGlow: !configData.showGlow})} className={`w-14 h-7 rounded-full p-1 transition-colors ${configData.showGlow ? 'bg-green-500' : 'bg-slate-600'}`}><div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${configData.showGlow ? 'translate-x-7' : 'translate-x-0'}`} /></button>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-orange-500/30 bg-orange-500/10">
              <span className={`font-bold flex items-center gap-3 text-sm ${theme.textMain}`}><Smile size={20} className="text-orange-500"/> Sales Popup</span>
              <button onClick={() => setConfigData({...configData, showSalesPopup: !configData.showSalesPopup})} className={`w-14 h-7 rounded-full p-1 transition-colors ${configData.showSalesPopup ? 'bg-orange-500' : 'bg-slate-600'}`}><div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${configData.showSalesPopup ? 'translate-x-7' : 'translate-x-0'}`} /></button>
            </div>
            {configData.showSalesPopup && (<div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300"><div><label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Delay (ms)</label><input type="number" value={configData.salesPopupDelay} onChange={(e) => setConfigData({...configData, salesPopupDelay: e.target.value})} className={`w-full p-3 md:p-2 text-xs rounded-xl border ${theme.input} focus:border-orange-500`} /></div><div><label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Interval (ms)</label><input type="number" value={configData.salesPopupInterval} onChange={(e) => setConfigData({...configData, salesPopupInterval: e.target.value})} className={`w-full p-3 md:p-2 text-xs rounded-xl border ${theme.input} focus:border-orange-500`} /></div></div>)}
          </div>

          <button onClick={handleUpdateConfig} disabled={configLoading} className="w-full py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 transition shadow-lg mt-4 active:scale-95 transform duration-150">{configLoading ? "Updating..." : "Save Changes"}</button>
        </div>
      </div>
    </div>
  );
}