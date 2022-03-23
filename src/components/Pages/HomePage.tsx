import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import {ICountry} from "../../types";
import {ALL_COUNTRIES} from "../../config";
import Card from "../../Card";
import List from "../../List";
import Controls from "../Controls";
import {useNavigate} from "react-router-dom";
import {v4 as uuid} from "uuid";

type Props = {
  countries: Array<ICountry>;
  setCountries: (value: React.SetStateAction<ICountry[]>) => void;
};

const HomePage: React.FC<Props> = ({countries, setCountries}) => {
  const [filteredCountries, setFilteredCountries] = useState(countries);

  const handleFilteredCountries = (search?: string, region?: string) => {
    let data = [...countries];
    if (region) {
      console.log(region === "All");
      if (region === "All") {
        data = [...countries];
      } else {
        data = data.filter((c) => c.region.includes(region));
      }
    }
    if (search) {
      data = data.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredCountries(data);
  };

  useEffect(() => {
    if (!countries.length) {
      axios.get(ALL_COUNTRIES).then(({data}) => setCountries(data));
    }
  });

  useEffect(() => {
    handleFilteredCountries();
  }, [countries]);

  const navigate = useNavigate();

  return (
    <>
      <Controls onSearch={handleFilteredCountries} />
      <List>
        {filteredCountries.map((country) => {
          const countryInfo = {
            img: country.flags.png,
            name: country.name.common,
            info: [
              {
                title: "Population",
                description: country.population.toLocaleString(),
              },
              {
                title: "Region",
                description: country.region.toLocaleString(),
              },
              {
                title: "Capital",
                description: country.capital.toLocaleString(),
              },
            ],
          };
          return (
            <Card
              key={uuid()}
              {...countryInfo}
              onClick={() => navigate(`/country/${country.name.common}`)}
            />
          );
        })}
      </List>
    </>
  );
};
export default HomePage;
