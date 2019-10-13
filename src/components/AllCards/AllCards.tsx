import { User } from 'firebase';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import Api from '../../api/Api';
import { UsersContext } from '../../providers/UsersProvider';
import { ICard } from '../../util/interfaces';
import Styles from './AllCards.module.scss';
import Card from './Card';

const AllCards: React.FC<RouteComponentProps> = props => {
  const { category } = props.match.params as { category: string };
  const user = React.useContext(UsersContext)! as User;

  const [allCards, setAllCards] = React.useState([] as ICard[]);
  const [keyword, setKeyword] = React.useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setKeyword(value.trim());
  };

  const filteredCards = (allCards: ICard[], keyword: string) => {
    if (!keyword) {
      return allCards;
    } else {
      return allCards.filter(
        card =>
          card.front.toLowerCase().includes(keyword.toLowerCase()) ||
          card.back.toLowerCase().includes(keyword.toLowerCase())
      );
    }
  };

  React.useEffect(() => {
    (async () => {
      const allCardsInCategory = await Api.getAllCardsInCategory(
        user.uid,
        category
      );
      setAllCards(allCardsInCategory);
    })();
  }, [user, category]);

  return (
    <div className={Styles['all-cards']}>
      <h3 className={Styles['all-cards__title']}>
        {`All Cards in ${category}`}
      </h3>

      <input
        className={Styles['all-cards__search']}
        type="text"
        onChange={changeHandler}
      />

      {filteredCards(allCards, keyword).map(card => (
        <Card key={card.cardId} {...card} />
      ))}
    </div>
  );
};

export default AllCards;