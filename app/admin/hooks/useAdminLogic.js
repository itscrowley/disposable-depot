// app/admin/hooks/useAdminLogic.js
import { useState, useRef, useEffect } from 'react';

export const useAdminLogic = () => {
  // --- CONFIG & CONSTANTS ---
  const isDevelopment = process.env.NODE_ENV === 'development';
  const ADMIN_PASSWORD = isDevelopment ? "dev123" : process.env.NEXT_PUBLIC_ADMIN_PASSWORD; 
  const CLOUDINARY_CLOUD_NAME = "dxojtisjb"; 
  const CLOUDINARY_PRESET = "ml_default"; 
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx9JLKPvml0rEFhdaRlWcXEQecEUmi7UNM7nTdRpLUGXre8Bw-rcJ05i2UiS3WV3-oUKg/exec";
  const PRODUCTS_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrqOVzDxQxS_qLSscWFtMck9wLXOZOqON7dx58EWCRP2ZXhxfsT9_bgjEZ5PT5VbMbNrS3z84CLVbt/pub?gid=0&single=true&output=csv';
  const CONFIG_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrqOVzDxQxS_qLSscWFtMck9wLXOZOqON7dx58EWCRP2ZXhxfsT9_bgjEZ5PT5VbMbNrS3z84CLVbt/pub?gid=1681585265&single=true&output=csv';

  // --- STATES ---
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  // List States
  const [categories, setCategories] = useState(["Packaged Water Glass", "Packaged Water Bottles"]); 
  const [tags, setTags] = useState(["None", "Hot Seller", "Travel Ready", "Party Essential", "Eco Friendly", "Bulk Pack", "Premium Quality", "Daily Use"]);
  const [badges, setBadges] = useState(["None", "New Arrival", "Best Seller", "Limited Stock", "50% OFF", "Premium"]);
  const [icons, setIcons] = useState(["📦", "🥤", "🍽️", "🥣", "🍴", "🧻", "🌯", "🍾", "✨", "🔥", "💧", "☕", "🥄", "🎉"]);
  const [existingProducts, setExistingProducts] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    id: '', title: '', category: '', subCategory: '', desc: '', tag: 'None', alt: '', images: '', 
    buttonText: 'Ask Price', availability: 'In Stock', price: '0', badge: 'None', 
    keywords: '', categoryIcon: '📦', stockQty: '100', lowLimit: '10', unit: 'PCS'
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [listManager, setListManager] = useState({ isOpen: false, title: "", items: [], type: "" });
  const [newItemInput, setNewItemInput] = useState("");
  const [configData, setConfigData] = useState({ glowText: "", showGlow: true, heroTitle: "", maintenanceMode: false, maintenanceEndTime: "", showSalesPopup: false, salesPopupDelay: "20000", salesPopupInterval: "50000" });
  const [configLoading, setConfigLoading] = useState(false);

  useEffect(() => {
    fetch(`${CONFIG_SHEET_URL}&t=${new Date().getTime()}`, { cache: 'no-store' }).then(res => res.text()).then(text => {
        const rows = text.split('\n').slice(1);
        let fetchedConfig = { ...configData };
        rows.forEach(row => {
          const parts = row.split(/,(.*)/s);
          if (parts.length >= 2) {
            const key = parts[0].replace(/^"|"$/g, '').trim().toLowerCase();
            const val = parts[1].replace(/^"|"$/g, '').trim();
            if (key === 'glow_text') fetchedConfig.glowText = val;
            if (key === 'hero_title') fetchedConfig.heroTitle = val;
            if (key === 'show_glow') fetchedConfig.showGlow = val.toUpperCase() === 'TRUE';
            if (key === 'maintenance_mode') fetchedConfig.maintenanceMode = val.toUpperCase() === 'TRUE';
            if (key === 'maintenance_end') fetchedConfig.maintenanceEndTime = val;
            if (key === 'show_sales_popup') fetchedConfig.showSalesPopup = val.toUpperCase() === 'TRUE';
            if (key === 'sales_popup_delay') fetchedConfig.salesPopupDelay = val;
            if (key === 'sales_popup_interval') fetchedConfig.salesPopupInterval = val;
          }
        });
        setConfigData(fetchedConfig);
    });
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch(`${PRODUCTS_SHEET_URL}&t=${new Date().getTime()}`, { cache: 'no-store' })
      .then(res => res.text())
      .then(text => {
        const rows = text.split('\n').slice(1);
        const products = rows.map(row => {
          const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          return {
            id: cols[0]?.replace(/^"|"$/g, '').trim(),
            title: cols[1]?.replace(/^"|"$/g, '').trim(),
            category: cols[2]?.replace(/^"|"$/g, '').trim(),
            subCategory: cols[3]?.replace(/^"|"$/g, '').trim(),
            desc: cols[4]?.replace(/^"|"$/g, '').trim(),
            tag: cols[5]?.replace(/^"|"$/g, '').trim(),
            alt: cols[6]?.replace(/^"|"$/g, '').trim(),
            images: cols[7]?.replace(/^"|"$/g, '').trim(),
            buttonText: cols[8]?.replace(/^"|"$/g, '').trim(),
            availability: cols[9]?.replace(/^"|"$/g, '').trim(),
            price: cols[10]?.replace(/^"|"$/g, '').trim(),
            badge: cols[11]?.replace(/^"|"$/g, '').trim(),
            keywords: cols[12]?.replace(/^"|"$/g, '').trim(),
            categoryIcon: cols[13]?.replace(/^"|"$/g, '').trim(),
            stockQty: cols[14]?.replace(/^"|"$/g, '').trim(),
            lowLimit: cols[15]?.replace(/^"|"$/g, '').trim(),
            unit: cols[16]?.replace(/^"|"$/g, '').trim(),
          };
        }).filter(p => p.id); 
        setExistingProducts(products);
        const sheetCategories = [...new Set(products.map(p => p.category).filter(c => c && c.trim() !== ""))];
        if (sheetCategories.length > 0) {
            setCategories(sheetCategories);
            if(!formData.category) setFormData(prev => ({...prev, category: sheetCategories[0]}));
        }
      }).catch(err => console.error("Error fetching products", err));
  };

  const generateNextId = () => {
    if (existingProducts.length === 0) return "1";
    const maxId = existingProducts.reduce((max, p) => { const num = parseInt(p.id.replace(/\D/g, '')); return !isNaN(num) && num > max ? num : max; }, 0);
    return (maxId + 1).toString();
  };

  // 🔥 NEW: AI Logic for Auto-Filling Content
  const generateAutoContent = () => {
    const { title, category, subCategory } = formData;
    if (!title) { alert("Please enter a Title first!"); return; }

    const cleanTitle = title.trim();
    const cleanCat = category || "Disposable Items";
    const cleanSub = subCategory || "";

    // 1. Generate Description
    const newDesc = `Premium quality ${cleanTitle} available in ${cleanSub}. Perfect for ${cleanCat}, events, parties, and daily use. Wholesale rates available at The Disposable Depot, Jalandhar. Durable, eco-friendly, and best in class.`;

    // 2. Generate Alt Text (SEO)
    const newAlt = `${cleanTitle} ${cleanSub} ${cleanCat} wholesale Jalandhar`;

    // 3. Generate Keywords
    const newKeywords = `${cleanTitle}, ${cleanCat}, ${cleanSub}, Wholesale ${cleanTitle}, Bulk Disposable Items, Party Supplies Jalandhar, ${cleanTitle} Price, The Disposable Depot`;

    setFormData(prev => ({
        ...prev,
        desc: newDesc,
        alt: newAlt,
        keywords: newKeywords
    }));
  };

  const handleLogin = (e) => { e.preventDefault(); if (!isDevelopment && !ADMIN_PASSWORD) { alert("Admin Password NOT set."); return; } if (passwordInput === ADMIN_PASSWORD) { setIsAuthenticated(true); } else { alert("Wrong Password!"); setPasswordInput(""); } };
  const handleChange = (e) => { const { name, value } = e.target; setFormData({ ...formData, [name]: value }); };
  
  const startNewProduct = () => { 
      const nextId = generateNextId();
      setFormData({ id: nextId, title: '', category: categories[0] || '', subCategory: '', desc: '', tag: 'None', badge: 'None', categoryIcon: '📦', alt: '', keywords: '', stockQty: '100', lowLimit: '10', unit: 'PCS', images: '', price: '0', availability: 'In Stock', buttonText: 'Ask Price' }); 
      setSelectedFiles([]); setPreviewUrls([]); setIsEditMode(false); 
  };

  const openListManager = (title, items, type) => { setListManager({ isOpen: true, title, items, type }); setNewItemInput(""); };
  
  const addItemToList = () => { 
      if (newItemInput.trim()) { 
          if (listManager.type === 'category') setCategories([...categories, newItemInput]);
          else if (listManager.type === 'tag') setTags([...tags, newItemInput]);
          else if (listManager.type === 'badge') setBadges([...badges, newItemInput]);
          else if (listManager.type === 'icon') setIcons([...icons, newItemInput]);
          else { setListManager({ ...listManager, isOpen: false }); }
          setNewItemInput(""); 
      }
  };

  const moveListItem = (index, direction) => {
    const list = [...listManager.items];
    if (direction === 'up' && index > 0) { [list[index], list[index - 1]] = [list[index - 1], list[index]]; } 
    else if (direction === 'down' && index < list.length - 1) { [list[index], list[index + 1]] = [list[index + 1], list[index]]; }
    if (listManager.type === 'category') setCategories(list);
    else if (listManager.type === 'tag') setTags(list);
    else if (listManager.type === 'badge') setBadges(list);
    else if (listManager.type === 'icon') setIcons(list);
    setListManager({ ...listManager, items: list });
  };

  const removeItemFromList = async (index, itemValue) => { 
      if (listManager.type === 'id' || listManager.type === 'title') {
          if(!confirm(`⚠️ DELETE Product: "${itemValue}"?\nThis cannot be undone.`)) return;
          let idToDelete = itemValue;
          if (listManager.type === 'title') { const prod = existingProducts.find(p => p.title === itemValue); if(prod) idToDelete = prod.id; }
          setLoading(true);
          try { await fetch(GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "deleteProduct", id: idToDelete }) }); alert("🗑️ Product Deleted!"); fetchProducts(); setListManager({ ...listManager, isOpen: false }); } catch(e) { alert("Delete failed"); } finally { setLoading(false); }
      } else {
          const updatedList = listManager.items.filter((_, i) => i !== index);
          if (listManager.type === 'category') setCategories(updatedList);
          else if (listManager.type === 'tag') setTags(updatedList);
          else if (listManager.type === 'badge') setBadges(updatedList);
          else if (listManager.type === 'icon') setIcons(updatedList);
          setListManager({ ...listManager, items: updatedList });
      }
  };

  const handleListSelect = (itemValue) => {
      const found = existingProducts.find(p => (listManager.type === 'id' ? p.id : p.title) === itemValue);
      if (found) { 
          setIsEditMode(true); 
          setFormData({ ...found, tag: found.tag || "None", badge: found.badge || "None", stockQty: found.stockQty || "0", lowLimit: found.lowLimit || "10", unit: found.unit || "PCS", price: found.price || "0", availability: found.availability || "In Stock", buttonText: found.buttonText || "Ask Price" }); 
          setPreviewUrls(found.images ? found.images.split(',').map(url => url.trim()).filter(url => url) : []); 
          setListManager({...listManager, isOpen: false}); 
      }
  };

  const handleImageChange = (e) => { if (e.target.files) { const files = Array.from(e.target.files); setSelectedFiles(prev => [...prev, ...files]); setPreviewUrls(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]); }};
  const removeImage = (index) => { 
      const urlToRemove = previewUrls[index]; const newPreviews = previewUrls.filter((_, i) => i !== index); setPreviewUrls(newPreviews);
      if (urlToRemove.startsWith('blob:')) { const existingImagesCount = previewUrls.filter(u => !u.startsWith('blob:')).length; const fileIndex = index - existingImagesCount; if (fileIndex >= 0) { const newFiles = selectedFiles.filter((_, i) => i !== fileIndex); setSelectedFiles(newFiles); } }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); if (!isEditMode && selectedFiles.length === 0) { alert("Select at least one image!"); return; } 
    setLoading(true); setProgress(0); const uploadedUrls = [];
    try {
      if (selectedFiles.length > 0) {
        for (let i = 0; i < selectedFiles.length; i++) { 
            const formData = new FormData(); formData.append('file', selectedFiles[i]); formData.append('upload_preset', CLOUDINARY_PRESET); 
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: formData }); 
            const data = await res.json(); uploadedUrls.push(data.secure_url); setProgress(Math.round(((i + 1) / selectedFiles.length) * 100)); 
        }
      }
      const currentExistingImages = previewUrls.filter(url => !url.startsWith('blob:')); let finalImages = [...currentExistingImages, ...uploadedUrls].join(', ');
      const finalData = { ...formData, image: finalImages, tag: formData.tag === "None" ? "" : formData.tag, badge: formData.badge === "None" ? "" : formData.badge, action: isEditMode ? "editProduct" : "addProduct" };
      await fetch(GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(finalData) });
      alert(isEditMode ? "🎉 Product Updated!" : "🎉 Product is Live!"); startNewProduct(); fetchProducts();
    } catch (error) { alert("Error: " + error.message); } finally { setLoading(false); }
  };

  const handleDelete = async () => { if(!confirm("⚠️ DELETE this product?\nThis cannot be undone!")) return; setLoading(true); try { await fetch(GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "deleteProduct", id: formData.id }) }); alert("🗑️ Product Deleted!"); startNewProduct(); fetchProducts(); } catch(e) { alert("Delete failed"); } finally { setLoading(false); } };
  const handleUpdateConfig = async () => { setConfigLoading(true); try { await fetch(GOOGLE_SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "updateConfig", glowText: configData.glowText, showGlow: configData.showGlow, heroTitle: configData.heroTitle, maintenanceMode: configData.maintenanceMode, maintenanceEndTime: configData.maintenanceEndTime, showSalesPopup: configData.showSalesPopup, salesPopupDelay: configData.salesPopupDelay, salesPopupInterval: configData.salesPopupInterval }) }); alert("✅ Settings Updated!"); setShowSettingsModal(false); } catch (error) { alert("Failed to update settings"); } finally { setConfigLoading(false); } };
  const isDuplicateId = existingProducts.some(p => p.id.toLowerCase() === formData.id.toLowerCase());

  // ✅ generateAutoContent ko export me add kiya
  return {
    state: { darkMode, isAuthenticated, passwordInput, showPassword, loading, isEditMode, progress, fileInputRef, categories, tags, badges, icons, existingProducts, formData, selectedFiles, previewUrls, showSettingsModal, listManager, newItemInput, configData, configLoading, isDuplicateId },
    actions: { setDarkMode, setPasswordInput, setShowPassword, handleLogin, handleChange, startNewProduct, openListManager, addItemToList, moveListItem, removeItemFromList, handleListSelect, handleImageChange, removeImage, handleSubmit, handleDelete, handleUpdateConfig, setNewItemInput, setShowSettingsModal, setListManager, setConfigData, generateAutoContent }
  };
};