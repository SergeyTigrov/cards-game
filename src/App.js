import './App.css'
import {ARRAY} from './array'
import { useEffect, useState } from 'react'
import Card from './Card/Card'
import Modal from './Modal/Modal'

function App() {

  const [cards, setCards] = useState([]);
  const [attemptCount, setAttemptCount] = useState(0);

  const [firstcard, setFirstcard] = useState(null);
  const [secondcard, setSecondcard] = useState(null);

  const [disabled, setDisabled] = useState(false);

  const [trueCount, setTrueCount] = useState(0);

  const newGame = () => {
    const newCards = [...ARRAY, ...ARRAY].sort(() => Math.random() - 0.5).map((card) => ({...card, id: crypto.randomUUID()}));
    setCards(newCards); 
    setAttemptCount(0);
    setTrueCount(0);
  }

  const restartGame = () => {
    const oldCards = cards.map((card) => ({...card, visible: false}));
    setCards(oldCards); 
    setFirstcard(null);
    setSecondcard(null);
    setAttemptCount(0);
    setTrueCount(0);
  }

  const viborCards = (card) => {  
    if(!card.visible) {
      firstcard ? setSecondcard(card) : setFirstcard(card);
    } 
  }

  useEffect(() => {
    if(firstcard && secondcard && firstcard.id !== secondcard.id) {
      setDisabled(true);
      setAttemptCount(prev => prev + 1);
      if(firstcard.info === secondcard.info) {
        setCards(prevCards => prevCards.map(item => item.id === firstcard.id ? { ...item, visible: true } : item));
        setCards(prevCards => prevCards.map(item => item.id === secondcard.id ? { ...item, visible: true } : item));
        setTimeout(() => setTrueCount(prev => prev + 1), 1000);
        reset();
      } else {
        setTimeout(() => reset(), 700);
      }
    }
  }, [firstcard, secondcard]);

  useEffect(() => {
    newGame();    
  }, [])

  const reset = () => {
    setFirstcard(null);
    setSecondcard(null);
    setDisabled(false);
  }

  return (
    <section className='section'>
      <div className='container'>
        <button className='btn' onClick={restartGame}>начать игру заново</button>
        <div className='attempt_count'>Количество попыток: {attemptCount}</div>
        <div className='cards'>
          {cards.map(card => (
            <Card 
              key={card.id} 
              card={card} 
              viborCards={viborCards} 
              visible={card === firstcard || card === secondcard || card.visible}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
      <Modal trueCount={trueCount} newGame={newGame} restartGame={restartGame} attemptCount={attemptCount}/>
    </section>
  );
}

export default App;
