import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import { Google } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

export const AuthLayout = ({children, title=''}:any) => {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
      >
        <Grid
          item
          className="box-shadow"
          xs={3}
          sx={{width:{md:450} ,backgroundColor: "white", padding: 3, borderRadius: 2 }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>
            {title}
          </Typography>
          {children}
        </Grid>
      </Grid>
    </>
  );
};
