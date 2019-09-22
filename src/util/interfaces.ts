export interface ICard {
  front: string;
  back: string;
  createdAt: number;
  nextReadTime: number;
  shouldReadFront: boolean;
  learningCurve: number[];
  repetitions: number;
  interval: number;
  easeFactor: number;
  cardId?: string;
}
