import React from 'react';
import styles from './default.module.scss';

const Content = ({ children, header, as, className }) => {
  const ContainerElement = as;
  return (
    <section className={className}>
      {header && <h2 className={styles.header}>{header}</h2>}
      <ContainerElement className={styles.container}>
        {children}
      </ContainerElement>
    </section>
  );
};

export default Content;
