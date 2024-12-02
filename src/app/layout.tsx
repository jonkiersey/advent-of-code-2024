"use client";
import { Box, CssBaseline, Link, ThemeProvider, styled } from "@mui/material";
import theme from "../theme";
import Head from "next/head";

const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  background: theme.palette.background.default,
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 16,
  maxWidth: "100%",
  flexGrow: 1,
}));

const Footer = styled(Box)({
  justifySelf: "flex-end",
  display: "flex",
  justifyContent: "center",
  gap: 8,
  padding: 16,
});

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body style={{ margin: 0, height: "100vh" }}>
        <main>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Head>
              <link rel="icon" href="/icon.png" />
              <title>Advent of Code 2024</title>
            </Head>
            <PageContainer>
              <ContentContainer>{children}</ContentContainer>
              <Footer>
                <Link href="https://www.freepik.com/icon/christmas-hat_16757912">
                  Icon by ryanbagoez
                </Link>
              </Footer>
            </PageContainer>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
