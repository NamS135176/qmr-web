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
      const resPayment = getPaymentMethod();
      const resShop = getShopName();
      // console.log({ resPayment, resShop });
      let itemDefault: any;
      const result = await Promise.all([res1, resPayment, resShop]);

      itemDefault = result[0].categories.find((item) => item.name === "?");

      const res2 = result[1].find((item) => item.name === "");
      const res3 = result[2].find((item) => item.name === "");

      console.log({ result });

      // const itemDefault = res1.categories.find((item) => item.name === '?');
      if (!itemDefault) {
        await addExpense("?", 1000);
        const newList = await getCategory();
        setListCategories(newList.categories);
        setPaymentMethodDefault(res2);
        setShopNameDefault(res3);
        return;
      }
      setListCategories(result[0].categories);
      setPaymentMethodDefault(res2);
      setShopNameDefault(res3);
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
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export default CategoryContext;
