import React from 'react';
import styles from './CategoryBadges.module.scss';
import SvgIcons from '../SvgIcons/SvgIcons';
import classNames from '../../util/classNames';
interface IProps {
  numberOfUnreviewedCards?: number;
  totalNumberOfCards: number;
  className?: string;
}

const CategoryBadges: React.FC<IProps> = props => {
  return (
    <div
      className={classNames(
        styles.badges,
        props.className ? props.className : ''
      )}
    >
      {props.totalNumberOfCards === 0 ? (
        <SvgIcons iconId="empty" fill="white" className={styles.badges__svg} />
      ) : props.numberOfUnreviewedCards === 0 ? (
        <SvgIcons iconId="tick" fill="white" className={styles.badges__svg} />
      ) : (
        <p className={styles.badges__badge}>{props.numberOfUnreviewedCards}</p>
      )}
    </div>
  );
};

export default CategoryBadges;
