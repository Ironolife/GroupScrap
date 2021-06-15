import { useState, VFC } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MuiLink from './common/MuiLink';
import { useMutation } from 'react-query';
import { logout } from '../api/api';
import Menu from '@material-ui/icons/Menu';
import { useRouter } from 'next/router';
import Divider from '@material-ui/core/Divider';

const CustomDrawer = withStyles({
  root: {
    width: '240px',
  },
  paper: {
    width: '240px',
  },
})(Drawer);

const Sidebar: VFC = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const logoutMutation = useMutation(logout);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        window.location.assign(window.location.origin);
      },
    });
  };

  if (router.asPath === '/auth') return null;

  return (
    <>
      <IconButton
        className='absolute m-4'
        aria-label='open menu'
        onClick={() => setIsDrawerOpen(true)}
      >
        <Menu />
      </IconButton>
      <CustomDrawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className='p-2 text-right'>
          <IconButton
            aria-label='close menu'
            onClick={() => setIsDrawerOpen(false)}
          >
            <Close />
          </IconButton>
        </div>
        <div onClick={() => setIsDrawerOpen(false)}>
          <List>
            <ListItem button component={MuiLink} href='/search'>
              Search
            </ListItem>
            <ListItem button component={MuiLink} href='/ids'>
              Group and Pages
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleLogout}>
              Logout
            </ListItem>
          </List>
        </div>
      </CustomDrawer>
    </>
  );
};

export default Sidebar;
