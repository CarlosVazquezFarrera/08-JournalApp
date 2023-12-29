import { SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";

export const NoteView = () => {
  const { active: note } = useSelector((state) => state.journal);
  const { values, handleChange, resetForm } = useFormik({
    initialValues: note,
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  const { title, body, date } = values;

  const dateString = useMemo(() => {
    const noteDate = new Date(date);
    return noteDate.toUTCString();
  }, [date]);
  return (
    <Grid
      className="animate__animated animate__fadeIn"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>

      <Grid>
        <Button color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese título"
          label="Título"
          name="title"
          value={title}
          onChange={handleChange}
          sx={{ border: "none", mb: 1 }}
        ></TextField>

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={handleChange}
          sx={{ border: "none", mb: 1 }}
        ></TextField>
      </Grid>
      <ImageGallery />
    </Grid>
  );
};
