import './Card.css'

export default function Card({card, viborCards, visible, disabled}) {

    const handleClick = () => {
        if(!disabled) {
            viborCards(card);
        }
    }

    return(
        <div className="card" id={card.id}>
            <div className={visible ? 'visible' : ''} >
                <div className='card_img_front'><img src={process.env.PUBLIC_URL + card.info} alt='country'/></div>
                <div className='card_img_back'><img onClick={() => handleClick()} src='img/earth.png' alt='country'/></div>   
            </div>
        </div>
    )
}