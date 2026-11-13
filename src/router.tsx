import React, { createContext, useContext, useState, useEffect } from 'react';

export type RoutePath = '/' | '/articles' | '/articles/rip-routing-protocol' | '/about';

interface RouterContextType {
  currentPath: RoutePath;
  navigate: (path: RoutePath | string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {}
});

export const useRouter = () => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Parse current route from pathname or hash (supports both direct URLs and GitHub Pages # hash routes)
  const getInitialPath = (): RoutePath => {
    if (typeof window === 'undefined') return '/';
    
    // Check hash first e.g. /#/articles/rip-routing-protocol or #/articles
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && hash.startsWith('/')) {
      return normalizePath(hash);
    }

    const pathname = window.location.pathname;
    return normalizePath(pathname);
  };

  const normalizePath = (path: string): RoutePath => {
    let clean = path.trim().replace(/^#/, '').replace(/\/$/, '') || '/';
    
    if (clean.includes('/articles/rip-routing-protocol') || clean.includes('/articles/rip')) {
      return '/articles/rip-routing-protocol';
    }
    if (clean.endsWith('/articles') || clean === '/articles') {
      return '/articles';
    }
    if (clean.endsWith('/about') || clean === '/about') {
      return '/about';
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<RoutePath>(getInitialPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getInitialPath());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigate = (path: RoutePath | string) => {
    const normalized = normalizePath(path);
    setCurrentPath(normalized);
    
    // Update hash for universal GitHub Pages compatibility with clean back/forward history
    if (window.location.hash.replace(/^#/, '') !== normalized) {
      window.history.pushState(null, '', '#' + normalized);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};
