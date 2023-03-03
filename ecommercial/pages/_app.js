import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { AuthContextProvider } from "../context/authContext";
import store from "../redux/store/store";
import "../styles/globals.css";
import { StoreProvider } from "../utils/Store";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <NextNProgress
        color="linear-gradient(to right, rgba(255,0,0,0),rgba(255,0,0,3));"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ showSpinner: false, easing: "ease" }}
      />

      <Provider store={store}>
        <StoreProvider>
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </StoreProvider>
      </Provider>
    </>
  );
}

export default MyApp;
