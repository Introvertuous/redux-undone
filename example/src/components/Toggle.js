import React, { Component } from 'react';
import CircleOutlineIcon from './icons/CircleOutline';
import CircleCheckIcon from './icons/CircleCheck';

class Toggle extends Component {
  onClick = () => {
    const { onClick, id, checked } = this.props;
    onClick(id, !checked);
  };

  render() {
    const { checked } = this.props;

    const iconProps = {
      onClick: this.onClick,
      className: 'icon',
    };

    if (!checked) {
      return <CircleOutlineIcon {...iconProps} />;
    }
    return <CircleCheckIcon {...iconProps} />;
  }
}

export default Toggle;
