import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Form from "./components/Form";
import Result from "./components/Result";
import Spinner from "./components/Spinner";
import CryptosImg from "./img/cryptos-img.png";
import CryptosImg2 from "./img/crypto.png"

// Styled Components

// Container
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-grap: 2rem;
  }
`;
// Heading
const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #16db65;
    display: block;
    margin: 10px auto 0 auto;
  }
`;
// Img
const Img = styled.img`
  max-width: 420px;
  width: 100%;
  margin: 140px auto 0 auto;
  display: block;
  margin-right: 80px;
  @media (min-width:768px) and (max-width: 1023px) {
    margin-right: 100px;
  }
`;

function App() {
  // useState to Storage Currencies and CryptoCurrencies
  const [currencies, setCurrencies] = useState({});

  // useState to Storage data of CryptoCurrencies
  const [result, setResult] = useState([]);

  // useState to create a load spinner
  const [load, setLoad] = useState(false);

  // useEffect for validate data sending
  useEffect(() => {
    if(Object.keys(currencies).length > 0){

      // array destruring to get information from form
      const {currency, cryptoCurrency} = currencies
      // dynamic function to get crypto information from API based on form input
      const listCrypto = async () =>{

        setLoad(true);
        setResult({});

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`;
        console.log("The URL is:", url)
        const response = await fetch(url);
        const result = await response.json();
        
        setResult(result.DISPLAY[cryptoCurrency][currency]);

        setLoad(false);
      }

      // Calling the function 
      listCrypto();
    }
  },[currencies])
  return (
    <>
      <Container>
        <Img src={CryptosImg2} alt="Crypto Images" />
        <div>
          <Heading>View CryptoCurrency prices easily</Heading>
          <Form 
            setCurrencies={setCurrencies}   
          />
          {load && <Spinner />}
          {result.PRICE && <Result result={result} />}
        </div>
      </Container>
    </>
  );
}

export default App;
