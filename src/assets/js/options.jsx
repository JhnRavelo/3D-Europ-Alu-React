import DocumentSVG from "../svg/DocumentSVG";
import GallerySVG from "../svg/GallerySVG";

export const messageOptions = [
  {
    text: "Documents",
    svg: <DocumentSVG width="25" height="25" className="violet" />,
    name: "file",
    accept: ".doc,.docx,.xls,.xlsx,.pdf,.txt,.ppt,.pptx,.odt,.ods,.odp",
  },
  {
    text: "Photos et Images",
    svg: <GallerySVG width="25" height="25" className="blue" />,
    name: "img",
    accept: "image/png, .svg, .jpeg, .jpg, .webp",
  },
];
