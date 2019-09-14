import React, { Component } from 'react';
import { functions } from '../../firebase/firebase';

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

    functions
      .httpsCallable('addCategory')({ category })
      .then(data => {
        this.setState({ category: '' });
        this.props.getAllCategories();
      })
      .catch(console.log);
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
