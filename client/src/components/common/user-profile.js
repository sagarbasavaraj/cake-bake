import { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { func } from "prop-types";
import storage from "../../helpers/storage-service";
import { USER_INFO_STORAGE_KEY } from "../../helpers/constants";

const anchorOrigin = {
  vertical: "top",
  horizontal: "right"
};

const transformOrigin = {
  vertical: "top",
  horizontal: "right"
};

function UserProfile({ onLogout }) {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const fetchUser = () => {
    storage.getItem(USER_INFO_STORAGE_KEY).then(user => {
      setUser(user);
    });
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    onLogout();
    handleClose();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        keepMounted
        transformOrigin={transformOrigin}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

UserProfile.propTypes = {
  onLogout: func
};

export default UserProfile;
