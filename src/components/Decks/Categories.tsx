import React from 'react';
import Api from '../../api/Api';
import SvgIcons from '../SvgIcons/SvgIcons';
import './Categories.scss';
import Category from './Category';

class DecksContainer extends React.Component {
  public state = {
    categories: {}
  };

  public componentDidMount() {
    Api.getCategories(false).then(categories => this.setState({ categories }));
  }

  public render() {
    return (
      <div className="decks">
        <SvgIcons
          className="decks__svg"
          iconId="add"
          strokeWidth="0"
          title="Add a new category"
        />
        <div className="decks-container">
          {Object.keys(this.state.categories).map(cat => (
            <Category name={cat} key={cat} />
          ))}
        </div>
      </div>
    );
  }
}

export default DecksContainer;
