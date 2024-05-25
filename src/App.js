import React, { useState } from 'react';
import {useEffect} from 'react'
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


const API_URL = 'http://www.omdbapi.com?apikey=804873cb';

const App = () => {
    const [movies, SetMovies] = useState([]);
    const [searchTerm, setsearchTerm] = useState(' ');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        SetMovies(data.Search);
    }
    useEffect( () => {
        searchMovies('Superman')
    }, [])

    return (
        <div className='app'>
            <h1> Movie Land</h1>
            <div className='search'>
                <input 
                placeholder='Search for movies' 
                value={searchTerm} 
                onChange= {(e) => setsearchTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        searchMovies(searchTerm);
                    }
                }}
                />
                <img
                    src={SearchIcon}
                    alt ='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {movies?.length > 0 ?(                
                <div className='container'>
                    {movies.map( (movie) => (
                        <MovieCard movie = {movie} />
                    ))}
                </div>
                ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;