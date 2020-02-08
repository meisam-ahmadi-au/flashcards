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
  cardId: string;
  category?: string;
  categoryId: string;
}
export interface IReviewCard extends INewCard {
  repetitions: number;
  interval: number;
  easeFactor: number;
  cardId: string;
  category?: string;
  categoryId: string;
  updateCard: (a: IIntervalDeatilsWithQuality) => void;
}
export interface IUpdateCard {
  front?: string;
  back?: string;
  createdAt?: number;
  nextReadTime?: number;
  shouldReadFront?: boolean;
  learningCurve?: number[];
  repetitions?: number;
  interval?: number;
  easeFactor?: number;
  cardId: string;
  category?: string;
}
export interface ICategory {
  totalNumberOfCards: number;
  tags: string;
  category: string;
  categoryId: number;
  createdAt: number;
  numberOfUnreviewedCards: number;
}

export interface IAddOrUpdate {
  category: string;
  totalNumberOfCards: number;
  onSubmit: (e: React.SyntheticEvent) => Promise<void>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  front?: string;
  back?: string;
}
export interface ICardInputForm {
  submitHandler: (a: ICardSides) => void;
  onCancel: () => void;
  front?: string;
  back?: string;
}

export interface ICardSides {
  front: string;
  back: string;
}
export interface IIntervalDetails {
  repetitions: number;
  interval: number;
  easeFactor: number;
}

export interface IIntervalDeatilsWithQuality extends IIntervalDetails {
  quality: number;
}
