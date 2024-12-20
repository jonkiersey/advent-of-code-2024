"use client";
import { Box, CssBaseline, Link, ThemeProvider, styled, useMediaQuery, useTheme } from "@mui/material";
import theme from "../theme";
import Head from "next/head";

const DRAWER_WIDTH = 80 as const;

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

const Footer = styled(Box)({
  justifySelf: "flex-end",
  display: "flex",
  justifyContent: "center",
  gap: 16,
  padding: 16,
});

const NavDrawer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: DRAWER_WIDTH,
  borderRight: `1px solid ${theme.palette.divider}`,
  padding: 16,
  gap: 8,
}));

const navLinks = [
  { href: "/day-one", label: "Day 1" },
  { href: "/day-two", label: "Day 2" },
  { href: "/day-three", label: "Day 3" },
  { href: "/day-four", label: "Day 4" },
  { href: "/day-five", label: "Day 5" },
  { href: "/day-six", label: "Day 6" },
  { href: "/day-seven", label: "Day 7" },
];

const footerLinks = [
  {
    href: "https://adventofcode.com/",
    label: "Advent of Code",
    mobileLabel: "AoC",
  },
  {
    href: "https://github.com/jonkiersey/advent-of-code-2024",
    label: "Source on GitHub",
    mobileLabel: "GitHub",
  },
  {
    href: "https://www.freepik.com/icon/christmas-hat_16757912",
    label: "Icon by ryanbagoez",
  },
];

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("sm"));
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
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </NavDrawer>
                <ContentContainer>{children}</ContentContainer>
              </PageContainer>
              <Footer>
                {footerLinks.map((link) => (
                  <Link key={link.href} href={link.href} variant="body2">
                    {(isMobile && link.mobileLabel) || link.label}
                  </Link>
                ))}
              </Footer>
            </AppContainer>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
