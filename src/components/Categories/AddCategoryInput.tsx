import React, { Component } from 'react';
import { auth, firestore } from '../../firebase/firebase';

interface IAddCategoryInputProps {
  getAllCategories: () => void;
}

class AddCategoryInput extends Component<IAddCategoryInputProps> {
  public state = {
    category: ''
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  public onAddCategory = async () => {
    const { category } = this.state;
    if (!category) {
      return false;
    }

    const categoryRef = await firestore.doc(
      `categories/${auth.currentUser!.uid}`
    );
    const categorySnapshot = await categoryRef.get();
    const categoryId = Date.now();

    if (!categorySnapshot.get(category)) {
      await categoryRef.set(
        {
          [Date.now()]: {
            totalNumberOfCards: 0,
            tags: '',
            category,
            categoryId
          }
        },
        { merge: true }
      );
      this.setState({ category: '' });
      this.props.getAllCategories();
    } else {
      console.log('category exists');
    }
  };

  public render() {
    return (
      <div>
        <input
          type="text"
          name="category"
          value={this.state.category}
          placeholder="New Category"
          onChange={this.onInputChange}
        />
        <button onClick={this.onAddCategory}>Add Category</button>
      </div>
    );
  }
}

export default AddCategoryInput;
