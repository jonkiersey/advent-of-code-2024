import useIsMobile from "@app/hooks/useIsMobile";
import { Box, Link, styled } from "@mui/material";

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

const FooterContainer = styled(Box)({
  justifySelf: "flex-end",
  display: "flex",
  justifyContent: "center",
  gap: 16,
  padding: 16,
});

const Footer = () => {
  const isMobile = useIsMobile();
  return (
    <FooterContainer>
      {footerLinks.map((link) => (
        <Link key={link.href} href={link.href} variant="body2">
          {(isMobile && link.mobileLabel) || link.label}
        </Link>
      ))}
    </FooterContainer>
  );
};

export default Footer;
