import { Typography, Breadcrumbs, Link } from "@mui/material";
import { useCallback, useState, useEffect, useRef } from "react";
import { RootState } from "../store";
import { useAppSelector } from "../store/hooks";
import { flattenDocuments, searchDocumentById } from "../utils/search";
import NavBar from "./NavBar";
import "./ContentView.css";
import { Document } from "../utils/api";

export default function ContentView() {
  const documents = useAppSelector((state: RootState) => state.toc.documents);
  const selectedID = useAppSelector((state: RootState) => state.toc.selectedID);

  const [dislayedDoc, setDislayedDoc] = useState<Document[]>([]);

  useEffect(() => {
    const flattenDocs = flattenDocuments(documents);
    const index = flattenDocs.findIndex((doc) => doc.id === selectedID);
    const docs: Document[] = [];
    for (
      let i = Math.max(0, index - 5);
      i < Math.min(flattenDocs.length, index + 5);
      i++
    ) {
      docs.push(flattenDocs[i]);
    }
    setDislayedDoc(docs);
    if (focus.current) {
      focus.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedID]);

  const handleScrollDownObserver = useCallback(
    (entries: any) => {
      const flattenDocs = flattenDocuments(documents);
      const target = entries[0];
      if (target.isIntersecting) {
        console.log("scroll down");
        setDislayedDoc((prev) => {
          const id = flattenDocs.findIndex(
            (doc) => doc.id === prev[prev.length - 1].id
          );
          return [...prev, ...flattenDocs.slice(id + 1, id + 6)];
        });
      }
    },
    [selectedID]
  );

  const scrollDownloader = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const downObserver = new IntersectionObserver(
      handleScrollDownObserver,
      option
    );

    if (scrollDownloader.current)
      downObserver.observe(scrollDownloader.current);
  }, [handleScrollDownObserver]);

  const focus = useRef<HTMLElement>(null);

  return (
    <>
      <NavBar key="nav" />
      <div className="content" key="content-list">
        {!!dislayedDoc &&
          dislayedDoc.map((doc, index) => (
            <div key="content">
              {selectedID === doc.id ? (
                <>
                  <Typography key={doc.id + "chapter" + index} ref={focus}>
                    {doc.name}
                  </Typography>
                  <Typography key={doc.id + "content" + index}>
                    {doc.content}
                  </Typography>{" "}
                </>
              ) : (
                <>
                  <Typography key={doc.id + "chapter" + index}>
                    {doc.name}
                  </Typography>
                  <Typography key={doc.id + "content" + index}>
                    {doc.content}
                  </Typography>{" "}
                </>
              )}
            </div>
          ))}
        <div key="scroll" ref={scrollDownloader} />
      </div>
    </>
  );
}
