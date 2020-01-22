import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { UsersContext } from '../../providers/UsersProvider';
import { getAllCategories } from '../../store/actions/categoriesActions';
import { IAllStates, IReduxStates } from '../../store/reducers/states';
import { ICategory } from '../../util/interfaces';
import AddCategory from './AddCategory/AddCategory';
import './Categories.scss';
import Category from './Category';
interface IProps {
  categories: ICategory[];
  getAllCategories: (uid: string) => void;
}
const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: IReduxStates) => state.categories.categories
  );

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  if (!categories) {
    return;
  }
  return (
    <div className="decks">
      <AddCategory />
      <div className="decks__container">
        {categories.map(cat => (
          <Category {...cat} key={cat.categoryId} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
