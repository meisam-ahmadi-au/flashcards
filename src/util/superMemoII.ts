export interface IIntervalDetails {
  repetitions: number;
  interval: number;
  easeFactor: number;
}

export interface IIntervalDeatilsWithQuality extends IIntervalDetails {
  quality: number;
}

export const nextIntervalDetails = (
  quality: number,
  previousRepetitions: number = 0,
  previousInterval: number,
  previousEaseFactor: number = 2.5
) => {
  let interval = 0;
  let repetitions = previousRepetitions + 1;

  let easeFactor;
  if (quality < 3) {
    repetitions = 0;
    interval = 1;
    easeFactor = previousEaseFactor;
  } else {
    if (previousRepetitions === 0 || !previousRepetitions) {
      interval = 1;
    } else if (previousRepetitions === 1) {
      interval = 6;
    } else if (previousRepetitions > 1) {
      interval = Math.ceil(previousInterval * previousEaseFactor);
    }

    easeFactor =
      previousEaseFactor +
      (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

    easeFactor = easeFactor < 1.3 ? 1.3 : easeFactor;
  }

  return { easeFactor, interval, repetitions, quality };
};

export const IntervalsDetailBasedOnQuality = (
  previousRepetitions: number,
  previousInterval: number,
  previousEaseFactor: number
) => (quality: number) =>
  nextIntervalDetails(
    quality,
    previousRepetitions,
    previousInterval,
    previousEaseFactor
  );

export const allIntervalsForDifferentQuality = (
  previousRepetitions: number,
  previousInterval: number,
  previousEaseFactor: number
) => {
  const allInterval = IntervalsDetailBasedOnQuality(
    previousRepetitions,
    previousInterval,
    previousEaseFactor
  );
  const easy = allInterval(5);
  const good = allInterval(3);
  const hard = allInterval(1);
  const impossible = allInterval(0);
  if (good.interval && easy.interval && good.interval > easy.interval / 2) {
    good.interval = Math.ceil(easy.interval / 2);
  }

  return { easy, good, hard, impossible };
};
