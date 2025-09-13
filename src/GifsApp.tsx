import { useCallback, useEffect, useRef, useState } from "react";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import type { Gif } from "./gifs/interfaces/gif.interface";
import { CustomHeader } from "./shared/CustomHeader";
import { SearchBar } from "./shared/SearchBar";

const initialTerms = [] as { gifName: string; id: string }[];

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(initialTerms);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);

  const handleSearch = useCallback(async (query: string) => {
    const trimmedQuery = query.trim().toLowerCase();
    if (trimmedQuery.length < 3) return;

    setError(null);

    // cancel previous request if any
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    const requestId = ++requestIdRef.current;
    setLoading(true);

    try {
      const gifs = await getGifsByQuery(trimmedQuery, 20, controller.signal);
      if (requestId !== requestIdRef.current) return;

      setGifs(gifs);

      setPreviousTerms((prev) => {
        const existingIndex = prev.findIndex(
          (t) => t.gifName.toLowerCase() === trimmedQuery
        );

        if (existingIndex !== -1) {
          // move existing to front (MRU) without mutating prev
          const existing = prev[existingIndex];
          const rest = prev.filter((_, idx) => idx !== existingIndex);
          return [existing, ...rest];
        }

        const newTerm = {
          gifName: query.trim(),
          id: `${trimmedQuery}-${Date.now()}`,
        };

        const next = [newTerm, ...prev];
        return next.slice(0, 8);
      });
    } catch (err: any) {
      if (err?.code === "ERR_CANCELED" || controller.signal.aborted) {
        return;
      }
      console.error("Error fetching GIFs:", err);
      setError("Failed to fetch GIFs. Please try again.");
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const handleTermClicked = (term: string) => {
    void handleSearch(term);
  };

  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, []);

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
