import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterDomLink } from "react-router-dom";
import { authRoute, authRoutes } from "../routes/AuthRoutes";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmail } from "../../store/auth";
import { useMemo } from "react";
import { authStates } from "../../store/auth/authSatates";

const RegisaterSchema = Yup.object().shape({
  displayName: Yup.string()
    .required("Campo requerido")
    .min(2, "La contraseña debe tener al menos 2 caracteres"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Campo requerido"),
  email: Yup.string()
    .email("Debe ser un correo")
    .required("El email es requerido"),
});

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === authStates.checking,
    [status]
  );

  const handleRegister = ({ email, displayName, password }) => {
    dispatch(startCreatingUserWithEmail({ email, password, displayName }));
  };

  const formik = useFormik({
    initialValues: {
      displayName: "juanito",
      email: "juanito@gmail.com",
      password: "12343423",
    },
    validationSchema: RegisaterSchema,
    onSubmit: handleRegister,
  });

  const { handleChange, values, handleSubmit, handleBlur, touched, errors } =
    formik;
  const { displayName, password, email } = values;

  const hasError = (fieldName) => touched[fieldName] && !!errors[fieldName];

  const errorMessageText = (fieldName) =>
    hasError(fieldName) ? errors[fieldName] : null;
  return (
    <AuthLayout title="Register">
      <form
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre"
              fullWidth
              name="displayName"
              value={displayName}
              autoComplete="false"
              error={hasError("displayName")}
              helperText={errorMessageText("displayName")}
              onBlur={handleBlur}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="email"
              name="email"
              value={email}
              fullWidth
              autoComplete="false"
              error={hasError("email")}
              helperText={errorMessageText("email")}
              onBlur={handleBlur}
              onInput={handleChange}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              name="password"
              placeholder="contraseña"
              fullWidth
              autoComplete="false"
              value={password}
              error={hasError("password")}
              helperText={errorMessageText("password")}
              onBlur={handleBlur}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={12} display={errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit "
                variant="contained"
                fullWidth
                disabled={isCheckingAuthentication}
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link
              color="inherit"
              component={RouterDomLink}
              to={authRoute(authRoutes.login)}
            >
              Inicia sesión aquí
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
