import { useCallback, useEffect, useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

const initialTerms = [] as { gifName: string; id: string }[];

export const useGifs = (options?: {
  limit?: number;
  minQueryLength?: number;
  maxHistory?: number;
}) => {
  const { limit = 20, minQueryLength = 3, maxHistory = 8 } = options ?? {};
  const [previousTerms, setPreviousTerms] = useState(initialTerms);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);
  const debounceRef = useRef<number | null>(null);

  const handleSearch = useCallback(
    async (query: string) => {
      const trimmedQuery = query.trim().toLowerCase();
      if (trimmedQuery.length < minQueryLength) return;

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
        const gifs = await getGifsByQuery(
          trimmedQuery,
          limit,
          controller.signal
        );
        if (requestId !== requestIdRef.current) return;

        setGifs(gifs);

        setPreviousTerms((prev) => {
          const existingIndex = prev.findIndex(
            (t) => t.gifName === trimmedQuery
          );

          if (existingIndex !== -1) {
            // move existing to front (MRU) without mutating prev
            const existing = prev[existingIndex];
            const rest = prev.filter((_, idx) => idx !== existingIndex);
            return [existing, ...rest];
          }

          const newTerm = {
            gifName: trimmedQuery,
            id: trimmedQuery,
          };

          const next = [newTerm, ...prev];
          return next.slice(0, maxHistory);
        });
      } catch (err: unknown) {
        if (
          controller.signal.aborted ||
          (err instanceof DOMException && err.name === "AbortError") ||
          (typeof err === "object" &&
            err !== null &&
            (("code" in err && (err as any).code === "ERR_CANCELED") ||
              ("name" in err && (err as any).name === "CanceledError")))
        ) {
          return;
        }
        console.error("Error fetching GIFs:", err);
        setError("Failed to fetch GIFs. Please try again.");
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    [limit, minQueryLength, maxHistory]
  );

  const handleSearchDebounced = useCallback(
    (q: string, delay = 300) => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        void handleSearch(q);
      }, delay);
    },
    [handleSearch]
  );

  const handleTermClicked = (term: string) => {
    void handleSearch(term);
  };

  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, []);

  return {
    previousTerms,
    gifs,
    loading,
    error,
    handleSearch,
    handleSearchDebounced,
    handleTermClicked,
  };
};
