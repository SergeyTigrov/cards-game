import './modal.css'

export default function Modal({trueCount, newGame, restartGame, attemptCount}) {

    const handleClick = () => {
        restartGame();
        setTimeout(() => newGame(), 200);
    }

    return (
        <div className={trueCount === 8 ? 'modal' : 'close'}>
            <div className="modal_window">
                <h1>Ты выиграл!</h1>
                <p>Кол-во попыток: {attemptCount}</p>
                <button className='btn' onClick={handleClick}>новая игра</button>
            </div>
        </div>
    )
}