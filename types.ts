
export interface ThumbnailItem {
  id: string;
  title: string;
  client?: string;
  imageUrl: string;
  category: string;
  description: string;
  date: string;
  views: string;
  subs: string;
  duration: string;
  vph?: string;
  multiplier?: string;
}

export type Theme = 'light' | 'dark';
