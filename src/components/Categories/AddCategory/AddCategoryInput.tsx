import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryAndUpdate } from '../../../store/actions/categoriesActions';
import { IReduxStates } from '../../../store/reducers/states';

const AddCategoryInput: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((s: IReduxStates) => s.general);
  const [category, setCategory] = React.useState('');

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trimStart();
    setCategory(value);
  };

  const onAddCategory = async () => {
    if (!category) {
      return false;
    }
    await dispatch(addCategoryAndUpdate(category));
    setCategory('');
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
