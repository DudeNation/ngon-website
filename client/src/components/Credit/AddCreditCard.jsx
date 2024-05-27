import React from "react";
import MaskedInput from "react-text-mask";
import { findDebitCardType, minLength, stripeCardExpirValidation, stripeCardNumberValidation, textWithSpacesOnly } from "../../utils/validation";
import { CARDARR, CARDICON, CVC_INFO, EXPIRYDATE, OTHERCARDS } from "../../constants/creditcard";

const reducer = (state, action) => {
  // console.log("action", action.data);
  switch (action.type) {
    case "card":
      return { ...state, card: action.data };
    case "expiry":
      return { ...state, expiry: action.data };
    case "securityCode":
      return { ...state, securityCode: action.data };
    case "cardHodler":
      return { ...state, cardHodler: action.data };
    case "cleanState":
      return { ...action.data };
    default:
      return state;
  }
};

export default function AddCreditCard(props) {
  const [error, setError] = React.useState({});
  const [cardType, setCardType] = React.useState();
  const [state, dispatch] = React.useReducer(reducer, {
    card: "",
    expiry: "",
    securityCode: "",
    cardHodler: ""
  });

  const handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case "card":
        setCardType(findDebitCardType(value));
        errorText = stripeCardNumberValidation(value);
        setError({ ...error, cardError: errorText });
        break;
      case "cardHodler":
        errorText = value === "" ? "Required" : textWithSpacesOnly(value);
        setError({ ...error, cardHodlerError: errorText });
        break;
      case "expiry":
        errorText =
          value === "" ? "Required" : stripeCardExpirValidation(value);
        setError({ ...error, expiryError: errorText });
        break;
      case "securityCode":
        errorText = value === "" ? "Required" : minLength(3)(value);
        setError({ ...error, securityCodeError: errorText });
        break;
      default:
        break;
    }
  };

  const handleInputData = (e) => {
    dispatch({ type: e.target.name, data: e.target.value });
  };

  const handleBlur = (e) => {
    handleValidations(e.target.name, e.target.value);
  };

  const checkErrorBeforeSave = () => {
    let errorValue = {};
    let isError = false;
    Object.keys(state).forEach(async (val) => {
      if (state[val] === "") {
        errorValue = { ...errorValue, [`${val + "Error"}`]: "Required" };
        isError = true;
      }
    });
    setError(errorValue);
    return isError;
  };

  const handleSave = (e) => {
    let errorCheck = checkErrorBeforeSave();
    if (!errorCheck) {
      props.setCardList([...props.cardList, { ...state, cardType }]);
      dispatch({
        type: "cleanState",
        data: {
          card: "",
          expiry: "",
          securityCode: "",
          cardHodler: ""
        }
      });
      setCardType("");
      // props.setCard(false);
    }
  };

  return (
    <div className="credit-card">
      <form style={{ marginBottom: "10px" }}>
        <div className="credit-card-wrapper">
          <div className="wrapper-input">
            <MaskedInput
              mask={OTHERCARDS}
              guide={false}
              placeholderChar={"\u2000"}
              name="card"
              required
              value={state.card}
              onChange={handleInputData}
              onBlur={handleBlur}
            />
            {(!error || !error.cardError) && CARDARR.includes(cardType) && (
              <img
                style={{
                  float: "right",
                  position: "relative",
                  top: "-35px"
                }}
                src={CARDICON[cardType]}
                alt="card"
                width="50px"
                height="33px"
              />
            )}
            {error && error.cardError && error.cardError.length > 1 && (
              <span className="wrapper-err">{error.cardError}</span>
            )}
          </div>
          <div className="wrapper-input">
            <input
              type="text"
              name="cardHodler"
              required
              value={state.cardHodler}
              onChange={handleInputData}
              onBlur={handleBlur}
            />
            {error &&
              error.cardHodlerError &&
              error.cardHodlerError.length > 1 && (
                <span className="wrapper-err">{error.cardHodlerError}</span>
              )}
          </div>
          <div className="wrapper-input">
            <MaskedInput
              mask={EXPIRYDATE}
              guide={false}
              name="expiry"
              required
              placeholderChar={"\u2000"}
              placeholder="MM/YY"
              value={state.expiry}
              onChange={handleInputData}
              onBlur={handleBlur}
            />
            {error &&
              error.expiryError &&
              error.expiryError.length > 1 && (
                <span className="wrapper-err">{error.expiryError}</span>
              )}
          </div>
          <div className="wrapper-input">
            <MaskedInput
              mask={CVC_INFO}
              guide={false}
              name="securityCode"
              required
              placeholderChar={"\u2000"}
              placeholder="Secuirty Code"
              value={state.securityCode}
              onChange={handleInputData}
              onBlur={handleBlur}
            />
            {error &&
              error.securityCodeError &&
              error.securityCodeError.length > 1 && (
                <span className="wrapper-err">{error.securityCodeError}</span>
              )}
          </div>
          <div>
            <div className="wrapper-button">
              <button className="btn-grad">Close</button>
            </div>
            <div className="wrapper-button">
              <button className="btn-grad" type="button" onClick={handleSave}>
                Add Card
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}