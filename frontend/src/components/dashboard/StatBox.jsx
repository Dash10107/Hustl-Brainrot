import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "./theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px" borderRadius='12px'>
      <Box display="flex" justifyContent="space-between">
        <Box
          color="black"
        >
          {icon}
          <Typography
            variant="h5"
            fontWeight="500"
            sx={{ color: "black", fontFamily: "Poppins, sans-serif" }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography fontWeight={'500'} sx={{ color: "black", fontFamily: "Poppins, sans-serif", fontSize: "16px" }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h"
          fontStyle="italic"
          sx={{ color: "black", fontFamily: "Poppins, sans-serif" }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
