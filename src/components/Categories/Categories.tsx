import React from 'react';
// import Api from '../../api/Api';
import { auth, firestore } from '../../firebase/firebase';
import AddCategory from './AddCategory';
import './Categories.scss';
import Category from './Category';

class DecksContainer extends React.Component {
  public state = {
    categories: {}
  };

  public async componentDidMount() {
    this.getAllCategories();
  }

  public getAllCategories = async () => {
    const allCategories = await firestore
      .collection(`categories`)
      .doc(auth.currentUser!.uid)
      .get();
    console.log('allCats', allCategories.data());
    this.setState({ categories: { ...allCategories.data() } });
  };

  public render() {
    const { categories } = this.state;
    return (
      <div className="decks">
        <AddCategory getAllCategories={this.getAllCategories} />
        <div className="decks__container">
          {Object.keys(categories).map(cat => (
            <Category name={cat} key={cat} />
          ))}
        </div>
      </div>
    );
  }
}

export default DecksContainer;
