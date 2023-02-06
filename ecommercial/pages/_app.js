import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";

import "../styles/globals.css";
import { useRouter } from "next/router";
import { AuthContextProvider } from "../utils/User";
import { ProductContextProvider } from "../utils/Product";

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
      <StoreProvider>
        <ProductContextProvider>
          <AuthContextProvider>
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </AuthContextProvider>
        </ProductContextProvider>
      </StoreProvider>
    </>
  );
}
function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return children;
}
export default MyApp;
