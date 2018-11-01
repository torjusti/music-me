import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Label, Icon, Checkbox } from 'semantic-ui-react';
import styles from './SidePanel.module.css';

export default class SidePanel extends Component {
  // FROM https://github.com/react-component/slider

  // TODO find a way to add key pair values for state based on existing genres in the DB.
  state = {
    pop: false,
  };

  /* TODO render a checkbox for each genre and sort based on checked */

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
          <Checkbox
            label="Pop"
            onClick={() => this.setState({ pop: !this.state.pop })}
          />
        </div>
      </div>
    );
  }
}
