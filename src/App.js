// App.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import './App.css'

const App = () => {
  const [data, setData] = useState([]);
  const [selected,setSelected]  = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.tvmaze.com/search/shows?q=all');
        setData(response.data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div  className='container'>
        <Routes>
          <Route  path="/" element={<HomeScreen  setSelected = {setSelected} data={data} />} />
          <Route path="/details/:id" element={<MovieDetails  movie = {selected} />} />
        </Routes>
      </div>
    </Router>
  );
};

const HomeScreen = ({ data ,setSelected}) => {
  return (
    <div>

   
      <h1 style  = {{ display : "flex",alignItems : "center" ,justifyContent : 'center' ,padding : "20px"}}>Movies List</h1>
    <div  className='movie-list'>
      {data.map((ele, key) => (
        <div  className='movie-item' key={key} >
          <Link className='movie-link'  onClick={() =>{setSelected(ele)}}  to={`/details/${ele?.show?.id}`}>
            <img  className='movie-image ' src={ele?.show?.image?.medium} alt={ele?.show?.name} />
            <span  >{ele?.show?.name}</span>
          </Link>
        </div>
      ))}
    </div>
    </div>
  );
};

export default App;
