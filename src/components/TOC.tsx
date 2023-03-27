import { useEffect } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { fetchDocuments } from "../store/actions";
import { tocActions, tocDocuments } from "../store/toc-slice";
import { RootState } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function TocComponent() {
  const dispatch = useAppDispatch();
  const documents = useAppSelector(tocDocuments);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);
  return (
    <TreeView
      id="toc"
      aria-label="Front end challenge"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: "100vh", flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {documents.map((doc) => (
        <TreeItem
          key={doc.id}
          nodeId={doc.id}
          label={doc.name}
          onClick={() =>
            dispatch(
              tocActions.selectDocument({
                documents,
                selectedID: doc.id,
                isLoading: false,
                loadedIDs: [doc.id],
              })
            )
          }
        >
          {!!doc.childrens &&
            doc.childrens.map((children) => (
              <TreeItem
                key={children.id}
                nodeId={children.id}
                label={children.name}
                onClick={() =>
                  dispatch(
                    tocActions.selectDocument({
                      documents,
                      selectedID: children.id,
                      isLoading: false,
                      loadedIDs: [],
                    })
                  )
                }
              >
                {!!children.childrens &&
                  children.childrens.map((children2) => (
                    <TreeItem
                      key={children2.id}
                      nodeId={children2.id}
                      label={children2.name}
                      onClick={() =>
                        dispatch(
                          tocActions.selectDocument({
                            documents,
                            selectedID: children2.id,
                            isLoading: false,
                            loadedIDs: [children2.id],
                          })
                        )
                      }
                    />
                  ))}
              </TreeItem>
            ))}
        </TreeItem>
      ))}
    </TreeView>
  );
}
