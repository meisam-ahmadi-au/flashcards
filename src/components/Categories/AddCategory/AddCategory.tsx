import React, { useState } from 'react';
import SvgIcons from '../../SvgIcons/SvgIcons';
import AddCategoryInput from './AddCategoryInput';

const AddCategory: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const toggleAddCategoryForm = () => setShowInput(prevShow => !prevShow);

  return (
    <div className="decks__add-category">
      <SvgIcons
        className="decks__svg"
        iconId="add"
        strokeWidth="0"
        title="Add a new category"
        onClick={toggleAddCategoryForm}
      />
      {showInput && <AddCategoryInput />}
    </div>
  );
};

export default AddCategory;
