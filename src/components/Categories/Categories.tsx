import React from 'react';
// import Api from '../../api/Api';
import { auth, firestore } from '../../firebase/firebase';
import AddCategory from './AddCategory';
import './Categories.scss';
import Category from './Category';

interface ICategory {
  totalNumberOfCards: number;
  tags: string;
  category: string;
  categoryId: number;
  createdAt: number;
}

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
    const categoriesCollection = await firestore
      .doc(`otherInfo/${auth.currentUser!.uid}`)
      .collection(`categories`)
      .get();
    const allCategories = categoriesCollection.docs.map(doc =>
      doc.data()
    ) as ICategory[];

    console.log('allCats', allCategories);
    const allCategoriesSorted = allCategories.sort((catA, catB) => {
      return catA.category > catB.category ? 1 : -1;
    });
    this.setState({ categories: [...allCategoriesSorted] });
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

export default DecksContainer;
