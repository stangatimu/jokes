import { Button, Col, Row, Switch } from "antd";
import Cookies from "js-cookie";
import React from "react";

const Navigation: React.FC<{ handleClick: () => void }> = ({ handleClick }) => {
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.assign("/");
  };
  return (
    <Row
      justify={"center"}
      style={{
        marginTop: "10px",
      }}
    >
      <Col lg={14} md={18} sm={22} xs={23}>
        <Row justify={"space-between"}>
          <Button onClick={handleLogout}>Logout</Button>
          <Switch
            unCheckedChildren="Light"
            checkedChildren="Dark"
            onChange={handleClick}
          />
        </Row>
      </Col>
    </Row>
  );
};

export default Navigation;
