import React from 'react';
import { connect } from 'react-redux';
import { UsersContext } from '../../providers/UsersProvider';
import { getAllCategories } from '../../store/actions/actionCreators';
import { ICategory } from '../../util/interfaces';
import AddCategory from './AddCategory';
import './Categories.scss';
import Category from './Category';
interface IProps {
  categories: ICategory[];
  getAllCategories: (uid: string) => void;
}
class DecksContainer extends React.Component<IProps> {
  public async componentDidMount() {
    const { uid } = this.context;
    this.props.getAllCategories(uid);
  }

  public render() {
    console.log(this.props);
    const { categories } = this.props;
    if (!categories) {
      return;
    }
    return (
      <div className="decks">
        <AddCategory />
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
const mapStateToProps = (state: any) => ({ categories: state.categories });
export default connect(mapStateToProps, { getAllCategories })(DecksContainer);
