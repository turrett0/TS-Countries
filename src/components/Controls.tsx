import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {CustomSelect} from "./CustomSelect";
import Search from "./Search";

type Props = {
  onSearch: (search: string, region: string) => void;
};

const options = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "Africa",
    label: "Africa",
  },
  {
    value: "America",
    label: "America",
  },
  {
    value: "Asia",
    label: "Asia",
  },
  {
    value: "Europe",
    label: "Europe",
  },
  {
    value: "Oceania",
    label: "Oceania",
  },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 767px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Controls: React.FC<Props> = ({onSearch}) => {
  const [search, setSearch] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  useEffect(() => {
    console.log(region);
    onSearch(search, region);
  }, [search, region]);

  return (
    <Wrapper>
      <Search search={search} setSearch={setSearch} />
      <CustomSelect
        options={options}
        placeholder={region || "Search by Region"}
        isClearable
        isSearchable={false}
        value={region}
        onChange={(e: any) => setRegion(e.value)}
      />
    </Wrapper>
  );
};

export default Controls;
