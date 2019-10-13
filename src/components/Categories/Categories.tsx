import React from 'react';
import Api from '../../api/Api';
import { UsersContext } from '../../providers/UsersProvider';
import { ICategory } from '../../util/interfaces';
import AddCategory from './AddCategory';
import './Categories.scss';
import Category from './Category';

interface IState {
  categories: ICategory[];
}
class DecksContainer extends React.Component<{}, IState> {
  public state = {
    categories: [] as ICategory[]
  };

  public async componentDidMount() {
    this.getAllCategories();
  }

  public getAllCategories = async () => {
    const { uid } = this.context;
    const allCategoriesSorted = await Api.getAllCategories(uid);
    this.setState({ categories: [...allCategoriesSorted!] });
  };

  public render() {
    const { categories } = this.state;
    if (!categories) {
      return;
    }
    return (
      <div className="decks">
        <AddCategory getAllCategories={this.getAllCategories} />
        <div className="decks__container">
          {categories.map(cat => (
            <Category {...cat} key={cat.categoryId} />
          ))}
        </div>
      </div>
    );
  }
}

DecksContainer.contextType = UsersContext;
export default DecksContainer;
