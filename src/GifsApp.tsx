import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { useGifs } from "./gifs/hooks/useGifs";
import { CustomHeader } from "./shared/CustomHeader";
import { SearchBar } from "./shared/SearchBar";

export const GifsApp = () => {
  const {
    previousTerms,
    gifs,
    loading,
    error,
    handleSearch,
    handleTermClicked,
  } = useGifs();

  return (
    <>
      <CustomHeader
        title="Gifs search"
        description="Search for your favorite GIFs"
      />

      <SearchBar
        placeholder="Search GIFs..."
        buttonName="Search"
        onQueryGif={handleSearch}
        disabled={loading}
      />

      {loading && <p role="status">Loading...</p>}
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}

      {/* previous searches */}
      <PreviousSearches
        title="Previous Searches"
        searches={previousTerms}
        onTermClicked={handleTermClicked}
      />

      <GifList gifs={gifs} />
    </>
  );
};
