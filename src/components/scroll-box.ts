import { Box, styled } from "@mui/material";

const ScrollBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  maxHeight: 100,
  overflowY: "auto",
});

export default ScrollBox;
