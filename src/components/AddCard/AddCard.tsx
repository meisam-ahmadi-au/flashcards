import React, { Component, SyntheticEvent } from 'react';
import { RouteComponentProps } from 'react-router';
// import Api from '../../api/Api';
import { firestore } from '../../firebase/firebase';
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

    const categoriesRef = await firestore
      .collection(`otherInfo/${user.uid}/categories`)
      .where('category', '==', category.toLowerCase())
      .get();

    const categoriesSnapshot = categoriesRef.docs.map(doc => doc.data());
    const { categoryId, totalNumberOfCards } = categoriesSnapshot[0];
    console.log({ category, totalNumberOfCards, categoryId });
    this.setState({ category, totalNumberOfCards, categoryId });
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  public onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const user = this.context as firebase.User;
    const { front, back, categoryId } = this.state;

    if (front && back && categoryId) {
      const createdAt = Date.now();
      firestore
        .collection(`cards/${user.uid}/${categoryId}`)
        .add({
          front,
          back,
          createdAt,
          nextReadTime: createdAt,
          shouldReadFront: true,
          learningCurve: [createdAt]
        })
        .then(data => {
          this.setState({ front: '', back: '' });
        })
        .catch(console.log);
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
