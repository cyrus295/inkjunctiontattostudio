import React, { useState, useEffect } from "react";
import axios from "axios";
import { useData } from "../hooks/useData.js";
import { Plus, Trash2, Edit2, Save, X, Upload, CheckCircle, AlertCircle, LayoutDashboard, Settings, Tag, Eye, EyeOff, Image as ImageIcon, Video } from "lucide-react";

const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : "http://localhost:5000";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AdminPanel = () => {
  const { portfolio, content, offers, loading, backendConnected, refreshData } = useData();
  const [activeTab, setActiveTab] = useState("portfolio");
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ type: "image", src: "", beforeSrc: "", style: "Traditional", caption: "" });
  
  // Offer State
  const [editingOffer, setEditingOffer] = useState(null);
  const [newOffer, setNewOffer] = useState({ title: "", description: "", type: "image", src: "", isActive: true, expiresAt: "" });

  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const categories = ["Traditional", "Realism", "Blackwork", "Watercolor", "Geometric", "Japanese", "Dotwork", "New School", "Portrait", "Coverup"];

  const showAlert = (type, message) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: "", message: "" }), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium animate-pulse">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const handleFileUpload = async (e, target, isNew = true, contentKey = null, isBefore = false) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await axios.post(`${API_URL}/upload`, formData);
      const url = res.data.url;

      if (target === "portfolio") {
        if (isBefore) {
          if (isNew) setNewItem({ ...newItem, beforeSrc: url });
          else setEditingItem({ ...editingItem, beforeSrc: url });
        } else {
          if (isNew) setNewItem({ ...newItem, src: url });
          else setEditingItem({ ...editingItem, src: url });
        }
      } else if (target === "offer") {
        if (isNew) setNewOffer({ ...newOffer, src: url });
        else setEditingOffer({ ...editingOffer, src: url });
      } else if (target === "content" && contentKey) {
        await handleUpdateContent(contentKey, url);
        showAlert("success", "Media updated successfully!");
      }
      
      if (target !== "content") showAlert("success", "File uploaded successfully!");
    } catch (error) {
      showAlert("error", "Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  // Portfolio Handlers
  const handleAddPortfolio = async () => {
    if (!newItem.src || !newItem.style || !newItem.caption) return showAlert("error", "Please fill all fields");
    try {
      await axios.post(`${API_URL}/portfolio`, newItem);
      setNewItem({ type: "image", src: "", beforeSrc: "", style: "Traditional", caption: "" });
      showAlert("success", "Portfolio item added!");
      refreshData();
    } catch (error) { showAlert("error", "Failed to add item."); }
  };

  const handleUpdatePortfolio = async () => {
    try {
      await axios.put(`${API_URL}/portfolio/${editingItem._id}`, editingItem);
      setEditingItem(null);
      showAlert("success", "Portfolio item updated!");
      refreshData();
    } catch (error) { showAlert("error", "Failed to update item."); }
  };

  const handleDeletePortfolio = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${API_URL}/portfolio/${id}`);
      showAlert("success", "Portfolio item deleted!");
      refreshData();
    } catch (error) { showAlert("error", "Failed to delete item."); }
  };

  // Offer Handlers
  const handleAddOffer = async () => {
    if (!newOffer.title || !newOffer.description || !newOffer.src) return showAlert("error", "Please fill all fields");
    try {
      await axios.post(`${API_URL}/offers`, newOffer);
      setNewOffer({ title: "", description: "", type: "image", src: "", isActive: true });
      showAlert("success", "Offer added successfully!");
      refreshData();
    } catch (error) { showAlert("error", "Failed to add offer."); }
  };

  const handleUpdateOffer = async () => {
    try {
      const dataToUpdate = { 
        ...editingOffer, 
        expiresAt: editingOffer.expiresAt || undefined 
      };
      await axios.put(`${API_URL}/offers/${editingOffer._id}`, dataToUpdate);
      setEditingOffer(null);
      showAlert("success", "Offer updated!");
      refreshData();
    } catch (error) { showAlert("error", "Failed to update offer."); }
  };

  const handleDeleteOffer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;
    try {
      await axios.delete(`${API_URL}/offers/${id}`);
      showAlert("success", "Offer deleted!");
      refreshData();
    } catch (error) { showAlert("error", "Failed to delete offer."); }
  };

  const toggleOfferStatus = async (offer) => {
    try {
      await axios.put(`${API_URL}/offers/${offer._id}`, { ...offer, isActive: !offer.isActive });
      refreshData();
    } catch (error) { showAlert("error", "Failed to toggle status."); }
  };

  // Content Handler
  const handleUpdateContent = async (key, value) => {
    try {
      await axios.post(`${API_URL}/content`, { key, value });
      showAlert("success", "Content updated!");
      refreshData();
    } catch (error) { showAlert("error", "Failed to update content."); }
  };

  const MediaUploadField = ({ label, contentKey, type = "video" }) => {
    const currentVal = content[contentKey];
    const fullUrl = currentVal?.startsWith('http') ? currentVal : `${SOCKET_URL}${currentVal}`;
    
    return (
      <div className="bg-black/40 border border-white/5 p-6 rounded-3xl space-y-4">
        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</label>
        <div className="flex gap-4">
          <input 
            type="text" 
            value={currentVal || ""} 
            onChange={(e) => handleUpdateContent(contentKey, e.target.value)}
            placeholder={`Paste ${type} URL or upload`}
            className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-green-500 outline-none transition-all"
          />
          <label className="cursor-pointer bg-green-600 hover:bg-green-500 text-black p-2.5 rounded-xl transition-all shadow-lg active:scale-95">
            <Upload size={18} />
            <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "content", true, contentKey)} />
          </label>
        </div>
        {currentVal && (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
            {type === "image" ? (
              <img src={fullUrl} className="w-full h-full object-cover" />
            ) : (
              <video src={fullUrl} className="w-full h-full object-cover" />
            )}
          </div>
        )}
      </div>
    );
  };

  if (!backendConnected) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2 uppercase tracking-tighter italic">Backend Not Connected</h1>
        <p className="text-slate-500 font-medium">Please start the backend server to use the Admin Panel.</p>
        <button onClick={refreshData} className="mt-8 px-8 py-3 bg-green-600 hover:bg-green-500 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">Retry Connection</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-400 font-sans selection:bg-white selection:text-black">
      {/* Top Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-white/5 px-8 py-6 flex justify-between items-center sticky top-0 z-[100]">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center text-black font-black text-xl shadow-2xl">IJ</div>
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">INK JUNCTION</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] leading-none mt-1">Management Console</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            Secure Session
          </span>
          <a href="/" className="px-6 py-2 border border-white/10 rounded-sm text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all">Exit to Site</a>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-8 py-12 flex gap-12">
        {/* Sidebar */}
        <aside className="w-72 flex-shrink-0">
          <nav className="space-y-2 sticky top-28">
            {[
              { id: "portfolio", label: "Portfolio", icon: LayoutDashboard },
              { id: "coverup", label: "Coverup", icon: ImageIcon },
              { id: "media", label: "Media Hub", icon: Video },
              { id: "offers", label: "Active Offers", icon: Tag },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-sm text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  activeTab === tab.id 
                  ? "bg-white text-black shadow-xl scale-[1.02]" 
                  : "text-slate-500 hover:bg-white/5 hover:text-white"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {status.message && (
            <div className={`mb-8 p-5 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top duration-500 border ${status.type === "success" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"}`}>
              {status.type === "success" ? <CheckCircle size={22} /> : <AlertCircle size={22} />}
              <p className="text-sm font-bold uppercase tracking-widest">{status.message}</p>
            </div>
          )}

          {activeTab === "portfolio" && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Add New Item Card */}
              <div className="bg-black border border-white/5 rounded-sm shadow-2xl overflow-hidden">
                <div className="px-10 py-8 border-b border-white/5 bg-zinc-950/50">
                  <h2 className="font-black text-white uppercase tracking-widest text-sm">Add Portfolio Asset</h2>
                </div>
                <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3">Asset Type</label>
                      <select value={newItem.type} onChange={(e) => setNewItem({...newItem, type: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm px-5 py-4 text-white focus:border-white outline-none transition-all">
                        <option value="image">Still Photography</option>
                        <option value="video">Cinematic Video</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3">Category</label>
                      <select value={newItem.style} onChange={(e) => setNewItem({...newItem, style: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm px-5 py-4 text-white focus:border-white outline-none transition-all">
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3">Asset Title</label>
                      <input type="text" value={newItem.caption} onChange={(e) => setNewItem({...newItem, caption: e.target.value})} placeholder="Enter title..." className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm px-5 py-4 text-white focus:border-white outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3">Primary Source</label>
                      <div className="flex gap-4">
                        <input type="text" value={newItem.src} onChange={(e) => setNewItem({...newItem, src: e.target.value})} placeholder="URL or upload..." className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-sm px-5 py-4 text-white focus:border-white outline-none transition-all" />
                        <label className="cursor-pointer bg-white hover:bg-slate-200 text-black px-6 flex items-center justify-center rounded-sm transition-all shadow-lg active:scale-95"><Upload size={18} /><input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "portfolio", true)} /></label>
                      </div>
                    </div>
                    {newItem.style === "Coverup" && (
                      <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3">Before State Image</label>
                        <div className="flex gap-4">
                          <input type="text" value={newItem.beforeSrc} onChange={(e) => setNewItem({...newItem, beforeSrc: e.target.value})} placeholder="Before image URL..." className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-sm px-5 py-4 text-white focus:border-white outline-none transition-all" />
                          <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-white px-6 flex items-center justify-center rounded-sm transition-all shadow-lg active:scale-95"><Upload size={18} /><input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "portfolio", true, null, true)} /></label>
                        </div>
                      </div>
                    )}
                    {newItem.src && (
                      <div className="relative aspect-video rounded-sm overflow-hidden bg-black border border-white/10 group">
                        {newItem.type === "image" ? <img src={newItem.src?.startsWith('http') || newItem.src?.startsWith('/img') ? (newItem.src?.startsWith('http') ? newItem.src : `${SOCKET_URL}${newItem.src}`) : newItem.src} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" /> : <video src={newItem.src?.startsWith('http') || newItem.src?.startsWith('/img') ? (newItem.src?.startsWith('http') ? newItem.src : `${SOCKET_URL}${newItem.src}`) : newItem.src} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />}
                        <button onClick={() => setNewItem({...newItem, src: ""})} className="absolute top-4 right-4 bg-black/80 text-white p-2 border border-white/10 rounded-sm hover:bg-red-600 transition-colors"><X size={14} /></button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-10 py-8 bg-zinc-950/50 border-t border-white/5 flex justify-end">
                  <button onClick={handleAddPortfolio} disabled={uploading} className="bg-white hover:bg-slate-200 text-black px-12 py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-xs transition-all flex items-center gap-4 disabled:opacity-50">
                    <Plus size={18} />
                    {uploading ? "Uploading..." : "Publish to Gallery"}
                  </button>
                </div>
              </div>

              {/* Grid List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolio.map((item) => (
                  <div key={item._id} className="bg-black border border-white/5 rounded-sm overflow-hidden group hover:border-white/20 transition-all duration-500">
                    <div className="aspect-square bg-[#0a0a0a] relative overflow-hidden">
                      {item.type === "image" ? (
                        <img src={item.src?.startsWith('http') || item.src?.startsWith('data') ? item.src : `${SOCKET_URL}${item.src}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                      ) : (
                        <video src={item.src?.startsWith('http') ? item.src : `${SOCKET_URL}${item.src}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                        <button onClick={() => setEditingItem(item)} className="bg-white text-black p-4 rounded-sm hover:bg-slate-200 transition-all"><Edit2 size={18} /></button>
                        <button onClick={() => handleDeletePortfolio(item._id)} className="bg-red-600 text-white p-4 rounded-sm hover:bg-red-500 transition-all"><Trash2 size={18} /></button>
                      </div>
                    </div>
                    <div className="p-6 bg-zinc-950/50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 border border-white/10 px-3 py-1 rounded-sm">{item.style}</span>
                      </div>
                      <p className="text-xs font-bold text-white uppercase tracking-widest truncate">{item.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "coverup" && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Add Coverup Item */}
              <div className="bg-black border border-white/5 rounded-sm shadow-2xl overflow-hidden">
                <div className="px-10 py-8 border-b border-white/5 bg-zinc-950/50">
                  <h2 className="font-black text-white uppercase tracking-widest text-sm">Add Coverup — Before & After</h2>
                </div>
                <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3">Title</label>
                      <input type="text" value={newItem.style === "Coverup" ? newItem.caption : ""} onChange={(e) => setNewItem({...newItem, caption: e.target.value, style: "Coverup"})} placeholder="e.g. Rose Sleeve Transformation" className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm px-5 py-4 text-white focus:border-white outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3">Before Image</label>
                      <div className="flex gap-4">
                        <input type="text" value={newItem.beforeSrc} onChange={(e) => setNewItem({...newItem, beforeSrc: e.target.value, style: "Coverup"})} placeholder="Before image URL..." className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-sm px-5 py-4 text-white focus:border-white outline-none transition-all" />
                        <label className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-6 flex items-center justify-center rounded-sm transition-all shadow-lg active:scale-95">
                          <Upload size={18} />
                          <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "portfolio", true, null, true)} />
                        </label>
                      </div>
                      {newItem.beforeSrc && (
                        <div className="mt-3 relative aspect-video rounded-sm overflow-hidden bg-black border border-white/10">
                          <img src={newItem.beforeSrc?.startsWith('http') ? newItem.beforeSrc : `${SOCKET_URL}${newItem.beforeSrc}`} className="w-full h-full object-cover" />
                          <div className="absolute top-2 left-2 bg-black/80 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest">BEFORE</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3">After Image / Video</label>
                      <div className="flex gap-4">
                        <input type="text" value={newItem.style === "Coverup" ? newItem.src : ""} onChange={(e) => setNewItem({...newItem, src: e.target.value, style: "Coverup"})} placeholder="After image URL..." className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-sm px-5 py-4 text-white focus:border-white outline-none transition-all" />
                        <label className="cursor-pointer bg-green-600 hover:bg-green-500 text-black px-6 flex items-center justify-center rounded-sm transition-all shadow-lg active:scale-95">
                          <Upload size={18} />
                          <input type="file" className="hidden" onChange={(e) => { setNewItem({...newItem, style: "Coverup"}); handleFileUpload(e, "portfolio", true); }} />
                        </label>
                      </div>
                      {newItem.src && newItem.style === "Coverup" && (
                        <div className="mt-3 relative aspect-video rounded-sm overflow-hidden bg-black border border-white/10">
                          <img src={newItem.src?.startsWith('http') ? newItem.src : `${SOCKET_URL}${newItem.src}`} className="w-full h-full object-cover" />
                          <div className="absolute top-2 left-2 bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-black tracking-widest">AFTER</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-10 py-8 bg-zinc-950/50 border-t border-white/5 flex justify-end">
                  <button
                    onClick={() => {
                      setNewItem({...newItem, style: "Coverup"});
                      handleAddPortfolio();
                    }}
                    disabled={uploading}
                    className="bg-white hover:bg-slate-200 text-black px-12 py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-xs transition-all flex items-center gap-4 disabled:opacity-50"
                  >
                    <Plus size={18} />
                    {uploading ? "Uploading..." : "Publish Coverup"}
                  </button>
                </div>
              </div>

              {/* Existing Coverup Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolio.filter(item => item.style?.toLowerCase() === "coverup").map((item) => (
                  <div key={item._id} className="bg-black border border-white/5 rounded-sm overflow-hidden group hover:border-white/20 transition-all duration-500">
                    <div className="grid grid-cols-2 gap-2 p-4 bg-zinc-950/50">
                      <div className="relative aspect-square rounded-sm overflow-hidden bg-zinc-900">
                        <img src={item.beforeSrc?.startsWith('http') ? item.beforeSrc : `${SOCKET_URL}${item.beforeSrc}`} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-black/80 text-white px-2 py-0.5 rounded-full text-[9px] font-black">BEFORE</div>
                      </div>
                      <div className="relative aspect-square rounded-sm overflow-hidden bg-zinc-900">
                        <img src={item.src?.startsWith('http') ? item.src : `${SOCKET_URL}${item.src}`} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-0.5 rounded-full text-[9px] font-black">AFTER</div>
                      </div>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                      <p className="text-xs font-bold text-white uppercase tracking-widest truncate">{item.caption}</p>
                      <button onClick={() => handleDeletePortfolio(item._id)} className="bg-red-600/10 text-red-500 p-2 rounded-sm hover:bg-red-600 hover:text-white transition-all ml-4"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-12">
              <div className="bg-zinc-900/50 border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-sm">
                <div className="px-8 py-6 border-b border-white/5 bg-white/5"><h2 className="font-black text-white uppercase tracking-tighter italic text-xl">Media Hub - Global Assets</h2></div>
                <div className="p-8 space-y-12">
                  
                  {/* Hero Section Media */}
                  <section>
                    <h3 className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Hero Entrance</h3>
                    <div className="grid grid-cols-1 gap-8">
                      <MediaUploadField label="Hero Background Video" contentKey="heroVideo" type="video" />
                    </div>
                  </section>

                  <div className="h-[1px] bg-white/5" />

                  {/* Studio Environment Media */}
                  <section>
                    <h3 className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full"></div>The Studio Environment</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <MediaUploadField label="Studio Environment Video (envi.mp4)" contentKey="envMedia1" type="video" />
                    </div>
                  </section>

                  <div className="h-[1px] bg-white/5" />

                  {/* Artist Media */}
                  <section>
                    <h3 className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Artist Profile Media</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <MediaUploadField label="Lead Artist Main Photo" contentKey="artistImage" type="image" />
                      <MediaUploadField label="Studio Vibe Clip (Circle)" contentKey="shopVideo" type="video" />
                    </div>
                  </section>

                </div>
              </div>
            </div>
          )}

          {activeTab === "offers" && (
            <div className="space-y-12">
              {/* Add Offer Card */}
              <div className="bg-zinc-900/50 border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-sm">
                <div className="px-8 py-6 border-b border-white/5 bg-white/5"><h2 className="font-black text-white uppercase tracking-tighter italic text-xl">Create New Promo Offer</h2></div>
                <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Offer Title</label>
                      <input type="text" value={newOffer.title} onChange={(e) => setNewOffer({...newOffer, title: e.target.value})} placeholder="e.g. Summer Tattoo Sale" className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Description</label>
                      <textarea rows={3} value={newOffer.description} onChange={(e) => setNewOffer({...newOffer, description: e.target.value})} placeholder="Details about the offer..." className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none resize-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Media Type</label>
                      <select value={newOffer.type} onChange={(e) => setNewOffer({...newOffer, type: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none">
                        <option value="image">Poster / Image</option>
                        <option value="video">Promotional Video</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Expiration Date & Time</label>
                      <input 
                        type="datetime-local" 
                        value={newOffer.expiresAt} 
                        onChange={(e) => setNewOffer({...newOffer, expiresAt: e.target.value})} 
                        className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" 
                      />
                      <p className="mt-2 text-[10px] text-slate-600 font-medium italic">Offer will be automatically removed after this time.</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Offer Media</label>
                      <div className="flex gap-4">
                        <input type="text" value={newOffer.src} onChange={(e) => setNewOffer({...newOffer, src: e.target.value})} placeholder="URL or upload file" className="flex-1 bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" />
                        <label className="cursor-pointer bg-green-600 hover:bg-green-500 text-black p-3.5 rounded-xl transition-all shadow-lg active:scale-95"><Upload size={20} /><input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "offer", true)} /></label>
                      </div>
                    </div>
                    {newOffer.src && (
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
                        {newOffer.type === "image" ? <img src={newOffer.src?.startsWith('http') || newOffer.src?.startsWith('/img') ? (newOffer.src?.startsWith('http') ? newOffer.src : `${SOCKET_URL}${newOffer.src}`) : newOffer.src} className="w-full h-full object-cover" /> : <video src={newOffer.src?.startsWith('http') || newOffer.src?.startsWith('/img') ? (newOffer.src?.startsWith('http') ? newOffer.src : `${SOCKET_URL}${newOffer.src}`) : newOffer.src} className="w-full h-full object-cover" />}
                        <button onClick={() => setNewOffer({...newOffer, src: ""})} className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full"><X size={16} /></button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-8 py-6 bg-white/5 border-t border-white/5 flex justify-end"><button onClick={handleAddOffer} disabled={uploading} className="bg-green-600 hover:bg-green-500 text-black px-10 py-3.5 rounded-full font-black uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.3)]">{uploading ? "Uploading..." : "Publish Offer"}</button></div>
              </div>

              {/* Active Offers List */}
              <div className="grid grid-cols-1 gap-6">
                {offers.map((offer) => (
                  <div key={offer._id} className={`bg-zinc-900/40 border ${offer.isActive ? 'border-green-500/20' : 'border-white/5'} rounded-[2rem] p-6 flex gap-8 items-center`}>
                    <div className="w-48 h-32 rounded-2xl overflow-hidden bg-black flex-shrink-0">
                      {offer.type === "image" ? <img src={offer.src?.startsWith('http') || offer.src?.startsWith('/img') ? (offer.src?.startsWith('http') ? offer.src : `${SOCKET_URL}${offer.src}`) : offer.src} className="w-full h-full object-cover" /> : <video src={offer.src?.startsWith('http') ? offer.src : `${SOCKET_URL}${offer.src}`} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-black text-white uppercase italic">{offer.title}</h3>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${offer.isActive ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>{offer.isActive ? 'Active' : 'Paused'}</span>
                      </div>
                      <p className="text-slate-500 text-sm line-clamp-2">{offer.description}</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => toggleOfferStatus(offer)} className={`p-3.5 rounded-full transition-colors ${offer.isActive ? 'bg-white/5 text-slate-400 hover:text-white' : 'bg-green-600 text-black hover:bg-green-500'}`}>{offer.isActive ? <EyeOff size={20} /> : <Eye size={20} />}</button>
                      <button onClick={() => setEditingOffer(offer)} className="p-3.5 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"><Edit2 size={20} /></button>
                      <button onClick={() => handleDeleteOffer(offer._id)} className="p-3.5 rounded-full bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white"><Trash2 size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="bg-zinc-900/50 border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden backdrop-blur-sm">
              <div className="px-8 py-6 border-b border-white/5 bg-white/5"><h2 className="font-black text-white uppercase tracking-tighter italic text-xl">Global Core Settings</h2></div>
              <div className="p-8 space-y-12">
                {/* Hero */}
                <div>
                  <h3 className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Hero Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Main Title</label><input type="text" defaultValue={content.heroTitle || "INK JUNCTION"} onBlur={(e) => handleUpdateContent("heroTitle", e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" /></div>
                    <div><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Sub Header</label><input type="text" defaultValue={content.heroSubtitle || "Tattoo Studio"} onBlur={(e) => handleUpdateContent("heroSubtitle", e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" /></div>
                  </div>
                </div>
                {/* Artist */}
                <div>
                  <h3 className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Artist Profile</h3>
                  <div className="space-y-6">
                    <div><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Lead Artist Name</label><input type="text" defaultValue={content.artistName || "VISHAL KUMAR"} onBlur={(e) => handleUpdateContent("artistName", e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" /></div>
                    <div><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Artist Manifesto</label><textarea rows={4} defaultValue={content.artistBio || "\"Turning skin into a living, breathing canvas of art.\""} onBlur={(e) => handleUpdateContent("artistBio", e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none resize-none"></textarea></div>
                  </div>
                </div>
                {/* Contact Section */}
                <div>
                  <h3 className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3"><div className="w-2 h-2 bg-green-500 rounded-full"></div>Communication Hub</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Primary Contact</label><input type="text" defaultValue={content.phone || "6362496667"} onBlur={(e) => handleUpdateContent("phone", e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" /></div>
                    <div><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Business Email</label><input type="text" defaultValue={content.email || "inkjunctiontattoos@gmail.com"} onBlur={(e) => handleUpdateContent("email", e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" /></div>
                    <div className="md:col-span-2"><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Studio Address</label><input type="text" defaultValue={content.address || "Your Studio Address"} onBlur={(e) => handleUpdateContent("address", e.target.value)} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" /></div>
                    <div className="md:col-span-2"><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Google Maps Embed URL</label><input type="text" defaultValue={content.mapsUrl || ""} onBlur={(e) => handleUpdateContent("mapsUrl", e.target.value)} placeholder="iframe src URL" className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" /></div>
                    <div className="md:col-span-2"><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Clickable Maps URL</label><input type="text" defaultValue={content.clickableMapsUrl || ""} onBlur={(e) => handleUpdateContent("clickableMapsUrl", e.target.value)} placeholder="URL for Get Directions button" className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" /></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Edit Offer Modal */}
      {editingOffer && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[200] flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5"><h2 className="font-black text-white uppercase tracking-tighter italic text-xl">Edit Promo Offer</h2><button onClick={() => setEditingOffer(null)} className="text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-full"><X size={24} /></button></div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Title</label><input type="text" value={editingOffer.title} onChange={(e) => setEditingOffer({...editingOffer, title: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" /></div>
                <div><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Description</label><textarea rows={3} value={editingOffer.description} onChange={(e) => setEditingOffer({...editingOffer, description: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none resize-none" /></div>
                <div className="flex gap-6">
                  <div className="flex-1"><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Media Type</label><select value={editingOffer.type} onChange={(e) => setEditingOffer({...editingOffer, type: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none"><option value="image">Image</option><option value="video">Video</option></select></div>
                  <div className="flex items-end pb-1"><label className="flex items-center gap-3 cursor-pointer group"><input type="checkbox" checked={editingOffer.isActive} onChange={(e) => setEditingOffer({...editingOffer, isActive: e.target.checked})} className="w-6 h-6 rounded bg-black border-white/10 text-green-600 focus:ring-green-500" /><span className="text-sm font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">Offer Active</span></label></div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Expiration Date & Time</label>
                  <input 
                    type="datetime-local" 
                    value={editingOffer.expiresAt ? new Date(editingOffer.expiresAt).toISOString().slice(0, 16) : ""} 
                    onChange={(e) => setEditingOffer({...editingOffer, expiresAt: e.target.value})} 
                    className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Media Reference</label>
                  <div className="flex gap-4">
                    <input type="text" value={editingOffer.src} onChange={(e) => setEditingOffer({...editingOffer, src: e.target.value})} className="flex-1 bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" />
                    <label className="cursor-pointer bg-green-600 hover:bg-green-500 text-black p-3.5 rounded-xl transition-all active:scale-95 shadow-lg"><Upload size={20} /><input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "offer", false)} /></label>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-8 py-6 bg-white/5 border-t border-white/5 flex justify-end gap-4"><button onClick={() => setEditingOffer(null)} className="px-8 py-3 rounded-full font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Cancel</button><button onClick={handleUpdateOffer} className="bg-green-600 hover:bg-green-500 text-black px-10 py-3 rounded-full font-black uppercase tracking-widest transition-all flex items-center gap-3 active:scale-95"><Save size={20} />Update Offer</button></div>
          </div>
        </div>
      )}

      {/* Edit Portfolio Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[200] flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/5"><h2 className="font-black text-white uppercase tracking-tighter italic text-xl">Refine Portfolio Item</h2><button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-white p-2 hover:bg-white/5 rounded-full"><X size={24} /></button></div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Category</label><select value={editingItem.style} onChange={(e) => setEditingItem({...editingItem, style: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none">{categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}</select></div>
                <div><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Type</label><select value={editingItem.type} onChange={(e) => setEditingItem({...editingItem, type: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none"><option value="image">Still Image</option><option value="video">Motion Video</option></select></div>
              </div>
              <div><label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Description</label><input type="text" value={editingItem.caption} onChange={(e) => setEditingItem({...editingItem, caption: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none" /></div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Media Reference (After / Final)</label>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={editingItem.src} 
                    onChange={(e) => setEditingItem({...editingItem, src: e.target.value})}
                    className="flex-1 bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none"
                  />
                  <label className="cursor-pointer bg-green-600 hover:bg-green-500 text-black p-3.5 rounded-xl transition-all active:scale-95 shadow-lg">
                    <Upload size={20} />
                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "portfolio", false)} />
                  </label>
                </div>
              </div>
              {editingItem.style === "Coverup" && (
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Before Image (For Coverup)</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={editingItem.beforeSrc} 
                      onChange={(e) => setEditingItem({...editingItem, beforeSrc: e.target.value})}
                      className="flex-1 bg-black border border-white/10 rounded-xl px-5 py-3 text-white focus:border-green-500 outline-none"
                    />
                    <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white p-3.5 rounded-xl transition-all active:scale-95 shadow-lg">
                      <Upload size={20} />
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, "portfolio", false, null, true)} />
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div className="px-8 py-6 bg-white/5 border-t border-white/5 flex justify-end gap-4"><button onClick={() => setEditingItem(null)} className="px-8 py-3 rounded-full font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Cancel</button><button onClick={handleUpdatePortfolio} className="bg-green-600 hover:bg-green-500 text-black px-10 py-3 rounded-full font-black uppercase tracking-widest transition-all flex items-center gap-3 active:scale-95"><Save size={20} />Confirm Changes</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
