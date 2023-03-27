import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { Document } from "../utils/api";
interface DocumentState {
  documents: Document[];
  selectedID: string;
  loadedIDs: string[];
  isLoading: boolean;
}
interface Action {
  type: string;
  payload: DocumentState;
}

const initialState: DocumentState = {
  documents: [],
  selectedID: "",
  loadedIDs: [],
  isLoading: false,
};
const tocSlice = createSlice({
  name: "toc",
  initialState,
  reducers: {
    showDocument(state: DocumentState, action: Action) {
      state.documents = action.payload.documents;
    },
    selectDocument(state: DocumentState, action: Action) {
      state.selectedID = action.payload.selectedID;
      state.loadedIDs = [...new Set(...state.loadedIDs, state.selectedID)];
    },
    setLoading(state: DocumentState, action: Action) {
      state.isLoading = action.payload.isLoading;
    },
    loadMore(state: DocumentState, action: Action) {
      state.loadedIDs = [
        ...new Set(...state.loadedIDs, action.payload.loadedIDs),
      ];
    },
  },
});

export const tocActions = tocSlice.actions;
export const tocDocuments = (state: RootState) => state.toc.documents;

export default tocSlice;
