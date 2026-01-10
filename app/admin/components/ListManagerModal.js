// app/admin/components/ListManagerModal.js
import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function ListManagerModal({ state, actions, theme }) {
  const { listManager, newItemInput, darkMode } = state;
  const { setListManager, setNewItemInput, addItemToList, removeItemFromList, handleListSelect } = actions;

  return (
    <div className="fixed inset-0 z-[100000] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4 animate-in fade-in duration-200">
       <div className={`w-full md:max-w-sm max-h-[85vh] flex flex-col p-5 rounded-t-3xl md:rounded-2xl shadow-2xl relative border ${theme.card} ${darkMode ? 'bg-slate-900' : 'bg-white'} animate-in slide-in-from-bottom-10 duration-300`}>
          <div className="w-12 h-1.5 bg-slate-500/30 rounded-full mx-auto mb-4 md:hidden"></div>
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
             <h3 className={`font-bold text-lg ${theme.textMain}`}>{listManager.title}</h3>
             <button onClick={() => setListManager({ ...listManager, isOpen: false })}><X size={24} className="text-slate-400 hover:text-red-500"/></button>
          </div>
          
          <div className="flex gap-2 mb-4 shrink-0">
             <input type="text" value={newItemInput} onChange={(e) => setNewItemInput(e.target.value)} placeholder="Add or Search..." className={`flex-1 p-3.5 md:p-2 rounded-xl md:rounded-lg border text-base md:text-sm ${theme.input} focus:border-orange-500 outline-none`} onKeyDown={(e) => e.key === 'Enter' && addItemToList()} />
             {(listManager.type !== 'id' && listManager.type !== 'title') && (
                <button onClick={addItemToList} className="bg-orange-600 text-white p-3.5 md:p-2 rounded-xl md:rounded-lg hover:bg-orange-500"><Plus size={20}/></button>
             )}
          </div>

          <div className="overflow-y-auto pr-1 custom-scrollbar flex-1 min-h-0 pb-safe md:pb-0">
             {listManager.items.length > 0 ? (
               <div className="space-y-2">
                 {listManager.items.map((item, index) => (
                    <div key={index} className={`flex justify-between items-center p-3.5 md:p-2 rounded-xl md:rounded-lg border active:scale-[0.98] transition-transform ${darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                       <span 
                         className={`text-base md:text-sm break-all ${theme.textMain} ${(listManager.type === 'id' || listManager.type === 'title') ? 'cursor-pointer hover:text-orange-500 underline' : ''}`}
                         onClick={() => (listManager.type === 'id' || listManager.type === 'title') ? handleListSelect(item) : null}
                       >
                         {item}
                       </span>
                       <button onClick={() => removeItemFromList(index, item)} className="text-slate-400 hover:text-red-500 ml-2 shrink-0 p-2">
                           <Trash2 size={18} />
                       </button>
                    </div>
                 ))}
               </div>
             ) : ( <p className="text-center text-slate-500 text-sm py-4">No items found.</p> )}
          </div>
       </div>
    </div>
  );
}