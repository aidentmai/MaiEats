import { createContext, useContext, useState } from 'react';
import { Business } from '../business';

interface SearchContextProps {
  results: Business[];
  setResults: React.Dispatch<React.SetStateAction<Business[]>>;
}

export const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const UseSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('UseSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [results, setResults] = useState<Business[]>([]);
    return (
        <SearchContext.Provider value={{ results, setResults }}>
            {children}
        </SearchContext.Provider>
    );
};