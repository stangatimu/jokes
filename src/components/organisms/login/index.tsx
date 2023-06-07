import React from "react";
import { Modal, Button, Row, Col } from "antd";
import Cookies from "js-cookie";
import styles from "./login.module.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const handleStoreToken = () => {
    Cookies.set("token", "token");
    onClose();
  };

  return (
    <Modal
      title="Login with token"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      wrapClassName={styles.modalBackdrop}
    >
      <Row justify="center">
        <Col>
          <Button type="primary" onClick={handleStoreToken}>
            Store Token
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default LoginModal;
