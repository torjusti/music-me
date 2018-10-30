import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './SidePanel.module.css';

export default class SidePanel extends Component {
  // FROM https://github.com/react-component/slider
  render() {
    return (
      <div className={styles.sliderCont}>
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
    );
  }
}
