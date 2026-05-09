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

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [config, setConfig] = useState<ConfigType>(defaultConfig);

  useEffect(() => {
    const savedConfig = localStorage.getItem('mgx3d_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        
        let validPortfolio = Array.isArray(parsed.portfolio) ? parsed.portfolio : defaultConfig.portfolio;
        // Fix for old generated URLs that were breaking the site
        const hasBrokenImageUrls = validPortfolio.some((p: any) => p.imageUrl && (p.imageUrl.includes('%20') || p.imageUrl.includes(' ')));
        if (hasBrokenImageUrls) {
           validPortfolio = defaultConfig.portfolio;
        }

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
