import React from 'react';
import { KeyRound, Eye, EyeOff, Sun, Moon } from 'lucide-react';

export default function AdminLogin({ state, actions, theme }) {
  const { passwordInput, showPassword, darkMode } = state;
  const { setPasswordInput, setShowPassword, handleLogin, setDarkMode } = actions;

  const ThemeSwitch = () => ( <div onClick={() => setDarkMode(!darkMode)} className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-all duration-300 ease-in-out border backdrop-blur-md shadow-inner flex items-center ${darkMode ? 'bg-slate-800/60 border-white/20' : 'bg-white/60 border-slate-300'}`}> <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}> {darkMode ? <Moon size={10} className="text-slate-800 fill-slate-800" /> : <Sun size={12} className="text-orange-500 fill-orange-500" />} </div> </div> );

  return (
    <div className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 transition-colors duration-500 ${darkMode ? "bg-slate-950" : "bg-slate-100"}`}>
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${darkMode ? "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-950 to-slate-950 opacity-100" : "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100 via-white to-slate-100 opacity-100"}`}></div>
      <div className={`${theme.card} backdrop-blur-xl border shadow-2xl max-w-sm w-full rounded-3xl overflow-hidden relative z-10 transition-colors duration-300`}>
        <div className={`p-8 flex flex-col items-center relative border-b ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
          <div className="absolute top-6 right-6 z-20"><ThemeSwitch /></div>
          <div className="p-0.01 rounded-2xl mb-1 shadow-lg shadow-orange-500/300"> <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain" /> </div>
          <h2 className={`text-2xl font-bold tracking-tight ${theme.textMain}`}>Admin Access</h2>
          <p className={`text-sm mt-1 font-medium ${theme.textSub}`}>Enter PIN to manage inventory</p>
        </div>
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="relative group">
            <div className="relative">
              <KeyRound className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <input type={showPassword ? "text" : "password"} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className={`w-full pl-12 pr-12 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition-all ${theme.input}`} placeholder="Secret PIN" autoFocus />
              <button type="button" className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'}`} onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)} onMouseLeave={() => setShowPassword(false)} onTouchStart={() => setShowPassword(true)} onTouchEnd={() => setShowPassword(false)} > {showPassword ? <Eye size={18} /> : <EyeOff size={18} />} </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-900/20 transform transition active:scale-95 border border-white/10">Unlock Dashboard</button>
        </form>
      </div>
    </div>
  );
}