import { useEffect, useState, type FC, type KeyboardEvent } from "react";

interface Props {
  placeholder?: string;
  buttonName: string;
  onQueryGif: (query: string) => void;
}

export const SearchBar: FC<Props> = ({
  placeholder = "Search",
  buttonName,
  onQueryGif,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      onQueryGif(query);
    }, 500);

    return () => clearTimeout(timerId);
  }, [onQueryGif, query]);

  const handleSearch = () => {
    onQueryGif(query);

    setQuery("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>{buttonName}</button>
    </div>
  );
};
