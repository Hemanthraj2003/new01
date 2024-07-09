import React, {createContext, useState} from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <GlobalContext.Provider value={{isDownloading, setIsDownloading}}>
      {children}
    </GlobalContext.Provider>
  );
};
