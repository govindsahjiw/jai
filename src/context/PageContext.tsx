"use client"

// import React, { createContext, useContext, useState } from 'react';

// interface SelectedPage {
//     pageName?: string;
// }

// interface ParamsContextType {
//     selectedPage: SelectedPage;
//     setSelectedPage: (params: SelectedPage) => void;
// }

// const ParamsContext = createContext<ParamsContextType | undefined>(undefined);

// interface ParamsProviderProps {
//     children: React.ReactNode;
// }

// export const ParamsProvider: React.FC<ParamsProviderProps> = ({ children }) => {
//     const [selectedPage, setSelectedPageState] = useState<SelectedPage>({});

//     const setSelectedPage = (params: SelectedPage) => {
//         console.log(params)
//         setSelectedPageState((prev) => ({ ...prev, ...params }));
//     };
   

//     return (
//         <ParamsContext.Provider value={{ selectedPage, setSelectedPage }}>
//             {children}
//         </ParamsContext.Provider>
//     );
// };

// export const useParamsContext = (): ParamsContextType => {
//     const context = useContext(ParamsContext);
//     if (!context) {
//         throw new Error('useParamsContext must be used within a ParamsProvider');
//     }
//     return context;
// };


import { createContext, useState, useContext } from 'react';

interface PageContextType {
  pageName: string;
}

interface PageContextProps {
  selectedPage: PageContextType;
  setSelectedPage: (page: PageContextType) => void;
}

const PageContext = createContext<PageContextProps>({
  selectedPage: { pageName: 'home' },
  setSelectedPage: () => {},
});

export function ParamsProvider({ children }: { children: React.ReactNode }) {
  const [selectedPage, setSelectedPage] = useState<PageContextType>({ pageName: 'home' });

  const updateSelectedPage = (page: PageContextType) => {
    // Remove slash when setting the page name
    const pageName = page.pageName.startsWith('/') 
      ? page.pageName.substring(1) 
      : page.pageName;
    setSelectedPage({ pageName });
  };

  return (
    <PageContext.Provider value={{ 
      selectedPage, 
      setSelectedPage: updateSelectedPage 
    }}>
      {children}
    </PageContext.Provider>
  );
}

export const useParamsContext = () => useContext(PageContext);
