import moment from 'moment';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import Api from '../../api/Api';
import { firestore } from '../../firebase/firebase';
import { UsersContext } from '../../providers/UsersProvider';
import { ICard } from '../../util/interfaces';
import { IIntervalDeatilsWithQuality } from '../../util/superMemoII';
import Spinner from '../Spinner/Spinner';
import Card from './Card';
import styles from './Cards.module.scss';

export class Cards extends Component<RouteComponentProps> {
  public state = {
    cards: [] as ICard[],
    activeCard: {} as ICard,
    isLoading: true,
    categoryId: ''
  };

  public componentDidMount = async () => {
    const { uid } = this.context;
    const { category } = this.props.match.params as { category: string };

    const { categoryId } = await Api.retreiveCategoryByCategoryName(
      category,
      uid
    );
    const cards = await Api.retreiveTodaysCardsByCategoryId(categoryId, uid);

    this.setState({
      cards,
      isLoading: false,
      activeCard: cards[cards.length - 1],
      categoryId
    });
  };

  public updateCardInterval = async ({
    repetitions,
    quality,
    easeFactor,
    interval
  }: IIntervalDeatilsWithQuality) => {
    const { cards, categoryId } = this.state;
    const { uid } = this.context;
    const activeCard = {
      ...this.state.activeCard,
      interval,
      easeFactor,
      repetitions
    };

    activeCard.shouldReadFront = !activeCard.shouldReadFront;

    activeCard.nextReadTime = moment()
      .add(interval, 'days')
      .valueOf();

    let { learningCurve } = activeCard;
    if (!Array.isArray(learningCurve)) {
      learningCurve = [activeCard.createdAt];
    }
    activeCard.learningCurve = [...learningCurve, activeCard.nextReadTime];

    // if impossible
    if (quality === 0) {
      cards.unshift(activeCard);
    } else {
      await firestore
        .doc(`cards/${uid}/${categoryId}/${activeCard.cardId}`)
        .update(activeCard);
    }

    cards.pop();
    this.setState({ cards, activeCard: cards[cards.length - 1] });
  };

  public render() {
    const { isLoading, activeCard } = this.state;

    return (
      <div className={styles.cards}>
        {isLoading ? (
          <Spinner />
        ) : activeCard ? (
          <Card {...activeCard} updateCard={this.updateCardInterval} />
        ) : (
          <h4>All reviewed! Well done!</h4>
        )}
      </div>
    );
  }
}

Cards.contextType = UsersContext;
export default Cards;
