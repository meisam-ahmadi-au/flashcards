import React, { Component, SyntheticEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import Api from '../../api/Api';
import { UsersContext } from '../../providers/UsersProvider';
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import './AddCard.scss';

class AddCards extends Component<RouteComponentProps> {
  public state = {
    front: '',
    back: '',
    category: '',
    totalNumberOfCards: 0,
    categoryId: ''
  };

  public componentDidMount = async () => {
    const { category } = this.props.match.params as { category: string };
    const user = this.context as firebase.User;
    const {
      categoryId,
      totalNumberOfCards
    } = await Api.getCategoryDetailByCategoryName(user.uid, category);
    this.setState({ category, totalNumberOfCards, categoryId });
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  public onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const user = this.context as firebase.User;
    const { front, back, categoryId } = this.state;

    if (front && back && categoryId) {
      const createdAt = Date.now();
      const newCard = {
        front,
        back,
        createdAt,
        nextReadTime: createdAt,
        shouldReadFront: true,
        learningCurve: [createdAt]
      };

      await Api.addCard(user.uid, categoryId)(newCard).catch(console.log);
      this.setState({ front: '', back: '' });
    }
  };

  public render() {
    return (
      <form className="add-card" onSubmit={this.onSubmit}>
        <h2>{`${this.state.category}[${this.state.totalNumberOfCards}]`}</h2>
        <label htmlFor="front">Front:</label>
        <input
          type="text"
          onChange={this.onInputChange}
          value={this.state.front}
          name="front"
        />
        <TextToSpeech text={this.state.front} />

        <label htmlFor="back">Back:</label>
        <input
          type="text"
          onChange={this.onInputChange}
          value={this.state.back}
          name="back"
        />
        <TextToSpeech text={this.state.back} />

        <button onClick={this.onSubmit} type="submit">
          Submit
        </button>
      </form>
    );
  }
}

AddCards.contextType = UsersContext;
export default AddCards;
