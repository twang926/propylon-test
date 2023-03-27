import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3004/data",
});

export interface Document {
  id: string;
  name: string;
  level: number;
  parent_id: string;
  content: string;
  childrens?: Document[];
}

interface ApiResponse {
  content: {
    document: Document[];
  };
}

export const getDocuments = async () => {
  const getChildComponents = (
    documents: Document[],
    levelId: string
  ): Document[] => {
    let response = documents.filter((d) => d.parent_id === levelId);

    response = response.map((d) => ({
      ...d,
      childrens: getChildComponents(documents, d.id),
    }));

    return response;
  };

  const { data } = await api.get<ApiResponse>("/");

  const response = data.content.document.filter((d) => d.level === 1);
  const docs = response.map((d) => ({
    ...d,
    childrens: getChildComponents(data.content.document, d.id),
  }));

  return docs;
};
