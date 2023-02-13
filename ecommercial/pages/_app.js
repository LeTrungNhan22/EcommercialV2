import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";

import "../styles/globals.css";
import { useRouter } from "next/router";
import { AuthContextProvider } from "../utils/User";
import { ProductContextProvider } from "../utils/Product";

import { StoreProvider } from "../utils/Store";

import { Provider } from "react-redux";
import store from "../redux/store/store";

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
      <StoreProvider>
        <ProductContextProvider>
          <AuthContextProvider>
            <SessionProvider session={session}>
              <Provider store={store}>
                <Component {...pageProps} />
              </Provider>
            </SessionProvider>
          </AuthContextProvider>
        </ProductContextProvider>
      </StoreProvider>
    </>
  );
}

export default MyApp;
