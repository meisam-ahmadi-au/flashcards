import React, { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import flashcardImageSrc from '../../assets/flashcard.png';
import { deleteCategoryAndUpdate } from '../../store/actions/categoriesActions';
import { randomBackgroundColor } from '../../util/helpers';
import SvgIcons from '../SvgIcons/SvgIcons';
import styles from './Category.module.scss';
import CategoryBadges from './CategoryBadges';
import { useHistory } from 'react-router-dom';
import { Actions } from '../../store/actions/actionTypes';
import classNames from '../../util/classNames';

interface IProps {
  totalNumberOfCards: number;
  tags: string;
  category: string;
  categoryId: number;
  createdAt: number;
  numberOfUnreviewedCards: number;
  categoryUpdate: () => void;
}

const Category: React.FC<IProps> = props => {
  const {
    numberOfUnreviewedCards,
    totalNumberOfCards,
    category,
    categoryUpdate
  } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const goTo = (url: string) => (e: SyntheticEvent) => {
    e.stopPropagation();
    history.push(url);
  };

  const deleteCategory = (categoryName: string) => (e: SyntheticEvent) => {
    e.stopPropagation();
    if (totalNumberOfCards === 0) {
      dispatch(deleteCategoryAndUpdate(categoryName));
    }
  };

  const editCategory = (e: SyntheticEvent) => {
    e.stopPropagation();
    dispatch(Actions.setCategory(category));
    categoryUpdate();
  };

  return (
    <div
      className={styles.deck}
      title={category}
      onClick={goTo(`/categories/${category}`)}
    >
      <div>
        <img
          style={randomBackgroundColor()}
          src={flashcardImageSrc}
          alt={category}
          className={styles.deck__image}
        />
        <CategoryBadges
          numberOfUnreviewedCards={numberOfUnreviewedCards}
          totalNumberOfCards={totalNumberOfCards}
          className={styles.deck__badges}
        />
      </div>
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
          onClick={editCategory}
        />

        <SvgIcons
          className={styles.deck__svg}
          iconId="add"
          strokeWidth="0"
          onClick={goTo(`/categories/${category}/addcard`)}
        />

        <SvgIcons
          className={classNames(styles.deck__svg, {
            disabled: totalNumberOfCards > 0
          })}
          iconId="delete"
          strokeWidth="0"
          title="delete"
          onClick={deleteCategory(category)}
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

export default Category;
