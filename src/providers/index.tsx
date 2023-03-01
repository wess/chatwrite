import React from 'react';

import SettingsProvider from './settings';
import SessionProvider  from './session';
import ApiProvider from './api';

import {FlashProvider} from './flash';

import FormProvider from './form';

export {
  FlashProvider,
  FormProvider
}

const Component = ({children}) => (
  <ApiProvider>
    <SessionProvider>
      <SettingsProvider>
        <FlashProvider>
          {children}
        </FlashProvider>
      </SettingsProvider>
    </SessionProvider>
  </ApiProvider>
);



export default Component;