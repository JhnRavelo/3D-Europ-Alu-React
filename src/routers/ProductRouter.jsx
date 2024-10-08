import { Route, Routes } from "react-router-dom";
import Page from "../pages/Page/Products/Page";

const ProductRouter = () => {
  return (
    <Routes>
      <Route index path="/:link" element={<Page />} />
    </Routes>
  );
};

export default ProductRouter;
