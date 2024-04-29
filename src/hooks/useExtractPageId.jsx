import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePage from "./usePage";

const useExtractPageId = () => {
  const { link } = useParams();
  const { pages } = usePage();
  const [id, setID] = useState();
  useEffect(() => {
    if (link && pages) {
      const pageName = link.split("-").join(" ");
      const id = pages.find(
        (page) => page.page.toLowerCase() == pageName
      )?.ID_page;
      if (id) {
        setID(id);
      }
    }
  }, [link, pages]);
  return id;
};

export default useExtractPageId;
