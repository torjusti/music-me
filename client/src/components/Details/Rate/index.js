import React from 'react';
import classNames from 'class-names';
import { Icon } from 'semantic-ui-react';
import styles from './rate.module.css';

const Rate = ({ onClick, rating = 0, maxRating = 5, ...rest }) => (
  <span {...rest}>
    {Array.from(Array(maxRating)).map((_, i) => (
      <Icon
        key={i}
        name={classNames('star', {
          outline: i >= rating,
        })}
        onClick={() => onClick(i + 1)}
        className={styles.star}
      />
    ))}
  </span>
);

export default Rate;
