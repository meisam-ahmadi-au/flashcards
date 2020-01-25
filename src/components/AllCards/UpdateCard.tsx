import React, { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import Api from '../../api/Api';
import { UsersContext } from '../../providers/UsersProvider';
import { IReduxStates } from '../../store/reducers/states';
import { IUpdateCard } from '../../util/interfaces';
import AddOrUpdate from '../AddCard/AddOrUpdate';
import Spinner from '../Spinner/Spinner';

interface IUpdatedCardProps {
  onCancel: () => void;
  updateCard: (a: IUpdateCard) => void;
  front: string;
  back: string;
  cardId: string;
  category: string;
  categoryId: string;
}

class UpdateCard extends React.Component<IUpdatedCardProps> {
  public state = {
    front: this.props.front,
    back: this.props.back,
    category: this.props.category,
    totalNumberOfCards: 0,
    categoryId: this.props.categoryId,
    cardId: this.props.cardId,
    isLoading: false
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  public updateCard = async (e: SyntheticEvent) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const user = useSelector((s: IReduxStates) => s.auth.user);
    const { front, back, categoryId, cardId } = this.state;

    if (front === this.props.front && back === this.props.back) {
      console.log('alike');
    } else if (front && back && categoryId && cardId) {
      const updatedCard = { front, back, cardId };
      console.log({ updatedCard });
      await Api.updateCard(
        user.uid,
        categoryId
      )(updatedCard).catch(console.log);
      // this.setState({isLoading: false});
      this.props.updateCard(updatedCard);
    }
    this.props.onCancel();
  };

  public stopPropagation = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  public render() {
    console.log(this.props);
    const { category, totalNumberOfCards, front, back, isLoading } = this.state;
    const addProps = { category, totalNumberOfCards, front, back };
    const style = {
      width: '70vw',
      height: '70vh',
      background: '#FCFAF2',
      position: 'relative' as 'relative'
    };

    const spinnerStyle = {
      position: 'absolute' as 'absolute',
      width: '100%',
      height: '100%',
      background: 'rgba(100, 100, 100, 0.5)'
    };

    return (
      <div style={style} onClick={this.stopPropagation}>
        {isLoading && (
          <div style={spinnerStyle}>
            <Spinner stylex="absolute" />
          </div>
        )}
        <AddOrUpdate
          {...addProps}
          onSubmit={this.updateCard}
          onCancel={this.props.onCancel}
          onInputChange={this.onInputChange}
        />
      </div>
    );
  }
}

UpdateCard.contextType = UsersContext;
export default UpdateCard;
