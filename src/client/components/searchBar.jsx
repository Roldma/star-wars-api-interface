import React, { Component } from 'react';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      category: '',
    };
    this.textFill = this.textFill.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
  }

  componentDidMount() {
    this.setState({ category: 'people' });
  }

  textFill(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleSubmit(e) {
    const { inputValue, category } = this.state;
    const { makeRequest } = this.props;

    makeRequest(inputValue, category);

    this.setState({ inputValue: '' }); // clear search bar

    e.preventDefault();
  }

  updateCategory(e) {
    this.setState({ category: e.target.value });
  }

  render() {
    const categories = ['People', 'Planets', 'Species', 'Starships', 'Vehicles'];
    let uniqueId = 0;
    const catButtons = categories.map((category) => {
      uniqueId += 1;
      if (category === 'People') {
        return (
          <span key={`catSpanButt${uniqueId}`}>
            <input
              key={`catBut${uniqueId}`}
              type="radio"
              value={category}
              id={category}
              name="categorySelect"
              onChange={this.updateCategory}
              defaultChecked
            />
            <label htmlFor={category}>{category}</label>
          </span>
        );
      }
      return (
        <span key={`catSpanButt${uniqueId}`}>
          <input
            key={`catBut${uniqueId}`}
            type="radio"
            id={category}
            value={category}
            name="categorySelect"
            onChange={this.updateCategory}
          />
          {' '}
          <label htmlFor={category}>{category}</label>
        </span>
      );
    });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset name="category_button_set">
            <input
              className="inputBars"
              type="text"
              id="search_text_input"
              onChange={this.textFill}
              value={this.state.inputValue}
            />
            <div>{catButtons}</div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default SearchBar;
