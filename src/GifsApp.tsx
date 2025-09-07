import { useCallback, useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gif.mocks";
import { CustomHeader } from "./shared/CustomHeader";
import { SearchBar } from "./shared/SearchBar";

const searchesList = [
  { gifName: "Funny Cats", id: "Funny Cats + 1" },
  { gifName: "Funny Dogs", id: "Funny Dogs + 1" },
  { gifName: "Funny Memes", id: "Funny Memes + 1" },
  { gifName: "Cats", id: "Cats + 1" },
  { gifName: "Dogs", id: "Dogs + 1" },
  { gifName: "Memes", id: "Memes + 1" },
];

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(searchesList);

  const handleSearch = useCallback((query: string) => {
    const trimmedQuery = query.trim().toLocaleLowerCase();
    if (trimmedQuery.length < 3) return;

    setPreviousTerms((prev) => {
      // avoid duplicates
      if (prev.find((t) => t.gifName.toLowerCase() === trimmedQuery)) {
        return prev;
      }

      const newTerm = {
        gifName: trimmedQuery,
        id: trimmedQuery + "-" + prev.length + 1,
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
