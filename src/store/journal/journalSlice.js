import { createSlice } from '@reduxjs/toolkit';
import { createNote, loadNotes } from './thunks';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        active: null
    },
    reducers: {
        setActiveNote: (state, action)=> {
            state.active = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNote.pending,(state)=>{
            state.isSaving = true;
        })
        builder.addCase(createNote.fulfilled, (state, action)=>{
            state.isSaving = false;
            state.active = action.payload;
            state.notes.push(action.payload);
        }),
        builder.addCase(loadNotes.fulfilled, (state, action)=>{
            state.notes = action.payload
        })
    }
});
export const { setActiveNote } = journalSlice.actions;