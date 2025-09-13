import { useState } from "react";

interface Props {
  placeholder?: string;
  buttonName: string;
  onSearch?: (term: string) => void;
}

export const SearchBar: React.FC<Props> = ({
  placeholder = "Search",
  buttonName,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>{buttonName}</button>
    </div>
  );
};
