import { useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gif.mocks";
import { CustomHeader } from "./shared/CustomHeader";
import { SearchBar } from "./shared/SearchBar";

const searchesList = [
  { gifName: "Funny Cats", id: 1 },
  { gifName: "Dogs", id: 2 },
  { gifName: "Memes", id: 3 },
];

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(searchesList);

  const handleSearch = (term: string) => {
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
        onSearch={handleSearch}
        buttonName="Search"
      />

      {/* previous searches */}
      <PreviousSearches
        title="Previous Searches"
        searches={previousTerms}
        onSearch={handleSearch}
      />

      <GifList gifs={mockGifs} />
    </>
  );
};
