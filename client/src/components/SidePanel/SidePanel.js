import React, { Component } from 'react';
import Slider from 'rc-slider';
import { connect } from 'react-redux';
import 'rc-slider/assets/index.css';
import { Label, Icon } from 'semantic-ui-react';
import styles from './SidePanel.module.css';

class SidePanel extends Component {
  // rc-slider is from https://github.com/react-component/slider

  state = {
    genres: []
  };

  /**
   * When a checkbox changes it's state from user input,
   * updates the genres that the server should filter
   * The state contains an array of all genres that
   * should be included.
   * @param elem   (Object)   The pressed checkbox element
   * @param genre  (string)   The genre that should either be removed or included
   */
  handleCheckboxState = (elem, genre) => {
    if (elem.target.checked) {
      this.setState({
        genres: [...this.state.genres, genre]
      });
    } else {
      let temp = [...this.state.genres];
      temp.splice(temp.indexOf(genre), 1);
      this.setState({ genres: temp });
    }
  };

  render() {
    return (
      <div className={styles.controls}>
        <h1 className="ui header">Filter menu</h1>

        <div className={styles.controlsCont}>
          <Label>
            <Icon name="star" />
            Filter by rating
          </Label>
          <Slider
            min={1}
            max={5}
            marks={{
              1: '1',
              2: '2',
              3: '3',
              4: '4',
              5: '5',
            }}
          />
        </div>
        <div className={styles.controlsCont}>
          <Label>
            <Icon name="music" />
            Filter by genre
          </Label>
          <ul className={styles.noDecoration}>
            {this.props.data.map(elem => (
              <li key={elem.genre}>
                <div className="ui checkbox">
                  <input
                    type="checkbox"
                    onClick={((e) => this.handleCheckboxState(e, elem.genre))}
                  />
                  <label>
                    {elem.genre}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.genres,
});

export default connect(mapStateToProps)(SidePanel);
