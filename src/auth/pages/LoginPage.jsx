import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterDomLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { authRoute, authRoutes } from "../routes/AuthRoutes";
import { useForm } from "../../hooks/useForms";
import { useDispatch, useSelector } from "react-redux";
import {
  startGoogleAuthentication,
  startLoginWithEmailAndPassword,
} from "../../store/auth";
import { useMemo } from "react";
import { authStates } from "../../store/auth/authSatates";
export const LoginPage = () => {
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector((state) => state.auth);

  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });

  const handleLoging = (event) => {
    event.preventDefault();
  };

  const handleLoginWithEmail = () => {
    dispatch(startLoginWithEmailAndPassword({ email, password }));
  };

  const onGoogleSingIn = () => {
    dispatch(startGoogleAuthentication());
  };

  const isAuthenticating = useMemo(
    () => status == authStates.checking,
    [status]
  );

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={handleLoging}
        className="animate__animated animate__fadeIn"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="mail"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              placeholder="contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            ></TextField>
          </Grid>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} display={errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={handleLoginWithEmail}
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={onGoogleSingIn}
                disabled={isAuthenticating}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link
              color="inherit"
              component={RouterDomLink}
              to={authRoute(authRoutes.register)}
            >
              Crear cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
