import { useEffect, useState, type FC, type KeyboardEvent } from "react";

interface Props {
  placeholder?: string;
  buttonName: string;
  onQueryGif: (query: string) => void;
}

const MIN_QUERY_LENGTH = 3;

export const SearchBar: FC<Props> = ({
  placeholder = "Search",
  buttonName,
  onQueryGif,
}) => {
  const [query, setQuery] = useState("");
  const [skipNextDebounce, setSkipNextDebounce] = useState(false);

  useEffect(() => {
    if (skipNextDebounce) {
      setSkipNextDebounce(false);
      return;
    }

    const timerId = setTimeout(() => {
      const trimmedQuery = query.trim();
      if (trimmedQuery.length < MIN_QUERY_LENGTH) return;
      onQueryGif(trimmedQuery);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query, onQueryGif, skipNextDebounce]);

  const handleSearchButton = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < MIN_QUERY_LENGTH) return;

    onQueryGif(trimmedQuery);
    setSkipNextDebounce(true);
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
