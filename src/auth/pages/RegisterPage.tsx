import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Link as RouterLink } from "react-router-dom";
import { user } from "../../interfaces/user";
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startCreatingUserWithEmailPassword } from "../../store/auth";

const formData: user = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [
    (value: any) => value.includes("@"),
    "El email debe de contener un @",
  ],
  password: [
    (value: any) => value.length >= 6,
    "La contraseña debe de tener más de 6 letras",
  ],
  displayName: [(value: any) => value.length >= 1, "El nombre es obligatorio"],
};

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useAppSelector((state) => state.auth);
  const isCheckingAuth = useMemo(() => status === "checking", [status]);

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    formValidation,
  } = useForm(formData, formValidations);

  const { displayNameValid, emailValid, passwordValid }: any = formValidation;

  const onSubmit = (event: Event | undefined) => {
    event?.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Crear Cuenta">
      <form onSubmit={() => onSubmit(event)}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre Completo"
              type={"text"}
              placeholder="Nombre Completo"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type={"email"}
              placeholder="correo@example.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
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
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, pt: 2 }}>

            <Grid item xs={12} sm={12} display={!!errorMessage ? '':'none'}>
             <Alert severity="error"> 
              {errorMessage}
             </Alert>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isCheckingAuth}
              >
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent={"end"}>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              <Typography> ¿Ya tienes cuenta?</Typography>
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
