import React, { Component } from 'react';
import Slider from 'rc-slider';
import { connect } from 'react-redux';
import 'rc-slider/assets/index.css';
import { Label, Icon, Checkbox } from 'semantic-ui-react';
import styles from './SidePanel.module.css';

class SidePanel extends Component {
  // FROM https://github.com/react-component/slider

  state = {
    pop: false,
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
          {this.props.data.map(() => (
            <Checkbox
              label="Pop"
              onClick={() => this.setState({ pop: !this.state.pop })}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.genres,
});

export default connect(mapStateToProps)(SidePanel);
