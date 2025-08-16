// import { ThemeProvider } from "../../src/ThemeProvider";
// import { Provider } from "react-redux";
// import { store } from "../store/store";
// import ErrorBoundary from "../../src/ErrorBoundary";
// import Header from "../../components/Header/Header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <ThemeProvider> */}
        {/* <Provider store={store}> */}
        {/* <ErrorBoundary> */}
        {/* <Header /> */}
        {children}
        {/* <div id="root">{children}</div> */}
        {/* </ErrorBoundary> */}
        {/* </Provider> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
