import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import './Person.css';
import Loading from '../Spinner/Loading';

const CardPage = ({ peopleData }) => {

    const [loading, setLoading] = useState(true);

    const cardId = useLocation().pathname.slice(1);
    const specificCard = peopleData.find((person) => person.name === decodeURI(cardId));

    useEffect(() => { }, [peopleData])

    useEffect(() => {
        setLoading(true);
        Promise.all([]).then(() =>
            setLoading(false)
        );
    }, [peopleData]);


    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {specificCard ?
                        <>
                            <div className='person'>
                                <div className='box-header'>
                                    <h3 className='header1'>{specificCard.name}</h3>
                                </div>

                                <div className='box1'>
                                    <p>species</p>
                                    <p>{specificCard.species}</p>
                                </div>
                                <div className='box1'>
                                    <p>Birth Year</p>
                                    <p>{specificCard.birth_year}</p>
                                </div>
                                <div className='box1'>
                                    <p>gender</p>
                                    <p>{specificCard.gender}</p>
                                </div>
                                <div className='box1'>
                                    <p>planet</p>
                                    <p>{specificCard.homeworld}</p>
                                </div>
                                <div className='box1'>
                                    <p>HEIGHT</p>
                                    <p>{specificCard.height} cm</p>
                                </div>
                                <div className='box1'>
                                    <p>WEIGHT</p>
                                    <p>{specificCard.mass} Kg</p>
                                </div>

                                <div className='box1'>
                                    <p>Hair Color</p>
                                    <p>{specificCard.hair_color}</p>
                                </div>
                                <div className='box1'>
                                    <p>Skin Color</p>
                                    <p>{specificCard.skin_color}</p>
                                </div>
                                <div className='box1'>
                                    <p>eye color</p>
                                    <p>{specificCard.eye_color}</p>
                                </div>
                            </div>
                        </> :
                        <></>
                    }
                </>
            )}
        </div >
    )
}

export default CardPage