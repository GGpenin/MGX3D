import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultConfig } from './data';

type ConfigType = typeof defaultConfig;

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  config: ConfigType;
  updateConfig: (newConfig: ConfigType) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const sanitizeImageUrl = (url: string) => {
  if (!url) return url;
  if (url.includes('WhatsApp Image 2026-05-09 at 11.01.34.jpeg') || url.includes('whatsapp_image_1')) return '/fotos/whatsapp_image_1.jpeg';
  if (url.includes('Captura de tela 2026-05-09 110557.png') || url.includes('captura_110557')) return '/fotos/captura_110557.png';
  if (url.includes('Captura de tela 2026-05-09 110649.png') || (url.includes('captura_110649') && !url.includes('captura_110649_1'))) return '/fotos/captura_110649.png';
  if (url.includes('Captura de tela 2026-05-09 110649-1.png') || url.includes('captura_110649_1')) return '/fotos/captura_110649_1.png';
  if (url.includes('Captura de tela 2026-05-09 110733.png') || url.includes('captura_110733')) return '/fotos/captura_110733.png';
  if (url.includes('Captura de tela 2026-05-09 110755.png') || url.includes('captura_110755')) return '/fotos/captura_110755.png';
  if (url.includes('Captura de tela 2026-05-09 110821.png') || url.includes('captura_110821')) return '/fotos/captura_110821.png';
  if (url.includes('Captura de tela 2026-05-09 110848.png') || url.includes('captura_110848')) return '/fotos/captura_110848.png';
  if (url.includes('Captura de tela 2026-05-09 110949.png') || url.includes('captura_110949')) return '/fotos/captura_110949.png';
  if (url.includes('logo mgx3d.png')) return '/fotos/logo_mgx3d.png';
  
  try {
    // Avoid double encoding by decoding first
    return encodeURI(decodeURI(url));
  } catch (e) {
    return url;
  }
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [config, setConfig] = useState<ConfigType>(defaultConfig);

  useEffect(() => {
    const savedConfig = localStorage.getItem('mgx3d_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        
        let validPortfolio = Array.isArray(parsed.portfolio) ? parsed.portfolio : defaultConfig.portfolio;
        
        // Migrate old broken URLs to strict no-space paths
        validPortfolio = validPortfolio.map((item: any) => ({
          ...item,
          imageUrl: sanitizeImageUrl(item.imageUrl)
        }));

        // Ensure arrays and objects exist in case of old localStorage structure
        setConfig({
          ...defaultConfig,
          ...parsed,
          whatsapp: { ...defaultConfig.whatsapp, ...(parsed.whatsapp || {}) },
          instagram: { ...defaultConfig.instagram, ...(parsed.instagram || {}) },
          portfolio: validPortfolio,
          features: Array.isArray(parsed.features) ? parsed.features : defaultConfig.features,
        });
      } catch (e) {
        console.error("Failed to parse saved config", e);
      }
    }
    
    const savedAdmin = localStorage.getItem('mgx3d_admin');
    if (savedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (password: string) => {
    if (password === 'admin123') { // Simple hardcoded password
      setIsAdmin(true);
      localStorage.setItem('mgx3d_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('mgx3d_admin');
  };

  const updateConfig = (newConfig: ConfigType) => {
    setConfig(newConfig);
    localStorage.setItem('mgx3d_config', JSON.stringify(newConfig));
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, config, updateConfig }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
