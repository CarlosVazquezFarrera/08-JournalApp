import { useDispatch, useSelector } from "react-redux";
import {
  deleteNote,
  saveNote,
  setActiveNote,
  uploadFiles,
} from "../../store/journal";
import { useFormik } from "formik";
import { useEffect, useMemo, useRef } from "react";
import Swal from "sweetalert2";

export const useNote = () => {
  const {
    active: note,
    savedMessage,
    isSaving,
  } = useSelector((state) => state.journal);

  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: note,
    enableReinitialize: true,
    onSubmit: () => dispatch(saveNote()),
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
    dispatch(setActiveNote(values));
  }, [dispatch, values]);

  const onDelete = () => {
    Swal.fire({
      title: "Do you want to delete this note?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNote());
      }
    });
  };

  return {
    note,
    savedMessage,
    isSaving,
    handleChange,
    handleSubmit,
    title,
    body,
    dateString,
    inputImages,
    onImagesChange,
    onDelete,
  };
};
