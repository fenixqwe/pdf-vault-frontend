import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {DocumentsState} from "@/store/documents/types.ts";
import type {Documents} from "@/models/Document.ts";

const initialState: DocumentsState = {
    documents: []
};

const slice = createSlice({
    name: "documents",
    initialState,
    reducers: {
        changeDocuments: (state, action: PayloadAction<Documents[]>) => {
            state.documents = action.payload;
        },
        addNewDocument: (state, action: PayloadAction<Documents>) => {
            state.documents.push(action.payload);
        },
        deleteDocument: (state, action: PayloadAction<string>) => {
            const index = state.documents.findIndex(doc => doc.document_id === action.payload);
            state.documents.splice(index, 1);
        },
        clearDocuments(state) {
            state.documents = initialState.documents;
        }
    }
})

export const {reducer: documentsReducer, actions: documentsActions} = slice;