export interface Category {
  _id: string;
  name: string;
  photoUrl: string;
  description?: string;
  loves?: any[];
  loveCount?: number;
  quoteCount?: number;
}
