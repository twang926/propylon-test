import { getDocuments } from "../utils/api";
import { tocActions } from "./toc-slice";
import { AppDispatch } from "./index";

export const fetchDocuments = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const documents = await getDocuments();
      dispatch(
        tocActions.showDocument({
          documents: documents,
          selectedID: "",
          isLoading: false,
          loadedIDs: [],
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

