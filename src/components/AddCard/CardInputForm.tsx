import React, { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { IReduxStates } from '../../store/reducers/states';
import { ICardInputForm } from '../../util/interfaces';
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import './CardInputForm.scss';

function usePrevious(value: any) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const CardInputForm: React.FC<ICardInputForm> = ({
  submitHandler,
  onCancel,
  front = '',
  back = ''
}) => {
  const { isLoading } = useSelector((s: IReduxStates) => s.general);
  const [newCard, setNewCard] = React.useState({ back, front });
  const prevIsLoading = usePrevious(isLoading);

  React.useMemo(() => {
    if (prevIsLoading && !isLoading) {
      setNewCard({ front: '', back: '' });
    }
  }, [isLoading, prevIsLoading]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // debugger;
    const { name, value } = event.currentTarget;
    if (name === 'back' || name === 'front') {
      setNewCard(prev => ({ ...prev, ...{ [name]: value.trimStart() } }));
    }
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (newCard.back && newCard.front) {
      submitHandler(newCard);
    }
  };

  return (
    <form className="add-card" onSubmit={onSubmit}>
      <label htmlFor="front">
        Front:
        <input
          type="text"
          onChange={onInputChange}
          value={newCard.front}
          name="front"
        />
      </label>
      <TextToSpeech text={front} />

      <label htmlFor="back">
        Back:
        <input
          type="text"
          onChange={onInputChange}
          value={newCard.back}
          name="back"
        />
      </label>
      <TextToSpeech text={back} />
      <div className="add-card__buttons">
        <button onClick={onSubmit} type="submit">
          Submit
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CardInputForm;
