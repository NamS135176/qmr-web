import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
interface ContextState {
  // set the type of state you want to handle with context e.g.
  dateFrom: any;
  dateTo: any;
  monthYear: any;
  openModal: any;
}
const DateSelectContext = createContext({} as ContextState);
export function DateSelectProvider(props) {
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
  const value = {
    dateFrom: [dateFrom, setDateFrom],
    dateTo: [dateTo, setDateTo],
    monthYear: [monthYear, setMonthYear],
    openModal: [openModal, setOpenModal],
  };
  return (
    <DateSelectContext.Provider value={value}>
      {children}
    </DateSelectContext.Provider>
  );
}

// DateSelectProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default DateSelectContext;
