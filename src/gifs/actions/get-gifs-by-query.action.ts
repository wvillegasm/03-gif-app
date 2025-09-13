import type { Gif } from '../interfaces/gif.interface';
import type { GiphyResponse } from '../interfaces/giphy.response';
import { giphyApi } from './giphy.api';

/**
 * Fetches GIFs from the Giphy API based on a search query.
 *
 * @param query The search term for GIFs.
 * @param limit The maximum number of GIFs to return (default: 20).
 * @param signal An AbortSignal to cancel the request.
 * @returns A Promise that resolves to an array of Gif objects.
 * @remarks The `webp` format is chosen for the GIF URLs due to its superior compression and support for animation,
 * offering a good balance between file size and quality compared to `gif` or `mp4`.
 */
export const getGifsByQuery = async (query: string, limit: number = 20, signal?: AbortSignal): Promise<Gif[]> => {
  const response = await giphyApi<GiphyResponse>('/search', {
    params: {
      q: query,
      limit
    },
    signal
  });

  return response.data.data.map(gif => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.webp,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height)
  }));
};
