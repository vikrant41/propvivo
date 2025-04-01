import App from "next/app";
import { getUser } from "../contexts/AuthContext";
// import logger from "../lib/logger";
import "../styles/index.css";
import Layout from "../components/Layout";
import { BreadcrumbProvider } from "../contexts/BreadCrumbContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { store } from "../stores";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <BreadcrumbProvider>
          <Component {...pageProps} />
        </BreadcrumbProvider>
      </Layout>
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const auth = await getUser(appContext.ctx);
  // logger.debug("auth: %j", auth);
  return { ...appProps, auth: auth };
};
export default MyApp;
