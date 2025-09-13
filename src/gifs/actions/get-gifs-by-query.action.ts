
import type { Gif } from '../interfaces/gif.interface';
import type { GiphyResponse } from '../interfaces/giphy.response';
import { giphyApi } from './giphy.api';

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
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height)
  }));
};
