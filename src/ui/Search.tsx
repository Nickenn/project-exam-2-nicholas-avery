import { ChangeEvent } from "react";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  placeholder: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const StyledSearchForm = styled.form`
  margin: 30px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledSearchInput = styled.input`
  background-color: rgba(52, 145, 88, 0.135);
  border-radius: 3px;
  font-size: 1.4rem;
`;

const StyledSearchIcon = styled.label`
  margin: 0px 15px;
  font-size: 1.2rem;
  color: rgb(52, 145, 88);
`;

function Search({ placeholder, handleChange }: SearchProps) {
  return (
    <StyledSearchForm>
      <SearchIcon></SearchIcon>
      <StyledSearchInput
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </StyledSearchForm>
  );
}
export default Search;
