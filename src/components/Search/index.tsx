import React from "react";
import {
  LocationButton,
  LocationIcon,
  SearchElement,
  SearchIcon,
  SearchInput,
  SearchResult,
  selectStyles,
} from "./styled";
import Select from "react-select";
import { sehirListesi } from "../../api/sehir-listesi";

const Search: React.FC = ({ callback }) => (
  <SearchElement>
    <SearchIcon />
    <Select
      options={sehirListesi}
      styles={selectStyles}
      placeholder="Şehir Seçin..."
      noOptionsMessage={() => "Bulunamadı"}
      onChange={({ value, label }) => callback(value)}
    />

    <LocationButton onClick={() => callback()}>
      <LocationIcon />
    </LocationButton>
  </SearchElement>
);

export default React.memo(Search);
