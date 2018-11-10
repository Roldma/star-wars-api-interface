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
            <div className="category_buttons">
              <input
                type="radio"
                value="people"
                name="categorySelect"
                onChange={this.updateCategory}
                defaultChecked
              />
              People
              <input
                type="radio"
                value="planets"
                name="categorySelect"
                onChange={this.updateCategory}
              />
              Planets
              <input
                type="radio"
                value="species"
                name="categorySelect"
                onChange={this.updateCategory}
              />
              Species
              <input
                type="radio"
                value="starships"
                name="categorySelect"
                onChange={this.updateCategory}
              />
              Starships
              <input
                type="radio"
                value="vehicles"
                name="categorySelect"
                onChange={this.updateCategory}
              />
              Vehicles
            </div>
          </fieldset>
          <div />
        </form>
      </div>
    );
  }
}

export default SearchBar;
