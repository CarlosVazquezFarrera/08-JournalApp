import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fireBaseLoadNotes,
  firebaseCreateNote,
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
    return fireBaseLoadNotes(uid);
  }
);
