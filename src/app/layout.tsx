"use client";
import {
  Box,
  CssBaseline,
  Link,
  ListItem,
  ThemeProvider,
  styled,
} from "@mui/material";
import theme from "../theme";
import Head from "next/head";
import NextLink from "next/link";

const DRAWER_WIDTH = 100 as const;

const AppContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const PageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  background: theme.palette.background.default,
  flexGrow: 1,
}));

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

const Footer = styled(Box)({
  justifySelf: "flex-end",
  display: "flex",
  justifyContent: "center",
  gap: 8,
  padding: 16,
});

const NavDrawer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: DRAWER_WIDTH,
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const NavLinks = [
  { href: "/day-one", label: "Day 1" },
  { href: "/day-two", label: "Day 2" },
];

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
            <AppContainer>
              <PageContainer>
                <NavDrawer>
                  {NavLinks.map((link) => (
                    <ListItem key={link.href}>
                      <NextLink href={link.href}>{link.label}</NextLink>
                    </ListItem>
                  ))}
                </NavDrawer>
                <ContentContainer>{children}</ContentContainer>
              </PageContainer>
              <Footer>
                <Link href="https://www.freepik.com/icon/christmas-hat_16757912">
                  Icon by ryanbagoez
                </Link>
              </Footer>
            </AppContainer>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
