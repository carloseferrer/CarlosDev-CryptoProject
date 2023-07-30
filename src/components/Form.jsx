import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectCurrency from "../hooks/useSelectCurrency";
import { currencies } from "../data/currencies";

// Input
const InputSubmit = styled.input`
  background-color: #16db65;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #058c42;
    cursor: pointer;
  }
`;
const Form = ({setCurrencies}) => {
  // useState for Cryptos of the API
  const [cryptos, setCryptos] = useState([]);

  // Error useState
  const [error, setError] = useState(false);

  // Hook functions
  const [currency, SelectCurrency] = useSelectCurrency(
    "Select Currency",
    currencies
  ); // Select for Currency
  const [cryptoCurrency, SelectCryptoCurrency] = useSelectCurrency(
    "Select Cryptocurrency",
    cryptos
  ); // Select for Crypto

  // useEffect to call API
  useEffect(() => {
    const callAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const response = await fetch(url);
      const result = await response.json();

      const arrayCryptos = result.Data.map((crypto) => {
        const cryptoCurrencyObject = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };
        return cryptoCurrencyObject;
      });
      // saving data from API in state
      setCryptos(arrayCryptos);
    };
    callAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for empty entrys
    if([currency, cryptoCurrency].includes('')){
      setError(true);
      return;
    }
    // reset the state
    setError(false);
    // saving currencies and cryptocurrencies in objet state
    setCurrencies({
      currency, 
      cryptoCurrency
    });
  };

  return (
    <>    
      {error && <Error>All fields are required</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCurrency />
        <SelectCryptoCurrency />
        <InputSubmit type="submit" value="Send Data" />
      </form>
    </>
  );
};

export default Form;
