import { useContext, useState } from "react";
import styled from "styled-components";
import validator from "validator";
import { BiLoader } from "react-icons/bi";
import { database } from "../util/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ModalContext } from "../context/ModalContext";
import { motion } from "framer-motion";
import CountriesInputField from "./CountriesInputField";

const INITIAL_FORM_VALUE = {
  firstName: "",
  lastName: "",
  address: "",
  email: "",
  phone: "",
  country: "",
  dialCode: "+91",
};

const FeedbackForm = () => {
  const { setFeedbackSlide } = useContext(ModalContext);

  const [formData, setFormData] = useState(INITIAL_FORM_VALUE);
  const [formError, setFormError] = useState(INITIAL_FORM_VALUE);

  const [isCheckingData, setIsCheckingData] = useState(false);

  const [countries, setCountries] = useState([]);

  const changeFormData = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();
      setFormError(INITIAL_FORM_VALUE);
      let isError = false;

      setIsCheckingData(true);

      //check first name
      if (!validator.isLength(formData.firstName, { min: 1 })) {
        setFormError((prev) => ({
          ...prev,
          firstName: "First Name is Required!",
        }));
        isError = true;
      }
      //check last name
      if (!validator.isLength(formData.lastName, { min: 1 })) {
        setFormError((prev) => ({
          ...prev,
          lastName: "Last Name is Required!",
        }));
        isError = true;
      }
      //check address
      if (!validator.isLength(formData.firstName, { min: 1 })) {
        setFormError((prev) => ({ ...prev, address: "Address is Required!" }));
        isError = true;
      }
      //check email
      if (!validator.isEmail(formData.email)) {
        setFormError((prev) => ({
          ...prev,
          email: "Please enter a valid e-mail!",
        }));
        isError = true;
      }
      //check phone
      if (!validator.isMobilePhone(formData.phone)) {
        setFormError((prev) => ({
          ...prev,
          phone: "Please enter a valid phone number!",
        }));
        isError = true;
      }

      //check countries
      let matches = countries.filter(
        (country) => country.name === formData.country
      );
      if (!matches.length) {
        setFormError((prev) => ({
          ...prev,
          country: "Invalid Country Selected",
        }));
        isError = true;
      }

      //if no error is there , sent data to database
      if (!isError) {
        // firebase
        await addDoc(collection(database, "feedbacks"), formData);
        setIsCheckingData(false);
        setFeedbackSlide(false);
      }
    } catch (err) {
      setIsCheckingData(false);
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <FeedbackContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3>Thank you so much for taking the time!</h3>
        <p className="subTitle">Please provide the details below!</p>
        <FormContainer onSubmit={handleSubmitForm}>
          <Field>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              placeholder="John"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={changeFormData}
            />
            <span>{formError.firstName}</span>
          </Field>
          <Field>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              placeholder="Doe"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={changeFormData}
            />
            <span>{formError.lastName}</span>
          </Field>
          <Field>
            <label htmlFor="address">Address:</label>
            <textarea
              rows="5"
              placeholder="Enter your Full Postal Address"
              id="address"
              name="address"
              value={formData.address}
              onChange={changeFormData}
            />
          </Field>
          <Field>
            <CountriesInputField
              countries={countries}
              setCountries={setCountries}
              formError={formError}
              changeFormData={changeFormData}
              setFormData={setFormData}
              formData={formData}
            />
          </Field>
          <Field>
            <label htmlFor="email">Email Id:</label>
            <input
              type="text"
              placeholder="example@sample.com"
              id="email"
              name="email"
              value={formData.email}
              onChange={changeFormData}
            />
            <span>{formError.email}</span>
          </Field>
          <Field>
            <label htmlFor="phone">Phone Number:</label>
            <input
              className="phone-code-input"
              disabled
              type="text"
              name="dialCode"
              placeholder="+91"
              value={formData.dialCode}
              onChange={changeFormData}
            />
            <input
              type="tel"
              placeholder="1234567890"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={changeFormData}
            />
            <span>{formError.phone}</span>
          </Field>
          <SubmitBtn disabled={isCheckingData}>
            {isCheckingData ? (
              <BiLoader size="15px" className="spin" />
            ) : (
              "Submit Feedback"
            )}
          </SubmitBtn>
        </FormContainer>
      </FeedbackContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 0 15px 15px 0;
  background-color: #ebf2f7;
  width: 650px;
  border-right: 0.5px solid rgba(0, 0, 0, 0.2);
`;

const FeedbackContainer = styled(motion.div)`
  padding: 60px;
  .subTitle {
    margin: 10px 0 30px;
  }
`;

const FormContainer = styled.form`
  .phone-code-input {
    width: 12% !important;
    padding: 15px;
    margin-right: 10px;
    border-radius: 6px;
    text-align: center;
  }
`;

const Field = styled.div`
  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
  }
  input {
    border: none;
    outline: none;
    background-color: white;
    box-shadow: -1px 0px 16px 1px rgba(0, 0, 0, 0.09);
    padding: 15px 35px 15px 20px;
    border-radius: 8px;
    width: 45%;
  }
  textarea {
    resize: none;
    width: 80%;
    border: none;
    outline: none;
    background-color: white;
    box-shadow: -1px 0px 16px 1px rgba(0, 0, 0, 0.09);
    padding: 12px 35px 15px 20px;
    border-radius: 8px;
    font-family: sans-serif;
  }
  span {
    color: #eb1010;
    margin-left: 15px;
    font-size: 14px;
  }
  #phone {
    width: 37%;
  }
  margin-bottom: 10px;
`;

const SubmitBtn = styled.button`
  border: none;
  outline: none;
  padding: 15px 25px;
  color: white;
  background: #6ca88e;
  border-radius: 10px;
  font-weight: 600;
  margin-top: 15px;
  cursor: pointer;
  width: 35%;

  .spin {
    animation: spin 2s ease-in-out infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

export default FeedbackForm;
