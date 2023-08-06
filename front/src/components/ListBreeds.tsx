import {FC, useEffect, useState} from 'react';
import styles from '../styles/ListBreeds.module.css'
import { IBreed } from '../types';
import { BreedCard } from './BreedCard';
import {motion} from 'framer-motion'


export const ListBreeds: FC = () => {
  let [page, setPage] = useState<number>(0);
  let [breeds, setBreeds] = useState<IBreed[]>([]);

  let fetchBreeds = async (page: number = 0) => {
    let res = await fetch(`https://api.thecatapi.com/v1/breeds?limit=10&page=${page}`);
    let ans: IBreed[] = await res.json();
    setBreeds(ans);
  }

  useEffect(() => {
    fetchBreeds(page);
  }, []);

  return (
    <div className={styles.container}>
      <motion.div className={styles.content} layout>
        {breeds.map((item) => 
          <BreedCard {...item} key={item.id}/>
        )}
      </motion.div>
    </div>
  );
}
 