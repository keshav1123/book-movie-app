import React, {useState, useEffect} from 'react'
import { Button, Card, CardContent, Typography } from '@material-ui/core'
import { FormControl, TextField } from '@material-ui/core'
import { Input } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";




const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 200,
        marginTop: 10,
    },
    formCard: {
        minWidth: 240,
        maxWidth: 240,
        marginTop: 30,
        marginRight: 20
    },
    formLabel: {
        color: 'theme.palette.primary.light',
        textTransform: 'uppercase'
    }
}));

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 225,
        width: 200,
        maxWidth: 200,
        marginTop: 10
      }
    },
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center"
    },
    variant: "menu"
  };

function MoviesForm({onFormSubmit}) {

    const [moviesForm, setMoviesform] = useState({
        movieName: "",
        genre: [],
        artists: [],
        releaseDateStart: "",
        releaseDateEnd: ""
    });
    const classes= useStyles();
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    async function getGenres(){
        const rawResponse = await fetch('http://localhost:8085/api/v1/genres', {
            method: "GET",
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        });
        const result = await rawResponse.json();
        setGenres(result.genres);
        console.log(result.genres)
    }

    const handleGenreChange = (event) => {
        const value = event.target.value;
        // console.log(value)
        setSelectedGenres(value);
        const state = moviesForm;
        state['genre'] = value;
        setMoviesform({...state});
    };

    const [artists, setArtists] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);

    async function getArtists(){
        const rawResponse = await fetch('http://localhost:8085/api/v1/artists', {
            method: "GET",
            headers: {
                "Accept": "application/json;charset=UTF-8"
            }
        });
        const result = await rawResponse.json();
        setArtists(result.artists);
        // console.log(result.artists)
    }

    const handleArtistChange = (e) => {
        const value = e.target.value;
        setSelectedArtists(value);
        const state = moviesForm;
        state['artists'] = value;
        setMoviesform({...state});
    }

    useEffect(() => {
        getGenres();
        getArtists();
    }, []);


    const inpuChangeHandler=(e)=>{
        const state = moviesForm;
        state[e.target.id] = e.target.value;
        setMoviesform({...state});
        console.log(state);
    }

    const handleStartDateChanged = (e) => {
        const releaseDateStart = e.target.value;
        const state = moviesForm;
        state[e.target.id] = releaseDateStart;
        setMoviesform({...state})
        console.log(state)
        //console.log(e.target.value)
    }
 
    return (
        <div className="movies-form-container">
            <Card className={classes.formCard}>
                <CardContent>
                    <Typography className={classes.formLabel}>FIND MOVIES BY:</Typography>
                    <FormControl key="input-name" className={classes.formControl}>
                        <InputLabel htmlFor="input-name-label">Movie Name</InputLabel>
                        <Input id="movieName" value={moviesForm.movieName} name="movieName" onChange={inpuChangeHandler}/>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="mutiple-select-genre-label">Genres</InputLabel>
                        <Select
                            labelId="mutiple-select-genre-label"
                            multiple
                            value={selectedGenres}
                            onChange={handleGenreChange}
                            renderValue={(selectedGenres) => selectedGenres.join(", ")}
                            MenuProps={MenuProps}
                        >
                            {genres.map((genre) => (
                            <MenuItem key={genre.id} value={genre.genre}>
                                <ListItemIcon>
                                <Checkbox checked={selectedGenres.indexOf(genre.genre) > -1} />
                                </ListItemIcon>
                                <ListItemText primary={genre.description} />
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="mutiple-select-artist-label">Artists</InputLabel>
                        <Select
                            labelId="mutiple-select-artist-label"
                            multiple
                            value={selectedArtists}
                            onChange={handleArtistChange}
                            renderValue={(selectedArtists) => selectedArtists.join(", ")}
                            MenuProps={MenuProps}
                        >
                            {artists.map((artist) => {
                            const fullName = artist.first_name + " " + artist.last_name;
                            return(
                            <MenuItem key={artist.id} value={fullName}>
                                <Checkbox checked={selectedArtists.indexOf(fullName) > -1} />
                                <ListItemText primary={fullName} />
                            </MenuItem>)
                            })}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            id="releaseDateStart"
                            label="Release Date Start"
                            type="date"
                            onChange={handleStartDateChanged}
                            // defaultValue="dd-mm-yy"
                            // className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />  
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            id="releaseDateEnd"
                            label="Release Date End"
                            type="date"
                            onChange={handleStartDateChanged}
                            // defaultValue="dd-mm-yy"
                            // className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />  
                    </FormControl><br/><br/>
                    <FormControl className={classes.formControl}>
                        <Button variant="contained" color="primary" onClick={()=>onFormSubmit(moviesForm)}>APPLY</Button>
                    </FormControl>
                </CardContent>
            </Card>
        </div>
    )
}

export default MoviesForm
