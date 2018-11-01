import React from 'react';
import styles from './badge.module.css';

const Badge = ({ label, value }) => (
  <div className={styles.badge}>
    <div className={styles.label}>{label}</div>
    <div className={styles.value}>{value}</div>
  </div>
);

export default Badge;
