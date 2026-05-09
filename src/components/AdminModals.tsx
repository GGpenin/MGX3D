import React, { useState } from 'react';
import { useAdmin } from '../AdminContext';
import { X, Lock, Save, Plus, Trash2, Edit2, Settings } from 'lucide-react';
import { defaultConfig } from '../data';

export const LoginModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setPassword('');
      setError('');
      onClose();
    } else {
      setError('Senha incorreta');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-bg-base text-text-base w-full max-w-sm p-6 rounded-sm shadow-xl border border-border-base">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif italic tracking-tight flex items-center gap-2"><Lock className="w-5 h-5"/> Login Admin</h2>
          <button onClick={onClose} className="p-1 hover:opacity-70"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bg-alt border border-border-base p-3 text-sm focus:outline-none focus:border-primary rounded-sm"
              placeholder="Digite a senha..."
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>
          <button type="submit" className="w-full bg-text-base text-bg-base font-medium p-3 rounded-sm hover:opacity-90 transition-opacity">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export const AdminSettingsModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { config, updateConfig } = useAdmin();
  const [formData, setFormData] = useState({
    businessName: config.businessName,
    description: config.description,
    whatsappNumber: config.whatsapp.number,
    whatsappDisplay: config.whatsapp.displayNumber,
    instagramHandle: config.instagram.handle,
    instagramUrl: config.instagram.url,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      ...config,
      businessName: formData.businessName,
      description: formData.description,
      whatsapp: {
        ...config.whatsapp,
        number: formData.whatsappNumber,
        displayNumber: formData.whatsappDisplay,
      },
      instagram: {
        ...config.instagram,
        handle: formData.instagramHandle,
        url: formData.instagramUrl,
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-bg-base text-text-base w-full max-w-xl p-6 md:p-8 rounded-sm shadow-xl border border-border-base my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif italic tracking-tight flex items-center gap-2"><Settings className="w-5 h-5"/> Configurações Gerais</h2>
          <button onClick={onClose} className="p-1 hover:opacity-70"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">Nome do Negócio</label>
              <input 
                type="text" value={formData.businessName} onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                className="w-full bg-bg-alt border border-border-base p-3 text-sm focus:outline-none focus:border-primary rounded-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">Descrição (Hero)</label>
            <textarea 
              value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-bg-alt border border-border-base p-3 text-sm focus:outline-none focus:border-primary rounded-sm min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">WhatsApp (Apenas Números)</label>
              <input 
                type="text" value={formData.whatsappNumber} onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                className="w-full bg-bg-alt border border-border-base p-3 text-sm focus:outline-none focus:border-primary rounded-sm"
                placeholder="5581991042106"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">WhatsApp (Exibição)</label>
              <input 
                type="text" value={formData.whatsappDisplay} onChange={(e) => setFormData({...formData, whatsappDisplay: e.target.value})}
                className="w-full bg-bg-alt border border-border-base p-3 text-sm focus:outline-none focus:border-primary rounded-sm"
                placeholder="(81) 99104-2106"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-primary text-white font-medium p-3 rounded-sm hover:opacity-90 transition-opacity mt-4 flex justify-center items-center gap-2">
            <Save className="w-4 h-4" /> Salvar Configurações
          </button>
        </form>
      </div>
    </div>
  );
};


export const EditPortfolioModal = ({ 
  isOpen, 
  onClose, 
  itemToEdit 
}: { 
  isOpen: boolean, 
  onClose: () => void,
  itemToEdit?: typeof defaultConfig.portfolio[0] 
}) => {
  const { config, updateConfig } = useAdmin();
  const [formData, setFormData] = useState({
    title: itemToEdit?.title || '',
    category: itemToEdit?.category || '',
    imageUrl: itemToEdit?.imageUrl || '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let newPortfolio = [...config.portfolio];
    
    if (itemToEdit) {
      // Edit existing
      newPortfolio = newPortfolio.map(item => 
        item.id === itemToEdit.id ? { ...item, ...formData } : item
      );
    } else {
      // Add new
      const newId = newPortfolio.length > 0 ? Math.max(...newPortfolio.map(p => p.id)) + 1 : 1;
      newPortfolio.push({
        id: newId,
        ...formData
      });
    }

    updateConfig({
      ...config,
      portfolio: newPortfolio
    });
    
    onClose();
  };

  const handleDelete = () => {
    if (itemToEdit && confirm('Tem certeza que deseja remover este item?')) {
      const newPortfolio = config.portfolio.filter(item => item.id !== itemToEdit.id);
      updateConfig({
        ...config,
        portfolio: newPortfolio
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-bg-base text-text-base w-full max-w-md p-6 md:p-8 rounded-sm shadow-xl border border-border-base my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif italic tracking-tight flex items-center gap-2">
            <Edit2 className="w-5 h-5"/> {itemToEdit ? 'Editar Peça' : 'Adicionar Nova Peça'}
          </h2>
          <button onClick={onClose} className="p-1 hover:opacity-70"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div>
            <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">Título</label>
            <input 
              type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-bg-alt border border-border-base p-3 text-sm focus:outline-none focus:border-primary rounded-sm"
              required
            />
          </div>
          
          <div>
            <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">Categoria</label>
            <input 
              type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-bg-alt border border-border-base p-3 text-sm focus:outline-none focus:border-primary rounded-sm"
              required
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">URL da Imagem</label>
            <input 
              type="text" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              className="w-full bg-bg-alt border border-border-base p-3 text-sm focus:outline-none focus:border-primary rounded-sm"
              placeholder="/fotos/sua-foto.png ou https://..."
              required
            />
            <p className="text-[10px] opacity-50 mt-1">Dica: Use os caminhos da pasta /fotos/ ou um link externo.</p>
          </div>

          {formData.imageUrl && (
            <div className="mt-2 h-32 w-full bg-bg-alt flex items-center justify-center rounded-sm overflow-hidden border border-border-base">
              <img src={formData.imageUrl} alt="Preview" className="h-full object-contain" onError={(e) => { (e.target as any).style.display = 'none'; }} />
            </div>
          )}

          <div className="flex gap-3 mt-4">
            <button type="submit" className="flex-1 bg-text-base text-bg-base font-medium p-3 rounded-sm hover:opacity-90 transition-opacity flex justify-center items-center gap-2">
              <Save className="w-4 h-4" /> Salvar
            </button>
            {itemToEdit && (
              <button type="button" onClick={handleDelete} className="bg-red-500 text-white font-medium p-3 rounded-sm hover:opacity-90 transition-opacity flex justify-center items-center">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
