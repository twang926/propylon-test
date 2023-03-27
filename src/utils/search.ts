import { Document } from "../utils/api";
export function getPaths(documents: Document[], id: string): string[] {
  let document = searchDocumentById(documents, id);
  let paths: string[] = [];
  while (document) {
    paths = [document.name, ...paths];
    document = searchDocumentById(documents, document.parent_id);
  }
  return paths;
}

export function flattenDocuments(
  documents: Document[] | undefined
): Document[] {
  if (!documents) return [];
  let flatDocs: Document[] = [];
  for (let i = 0; i < documents.length; i++) {
    flatDocs = [...flatDocs, documents[i]];
    if (documents[i].childrens) {
      flatDocs = [...flatDocs, ...flattenDocuments(documents[i].childrens)];
    }
  }
  return flatDocs;
}

export function searchDocumentById(
  documents: Document[] | undefined,
  id: string
): Document | null {
  if (!documents) {
    return null;
  }
  let response = null;
  for (let i = 0; i < documents.length; i++) {
    if (documents[i].id === id) {
      response = documents[i];
      break;
    }

    response = searchDocumentById(documents[i].childrens, id);
    if (response) {
      break;
    }
  }
  return response;
}
