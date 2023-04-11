import React, { useState } from "react";
import FrontCard from "./assets/bg-card-front.png";
import BackCard from "./assets/bg-card-back.png";
import CompleteIcon from "./assets/icon-complete.svg";
import Logo from "./assets/card-logo.svg";

import "./index.css";

import { useFormik } from "formik";
import * as Yup from "yup";

function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedInputs, setConfirmedInputs] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    cardMonth: "",
    cardYear: "",
    cardCvc: "",
    zipCode: "",
  });

  function handleFormSubmit(event) {
    event.preventDefault();
    formik.handleSubmit();

    if (formik.errors && Object.keys(formik.errors).length > 0) {
      setErrors(formik.errors);
    } else {
      setConfirmedInputs(true);
    }
  }

  const formik = useFormik({
    initialValues: {
      cardName: "",
      cardNumber: "",
      cardDate: "",
      cardCvc: "",
    },
    validationSchema: Yup.object({
      cardName: Yup.string()
      .required("Name is required")
      .min(5, "Enter at least 5 letters!")
      .max(20, "Enter up to 20 letters!"),
      cardNumber: Yup.string()
        .required("Card number is required")
        .min(16, "Enter at least 13 numbers!")
        .max(19, "Enter up to 16 numbers!"),
      cardMonth: Yup.string()
        .required("Month is required")
        .matches(/^(0?[1-9]|1[0-2])$/, "Invalid month format")
        .max(2, "Enter up to 2 numbers!"),
      cardYear: Yup.string()
        .required("Year is required")
        .matches(/^\d{2}$/, "Invalid year format")
        .max(2, "Enter up to 2 numbers!"),
      cardCvc: Yup.string()
        .required("CVC is required")
        .matches(/^\d{3}$/, "Invalid CVC format")
        .max(3, "Enter up to 3 numbers!"),
    }),
    onSubmit: (values) => {
      setIsSubmitted(true);
    },
  });

  return (
    <>
      <main>
        <div className="container">
          <div className="left_section">
            <div className="cards">
              <div className="front_card">
                <img src={Logo} alt="card-logo" className="card_logo" />
                <div className="card_container">
                  <img src={FrontCard} alt="front-card" />
                  <h1 id="number">{formik.values.cardNumber}</h1>
                  <div className="card_info">
                    <span id="name">{formik.values.cardName}</span>
                    <span id="date">
                      <span id="month"> {formik.values.cardMonth}</span>/
                      <span id="year">{formik.values.cardYear}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="back_card">
                <img src={BackCard} alt="back-card" />
                <span id="cvc">{formik.values.cardCvc}</span>
              </div>
            </div>
          </div>

          <div className="right_section">
            {!confirmed && (
              <form onSubmit={handleFormSubmit}>
                <div className="grid_1">
                  <label htmlFor="card_name">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Juão Pinheiro"
                    id="card_name"
                    name="cardName"
                    value={formik.values.cardName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.cardName && formik.errors.cardName
                        ? "input_error"
                        : ""
                    }
                  />
                  {formik.touched.cardName && formik.errors.cardName ? (
                    <div className="error_msg">{formik.errors.cardName}</div>
                  ) : null}
                </div>
                <div className="grid_2">
                  <label htmlFor="card_number">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    id="card_number"
                    placeholder="e.g. 1234 5678 9012 3456"
                    required
                    maxLength={19}
                    value={
                      formik.values.cardNumber
                        ? formik.values.cardNumber
                            .replace(/\s/g, "")
                            .replace(/(\d{4})/g, "$1 ")
                            .trim()
                        : ""
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.cardNumber && formik.errors.cardNumber
                        ? "input_error"
                        : ""
                    }
                  />
                  {formik.touched.cardNumber && formik.errors.cardNumber ? (
                    <div className="error_msg">{formik.errors.cardNumber}</div>
                  ) : null}{" "}
                </div>
                <div className="card_information">
                  <div id="card_date">
                    <label htmlFor="card_date">Exp. Date (MM/YY)</label>
                    <div className="two_inp">
                      <div>
                        <input
                          type="number"
                          placeholder="MM"
                          name="cardMonth"
                          id="card_month"
                          value={formik.values.cardMonth}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.touched.cardMonth && formik.errors.cardMonth
                              ? "input_error"
                              : ""
                          }
                        />
                        {formik.touched.cardMonth && formik.errors.cardMonth ? (
                          <div className="error_msg">
                            {formik.errors.cardMonth}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="YY"
                          name="cardYear"
                          id="card_year"
                          value={formik.values.cardYear}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.touched.cardYear && formik.errors.cardYear
                              ? "input_error"
                              : ""
                          }
                        />
                        {formik.touched.cardYear && formik.errors.cardYear ? (
                          <div className="error_msg">
                            {formik.errors.cardYear}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="grid_4">
                    <label htmlFor="card_cvc">CVC</label>
                    <input
                      type="number"
                      placeholder="e.g. 123"
                      id="card_cvc"
                      name="cardCvc"
                      value={formik.values.cardCvc}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.touched.cardCvc && formik.errors.cardCvc
                          ? "input_error"
                          : ""
                      }
                    />
                    {formik.touched.cardCvc && formik.errors.cardCvc ? (
                      <div className="error_msg">{formik.errors.cardCvc}</div>
                    ) : null}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirmedInputs) {
                      setConfirmed(true);
                    } else {
                      alert(
                        "Verifique se todos os campos estão preenchidos corretamente! Se todos estiverem preenchidos, aperte Confirm novamente"
                      );
                    }
                  }}
                  className="btn"
                >
                  Confirm
                </button>
              </form>
            )}
          </div>
          {confirmed && confirmedInputs && (
            <ThankYou setConfirmed={setConfirmed} />
          )}
        </div>
      </main>
    </>
  );
}

function ThankYou({ setConfirmed }) {
  return (
    <>
      <div className="thank-you ">
        <img src={CompleteIcon} alt="" className="" />
        <h1>Thank you!</h1>
        <p>We've added your card details</p>
        <button onClick={() => setConfirmed(false)} className="btn">
          Continue
        </button>
      </div>
    </>
  );
}

export default App;
