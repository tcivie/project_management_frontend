import { PlusOutlined } from '@ant-design/icons';
import {
  Input, Space, Tag, theme,
} from 'antd';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTags,
  setInputVisible,
  setInputValue,
  setEditInputIndex,
  setEditInputValue, setError,
} from '../../redux/actions/tagActions';

function Tags() {
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const maxTags = 3;

  const {
    tags, inputVisible, inputValue, editInputIndex, editInputValue, isError,
  } = useSelector((state) => state.tag);

  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    dispatch(setTags(newTags));
  };
  const handleInputChange = (e) => {
    dispatch(setError(e.target.value.length > 10));
    dispatch(setInputValue(e.target.value));
  };

  const handleEditInputChange = (e) => {
    dispatch(setEditInputValue(e.target.value));
  };

  const handleInputConfirm = () => {
    if (!isError) {
      if (inputValue && tags.indexOf(inputValue) === -1 && tags.length < 3) {
        dispatch(setTags([...tags, inputValue]));
      }
      dispatch(setInputVisible(false));
      dispatch(setInputValue(''));
    }
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    dispatch(setTags(newTags));
    dispatch(setEditInputIndex(-1));
    dispatch(setEditInputValue(''));
  };

  const showInput = () => {
    dispatch(setInputVisible(true));
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
          return (
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
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }}
              >
                {tag}
              </span>
            </Tag>
          );
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
