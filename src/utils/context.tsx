import { createContext, useMemo, useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
interface ContextState {
  // set the type of state you want to handle with context e.g.
  dateFrom: any;
  dateTo: any;
  monthYear: any;
  openModal: any;
  reloadPage: any;
  listCategories: any;
}
const DateSelectContext = createContext({} as ContextState);
export function DateSelectProvider(props) {
  const { t, i18n } = useTranslation();
  const { children } = props;

  let monthYearInit = moment().format("MMMM YYYY");

  const startOfMonth = moment(monthYearInit)
    .startOf("month")
    .format("YYYY-MM-DD");
  const endOfMonth = moment(monthYearInit).endOf("month").format("YYYY-MM-DD");

  console.log({ monthYearInit, startOfMonth, endOfMonth });
  const [dateFrom, setDateFrom] = useState(startOfMonth);
  const [dateTo, setDateTo] = useState(endOfMonth);
  const [monthYear, setMonthYear] = useState(monthYearInit);
  const [openModal, setOpenModal] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [listCategories, setListCategories] = useState([]);
  const value = {
    dateFrom: [dateFrom, setDateFrom],
    dateTo: [dateTo, setDateTo],
    monthYear: [monthYear, setMonthYear],
    openModal: [openModal, setOpenModal],
    reloadPage: [reloadPage, setReloadPage],
    listCategories: [listCategories, setListCategories],
  };
  return (
    <DateSelectContext.Provider value={value}>
      {children}
    </DateSelectContext.Provider>
  );
}

export default DateSelectContext;
