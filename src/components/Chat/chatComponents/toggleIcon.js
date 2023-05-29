import { Button } from 'antd';
import { useState } from 'react';

function ToggleIcon({
  baseIcon, toggledIcon, text, iconClicked,
}) {
  const [toggled, SetToggled] = useState(false);
  const handleClick = () => {
    SetToggled((old) => !old);
    if (iconClicked) iconClicked();
  };

  return (
    <Button onClick={handleClick}> {toggled ? toggledIcon : baseIcon} {text}</Button>
  );
}

export default ToggleIcon;
