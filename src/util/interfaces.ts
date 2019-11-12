import { RouteComponentProps } from 'react-router';

export interface INewCard {
  front: string;
  back: string;
  createdAt: number;
  nextReadTime: number;
  shouldReadFront: boolean;
  learningCurve: number[];
}

export interface ICard extends INewCard {
  repetitions: number;
  interval: number;
  easeFactor: number;
  cardId?: string;
  category?: string;
  deleteCard: (a: string) => void;
}

export interface ICategory {
  totalNumberOfCards: number;
  tags: string;
  category: string;
  categoryId: number;
  createdAt: number;
}

export interface IDeleteCard {
  cardId: string;
  category: string;
  onCancel: () => void;
  deleteCard: (a: string) => void;
}
