import { Breadcrumbs, Link } from "@mui/material";
import { getPaths } from "../utils/search";
import { RootState } from "../store";
import { useAppSelector } from "../store/hooks";
export default function NavBar() {
  const documents = useAppSelector((state: RootState) => state.toc.documents);
  const selectedID = useAppSelector((state: RootState) => state.toc.selectedID);
  const pathNames: string[] = getPaths(documents, selectedID);
  return (
    <Breadcrumbs id="breadcrumb" aria-label="breadcrumb">
      {pathNames.map((pathName, index) => (
        <Link key={"_" + index}>{pathName}</Link>
      ))}
    </Breadcrumbs>
  );
}
