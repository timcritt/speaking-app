import React from 'react';

import styles from './ToolTip.module.css';

import toolTipIcon from 'img/toolTip.png'

const ToolTip = ({text}) => {

    return (
    <div className={styles.hover_text}>
        <img src={toolTipIcon} className={styles.icon} />
        <span className={styles.tooltip_text}>{text}</span>
    </div>)

}

export default ToolTip;