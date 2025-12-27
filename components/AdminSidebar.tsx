'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkLogin } from './action'; 

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await checkLogin(formData);

    if (result.success) {
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } else {
      setError(result.message || 'Login Failed');
      setLoading(false);
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      
      <style jsx global>{`
        /* STYLES (Same as before) */
        .ios-toggle { position: relative; width: 52px; height: 30px; background-color: #e5e7eb; border-radius: 9999px; cursor: pointer; transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); }
        .ios-toggle.active { background-color: #ea580c; }
        .ios-thumb { position: absolute; top: 2px; left: 2px; width: 26px; height: 26px; background-color: white; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.2); transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .ios-toggle.active .ios-thumb { transform: translateX(22px); }
        .dark .ios-toggle { background-color: #374151; }
        .dark .ios-toggle.active { background-color: #ea580c; }

        .login-input { background-color: #ffffff !important; color: #111827 !important; border: 1px solid #d1d5db !important; transition: all 0.2s ease !important; width: 100% !important; }
        .login-input:focus { border-color: #ea580c !important; box-shadow: 0 0 0 2px rgba(234, 88, 12, 0.2) !important; }
        .login-card { background-color: #ffffff !important; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important; transition: background-color 0.3s ease !important; }
        .login-text { color: #1f2937 !important; }
        .login-bg { background-color: #f3f4f6 !important; transition: background-color 0.3s ease !important; }

        .dark .login-input { background-color: #374151 !important; color: #ffffff !important; border: 1px solid #4b5563 !important; }
        .dark .login-card { background-color: #1f2937 !important; border-color: #374151 !important; }
        .dark .login-text { color: #f3f4f6 !important; }
        .dark .login-bg { background-color: #111827 !important; }
        .dark .login-subtext { color: #9ca3af !important; }
        
        /* Disable text selection while holding button so it doesn't feel glitchy */
        .no-select { user-select: none; -webkit-user-select: none; }
      `}</style>

      <div className="login-bg fixed inset-0 z-[99999] w-full h-full flex items-center justify-center font-sans overflow-hidden">
        
        {/* iOS Switch */}
        <div className="absolute top-6 right-6 z-20">
            <div className={`ios-toggle ${darkMode ? 'active' : ''}`} onClick={() => setDarkMode(!darkMode)} title="Toggle Theme">
              <div className="ios-thumb"></div>
            </div>
        </div>

        {/* Login Card */}
        <div className="login-card w-full max-w-md p-8 rounded-2xl border border-gray-200 relative z-10 m-4">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-orange-600 tracking-wider m-0">TDD Admin</h1>
            <p className="login-subtext text-gray-500 text-sm mt-2 transition-colors">Sign in to manage your store</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-bold rounded-lg border border-red-200 dark:border-red-800 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="login-text block text-sm font-bold text-gray-700 mb-2 transition-colors">Email Address</label>
              <input 
                name="email" 
                type="email" 
                required
                className="login-input px-4 py-3 rounded-xl outline-none"
                placeholder="Enter admin email"
              />
            </div>

            <div className="relative">
              <label className="login-text block text-sm font-bold text-gray-700 mb-2 transition-colors">Password</label>
              <div className="relative">
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"} 
                  required
                  className="login-input px-4 py-3 pr-12 rounded-xl outline-none"
                  placeholder="••••••••"
                />
                
                {/* ✅ CLICK & HOLD EYE BUTTON */}
                <button
                  type="button"
                  // Desktop Events
                  onMouseDown={() => setShowPassword(true)}
                  onMouseUp={() => setShowPassword(false)}
                  onMouseLeave={() => setShowPassword(false)} // Agar mouse bahar chala gaya to band karo
                  // Mobile Events
                  onTouchStart={() => setShowPassword(true)}
                  onTouchEnd={() => setShowPassword(false)}
                  
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors focus:outline-none no-select cursor-pointer p-1"
                  title="Hold to show password"
                >
                  {showPassword ? (
                    // Eye Icon (Open - jab hold kar rahe ho)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-orange-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    // Eye Slash Icon (Default - jab chhupa hai)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`
                w-full py-3.5 rounded-xl text-white font-bold tracking-wide shadow-lg
                transition-all duration-200
                ${loading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 active:scale-95'}
              `}
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-xs">© 2025 The Disposable Depot</p>
          </div>
        </div>
      </div>
    </div>
  );
}
