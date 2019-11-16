import React, { Component, SyntheticEvent } from 'react';
import { RouteComponentProps } from 'react-router';
import Api from '../../api/Api';
import { UsersContext } from '../../providers/UsersProvider';
import AddOrUpdate from './AddOrUpdate';

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

  public addCard = async (e: SyntheticEvent) => {
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

  public goBack = () => {
    this.props.history.goBack();
  };

  public render() {
    const { category, totalNumberOfCards, front, back } = this.state;
    const addProps = { category, totalNumberOfCards, front, back };
    return (
      <AddOrUpdate
        {...addProps}
        onSubmit={this.addCard}
        onCancel={this.goBack}
        onInputChange={this.onInputChange}
      />
    );
  }
}

AddCards.contextType = UsersContext;
export default AddCards;
