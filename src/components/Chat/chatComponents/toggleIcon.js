import { Button } from 'antd';
import { useState } from 'react';

function ToggleIcon({
  baseIcon, toggledIcon, text, buttonStyle,
  onMouseEnter, onMouseLeave, onFocus, onClick,
}) {
  const [toggled, SetToggled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = (e) => {
    onMouseEnter(e);
    setIsHovered(true);
  };

  const handleMouseLeave = (e) => {
    onMouseLeave(e);
    setIsHovered(false);
  };

  const handleClick = (e) => {
    SetToggled((old) => !old);
    onMouseLeave(e);
    if (onClick) onClick();
    setIsHovered(false);
  };

  return (
    <Button
      onMouseEnter={handleMouseEnter}
      onFocus={onFocus}
      onMouseLeave={handleMouseLeave}
      ghost
      icon={toggled || isHovered ? toggledIcon : baseIcon}
      style={{ ...buttonStyle, color: toggled || isHovered ? '#1677ff' : 'black' }}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
}

export default ToggleIcon;
