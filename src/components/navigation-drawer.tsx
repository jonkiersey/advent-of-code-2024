import { Box, Link, styled } from "@mui/material";

export const DRAWER_WIDTH = 80 as const;

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
];
const NavigationDrawer = () => {
  return (
    <NavDrawer>
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </NavDrawer>
  );
};

export default NavigationDrawer;
