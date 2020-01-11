import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../../api/Api';
import { UsersContext } from '../../providers/UsersProvider';
import { getAllCategories } from '../../store/actions/actionCreators';
import { Modal } from '../Portal/Portal';
import Spinner from '../Spinner/Spinner';

interface IProps {
  getAllCategories: (uid: string) => void;
}
class AddCategoryInput extends Component<IProps> {
  public state = {
    category: '',
    isLoading: false
  };

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  public onAddCategory = async () => {
    const { uid } = this.context;
    const { category } = this.state;
    if (!category) {
      return false;
    }

    this.setState({ isLoading: true });
    await Api.addCategory(category).catch(console.log);
    this.setState({ category: '', isLoading: false });
    this.props.getAllCategories(uid);
  };

  public render() {
    const { isLoading } = this.state;

    return (
      <div>
        {isLoading && (
          <Modal>
            <Spinner />
          </Modal>
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

AddCategoryInput.contextType = UsersContext;
export default connect(null, { getAllCategories })(AddCategoryInput);
