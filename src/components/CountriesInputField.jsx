import axios from "axios";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const CountriesInputField = ({
  setCountries,
  countries,
  changeFormData,
  formError,
  setFormData,
  formData,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [countries]);
  const handleCountryChange = (e) => {
    changeFormData(e);
    if (!showSuggestions) setShowSuggestions(true);
    if (e.target.value === "") return setFilteredCountries(countries);
    const matches = countries.filter((country) => {
      const regex = new RegExp(`^${e.target.value}`, "gi");
      return country.name.match(regex);
    });
    setFilteredCountries(matches);
  };

  useEffect(() => {
    if (localStorage.getItem("countries")) {
      setCountries(JSON.parse(localStorage.getItem("countries")));
    } else {
      const fetchCountries = async () => {
        try {
          const { data } = await axios.get(
            "https://restcountries.com/v3.1/all"
          );
          console.log(data[0]);
          const results = data.map((obj) => {
            console.log(obj);
            return {
              name: obj.name.common,
              dialCode: obj.idd.root
                ? obj.idd.root + obj.idd.suffixes[0]
                : "+0",
            };
          });
          setCountries(results);
          localStorage.setItem("countries", JSON.stringify(results));
        } catch (err) {
          console.log(err);
        }
      };
      fetchCountries();
    }
  }, [setCountries]);

  const handleOnFocus = (e) => {
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (e) => {
    // console.log(e.target.innerText);
    setFormData((prev) => ({
      ...prev,
      country: e.target.innerText,
      dialCode: e.target.id,
    }));
    setShowSuggestions(false);
  };

  const handleSubmitCountry = (e) => {
    // console.log(e);
    if (e.keyCode === 13) {
      e.preventDefault();
      setShowSuggestions(false);
    }
  };

  return (
    <Wrapper>
      <label htmlFor="countries">Country:</label>
      <InputWrapper>
        <input
          type="search"
          id="countries"
          name="country"
          placeholder="India"
          value={formData.country}
          onChange={handleCountryChange}
          onKeyDown={handleSubmitCountry}
          onFocus={handleOnFocus}
        />
        <BsSearch className="searchIcon" />
        <span>{formError.country}</span>
      </InputWrapper>
      {showSuggestions && (
        <SuggestionContainer>
          {filteredCountries.length ? (
            <>
              {filteredCountries.map((country, index) => (
                <SuggestionBox
                  key={index}
                  id={country.dialCode}
                  onClick={handleSuggestionClick}
                >
                  {country.name}
                </SuggestionBox>
              ))}
            </>
          ) : (
            <p>No searched country found.</p>
          )}
        </SuggestionContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  .searchIcon {
    position: absolute;
    left: 50%;
    pointer-events: none;
    top: 50%;
    transform: translateY(-50%);
  }
  input {
    width: 55% !important;
  }
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
`;

const SuggestionContainer = styled.div`
  width: 55%;
  background-color: white;
  box-shadow: -1px 0px 16px 1px rgba(0, 0, 0, 0.09);
  position: absolute;
  top: 115%;
  z-index: 10;
  border-radius: 8px;
  height: 200px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  p {
    margin-top: 30px;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #bdb2b2;
    border-radius: 10px;
  }
`;

const SuggestionBox = styled.div`
  width: 100%;
  border-bottom: 1px solid #bdb2b2;
  background: white;
  cursor: pointer;
  padding: 10px;
  transition: all 0.3s ease-in;
  &:hover {
    background: #7cc0a2;
  }
`;

export default CountriesInputField;
