import styles from "./UserIconMenu.module.css";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import {
  AccountCircle,
  ExitToApp,
  PersonOutline,
  LoginOutlined,
  PersonAddOutlined,
} from "@mui/icons-material";

const UserIconMenuPopup = ({ logedOutUser, isLoggedin }) => {
  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <>
            <button className={styles.profile__btn}>
              <PersonOutline
                className={styles.profile__icon}
                {...bindTrigger(popupState)}
              />
            </button>

            <Menu {...bindMenu(popupState)}>
              {isLoggedin ? (
                <ul>
                  <Link href="/profile" className={styles.list}>
                    <MenuItem onClick={popupState.close}>
                      <AccountCircle className={styles.list__icon} />
                      <li className={styles.list__item}>Profile</li>
                    </MenuItem>
                  </Link>

                  <MenuItem
                    onClick={() => {
                      popupState.close();
                      logedOutUser();
                    }}
                  >
                    <ExitToApp className={styles.list__icon} />
                    <li className={styles.list__item}>Logout</li>
                  </MenuItem>
                </ul>
              ) : (
                <ul>
                  <Link href="/login" className={styles.list}>
                    <MenuItem onClick={popupState.close}>
                      <LoginOutlined className={styles.list__icon} />
                      <span className={styles.list__item}>Login</span>
                    </MenuItem>
                  </Link>
                  <Link href="/signup" className={styles.list}>
                    <MenuItem onClick={popupState.close}>
                      <PersonAddOutlined className={styles.list__icon} />
                      <span className={styles.list__item}>Signup</span>
                    </MenuItem>
                  </Link>
                </ul>
              )}
            </Menu>
          </>
        )}
      </PopupState>
    </>
  );
};

export default UserIconMenuPopup;
