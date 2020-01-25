import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../store/actions/categoriesActions';
import { IReduxStates } from '../../store/reducers/states';
import AddCategory from './AddCategory/AddCategory';
import './Categories.scss';
import Category from './Category';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((s: IReduxStates) => s.categories.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="decks">
      <AddCategory />
      <div className="decks__container">
        {categories &&
          categories.map(cat => <Category {...cat} key={cat.categoryId} />)}
      </div>
    </div>
  );
};

export default Categories;
