import React, { Component } from 'react';
import Slider from 'rc-slider';
import { connect } from 'react-redux';
import 'rc-slider/assets/index.css';
import { Icon, Button } from 'semantic-ui-react';
import styles from './SidePanel.module.css';
import { setGenreSelected } from '../../features/genres/actions';
import {
  setRatingSelected,
  toggleRatingEnabled,
} from '../../features/rating/actions';

class SidePanel extends Component {
  state = {
    selectedRating: 1,
  };

  setValue = rating => {
    this.setState({ selectedRating: rating });
  };

  update = () => {
    this.props.setRatingSelected(this.state.selectedRating);
  };

  render() {
    return (
      <div className={styles.controls}>
        <h1 className="ui header">Filter menu</h1>

        <div className={styles.controlsCont}>
          <h3 className={styles.filterHeader}>Filter by rating</h3>
          <Button
            toggle
            active={this.props.rating.ratingEnabled}
            onClick={this.props.toggleRatingEnabled}
          >
            <Icon name="star" />
            Enable filter by rating
          </Button>

          <Slider
            min={1}
            max={5}
            className={styles.slider}
            value={this.state.selectedRating}
            onChange={this.setValue}
            onAfterChange={this.update}
            disabled={!this.props.rating.ratingEnabled}
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
          <h3 className={styles.filterHeader}>Filter by genre</h3>

          <ul className={styles.noDecoration}>
            {this.props.genres.availableGenres.map(elem => {
              const selected = this.props.genres.selectedGenres.includes(
                elem.genre,
              );
              return (
                <li key={elem.genre}>
                  <div className="ui checkbox">
                    <input
                      type="checkbox"
                      id={elem.genre}
                      checked={selected}
                      onChange={() =>
                        this.props.setGenreSelected(elem.genre, !selected)
                      }
                    />

                    <label htmlFor={elem.genre}>{elem.genre}</label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  genres: state.genres,
  rating: state.rating,
});

const mapDispatchToProps = {
  setGenreSelected,
  setRatingSelected,
  toggleRatingEnabled,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidePanel);
