import React from 'react'
import Header from '../../common/header/Header'
import { useEffect, useState } from 'react'
import "./Details.css";
import { Typography } from '@material-ui/core';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { StarBorder } from '@material-ui/icons';
import YouTube from 'react-youtube';
import Rating from "@material-ui/lab/Rating";
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import LoginModal from '../../components/LoginModal';




function Details(props) {
    const {id} = props.match.params
    const [movieDetails, setMovideDetails] = useState({});
    const [artists, setArtists]  =useState([]);  
    const [genres, setGenres] = useState([]); 
    const [videoId, setVideoId] = useState("");
    const [stars, setStars] = useState([]);
    const accessToken = useSelector(state=> state.accessToken);

    //Modal Variables
    const [showModal, setModal] = useState(false);
    const handleOpen = () => setModal(true);
    const handleClose = () => setModal(false);
   

    //Tab Variables
    const [tabValue, setTabValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };

    const opts={
        width: '100%'
    }

    async function getMovieDetails(){
        const rawResponse = await fetch(`http://localhost:8085/api/v1/movies/${id}`);
        const result = await rawResponse.json();
        console.log(result);
        if(result.artists !== null && result.artists.length > 0) {
            setArtists(result.artists);
        }
        setGenres(result.genres)
        setVideoId(result.trailer_url.split("?v=")[1])
        console.log(result.trailer_url)
        setMovideDetails(result);
    }

    useEffect(()=>{
        getMovieDetails()
    },[]);

    const onClickBookShow = () => {
        if(accessToken===null || accessToken.length===0 ){
            handleOpen();
        } else{
            props.history.push({
                pathname: `/bookshow/${movieDetails.id}`,
            });
        }
      
    }
 
    return (
        <div>
            <Header>
                <Button variant="contained" size="small" color="primary" onClick={onClickBookShow} style={{marginRight: 10}}>
                    Book Show
                </Button>
            </Header>
            <LoginModal showModal={showModal}  handleClose={handleClose} tabValue={tabValue} handleChange={ handleChange}></LoginModal>
            <div className="nav-container">
              <Link to="/" style={{textDecoration: 'none', color: '#111'}}>
                <Typography>{"<"} Back to Home</Typography>
              </Link>
            </div>
            <div className="details-page-container">
                <div className="left-container">
                    <img alt="" src={movieDetails.poster_url}/>
                </div>
                <div className="middle-container">
                    <Typography variant="headline" component="h2">{movieDetails.title}</Typography>
                    <div style={{display: 'flex'}}>
                        <Typography style={{fontWeight: 'bold'}}>
                            Genre: &nbsp;
                        </Typography>
                        { 
                          genres.length > 0 
                          ? genres.map((genre, index) => {
                            if(index===genres.length-1){
                                return <Typography>{genre}</Typography>
                            } else {
                                return <Typography>{genre + ", "}</Typography>
                            }
                            }) 
                          : <Typography>Not found</Typography>
                        }
                    </div>
                    <div style={{display: 'flex'}}>
                        <Typography style={{fontWeight: 'bold'}}>
                            Duration: &nbsp;
                        </Typography>
                        <Typography>
                            {movieDetails.duration}
                        </Typography>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Typography style={{fontWeight: 'bold'}}>
                            Release Date: &nbsp;
                        </Typography>
                        <Typography>
                            {movieDetails.release_date}
                        </Typography>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Typography style={{fontWeight: 'bold'}}>
                            Rating: &nbsp;
                        </Typography> 
                        <Typography>
                            {movieDetails.rating}
                        </Typography>
                    </div>
                    <Typography style={{marginTop: 16}}>
                       <span style={{fontWeight: 'bold'}}>
                           Plot: 
                       </span>&nbsp;
                       <a href={movieDetails.wiki_url} target="_blank">(Wiki Link)</a>&nbsp;
                       <span>
                           {movieDetails.storyline}
                       </span>
                    </Typography>
                    <Typography style={{fontWeight: 'bold', marginTop: 16}}>
                       Trailer: 
                    </Typography>
                    <YouTube videoId={videoId} opts={opts}/> 
                </div>
                <div className="right-container">
                    <Typography style={{fontWeight: 'bold', marginTop: 16}}>
                       Rate this movie: 
                    </Typography>
                    <Rating
                        name="simple-controlled"
                        value={stars}
                        onChange={(event, newValue) => {
                            setStars(newValue);
                        }}
                        icon={<StarBorder />}
                    />
                    <Typography style={{fontWeight: 'bold', marginTop: 16, marginBottom: 16}}>
                       Artists: 
                    </Typography>
                    <GridList cols={2}>
                        {
                            artists.length > 0 
                            ? artists.map(artist => {
                                return(
                                    <GridListTile key={artist.id}>
                                        <img alt="" src={artist.profile_url} />
                                        <GridListTileBar title={artist.first_name + " " + artist.last_name} />
                                    </GridListTile>
                                )
                            }) 
                            : <Typography>Not Found</Typography>
                        }
                    </GridList>
                </div>
            </div>
        </div>
    )
}

export default Details
