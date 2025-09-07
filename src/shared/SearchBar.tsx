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
      const trimmedQuery = query.trim();
      if (trimmedQuery.length < 3) return;
      onQueryGif(trimmedQuery);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query, onQueryGif]);

  const handleSearchButton = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 3) return;

    onQueryGif(trimmedQuery);
    setQuery("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchButton();
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
      <button onClick={handleSearchButton}>{buttonName}</button>
    </div>
  );
};
