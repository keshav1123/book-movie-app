import React, {useState, useEffect} from 'react'
import "./MoviesGrid.css"
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core'
import MoviesForm from './MoviesForm';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    gridListTile: {
        objectFit: 'contain'
    }
}));

function MoviesGrid() {
    const classes = useStyles();

    const [movies, setMovies] = useState([])

    const [params, setParams] = useState("");

    const onFormSubmitHandler = (moviesForm) =>{
        let parametrs = "";
        if(moviesForm.movieName !== ""){
            parametrs=`&title=${moviesForm.movieName}`
        }
        if(moviesForm.genre.length > 0){
            parametrs += "&genre="
            moviesForm.genre.map((val, index) => {
                if(index===moviesForm.genre.length-1){
                    parametrs += `${val}`
                } else{
                    parametrs += `${val},`
                }
                return parametrs;
            })
        }
        if(moviesForm.artists.length > 0){
            parametrs += "&artists="
            moviesForm.artists.map((val, index) => {
                if(index===moviesForm.artists.length-1){
                    parametrs += `${val}`
                } else{
                    parametrs += `${val},`
                }
                return parametrs;
            })
        }
        if(moviesForm.releaseDateStart !== ""){
            parametrs += `&start_date=${moviesForm.releaseDateStart}`
        }
        if(moviesForm.releaseDateEnd !== ""){
            parametrs += `&end_date=${moviesForm.releaseDateEnd}`
        }
        setParams(parametrs);
        console.log(parametrs);
    }

    useEffect(()=>{
        getMovies();
    }, [params]);


    async function getMovies(){
        const rawResponse = await fetch(`http://localhost:8085/api/v1/movies?page=1&limit=100&status=RELEASED${params}`, {
            method:"GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            }
        });
        const result = await rawResponse.json();
        setMovies(result.movies);
    }

    const clickHandler = (movie) =>{
        console.log(movie)
    }


    return (
        <div className="released-movies-with-filters-container">
            <div className="released-movies-container">
                <GridList cellHeight={350} cols={4}  className={classes.gridListTile}>
                    {movies.map(movie=>{
                        const releaseDate = new Date(movie.release_date);
                        return(
                            <GridListTile key={movie.id} onClick={(movie) => clickHandler(movie)} className={classes.gridListTile}>
                                    <Link to={`/movie/${movie.id}`}>
                                      <div>
                                        <img alt="" src={movie.poster_url} key={movie.title} className="released-movies-image"/>
                                      </div>
                                    </Link>
                                <GridListTileBar title={movie.title} subtitle={`Release Date: ${Intl.DateTimeFormat('default', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: '2-digit',
                                    year: 'numeric'
                                    }).format(releaseDate)}`}/>
                            </GridListTile>
                        );
                    })}
                </GridList>
            </div>
            <div className="filters-container">
                <MoviesForm onFormSubmit={(moviesForm) => onFormSubmitHandler(moviesForm)}></MoviesForm>
            </div>
        </div>
    )
}

export default MoviesGrid
