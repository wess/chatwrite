import React from 'react';
import {useNavigate} from "react-router-dom";

import {
  HStack,
  Avatar,
  Spacer,
  Text,
  Box,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

import {
  IoSettingsOutline,
  IoLogOutOutline,
} from 'react-icons/io5';

import {
  useApi,
  useSession,
} from '../../../../hooks';

const UserComponent = ({onLogout, ...props}) => {

  return (
    <HStack w="full" px={2} py={2}>
      <Avatar size="sm" />
      
      <Spacer/>

      <Link className="user-menu">
        <IoSettingsOutline size="22px" />
      </Link>

      
      <Link className="user-menu" onClick={onLogout}>
        <IoLogOutOutline size="22px" />
      </Link>
    </HStack>
  );
}

const AvatarComponent = ({onLogout, ...props}) => {
  return (
    <HStack w="full" pl={2} pb={2}>
      <Menu>
        <MenuButton as={Avatar} size="sm" cursor="pointer"/>
        <MenuList>
          <MenuItem icon={<IoSettingsOutline/>}>Settings</MenuItem>
          <MenuItem icon={<IoLogOutOutline/>} onClick={onLogout}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}


const Component = ({expanded, ...props}) => {
  const navigate = useNavigate();
  const api = useApi();
  const {session, setSession} = useSession();

  const logoutAction = async () => {
    await api.account.deleteSession(session.$id);
    setSession(null);
    
    navigate('/');
  };

  return expanded
  ? <UserComponent onLogout={logoutAction}/>
  : <AvatarComponent onLogout={logoutAction}/>
}

export default Component;