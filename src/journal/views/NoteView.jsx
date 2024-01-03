import { useEffect } from "react";
import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";

import { ImageGallery } from "../components";

import Swal from "sweetalert2";
import { useNote } from "../hooks/noteHook";

export const NoteView = () => {
  const {
    note,
    savedMessage,
    isSaving,
    dateString,
    title,
    body,
    handleSubmit,
    handleChange,
    inputImages,
    onDelete,
    onImagesChange
  } = useNote();
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
        <Grid container justifyContent="end">
          <Button onClick={onDelete} color="error" sx={{ mt: 2 }}>
            <DeleteOutline />
            Borrar
          </Button>
        </Grid>
        <ImageGallery images={note.imagesUrls} />
      </Grid>
    </form>
  );
};
