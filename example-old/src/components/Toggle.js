import React, { Component } from 'react';
import CircleOutlineIcon from './icons/CircleOutline';
import CircleCheckIcon from './icons/CircleCheck';

class Toggle extends Component {
  onClick = () => {
    const { onClick, id, checked } = this.props;
    onClick(id, !checked);
  };

  render() {
    const { checked, onMouseDown } = this.props;

    const iconProps = {
      onClick: this.onClick,
      className: 'icon',
      onMouseDown,
    };

    if (!checked) {
      return <CircleOutlineIcon {...iconProps} />;
    }
    return <CircleCheckIcon {...iconProps} color="lightcoral" />;
  }
}

export default Toggle;
