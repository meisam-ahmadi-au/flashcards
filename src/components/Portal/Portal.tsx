import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Portal.module.scss';

const modalRoot = document.getElementById('portal')!;
export class Portal extends React.Component {
  public el = document.createElement('div');

  public componentDidMount() {
    this.el.classList.add(styles.portal);
    modalRoot.appendChild(this.el);
  }

  public componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  public render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default Portal;
