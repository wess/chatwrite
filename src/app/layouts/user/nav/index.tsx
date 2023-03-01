import React from 'react';

import {
  useNavigate,
} from "react-router-dom";

import {
  useSession,
  useFlash,
  useSettings,
} from '../../../../hooks';


const Component = () => {
  const navigate = useNavigate();
  const {session, setSession} = useSession();
  const {settings, setSettings} = useSettings();
  const {setFlash} = useFlash();

  return (
    <div>Nav</div>
  );
}

export default Component;
