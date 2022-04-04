import React, {useState, useEffect} from 'react'
import "./UpcomingMovies.css";


function UpcomingMovies() {
    const [movies, setMovies] = useState([])

    useEffect(()=>{
        getMovies();
    }, []);

    async function getMovies(){
        const rawResponse = await fetch('http://localhost:8085/api/v1/movies?page=1&limit=100&status=PUBLISHED', {
            method:"GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
        });
        const result = await rawResponse.json();
        setMovies(result.movies);
    }

    return (
        <div>
            <div className="upcoming-movies-container">
            <center><span className="upcoming-movies-title">Upcoming Movies</span></center>
            </div>
            <div className="upcoming-movies-card-container">
                {/* <GridList cellHeight={250} cols={movies.length} styl={{display: "flex"}}> */}
                    {movies.map((movie) => {
                        return(
                            // <GridListTile key={movie.id} className="upcoming-movies-card-container">
                                <div className="upcoming-movies-image-container" key={movie.id}>
                                    <img alt="" src={movie.poster_url} key={movie.title}/>
                                    <div className="upcoming-movies-image-title">
                                        <p>{movie.title}</p>
                                    </div>
                                </div>
                            //     <GridListTileBar></GridListTileBar>
                            //  </GridListTile>
                        );    
                    })}
                {/* </GridList> */}
        </div>
      </div>
    )
}

export default UpcomingMovies
