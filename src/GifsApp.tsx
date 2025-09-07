import { useCallback, useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gif.mocks";
import { CustomHeader } from "./shared/CustomHeader";
import { SearchBar } from "./shared/SearchBar";

const initialTerms = [] as { gifName: string; id: string }[];

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(initialTerms);

  const handleSearch = useCallback((query: string) => {
    const trimmedQuery = query.trim().toLowerCase();
    if (trimmedQuery.length < 3) return;

    setPreviousTerms((prev) => {
      // avoid duplicates
      if (prev.find((t) => t.gifName.toLowerCase() === trimmedQuery)) {
        return prev;
      }

      const newTerm = {
        gifName: trimmedQuery,
        id: `${trimmedQuery}-${Date.now()}`,
      };

      return [newTerm, ...(prev.length >= 8 ? prev.slice(0, 7) : prev)];
    });
  }, []);

  const handleTermClicked = (term: string) => {
    // TODO: implement search by term clicked - future enhancement
    console.log("Searching for:", term);
  };

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
      />

      {/* previous searches */}
      <PreviousSearches
        title="Previous Searches"
        searches={previousTerms}
        onTermClicked={handleTermClicked}
      />

      <GifList gifs={mockGifs} />
    </>
  );
};
