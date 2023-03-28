import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

import HomePage from './components/Home/Home';
import CardPage from './components/person/Person';

import './App.css';

function App() {
  const [peopleData, setPeopleData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPeople = async (page) => {
    await axios.get(`https://swapi.dev/api/people/?page=${page}`)
      .then((response) => {
        var peopleCopy = response.data.results;
        let promises = [];
        for (let person of peopleCopy) {
          promises.push(

            axios.get(person.homeworld)
              .then((response) => {
                person.homeworld = response.data.name;
              }),

            person.species.length > 0 ?
              axios.get(person.species[0])
                .then((response) => {
                  person.species = response.data.name;
                })
              : person.species = 'Human'
          )
        }

        Promise.all(promises).then(() => {
          setPeopleData(peopleCopy);
          setTotalPages(Math.ceil(response.data.count / 10));
        });
      })
      .catch((error) => {
        alert('You Are Offline')
      })
  }

  useEffect(() => {
    loadPeople(currentPage);
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);


  return (
    <BrowserRouter>
      <div className='page-body'>
        <Routes>
          <Route path="/" element={<HomePage peopleData={peopleData} />} />
          <Route path="/:id" element={<CardPage peopleData={peopleData} />} />
        </Routes>
        <div className='changepage'>
          <button className='previous' disabled={currentPage === 1} onClick={handlePrevious}>Previous</button>
          <span className='num'>{currentPage} of {totalPages}</span>
          <button className='next' disabled={currentPage === totalPages} onClick={handleNext}>Next</button>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;