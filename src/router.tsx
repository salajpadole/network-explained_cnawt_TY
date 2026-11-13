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
  // Normalize repository base prefix (e.g. '/network-explained_cnawt_TY')
  const getBasePath = (): string => {
    return (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  };

  const normalizePath = (rawPath: string): RoutePath => {
    let clean = (rawPath || '')
      .trim()
      .replace(/^#/, '')
      .replace(/\/$/, '');

    // Strip repository base name if present at start of path
    clean = clean.replace(/^\/network-explained_cnawt_TY(?=\/|$)/, '');

    if (!clean || clean === '') {
      return '/';
    }

    if (clean.includes('/articles/rip-routing-protocol') || clean.includes('/articles/rip')) {
      return '/articles/rip-routing-protocol';
    }
    if (clean === '/articles' || clean.endsWith('/articles')) {
      return '/articles';
    }
    if (clean === '/about' || clean.endsWith('/about')) {
      return '/about';
    }
    return '/';
  };

  // Parse current route from pathname or hash (supports direct URLs, SPA redirects, and hash fallback)
  const getInitialPath = (): RoutePath => {
    if (typeof window === 'undefined') return '/';
    
    // Check hash first e.g. /#/articles or #/about
    const hash = window.location.hash.replace(/^#/, '');
    if (hash && hash.startsWith('/')) {
      return normalizePath(hash);
    }

    const pathname = window.location.pathname;
    return normalizePath(pathname);
  };

  const [currentPath, setCurrentPath] = useState<RoutePath>(getInitialPath);

  useEffect(() => {
    const handleNavigationChange = () => {
      setCurrentPath(getInitialPath());
    };

    window.addEventListener('popstate', handleNavigationChange);
    window.addEventListener('hashchange', handleNavigationChange);
    return () => {
      window.removeEventListener('popstate', handleNavigationChange);
      window.removeEventListener('hashchange', handleNavigationChange);
    };
  }, []);

  const navigate = (path: RoutePath | string) => {
    const normalized = normalizePath(path);
    setCurrentPath(normalized);
    
    const base = getBasePath();
    const targetUrl = normalized === '/' ? (base ? `${base}/` : '/') : `${base}${normalized}`;

    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};
