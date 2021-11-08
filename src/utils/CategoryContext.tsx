import { addExpense, getCategory } from "api/category";
import { getPaymentMethod } from "api/paymentMethod";
import { getShopName } from "api/shopName";
import { createContext, useEffect, useState } from "react";
interface CategoryContextState {
  listCategories: any;
  paymentMethodDefault: any;
  shopNameDefault: any;
}
const CategoryContext = createContext({} as CategoryContextState);
export function CategoryProvider(props) {
  const { children } = props;
  const [listCategories, setListCategories] = useState([]);
  const [paymentMethodDefault, setPaymentMethodDefault] = useState(undefined);
  const [shopNameDefault, setShopNameDefault] = useState(undefined);
  const getCate = async () => {
    try {
      const res1: any = getCategory();
      const resP = getPaymentMethod();
      const resS = getShopName();

      const [resCategory, resPaymentMethod, resShopName] = await Promise.all([
        res1,
        resP,
        resS,
      ]);

      const itemCDefault = resCategory.categories.find(
        (item) => item.name === "?"
      );

      const itemPDefault = resPaymentMethod.find((item) => item.name === "");
      const itemSDefault = resShopName.find((item) => item.name === "");

      if (!itemCDefault) {
        await addExpense("?", 1000);
        const newList = await getCategory();
        setListCategories(newList.categories);
        setPaymentMethodDefault(itemPDefault);
        setShopNameDefault(itemSDefault);
        return;
      }

      setListCategories(resCategory.categories);
      setPaymentMethodDefault(itemPDefault);
      setShopNameDefault(itemSDefault);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCate();
  }, []);
  const value = {
    listCategories: [listCategories, setListCategories],
    shopNameDefault: [shopNameDefault, setShopNameDefault],
    paymentMethodDefault: [paymentMethodDefault, setPaymentMethodDefault],
  };
  console.log("abc", value);
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryContext;
