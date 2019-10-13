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
}

export interface ICategory {
  totalNumberOfCards: number;
  tags: string;
  category: string;
  categoryId: number;
  createdAt: number;
}
