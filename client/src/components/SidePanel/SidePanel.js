import React, { Component } from 'react';
import Slider from 'rc-slider';
import { connect } from 'react-redux';
import 'rc-slider/assets/index.css';
import { Icon, Button } from 'semantic-ui-react';
import styles from './SidePanel.module.css';
import { setGenreSelected } from '../../features/genres/actions';
import sortBy from 'lodash/sortBy';
import {
  setRatingSelected,
  toggleRatingEnabled,
} from '../../features/rating/actions';

/**
 * The sidebar component, which handles the client-side part
 * of the majority of the filtering features.
 */
class SidePanel extends Component {
  state = {
    // The currently selected rating. This also exists
    // in Redux, however the value stored there does
    // not update until you drop the cursor, and thus, this
    // value is required.
    selectedRating: 1,
  };

  /**
   * Set the currently selected rating.
   */
  setValue = rating => {
    this.setState({ selectedRating: rating });
  };

  /**
   * Notify Redux about the updated rating when the cursor is released.
   */
  update = () => {
    this.props.setRatingSelected(this.state.selectedRating);
  };

  render() {
    const availableGenres = sortBy(this.props.genres.availableGenres, 'genre');

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
            {availableGenres.map(elem => {
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
