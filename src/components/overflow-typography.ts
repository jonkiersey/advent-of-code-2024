import { styled, Typography } from "@mui/material";

const OverflowTypography = styled(Typography)({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  flexShrink: 0,
});

export default OverflowTypography;
