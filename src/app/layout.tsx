"use client";
import {
  Box,
  ThemeProvider,
  styled,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import theme from "../theme";
import Head from "next/head";
import { useEffect } from "react";

const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  background: theme.palette.background.default,
}));

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode, setMode]);

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.png" />
      </Head>
      <body style={{ margin: 0, height: "100vh" }}>
        <main>
          <ThemeProvider theme={theme} defaultMode={mode}>
            <PageContainer>{children}</PageContainer>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
