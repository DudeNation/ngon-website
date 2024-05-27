import VISA_ICON from "../assets/images/visa.png";
import MASTER_CARD_ICON from "../assets/images/master_card.png";

export const OTHERCARDS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/
];
export const EXPIRYDATE = [/[0-9]/, /\d/, "/", /\d/, /\d/];
export const CVC_INFO = [/[0-9]/, /\d/, /\d/, /\d/];

export const CARDICON = {
  visa: VISA_ICON,
  masterCard: MASTER_CARD_ICON
};

export const CARDARR = [
  "visa",
  "masterCard"
];

export const COLORARR = [
  ["#20bdff", "#5433ff"],
  ["#ff4b1f", "#ff9068"],
  ["#ffb347", "#ffcc33"],
  ["#D38312", "#A83279"],
  ["#83a4d4", "#b6fbff"],
  ["#fbd3e9", "#bb377d"]
];
