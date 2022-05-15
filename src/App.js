import React from 'react';
import './App.css';
import ImageEditor from './ImageEditor'

class App extends React.Component {
  state = {
    book: 0,
    page: 1,
    textLines: []
  }

  componentDidMount() {
    this.fetchBook()
  }

  handleSubmit(event) {
    event.preventDefault()

    this.fetchBook()
  }

  fetchBook() {
    fetch(`${process.env.REACT_APP_API_URL}/book`, {
      method: 'POST',
      body: JSON.stringify({
        book: this.state.book,
        page: this.state.page
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({textLines: data.text})
    });
  }

  handleBookChange(e) {
    this.setState({
      book: e.target.value.replace(/\s/g, '')
    })
  }

  handlePageChange(e) {
    this.setState({
      page: e.target.value
    })
  }

  onKeydown(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e)
    }
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={(e) => this.handleSubmit(e)} className='form'>
          <label>
            Location:
            <textarea
              type="text"
              className='input'
              name="Location"
              placeholder="Book number"
              value={this.state.book}
              onChange={(e) => this.handleBookChange(e)}
              onKeyDown={(e) => this.onKeydown(e)}
            />
          </label>
          <br></br>
          <label>
            Page:
            <input
              type="number"
              name="Page"
              className='input'
              placeholder="Page (1-410)"
              value={this.state.page}
              onChange={(e) => this.handlePageChange(e)}
              onKeyDown={(e) => this.onKeydown(e)}
            />
          </label>
          <input type="submit" value="Submit"/>
        </form>
        <ImageEditor src='data:image/jpeg;base64,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'></ImageEditor>
        <div className="book-text">
          {this.state.textLines.map((value)=> {
            return <p className='textLine'>{value}</p>
          })}
        </div>
      </div>
    );
  }
}

export default App;
