import { PlusOutlined } from '@ant-design/icons';
import {
  Input, Space, Tag, Tooltip, theme,
} from 'antd';
import { useEffect, useRef, useState } from 'react';

function Tags(trigger) {
  const { token } = theme.useToken();
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  const maxTags = 3;
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (isDisabled) {
      // eslint-disable-next-line react/destructuring-assignment
      trigger.trigger(true);
    } else {
      // eslint-disable-next-line react/destructuring-assignment
      trigger.trigger(false);
    }
  }, [isDisabled]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    if (e.target.value.length >= 11) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (!isDisabled) {
      if (inputValue && tags.indexOf(inputValue) === -1 && tags.length < maxTags) {
        setTags([...tags, inputValue]);
      }
      setInputVisible(false);
      setInputValue('');
    }
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };
  const tagInputStyle = {
    width: 78,
    verticalAlign: 'top',
  };
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };
  return (
    <Space size={[0, 3]} wrap>
      <Space size={[0, 3]} wrap>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                size="small"
                style={tagInputStyle}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }
          const tagElem = (
            <Tag
              key={tag}
              closable
              style={{
                userSelect: 'none',
              }}
              onClose={() => handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  // if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                  // }
                }}
              >
                {tag}
              </span>
            </Tag>
          );
          return tagElem;
        })}
      </Space>
      {/* eslint-disable-next-line no-nested-ternary */}
      {tags.length < maxTags
        ? inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={tagInputStyle}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        ) : (
          <Tag style={tagPlusStyle} onClick={showInput}>
            <PlusOutlined /> New Tag
          </Tag>
        ) : null}
    </Space>
  );
}
export default Tags;
