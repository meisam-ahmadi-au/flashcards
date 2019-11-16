import React from 'react';
import { IAddOrUpdate } from '../../util/interfaces';
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import './AddOrUpdate.scss';

const AddOrUpdate: React.FC<IAddOrUpdate> = ({
  category,
  totalNumberOfCards,
  onSubmit,
  onCancel,
  onInputChange,
  front = '',
  back = ''
}) => {
  return (
    <form className="add-card" onSubmit={onSubmit}>
      <h2>{`${category} ${
        totalNumberOfCards ? [{ totalNumberOfCards }] : ''
      }`}</h2>
      <label htmlFor="front">Front:</label>
      <input type="text" onChange={onInputChange} value={front} name="front" />
      <TextToSpeech text={front} />

      <label htmlFor="back">Back:</label>
      <input type="text" onChange={onInputChange} value={back} name="back" />
      <TextToSpeech text={back} />

      <button onClick={onSubmit} type="submit">
        Submit
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default AddOrUpdate;
