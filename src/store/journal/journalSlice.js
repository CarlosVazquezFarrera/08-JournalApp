import { createSlice } from "@reduxjs/toolkit";
import { createNote, deleteNote, loadNotes, saveNote, uploadFiles } from "./thunks";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    savedMessage: "",
    notes: [],
    active: null,
  },
  reducers: {
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.savedMessage = "";
    },
    clearNotes: (state) => {
      state.isSaving = false;
      state.savedMessage = "";
      state.notes = [];
      state.active = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNote.pending, (state) => {
      state.isSaving = true;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.isSaving = false;
      state.active = action.payload;
      state.notes.push(action.payload);
    }),
      builder.addCase(loadNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      }),
      builder.addCase(saveNote.pending, (state) => {
        state.isSaving = true;
      });
    builder.addCase(saveNote.fulfilled, (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
      state.savedMessage = `${action.payload.title} guardado con éxito`;
    });
    builder.addCase(uploadFiles.pending, (state) => {
      state.isSaving = true;
    });
    builder.addCase(uploadFiles.rejected, (state) => {
      state.isSaving = false;
    });
    builder.addCase(uploadFiles.fulfilled, (state, action) => {
      state.isSaving = false;
      state.active.imagesUrls = [...state.active.imagesUrls, ...action.payload];
    });

    builder.addCase(deleteNote.fulfilled, (state, action)=>{
      state.notes = state.notes.filter(note => note.id !== action.payload.id );
      state.active = null
    })
  },
});
export const { setActiveNote, clearNotes } = journalSlice.actions;
