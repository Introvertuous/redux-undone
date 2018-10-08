import React, { Component } from 'react';
import CircleOutlineIcon from 'components/icons/CircleOutline';
import CircleCheckIcon from 'components/icons/CircleCheck';

class Toggle extends Component {
  onClick = () => {
    const { onClick, id, checked } = this.props;
    onClick(id, !checked);
  };

  render() {
    const { checked, onMouseDown, className } = this.props;

    const iconProps = {
      onClick: this.onClick,
      className,
      onMouseDown,
    };

    if (!checked) {
      return <CircleOutlineIcon {...iconProps} />;
    }
    return <CircleCheckIcon {...iconProps} color="lightcoral" />;
  }
}

export default Toggle;
