import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPage } from '../../features/pagination/actions';

class Pagination extends Component {
  state = {
    page: this.props.page,
  };

  handleChange = event => {
    this.setState({
      page: event.target.value,
    });
  };

  handleClick = () => {
    this.props.setPage(this.state.page);
  };

  render() {
    return (
      <div>
        <input
          value={this.state.page}
          onChange={this.handleChange}
          type="number"
        />
        <button onClick={this.handleClick}>Go</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  page: state.page,
});

const mapDispatchToProps = {
  setPage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
