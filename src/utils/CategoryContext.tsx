import { addExpense, getCategory } from "api/category";
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
    const itemDefault = res1.categories.find((item) => item.name === "?");
    if (!itemDefault) {
      await addExpense("?", 1000);
      const newList = await getCategory();
      setListCategories(newList.categories);
      return;
    }
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
