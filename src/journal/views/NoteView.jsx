import { useEffect, useMemo, useRef } from "react";
import { SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { ImageGallery } from "../components";
import { saveNote, uploadFiles } from "../../store/journal";

import Swal from "sweetalert2";

export const NoteView = () => {
  const dispatch = useDispatch();

  const onSaveNote = () => {
    dispatch(saveNote());
  };
  const {
    active: note,
    savedMessage,
    isSaving,
  } = useSelector((state) => state.journal);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: note,
    enableReinitialize: true,
    onSubmit: onSaveNote,
  });

  const { title, body, date } = values;

  const dateString = useMemo(() => {
    const noteDate = new Date(date);
    return noteDate.toUTCString();
  }, [date]);
  const inputImages = useRef();
  const onImagesChange = ({ target }) => {
    const files = target.files;
    if (files.length <= 0) return;
    dispatch(uploadFiles(files));
  };

  useEffect(() => {
    if (savedMessage != "") {
      Swal.fire("Nota actualizada", savedMessage, "success");
    }
  }, [savedMessage]);

  return (
    <form onSubmit={handleSubmit}>
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

        <Grid item>
          <input
            type="file"
            multiple
            ref={inputImages}
            onChange={onImagesChange}
            style={{ display: "none" }}
          />
          <IconButton
            color="primary"
            disabled={isSaving}
            onClick={() => inputImages.current.click()}
          >
            <UploadOutlined />
          </IconButton>
          <Button
            disabled={isSaving}
            type="submit"
            color="primary"
            sx={{ padding: 2 }}
          >
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
        <ImageGallery images={note.imagesUrls} />
      </Grid>
    </form>
  );
};
