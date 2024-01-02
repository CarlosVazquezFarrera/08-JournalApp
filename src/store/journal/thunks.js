import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fireBaseLoadNotes,
  fireBaseSaveNote,
  firebaseCreateNote,
  uploadFile,
} from "../../firebase/journalProvider";

export const createNote = createAsyncThunk(
  "journal/createNote",
  async (_, { getState }) => {
    const { uid } = getState().auth;
    return await firebaseCreateNote(uid);
  }
);

export const loadNotes = createAsyncThunk(
  "journal/loadNotes",
  async (_, { getState }) => {
    const { uid } = getState().auth;
    return await fireBaseLoadNotes(uid);
  }
);

export const saveNote = createAsyncThunk(
  "journal/saveNote",
  async (_, { getState }) => {
    const { uid } = getState().auth;
    const { active } = getState().journal;
    const noteFireStore = { ...active };
    delete noteFireStore.id;
    return await fireBaseSaveNote(uid, active.id, noteFireStore);
  }
);

export const uploadFiles = createAsyncThunk(
  "journal/uploadFiles",
  async (files = []) => {
    console.log(files);
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(uploadFile(file));
    }
    return await Promise.all(fileUploadPromises);
  }
);
