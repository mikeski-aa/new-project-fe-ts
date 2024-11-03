// converts date to EU format
function convertDate(optDate?: Date): string {
  let today: Date = new Date();

  if (optDate) {
    today = new Date(optDate);
  }

  const month: string = today.toLocaleString("default", { month: "long" });
  let day: string | number = today.getDate();
  let newDate: string = "";
  switch (day) {
    case 1:
      day = day + "st ";
      break;
    case 2:
      day = day + "nd ";
      break;
    case 3:
      day = day + "rd ";
      break;

    default:
      day = day + "th ";
      break;
  }

  newDate = day + "of " + month;

  return newDate;
}

function dateConvert(date: Date): string {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.toLocaleString("default", { month: "long" });
  const year = newDate.getFullYear();

  return `${day} ${month} ${year}`;
}

export { convertDate, dateConvert };
