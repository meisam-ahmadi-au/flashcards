import React, { Component } from 'react';
import SvgIcons from '../SvgIcons/SvgIcons';
import AddCategoryInput from './AddCategoryInput';

interface IAddCategoryState {
  showAddCategoryForm: boolean;
}
interface IAddCategoryProps {
  getAllCategories: () => void;
}

class AddCategory extends Component<IAddCategoryProps> {
  public state = {
    showAddCategoryForm: false
  };

  public toggleAddCategoryForm = () =>
    this.setState((prevState: IAddCategoryState) => ({
      showAddCategoryForm: !prevState.showAddCategoryForm
    }));

  public render() {
    const { showAddCategoryForm } = this.state;
    return (
      <div className="decks__add-category">
        <SvgIcons
          className="decks__svg"
          iconId="add"
          strokeWidth="0"
          title="Add a new category"
          onClick={() => this.toggleAddCategoryForm()}
        />

        {showAddCategoryForm && (
          <AddCategoryInput getAllCategories={this.props.getAllCategories} />
        )}
      </div>
    );
  }
}

export default AddCategory;
