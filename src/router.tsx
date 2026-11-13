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
    
    // Check hash first e.g. /#/articles/rip-routing-protocol
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && (hash.startsWith('/'))) {
      return normalizePath(hash);
    }

    const pathname = window.location.pathname;
    // Normalize relative base path if deployed in a subdirectory like /repo-name/
    const cleanPath = pathname.replace(/^\/[^/]+(?=\/)/, '') || '/';
    return normalizePath(cleanPath);
  };

  const normalizePath = (path: string): RoutePath => {
    if (path.includes('rip') || path.includes('articles/rip') || path === '/articles' || path.startsWith('/articles')) {
      return '/articles/rip-routing-protocol';
    }
    if (path.startsWith('/about')) {
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
    
    // Update hash for universal GitHub Pages compatibility without 404s
    window.location.hash = normalized;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};
