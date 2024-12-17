"use client";
import { Box, CssBaseline, ThemeProvider, styled } from "@mui/material";
import theme from "../theme";
import Head from "next/head";
import Footer from "@components/footer";
import NavigationDrawer, { DRAWER_WIDTH } from "@components/navigation-drawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const transparent = (color: string, opacity: number): string => {
  const red = parseInt(color.slice(1, 3), 16);
  const green = parseInt(color.slice(3, 5), 16);
  const blue = parseInt(color.slice(5, 7), 16);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
};

const AppContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundImage: `
    linear-gradient(to bottom, ${theme.palette.background.default}, rgba(255, 255, 255, 0.1)),
    linear-gradient(to right, ${theme.palette.background.default}, ${transparent(theme.palette.primary.main, 0.1)}, ${
    theme.palette.background.default
  })
  `,
  [theme.breakpoints.down("md")]: {
    backgroundImage: `
      linear-gradient(to bottom, ${theme.palette.background.default}, rgba(255, 255, 255, 0.1)),
      linear-gradient(to right, ${theme.palette.background.default}, ${transparent(theme.palette.primary.main, 0.1)})
    `,
  },
}));

const PageContainer = styled(Box)({
  display: "flex",
  flexGrow: 1,
});

const ContentContainer = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  display: "flex",
  flexDirection: "column",
  justifySelf: "right",
  gap: 16,
  padding: 16,
  maxWidth: `calc(100% - ${DRAWER_WIDTH}px)`,
  flexGrow: 1,
}));

const queryClient = new QueryClient();

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
            <QueryClientProvider client={queryClient}>
              <CssBaseline />
              <Head>
                <link rel="icon" href="/icon.png" />
                <title>Advent of Code 2024</title>
              </Head>
              <AppContainer>
                <PageContainer>
                  <NavigationDrawer />
                  <ContentContainer>{children}</ContentContainer>
                </PageContainer>
                <Footer />
              </AppContainer>
            </QueryClientProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
