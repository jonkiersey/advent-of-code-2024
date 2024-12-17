import { useMediaQuery, useTheme } from "@mui/material";

const useIsMobile = () => useMediaQuery(useTheme().breakpoints.down("sm"));

export default useIsMobile;
