import { styled, Typography } from "@mui/material";

const OverflowTypography = styled(Typography)({
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export default OverflowTypography;
