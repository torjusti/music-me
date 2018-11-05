import React from 'react';
import Slider from 'rc-slider';
import { connect } from 'react-redux';
import 'rc-slider/assets/index.css';
import { Label, Icon } from 'semantic-ui-react';
import styles from './SidePanel.module.css';
import { setGenreSelected } from '../../features/genres/actions';

const SidePanel = ({ genres, setGenreSelected }) => (
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
        {genres.availableGenres.map(elem => {
          const selected = genres.selectedGenres.includes(elem.genre);

          return (
            <li key={elem.genre}>
              <div className="ui checkbox">
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => setGenreSelected(elem.genre, !selected)}
                />

                <label>{elem.genre}</label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

const mapStateToProps = state => ({
  genres: state.genres,
});

const mapDispatchToProps = {
  setGenreSelected,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidePanel);
