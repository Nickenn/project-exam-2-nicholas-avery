import { ChangeEvent } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  placeholder: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const StyledSearchForm = styled.form`
  margin: 30px 0px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledSearchInput = styled.input`
  background-color: rgba(52, 145, 88, 0.135);
  border-radius: 50px;
  padding: 7px 15px;
  font-size: 1.4rem;
`;

function Search({ placeholder, handleChange }: SearchProps) {
  return (
    <StyledSearchForm>
      <SearchIcon fontSize="large"></SearchIcon>
      <StyledSearchInput
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </StyledSearchForm>
  );
}
export default Search;
