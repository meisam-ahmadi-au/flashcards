import React, { useState, SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../store/actions/actionTypes';
import { IReduxStates } from '../../store/reducers/states';
import styles from './UpdateCategory.module.scss';
import { updateCategoryThunk } from '../../store/actions/categoriesActions';

const UpdateCategory: React.FC = () => {
  const dispatch = useDispatch();
  const { category, categories } = useSelector(
    (s: IReduxStates) => s.categories
  );
  const [categoryName, setCategoryName] = useState(category);
  const [hasError, setHasError] = useState(false);

  const cancelDialogue = () => dispatch(Actions.cancelDialogue());
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trimStart();
    setCategoryName(value);
    const nameAlreadyExists =
      category.toLowerCase() !== value.trim().toLowerCase() &&
      categories.findIndex(
        cat => cat.category.toLowerCase() === value.trim().toLowerCase()
      ) !== -1;

    nameAlreadyExists ? setHasError(true) : setHasError(false);
  };

  const changeHandler = (e: SyntheticEvent) => {
    e.stopPropagation();

    if (!hasError && categoryName.trim()) {
      dispatch(updateCategoryThunk(categoryName));
    }
  };

  const stopPropagation = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles['update-category']} onClick={stopPropagation}>
      <h2 className={styles['update-category__title']}>Update category name</h2>

      <input
        type="text"
        onChange={onInputChange}
        value={categoryName}
        name="front"
      />

      <p className={hasError ? styles['update-category__error'] : styles.hide}>
        This name already exists
      </p>

      <button onClick={changeHandler}>Change</button>
      <button type="button" onClick={cancelDialogue}>
        Cancel
      </button>
    </div>
  );
};

export default UpdateCategory;
