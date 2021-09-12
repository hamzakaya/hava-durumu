import styled from 'styled-components';
import LocationIconSvg from "../../assets/location-icon.svg?component";
import SearchIconSvg from "../../assets/search-icon.svg?component";

export const SearchElement = styled.div`
  position: relative;
  height: 3.25rem;
  border-radius: 26px;
  background: ${({ theme }) => theme.panelBgColor};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.4rem;
  display: flex;
  align-items: center;
  z-index: 1;
  padding: 0 2%;
`;
export const SearchInput = styled.input`
  flex: 1;
  margin-left: 1rem;
  height: 3.25rem;
  border: none;
  background-color: ${({ theme }) => theme.panelBgColor};
  font-size: 1.125rem;
  color: ${({ theme }) => theme.searchInput.color};
  width: 100%;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.searchInput.placeholderColor};
  }
`;
export const SearchIcon = styled(SearchIconSvg)`
  display: none;
  fill: #4a6fa1;
`;
export const LocationButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  position: absolute;
  right: 2%;
  &:hover svg {
  }
`;
export const LocationIcon = styled(LocationIconSvg)`
  fill: #4a6fa1;
`;
export const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background: ${({ theme }) => theme.searchSuggestion.backgroundColor};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  width: 98%;
  left: 1%;
  top: 3.35rem;
  border-radius: 5px;
  overflow: hidden;
`;

export const SuggestionItem = styled.a`
  color: #2079c9;
  text-decoration: none;
  padding: 0.6rem 1rem;
  display: block;
  text-align: left;
  border-bottom: 1px dotted ${({ theme }) => theme.searchSuggestion.seperatorLineColor};
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.searchSuggestion.hoverBackgroundColor};
  }
`;

export const selectStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: "90%",
    borderBottom: "1px dotted pink",
    padding: 5,
  }),

  container: () => ({
    marginLeft: "5px",
    width: "92%",
  }),

  control: (provided) => ({
    ...provided,
    border: "none",
    outline: "none",
    borderColor: "transparent",
    backgroundColor: "transparent"
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};