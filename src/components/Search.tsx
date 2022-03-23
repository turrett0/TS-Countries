import React from "react";
import {IoSearch} from "react-icons/io5";
import styled from "styled-components";

type Props = {
  search: string;
  setSearch: (arg: string) => void;
};

const InputContainer = styled.label`
  background-color: var(--color-ui-base);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  width: 100%;
  margin-bottom: 1.5rem;

  @media (min-width: 767px) {
    margin-bottom: 0;
    width: 280px;
  }
`;
const Input = styled.input.attrs({
  type: "search",
  placeholder: "Search country by name..",
})`
  margin-left: 2rem;
  border: none;
  outline: none;
  background: none;
  color: var(--color-text);
  width: 80%;
`;

const Search: React.FC<Props> = ({search, setSearch}) => {
  return (
    <InputContainer>
      <IoSearch />
      <Input onChange={(e) => setSearch(e.target.value)} value={search} />
    </InputContainer>
  );
};

export default Search;
