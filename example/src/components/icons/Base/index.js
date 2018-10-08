import React from 'react';
import Icon from 'react-icon-base';
import styles from './default.module.scss';
import classnames from 'classnames';

export default props => (
  <Icon {...props} className={classnames(styles.icon, props.className)}>
    {props.children}
  </Icon>
);
