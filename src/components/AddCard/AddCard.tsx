import React, { Component, SyntheticEvent } from 'react';
import Api from '../../api/Api';
import './AddCard.scss';

class AddCards extends Component {
  public state = {
    categories: null,
    category: '',
    front: '',
    back: ''
  };

  public componentDidMount() {
    Api.getCategories(false).then(categories => this.setState({ categories }));
  }

  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  public onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    debugger;
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  public renderCategories = () => {
    let options = null;
    if (this.state.categories) {
      // @ts-ignore
      options = Object.keys(this.state.categories).map(category => (
        <option value={category} key={category}>
          {category}
        </option>
      ));
    }
    const categories = (
      <>
      <label htmlFor="category"/>
        Category
        <select
          value={this.state.category}
          onChange={this.onSelectChange}
          name="category"
        >
          <option value="">Select a category</option>
          {options}
        </select>
      </>
    );

    return categories;
  };

  public onSubmit = (e: SyntheticEvent) => {
    debugger;
    e.preventDefault();
    const { front, back, category } = this.state;
    const time = Date.now();
    if (front && back && category) {
      Api.addCard(category, front, back, time).then(data => {
        this.setState({ front: '', back: '' });
      });
    }
  };

  public render() {
    return (
      <form className="add-card" onSubmit={this.onSubmit}>
        {this.renderCategories()}
        <label htmlFor="front">Front:</label>
        <input
          type="text"
          onChange={this.onInputChange}
          value={this.state.front}
          name="front"
        />
        <label htmlFor="back">Back:</label>
        <input
          type="text"
          onChange={this.onInputChange}
          value={this.state.back}
          name="back"
        />
        <button onClick={this.onSubmit} type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default AddCards;
