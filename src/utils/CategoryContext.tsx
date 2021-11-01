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
    const res1: any = getCategory();
    const resPayment = getPaymentMethod();
    const resShop = getShopName();
    // console.log({ resPayment, resShop });
    let itemDefault: any;
    Promise.all([res1, resPayment, resShop])
      .then((result) => {
        itemDefault = result[0].categories.find((item) => item.name === "?");

        const res2 = result[1].find((item) => item.name === "");
        const res3 = result[2].find((item) => item.name === "");
        setPaymentMethodDefault(res2);
        setShopNameDefault(res3);
      })
      .catch((e) => {
        console.log(e);
      });

    // const itemDefault = res1.categories.find((item) => item.name === '?');
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
