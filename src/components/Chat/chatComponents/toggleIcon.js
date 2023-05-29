import { Button } from 'antd';
import { useEffect, useState } from 'react';

function ToggleIcon({
  baseIcon, toggledIcon, text, iconClicked, buttonStyle,
}) {
  const [toggled, SetToggled] = useState(false);
  const handleClick = () => {
    SetToggled((old) => !old);
    if (iconClicked) iconClicked();
  };

  return (
    <Button style={{ ...buttonStyle, color: toggled ? '#1677ff' : 'black' }} onClick={handleClick}>
      {toggled ? toggledIcon : baseIcon} {text}
    </Button>
  );
}

export default ToggleIcon;
