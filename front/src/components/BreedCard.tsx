import {FC, useEffect, useState} from 'react';
import { IBreed, ICat } from '../types';
import styles from '../styles/BreedCard.module.css'
import {motion, AnimatePresence} from 'framer-motion';

export const BreedCard: FC<IBreed> = ({id, name, origin, description}) => {
  let [pictures, setPictures] = useState<ICat[]>([]);
  let [showModal, setShowModal] = useState<boolean>(false);
  let [showDescription, setShowDescription] = useState<boolean>(false);
  let [index, setIndex] = useState<number>(0);

  let incrementIndex = () => {
    index++;
    index %= pictures.length;
    setIndex(index);
  }

  let decrementIndex = () => {
    index--;
    if(index < 0) index = pictures.length - 1;
    setIndex(index);
  }
  
  let getPicture = async () => {
    let res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`);
    let ans: ICat[] = await res.json();

    setPictures([...pictures, ...ans]);
  }

  let getPictures = async () => {
    let res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=10`);
    let ans: ICat[] = await res.json();

    setPictures([...pictures, ...ans]);
  }

  useEffect(() => {
    if(!pictures.length) getPicture();
  }, []);

  useEffect(() => {
    if(showModal && pictures.length < 11) getPictures();
  }, [showModal]);

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
            <motion.div className={styles.content}>
              {(!!pictures.length) &&
                <img src={pictures[index].url} className={styles.img}/>
              }
              <div className={styles.button_container}>
                <div className={styles.button_left}
                  onClick={() => decrementIndex()}
                ></div>
                <div className={styles.button_right}
                  onClick={() => incrementIndex()}
                ></div>
              </div>

              <div className={styles.info_container}
                onClick={() => {
                  setShowDescription(!showDescription);
                }}
              >
                <div className={styles.info_header}>
                  <h2>{name}</h2>
                  <div className={styles.origin}>
                    {origin}
                  </div>
                </div>
                <AnimatePresence>
                  {showDescription && 
                    <motion.div className={styles.description}
                      initial={{height:0}}
                      animate={{height:'auto'}}
                      exit={{height:0}}
                    >
                      {description}
                    </motion.div>}
                </AnimatePresence>
              </div>
            </motion.div>
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
              <img src={pictures[index].url} className={styles.img}/>
            }
          </div>
        </motion.div>
      }
    </AnimatePresence>
  );
}
