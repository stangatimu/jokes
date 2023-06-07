import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ConfigProvider, theme } from "antd";
import { store } from "@/store";
import { Provider } from "react-redux";
import { Col, Row, Switch } from "antd";

const { defaultAlgorithm, darkAlgorithm } = theme;

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };
  
  return (
    <Provider store={store}>
      <style jsx global>{`
        html {
          background: ${isDarkMode ? "black" : "white"};
        }
      `}</style>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <Row
          justify={"center"}
          style={{
            marginTop: "10px",
          }}
        >
          <Col lg={14} md={18} sm={22} xs={23}>
            <Row justify={"end"}>
              <Switch
                unCheckedChildren="Light"
                checkedChildren="Dark"
                onChange={handleClick}
              />
            </Row>
          </Col>
        </Row>
        <Component {...pageProps} />
      </ConfigProvider>
    </Provider>
  );
}
