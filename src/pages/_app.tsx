import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import { store } from "@/store";
import { Provider } from "react-redux";
import { Col, Row, Switch } from "antd";
import Cookies from "js-cookie";
import LoginModal from "@/components/organisms/login";
import Navigation from "@/components/organisms/navigation";

const { defaultAlgorithm, darkAlgorithm } = theme;

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setIsLogin(true);
    }
  }, []);

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
        <Navigation handleClick={handleClick} />

        <LoginModal isOpen={isLogin} onClose={() => setIsLogin(false)} />
        {!isLogin && <Component {...pageProps} />}
      </ConfigProvider>
    </Provider>
  );
}
