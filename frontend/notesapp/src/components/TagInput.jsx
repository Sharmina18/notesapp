import React, { useState } from 'react';

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addNewTag();
    }
  };

  return (
    <div>
      {tags.length > 0 && (
        <div>
          {tags.map((tag, index) => (
            <span key={index} className='bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm mr-2'>
              # {tag}
              <button onClick={() => removeTag(tag)}>
                x
              </button>
            </span>
          ))}
        </div>
      )}

      <div className='flex items-center gap-4 mt-3'>
        <input
          type='text'
          placeholder='Add Tags'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button onClick={addNewTag}>
          Add
        </button>
      </div>
    </div>
  );
};

export default TagInput;
