import { Box, Typography, Grid } from "@mui/material";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import UserList from "../../components/userList/UserList";
import Widget from "../../components/widget/Widget";

const Home = () => {
  return (
    <Box display="flex" className="home">
      {/* Sidebar */}
      <Sidebar />
      <Box flex={6} className="homeContainer">
        {/* Navbar */}
        <Navbar />

        {/* Widgets Section */}
        <Grid container spacing={3} sx={{ padding: "1.25rem" }}>
          <Grid item xs={12} md={3}>
            <Widget type="user" />
          </Grid>
          <Grid item xs={12} md={3}>
            <Widget type="order" />
          </Grid>
          <Grid item xs={12} md={3}>
            <Widget type="earning" />
          </Grid>
          <Grid item xs={12} md={3}>
            <Widget type="balance" />
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Box
          display="flex"
          flexDirection="row"
          gap={3}
          sx={{ padding: "0.313rem 1.25rem" }}
        >
          <Box flex={1}>
            <Featured />
          </Box>
          <Box flex={2}>
            <Chart title="Last 6 Months (Revenue)" height={320} />
          </Box>
        </Box>

        {/* User List Section */}
        <Box
          sx={{
            boxShadow: 3,
            margin: "1.25rem",
            padding: "1.25rem",
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
          className="listContainer"
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 500, color: "gray", marginBottom: "0.938rem" }}
            className="listTitle"
          >
            Send or Request From
          </Typography>
          <UserList />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
