import { isValid, parseISO, format } from 'date-fns';
export const isValidDate = (dateStr: string) => {
  const date = parseISO(dateStr);
  return isValid(date);
};

export const convertToDate = (date: Date) => {
  const birthday = format(date, 'yyyy-MM-dd');
  console.log(birthday);
  return birthday;
};