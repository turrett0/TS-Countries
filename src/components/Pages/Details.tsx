import axios from "axios";
import React, {useEffect, useState} from "react";
import {IoArrowBack} from "react-icons/io5";
import {useNavigate, useParams} from "react-router-dom";
import {searchByCountry} from "../../config";
import {ICountry} from "../../types";
import Button from "../Button";
import Info from "../Info";

const Details = () => {
  const {name} = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState<ICountry | null>(null);
  useEffect(() => {
    name &&
      axios.get(searchByCountry(name)).then(({data}) => setCountry(data[0]));
  }, [name]);
  console.log(country);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>
        <IoArrowBack /> Go Back
      </Button>

      {country && <Info country={country} />}
    </div>
  );
};

export default Details;
