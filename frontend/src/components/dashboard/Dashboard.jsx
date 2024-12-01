import React from 'react'
import Navbar from '../shared/Navbar'
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import LineChart from './LineChart';
import GeographyChart from "./GeographyChart";
import BarChart from "./BarChart";
import StatBox from "./StatBox";
import ProgressCircle from "./ProgressCircle";
import Header from './Header';
import { tokens } from "./theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import { mockTransactions } from "./data/mockData";
import { ThemeProvider } from "@mui/material";


const Dashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ThemeProvider theme={theme}>
    <div>
    <Navbar />
    <div className='flex items-center justify-between mx-auto max-w-7xl'>
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: "#6937c2",
              color: "white",
              fontSize: "14px",
              fontWeight: "semibold",
              padding: "10px 20px",
              fontFamily: "Poppins, sans-serif"
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px", color: "white" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
  display="grid"
  gridTemplateColumns="repeat(12, 1fr)"
  gridAutoRows="140px"
  gap="20px"
>
  {/* ROW 1 */}
  <Box
    gridColumn="span 3"
    display="flex"
    alignItems="center"
    justifyContent="center"
    sx={{
      border: "1px solid #e0e0e0", // Light gray border
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
      borderRadius: "8px", // Optional rounded corners
      backgroundColor: "white", // Ensure a white background
    }}
  >
    <StatBox
      title="15,045"
      subtitle="Internships Applied"
      progress="0.75"
      increase="+10%"
      icon={
        <PersonAddIcon
          sx={{ color: "black", fontSize: "26px" }}
        />
      }
    />
  </Box>
  <Box
    gridColumn="span 3"
    display="flex"
    alignItems="center"
    justifyContent="center"
    sx={{
      border: "1px solid #e0e0e0",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      backgroundColor: "white",
    }}
  >
    <StatBox
      title="80"
      subtitle="Skills Added"
      progress="0.50"
      increase="+30%"
      icon={
        <EmailIcon
          sx={{ color: "black", fontSize: "26px" }}
        />
      }
    />
  </Box>
  <Box
    gridColumn="span 3"
    display="flex"
    alignItems="center"
    justifyContent="center"
    sx={{
      border: "1px solid #e0e0e0",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      backgroundColor: "white",
    }}
  >
    <StatBox
      title="5"
      subtitle="Interviews Scheduled"
      progress="0.65"
      increase="+15%"
      icon={
        <PointOfSaleIcon
          sx={{ color: "black", fontSize: "26px" }}
        />
      }
    />
  </Box>
  <Box
    gridColumn="span 3"
    display="flex"
    alignItems="center"
    justifyContent="center"
    sx={{
      border: "1px solid #e0e0e0",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      backgroundColor: "white",
    }}
  >
    <StatBox
      borderRadius="12px"
      title="12"
      subtitle="Offers Received"
      progress="0.80"
      increase="+25%"
      icon={
        <TrafficIcon
          sx={{ color: "black", fontSize: "26px" }}
        />
      }
    />
  </Box>



        {/* ROW 2 */}
        <Box
  gridColumn="span 8"
  gridRow="span 2"
  sx={{
    border: "1px solid #e0e0e0", // Light gray border
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
    borderRadius: "8px", // Rounded corners
    backgroundColor: "white", // White background for clarity
  }}
>
  <Box
    mt="25px"
    p="0 30px"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
  >
    <Box>
      <Typography variant="h5" fontWeight="500" color={"gray"} sx={{ fontFamily: "Poppins, sans-serif" }}>
        Most Growing Domains
      </Typography>
    </Box>
    <Box>
      <IconButton>
        <DownloadOutlinedIcon
          sx={{ fontSize: "26px", color: "#4CAF50" }} // Green icon for positive metric
        />
      </IconButton>
    </Box>
  </Box>
  <Box height="250px" m="-20px 0 0 0">
    <LineChart isDashboard={true} /> {/* Updated chart to track domain trends */}
  </Box>
</Box>


<Box
  gridColumn="span 4"
  gridRow="span 2"
  overflow="auto"
  sx={{
    border: "1px solid #e0e0e0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "white",
    "::-webkit-scrollbar": {
      display: "none",
    },
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  }}
>
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    borderBottom="2px solid #e0e0e0"
    p="15px"
  >
    <Typography color={"black"} variant="h5" fontWeight="500" sx={{ fontFamily: "Poppins, sans-serif" }}>
      Recent Internship Applications
    </Typography>
  </Box>
  {mockTransactions.map((transaction, i) => (
    <Box
      key={`${transaction.txId}-${i}`}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p="15px"
      sx={{
        borderBottom: i !== mockTransactions.length - 1 ? "1px solid #e0e0e0" : "none",
        backgroundColor: i % 2 === 0 ? "#f9f9f9" : "white", // Alternating row colors for better readability
      }}
    >
      <Box>
        <Typography
          color={"black"}
          fontWeight="500"
          sx={{ px: 2, fontSize: "16px" }}
        >
          {transaction.txId}
        </Typography>
        <Typography sx={{ px: 2, fontFamily: "Poppins, sans-serif" }}>
          {transaction.user}
        </Typography>
      </Box>
      <Box fontWeight="600" color={"gray"} sx={{ fontFamily: "Poppins, sans-serif" }}>
        {transaction.date}
      </Box>
      <Box
        sx={{
          backgroundColor: transaction.status === "Offer Received" ? "#4CAF50" : "#FF9800", // Green for "Offer Received", Orange for other statuses
          color: "white",
          p: "5px 10px",
          borderRadius: "4px",
          fontSize: "14px",
          fontWeight: "400"
        }}
      >
        {transaction.status}
      </Box>
    </Box>
  ))}
</Box>




        {/* ROW 3 */}
        <Box
  gridColumn="span 4"
  gridRow="span 2"
  p="30px"
  sx={{
    border: "1px solid #e0e0e0", 
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
    borderRadius: "8px", 
    backgroundColor: "white", 
    "::-webkit-scrollbar": {
      display: "none", 
    },
    msOverflowStyle: "none", 
    scrollbarWidth: "none", 
  }}
>
  <Typography variant="h6" fontWeight="500" sx={{fontFamily: "Poppins, sans-serif"}}>
    Internship Applications Progress
  </Typography>
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    mt="25px"
  >
    <ProgressCircle size="125" />
    <Typography
      variant="h5"
      color={colors.greenAccent[500]}
      sx={{ mt: "15px", fontFamily: "Poppins, sans-serif" }}
    >
      15 Applications Sent
    </Typography>
    <Typography sx={{fontFamily: "Poppins, sans-serif"}}>5 Interviews Scheduled, 2 Offers Received</Typography>
  </Box>
</Box>


<Box
  gridColumn="span 4"
  gridRow="span 2"
  sx={{
    border: "1px solid #e0e0e0", // Light gray border
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
    borderRadius: "8px", // Rounded corners
    backgroundColor: "white", // White background for clarity
    "::-webkit-scrollbar": {
      display: "none", // Hide scrollbar for WebKit-based browsers
    },
    msOverflowStyle: "none", // Hide scrollbar for IE and Edge
    scrollbarWidth: "none", // Hide scrollbar for Firefox
  }}
>
  <Typography
    variant="h5"
    fontWeight="500"
    sx={{ padding: "30px 30px 0 30px", fontFamily: "Poppins, sans-serif" }}
  >
    Sales Quantity
  </Typography>
  <Box height="250px" mt="-20px">
    <BarChart isDashboard={true} />
  </Box>
</Box>

<Box
  gridColumn="span 4"
  gridRow="span 2"
  padding="30px"
  sx={{
    border: "1px solid #e0e0e0", // Light gray border
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
    borderRadius: "8px", // Rounded corners
    backgroundColor: "white", // White background for clarity
    "::-webkit-scrollbar": {
      display: "none", // Hide scrollbar for WebKit-based browsers
    },
    msOverflowStyle: "none", // Hide scrollbar for IE and Edge
    scrollbarWidth: "none", // Hide scrollbar for Firefox
  }}
>
  <Typography
    variant="h5"
    fontWeight="500"
    sx={{ marginBottom: "15px", fontFamily: "Poppins, sans-serif" }}
  >
    Applicants Based on areas
  </Typography>
  <Box height="200px">
    <GeographyChart isDashboard={true} />
  </Box>
</Box>

      </Box>
    </Box>
    </div>


</div>
</ThemeProvider>
  )
}

export default Dashboard
