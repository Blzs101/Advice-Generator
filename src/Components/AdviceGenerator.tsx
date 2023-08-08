import styles from '../Components/AdviceGenerator.module.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

const API_URL: string = 'https://api.adviceslip.com/advice';

export function AdviceGenerator() {

  const [advice, setAdvice] = useState<string>();
  const [id, setId] = useState<number>();
  const fetchData = async () => {
    try {
      const getData = await Axios.get(API_URL).then((res) => res.data);
      setId(getData.slip.id);
      setAdvice(getData.slip.advice);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    let initialized: boolean = false;
    if (!initialized) {
      initialized = true;
      fetchData();
    }
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Advice #{id}</h1>
      <p className={styles.quotes}>" {advice} "</p>
      <img
        src="src\assets\pattern-divider-desktop.svg"
        className={styles.divider}
      ></img>
      <button className={styles.btn_change} onClick={fetchData}>
        <img src="src\assets\icon-dice.svg" className={styles.cube}></img>
      </button>
    </div>
  );
}
