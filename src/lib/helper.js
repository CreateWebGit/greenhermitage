import moment from "moment";

export const convertToDate = (theDate) => {
  const date = moment(theDate).format("DD / MM - YYYY");

  return date;
};
