import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../store/actions/categoriesActions';
import { IReduxStates } from '../../store/reducers/states';
import AddCategory from './AddCategory/AddCategory';
import './Categories.scss';
import Category from './Category';
import { Actions } from '../../store/actions/actionTypes';
import UpdateCategory from './UpdateCategory';
import { DialogueType } from '../../store/reducers/generalReducers';
import { Modal } from '../Portal/Portal';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((s: IReduxStates) => s.categories.categories);
  const showDialogue = useSelector((s: IReduxStates) => s.general.showDialogue);
  const cancelDialogue = () => dispatch(Actions.cancelDialogue());

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const onUpdate = () => {
    dispatch(Actions.showDialogue(DialogueType.UPDATE));
  };

  return (
    <div className="decks">
      {showDialogue === DialogueType.UPDATE && (
        <Modal onClick={cancelDialogue}>
          <UpdateCategory />
        </Modal>
      )}
      <AddCategory />
      <div className="decks__container">
        {categories &&
          categories.map(cat => (
            <Category {...cat} key={cat.categoryId} categoryUpdate={onUpdate} />
          ))}
      </div>
    </div>
  );
};

export default Categories;
