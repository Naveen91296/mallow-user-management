import { useState } from "react";
import Cookies from "js-cookie";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router";
import { LogoutOutlined } from "@ant-design/icons";
import styles from "./Header.module.css";
import { ROUTES } from "../../../routes/routeConstants";

const Header = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    Cookies.remove("accessToken");
    localStorage.clear();
    sessionStorage.clear();
    setShowLogoutModal(false);
    navigate(ROUTES.LOGIN);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.rightSection}>
          <span className={styles.userName}>Elon Musk</span>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={() => setShowLogoutModal(true)}
            className={styles.logoutButton}
          />
        </div>
      </header>

      <Modal
        title="Confirm Logout"
        open={showLogoutModal}
        onCancel={handleCancelLogout}
        footer={[
          <Button key="cancel" onClick={handleCancelLogout}>
            Cancel
          </Button>,
          <Button
            key="logout"
            type="primary"
            danger
            onClick={handleConfirmLogout}
          >
            Logout
          </Button>,
        ]}
      >
        Are you sure you want to logout?
      </Modal>
    </>
  );
};

export default Header;
