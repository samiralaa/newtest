import React from 'react';
import styles from "../../styles/_UpdateData.module.scss";
const FixedCenterComponent = () => {
    return (
      <div className={styles.datacontact} style={{ position: 'fixed', top: '50%',  transform: 'translate(-50%, -50%)' }}>
         <a href="" target="_blank" rel="noopener noreferrer">
         <img src="/public/whatsappfexed.png" alt="Phone" style={{ width: '50px', marginRight: '10px',paddingTop:'10px' }} />
    </a>
     
        <br />
       
        <a href="" target="_blank" rel="noopener noreferrer">
        <img src="/public/phone-call (1).png" alt="Phone" style={{ width: '50px' }} />
    </a>
      </div>
    );
};

export default FixedCenterComponent;
