import React from 'react';

import Data, {Preferences} from '../data';

const Context = React.createContext({
  prefs:null,
  setPrefs:(prefs:Preferences | null) => {}
});

const Provider = ({children}) => {
  const [prefs, setPrefs_] = React.useState<Preferences | null>(Data.get('prefs'));

  const setPrefs = (prefs:Preferences | null) => {
    if(prefs == null) {
      Data.delete('prefs');

      Data.clear();
    } else {
      Data.set('prefs', prefs);
    }

    setPrefs_(prefs);
  }

  return <Context.Provider value={{prefs, setPrefs}}>{children}</Context.Provider>
}

export const usePrefs = () => React.useContext(Context);

export default Provider;