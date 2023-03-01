import React from 'react';

import {
  Routes,
  Route,
} from 'react-router-dom';

import {
  useSession,
} from '../hooks';

import {
  Landing,
  Chat
} from '../pages';

const Component = () => {
  const {session} = useSession();

  const Destination = session == null ? Landing : Chat;

  return (
    <Routes>
      <Route path="/*" element={<Destination/>}/>
    </Routes>
  );
}

export default Component;