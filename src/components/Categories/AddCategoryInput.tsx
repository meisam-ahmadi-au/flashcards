import React, { Component } from 'react';
import { functions } from '../../firebase/firebase';
import Portal from '../Portal/Portal';
import Spinner from '../Spinner/Spinner';

interface IAddCategoryInputProps {
  getAllCategories: () => void;
}

class AddCategoryInput extends Component<IAddCategoryInputProps> {
  public state = {
    category: '',
    isLoading: false
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

    this.setState({ isLoading: true });
    functions
      .httpsCallable('addCategory')({ category })
      .then(data => {
        this.setState({ category: '', isLoading: false });
        this.props.getAllCategories();
      })
      .catch(console.log);
  };

  public render() {
    const { isLoading } = this.state;

    return (
      <div>
        {isLoading && (
          <Portal>
            <Spinner />
          </Portal>
        )}

        <input
          type="text"
          name="category"
          value={this.state.category}
          placeholder="New Category"
          onChange={this.onInputChange}
        />

        <button onClick={this.onAddCategory} disabled={isLoading}>
          Add Category
        </button>
      </div>
    );
  }
}

export default AddCategoryInput;
