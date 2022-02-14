import { Typography, Grid, Box } from "@mui/material";
import Logo from "../assets/logo.png";


const Header = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ boxShadow: 2 }}
    >
      <Box m={5}>
        <img src={Logo} alt="logo" width="350" />
      </Box>
      <Typography
        variant="h2"
        color="primary"
        align="center"        
        xs={12}
        mr={{ xl: 50 }}
        sx={{ fontWeight: "bold" }}
        flexGrow={1}
      >
        Gestión de{" "}
        <Typography variant="h2" color="primary.defect" component="span">
          Citas
        </Typography>
      </Typography>
    </Grid>
  );
};

export default Header;
