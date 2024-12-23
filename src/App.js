import React, { useEffect, useState } from "react";
import './App.css'; 

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  const fetchMovies = async () => {
    setLoading(true);
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${(currentPage - 1) * 10}`);
    const data = await response.json();
    setMovies(data.products);
    setTotalMovies(data.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < Math.ceil(totalMovies / 10)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Movie List</h1>
      </header>

      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="movie-container">
          <div className="movie-grid">
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className={`movie-card movie-card-${index % 5}`} 
              >
                <img
                  src={movie.image}
                  alt={movie.movie}
                  className="movie-image"
                />
                <div className="movie-overlay">
                  <h2 className="movie-title">{movie.movie}</h2>
                  <p className="movie-description">Rating: {movie.rating}</p>
                  <a href={movie.imdb_url} target="_blank" rel="noopener noreferrer" className="movie-link">IMDB</a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={prevPage}
              className="pagination-button"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {Math.ceil(totalMovies / 10)}
            </span>
            <button
              onClick={nextPage}
              className="pagination-button"
              disabled={currentPage === Math.ceil(totalMovies / 10)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
