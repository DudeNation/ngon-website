export function MoneyFormat(money) {
  if (money !== 0 && !money) {
    return "0 VND";
  } else if (typeof money === "number") {
    return money
      .toString()
      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
      .concat(" VND");
  } else if (typeof money === "string") {
    return money.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.").concat(" VND");
  } else return "0 VND";
}
