import React from 'react';
import { connect } from 'react-redux';
import styles from './toast.module.css';

const Toast = ({ message, visible }) =>
  visible && <span className={styles.toast}>{message}</span>;

const mapStateToProps = state => ({
  visible: state.toasts.visible,
  message: state.toasts.message,
});

export default connect(mapStateToProps)(Toast);
