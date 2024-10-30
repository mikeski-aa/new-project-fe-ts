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

export { convertDate };
