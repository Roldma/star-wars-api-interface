import React from 'react';

const SearchCategories = (props) => {
  const { categories, updateCategory } = props;

  let uId = 0;

  const buttons = categories.map((category) => {
    uId += 1;
    const validRequestCategory = `${category[0].toLowerCase()}${category.slice(1)}`;

    return (
      <span key={`catSpanButt${uId}`}>
        <input
          key={`catBut${uId}`}
          type="radio"
          value={validRequestCategory}
          id={category}
          name="categorySelect"
          onChange={updateCategory}
          defaultChecked={category == 'People'}
        />
        <label id={`${category.toLowerCase()}_radio`} htmlFor={validRequestCategory}>
          {category}
        </label>
      </span>
    );
  });

  return <div>{buttons}</div>;
};

export default SearchCategories;
