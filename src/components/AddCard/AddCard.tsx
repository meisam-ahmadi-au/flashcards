import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Actions } from '../../store/actions/actionTypes';
import { addCardThunk } from '../../store/actions/cardsActions';
import { getAllCategories } from '../../store/actions/categoriesActions';
import { IReduxStates } from '../../store/reducers/states';
import { ICardSides } from '../../util/interfaces';
import CardInputForm from './CardInputForm';

const AddCards: React.FC = () => {
  const dispatch = useDispatch();
  const { category: categoryName } = useParams();
  const history = useHistory();
  const category = useSelector(
    (s: IReduxStates) => s.categories.categories
  ).find(cat => cat.category === categoryName);

  const cancelHandler = () => {
    dispatch(Actions.unsetCategory());
    history.goBack();
  };

  useEffect(() => {
    if (categoryName && !category) {
      dispatch(getAllCategories());
    }
  }, []);

  const addCard = async (newCard: ICardSides) =>
    dispatch(addCardThunk(category!.categoryId, newCard));

  return (
    <div>
      <div>
        <h2>{categoryName}</h2>
        <h5>{category && `${category!.totalNumberOfCards} cards`}</h5>
      </div>
      <CardInputForm
        onCancel={cancelHandler}
        submitHandler={addCard}
        front=""
        back=""
      />
    </div>
  );
};

export default AddCards;
