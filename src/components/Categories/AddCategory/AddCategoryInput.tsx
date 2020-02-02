import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../../store/actions/actionTypes';
import { addCategoryAndUpdate } from '../../../store/actions/categoriesActions';
import { IReduxStates } from '../../../store/reducers/states';

const AddCategoryInput: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, category } = useSelector((state: IReduxStates) => ({
    isLoading: state.general.isLoading,
    category: state.categories.category
  }));

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    dispatch(Actions.setCategory(value));
  };

  const onAddCategory = async () => {
    if (!category) {
      return false;
    }
    dispatch(addCategoryAndUpdate(category));
  };

  return (
    <div>
      <input
        type="text"
        name="category"
        value={category}
        placeholder="New Category"
        onChange={onInputChange}
      />

      <button onClick={onAddCategory} disabled={isLoading}>
        Add Category
      </button>
    </div>
  );
};

export default AddCategoryInput;
