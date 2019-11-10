import React, { SyntheticEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import flashcardImageSrc from '../../assets/flashcard.png';
import { randomBackgroundColor } from '../../util/helpers';
import SvgIcons from '../SvgIcons/SvgIcons';
import styles from './Category.module.scss';

interface IProps extends RouteComponentProps {
  totalNumberOfCards: number;
  tags: string;
  category: string;
  categoryId: number;
  createdAt: number;
}

const Deck: React.FC<IProps> = props => {
  const { totalNumberOfCards, category, history } = props;

  const goTo = (url: string) => (e: SyntheticEvent) => {
    e.stopPropagation();
    history.push(url);
  };

  return (
    <div
      className={styles.deck}
      title={category}
      onClick={goTo(`/categories/${category}`)}
    >
      <img
        style={randomBackgroundColor()}
        src={flashcardImageSrc}
        alt={category}
        className={styles.deck__image}
      />
      <h4 className={styles.deck__name}>{category}</h4>
      <div className={styles.deck__extras}>
        <span
          className={styles['deck__card-count']}
        >{`${totalNumberOfCards} cards`}</span>
        <SvgIcons
          className={styles.deck__svg}
          iconId="edit"
          strokeWidth="0"
          title="edit"
        />

        <SvgIcons
          className={styles.deck__svg}
          iconId="add"
          strokeWidth="0"
          onClick={goTo(`/categories/${category}/addcard`)}
        />

        <SvgIcons
          className={styles.deck__svg}
          iconId="delete"
          strokeWidth="0"
          title="delete"
        />

        <SvgIcons
          className={styles.deck__svg}
          iconId="search"
          title="search"
          onClick={goTo(`/categories/${category}/allcards`)}
        />
      </div>
    </div>
  );
};

export default withRouter(Deck);
