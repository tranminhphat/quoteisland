export interface Author {
  _id: string;
  fullName: string;
  photoUrl: string;
  born?: Date;
  died?: Date;
  nationality?: string;
  description?: string;
  loves?: any[];
  loveCount?: number;
  quoteCount?: number;
}
