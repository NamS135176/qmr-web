import moment from "moment";
import { createContext, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
interface ContextState {
  // set the type of state you want to handle with context e.g.
  dateFrom: any;
  dateTo: any;
  monthYear: any;
  openModal: any;
  reloadPage: any;
}
const DateSelectContext = createContext({} as ContextState);
export function DateSelectProvider(props) {
  const { t, i18n } = useTranslation();
  const { children } = props;
  let monthYearInit = moment();

  const startOfMonth = moment(monthYearInit)
    .startOf("month")
    .format("YYYY-MM-DD");
  const endOfMonth = moment(monthYearInit).endOf("month").format("YYYY-MM-DD");

  const [dateFrom, setDateFrom] = useState(startOfMonth);
  const [dateTo, setDateTo] = useState(endOfMonth);
  const [monthYear, setMonthYear] = useState(monthYearInit);
  const [openModal, setOpenModal] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [listCategories, setListCategories] = useState([]);
  // const getCate = async () => {
  //   const res1: any = await getCategory();
  //   setListCategories(res1.categories);
  // };
  // useEffect(() => {
  //   getCate();
  // }, []);
  const value = {
    dateFrom: [dateFrom, setDateFrom],
    dateTo: [dateTo, setDateTo],
    monthYear: [monthYear, setMonthYear],
    openModal: [openModal, setOpenModal],
    reloadPage: [reloadPage, setReloadPage],
  };
  console.log({ value });
  return useMemo(
    () => (
      <DateSelectContext.Provider value={value}>
        {children}
      </DateSelectContext.Provider>
    ),
    [reloadPage, monthYear, dateTo, dateFrom, openModal]
  );
}

export default DateSelectContext;
