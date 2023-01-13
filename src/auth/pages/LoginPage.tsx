import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material";
import { Google } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useAppDispatch, useAppSelector, useForm } from "../../hooks";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth/thunks";
import { useMemo } from "react";

export const LoginPage = () => {
  const { status, errorMessage } = useAppSelector((state: any) => state.auth);

  const dispatch = useAppDispatch();
  const { onInputChange, email, password } = useForm(
    {
      email: "",
      password: "",
      displayName: undefined,
    },
    ""
  );

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event: any) => {
    event.preventDefault();

    console.log({ email, password });
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    console.log("GoogleSignIn");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type={"email"}
              placeholder="correo@example.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type={"password"}
              placeholder="*********"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, pt: 2 }}>
            <Grid item xs={12} sm={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => onGoogleSignIn()}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>GOOGLE</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent={"end"}>
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
