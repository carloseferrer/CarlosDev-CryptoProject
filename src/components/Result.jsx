import styled from "@emotion/styled"


const Container = styled.div`
    color: #fff;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 20px;

`

const Img = styled.img`
    display: block;
    width: 120px;
    margin-right: 20px;
    @media (min-width:768px) and (max-width: 1023px) {
        margin-right: 80px;
        margin-left: 60px;
    }
`

const Text = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
        color: #16db65;
    }
    @media (min-width: 320px ) and (max-width: 426px) {
        display: grid;
    }
`

const Price = styled.p`
    font-size: 27px;
    span{
        font-weight: 700;
        color: #16db65;
    }
    @media (max-width: 320px) {
        font-size: 22px;
    }

`

const Result = ({result}) => {

  const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = result;
 
  return (
    <Container>
        <Img 
            src={`https://cryptocompare.com/${IMAGEURL}`} 
            alt="Crypto-Image" 
        />
        <div>
            <Price>The Price is: <span>{PRICE}</span></Price>
            <Text>High day price: <span>{HIGHDAY}</span></Text>
            <Text>Low day price: <span>{LOWDAY}</span></Text>
            <Text>Change 24H:<span> {CHANGEPCT24HOUR}%</span></Text>
            <Text>Last Update: <span>{LASTUPDATE}</span></Text>
        </div>
    </Container>
  )
}

export default Result