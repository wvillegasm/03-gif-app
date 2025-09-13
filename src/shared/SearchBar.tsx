import { useEffect, useRef, useState, type FC, type KeyboardEvent } from "react";

interface Props {
  placeholder?: string;
  buttonName: string;
  onQueryGif: (query: string) => void;
  disabled?: boolean;
}

const MIN_QUERY_LENGTH = 3;

export const SearchBar: FC<Props> = ({
  placeholder = "Search",
  buttonName,
  onQueryGif,
  disabled = false,
}) => {
  const [query, setQuery] = useState("");
  const [skipNextDebounce, setSkipNextDebounce] = useState(false);
  const lastSubmittedQueryRef = useRef("");

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (disabled) return;

    if (skipNextDebounce) {
      setSkipNextDebounce(false);
      return;
    }

    if (trimmedQuery.length < MIN_QUERY_LENGTH) return;
    if (trimmedQuery === lastSubmittedQueryRef.current) return;

    const timerId = setTimeout(() => {
      onQueryGif(trimmedQuery);
      lastSubmittedQueryRef.current = trimmedQuery;
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [query, onQueryGif, skipNextDebounce, disabled]);

  const handleSearchButton = () => {
    if (disabled) return;

    const trimmedQuery = query.trim();
    if (trimmedQuery.length < MIN_QUERY_LENGTH) return;

    onQueryGif(trimmedQuery);
    lastSubmittedQueryRef.current = trimmedQuery;
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
        disabled={disabled}
        aria-disabled={disabled}
      />
      <button onClick={handleSearchButton} disabled={disabled}>
        {buttonName}
      </button>
    </div>
  );
};
