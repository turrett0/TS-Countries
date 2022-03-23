import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {ICountry} from "../types";
import axios from "axios";
import {filterByCode} from "../config";
import {useNavigate} from "react-router-dom";

type Props = {
  country: ICountry;
};

const Wrapper = styled.section`
  margin-top: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;

  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;
const InfoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const InfoTitle = styled.h1`
  margin: 0;
  font-weight: var(--fw-normal);
`;
const ListGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
  }
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const ListItem = styled.li`
  line-height: 1.8;

  & > b {
    font-weight: var(--fw-bold);
  }
`;
const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: flex-start;

  & > b {
    font-weight: var(--fw-bold);
  }

  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;
const TagGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
const Tag = styled.span`
  padding: 0 1rem;
  background-color: var(--color-ui-base);
  box-shadow: var(--shadow);
  line-height: 1.5;
  cursor: pointer;
`;

const Info: React.FC<Props> = ({country}) => {
  const [neighbours, setNeighbours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (country.borders) {
      axios.get(filterByCode(country.borders)).then(({data}) => {
        setNeighbours(data.map((c: ICountry) => c.name.common));
      });
    }
  }, [country.borders]);

  return (
    <Wrapper>
      <InfoImage src={country.flags.svg} alt={country.name.common} />
      <div>
        <InfoTitle>{country.name.common}</InfoTitle>
        <ListGroup>
          <List>
            <ListItem>
              <b>Native Name: </b>{" "}
              {Object.entries(country.name.nativeName).map((item) => (
                <span>{item[1].common}</span>
              ))}
            </ListItem>
            <ListItem>
              <b>Population: </b> {country.population}
            </ListItem>
            <ListItem>
              <b>Region: </b> {country.region}
            </ListItem>
            <ListItem>
              <b>Sub Region: </b> {country.subregion}
            </ListItem>
            <ListItem>
              <b>Capital: </b> {country.capital}
            </ListItem>
          </List>
          <List>
            <ListItem>
              <b>Top Level Domain: </b>{" "}
              {country.tld.map((domain) => (
                <span key={domain}>{domain}</span>
              ))}
            </ListItem>
            <ListItem>
              <b>Currencies: </b>{" "}
              {Object.entries(country.currencies).map((item) => (
                <span>
                  {item[1].name} {`(${item[0]})`}
                </span>
              ))}
            </ListItem>
            <ListItem>
              <b>Languages: </b>{" "}
              {Object.entries(country.languages).map((item) => (
                <span>{item[1]} </span>
              ))}
            </ListItem>
          </List>
        </ListGroup>
        {country.borders && (
          <Meta>
            <b>Border Countries</b>
            <TagGroup>
              {neighbours.map((borderCountry) => (
                <Tag
                  key={borderCountry}
                  onClick={() => navigate(`/country/${borderCountry}`)}
                >
                  {borderCountry}
                </Tag>
              ))}
            </TagGroup>
          </Meta>
        )}
      </div>
    </Wrapper>
  );
};

export default Info;
