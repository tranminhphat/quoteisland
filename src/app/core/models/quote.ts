import { Author } from './author';
import { Category } from './category';

export interface Quote {
  _id: string;
  text: string;
  photoUrl?: string;
  loves?: any[];
  loveCount?: number;
  author?: Author;
  categories?: Category[];
}
