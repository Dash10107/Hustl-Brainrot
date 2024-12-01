import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "./theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h4"
        color={colors.grey[100]}
        fontWeight="bold"
        fontSize={'24px'}
        sx={{ m: "0 0 5px 0", fontFamily: "Poppins, sans-serif" }} // Add Poppins font
      >
        {title}
      </Typography>
      <div className="my-2"></div>
      <Typography
        fontSize={'20px'}
        color={colors.greenAccent[400]}
        sx={{ fontFamily: "Poppins, sans-serif" }} // Add Poppins font
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
