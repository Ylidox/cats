import {FC, useEffect, useState} from 'react';
import { IBreed, ICat } from '../types';
import styles from '../styles/BreedCard.module.css'
import {motion, AnimatePresence} from 'framer-motion';

export const BreedCard: FC<IBreed> = ({id, name, origin, description}) => {
  let [pictures, setPictures] = useState<ICat[]>([]);
  let [showModal, setShowModal] = useState<boolean>(false);
  
  let getPicture = async () => {
    let res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`);
    let ans: ICat[] = await res.json();

    setPictures([...pictures, ...ans]);
  }

  useEffect(() => {
    if(!pictures.length) getPicture();
  }, []);

  return (
    <AnimatePresence>
      {showModal ? 
        <div className={styles.background}
          onClick={(e : React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            setShowModal(false);
          }}
        >
          <motion.div className={styles.container_modal} layoutId={id}
            onClick={(e : React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
            }}
          >
            <div className={styles.content}>
              {(!!pictures.length) &&
                <img src={pictures[0].url} className={styles.img}/>
              }
            </div>
          </motion.div> 
        </div>
        :
        <motion.div className={styles.container} layoutId={id}
          onClick={(e : React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            setShowModal(true);
          }}
        >
          <div className={styles.content}>
            {(!!pictures.length) &&
              <img src={pictures[0].url} className={styles.img}/>
            }
          </div>
        </motion.div>
      }
    </AnimatePresence>
  );
}
