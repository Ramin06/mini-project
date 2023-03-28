import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './Home.css';
import Loading from '../Spinner/Loading';

const Home = ({ peopleData }) => {

    const [peopleData2, setPeopleData2] = useState([]);


    useEffect(() => {
        setLoading(true);

        const currentPage = localStorage.getItem('currentPage') || 1;

        axios.get(`https://swapi.dev/api/people/?page=${currentPage}`)
            .then((response) => {
                setPeopleData2(response.data.results);
                setLoading(false);
            })
            .catch(() => {
                alert('You Are Offline');
            });
    }, []);


    useEffect(() => {
        setPeopleData2(peopleData);
    }, [peopleData]);


    const [loading, setLoading] = useState(true);


    return (
        <div>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className='main'>
                        {peopleData2.length > 0 ?
                            peopleData2.map((person) => (
                                <li key={person.name} style={{ listStyleType: "none" }}>
                                    <div className='box'>
                                        <Link className='header' to={`/${person.name}`}>
                                            <p className='name'>{person.name}</p>
                                        </Link>
                                    </div>
                                </li>
                            )) :
                            <></>
                        }
                    </div>
                </>)}
        </div>
    )
}

export default Home