import React, { SyntheticEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import flashcardImageSrc from '../../assets/flashcard.png';
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

  const bgColor = Math.random()
    .toString(16)
    .substr(2, 6);

  return (
    <div
      className={styles.deck}
      title={category}
      onClick={goTo(`/categories/${category}`)}
    >
      <img
        style={{ background: `#${bgColor}` }}
        src={flashcardImageSrc}
        alt={category}
        className={styles.deck__image}
      />
      <h4 className={styles.deck__name}>{category}</h4>
      <div className={styles.deck__extras}>
        <span
          className={styles['deck__card-count']}
        >{`${totalNumberOfCards} cards`}</span>
        <SvgIcons className={styles.deck__svg} iconId="edit" strokeWidth="0" />
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
      </div>
    </div>
  );
};

export default withRouter(Deck);
