import { getCategory } from "api/category";
import { createContext, useEffect, useState } from "react";
interface CategoryContextState {
  listCategories: any;
}
const CategoryContext = createContext({} as CategoryContextState);
export function CategoryProvider(props) {
  const { children } = props;
  const [listCategories, setListCategories] = useState([]);
  const getCate = async () => {
    const res1: any = await getCategory();
    setListCategories(res1.categories);
  };
  useEffect(() => {
    getCate();
  }, []);
  const value = {
    listCategories: [listCategories, setListCategories],
  };
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryContext;
