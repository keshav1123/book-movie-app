import React, {useState} from 'react'
import Header from '../../common/header/Header';
import LoginModal from '../../components/LoginModal';
import "./Home.css";
import UpcomingMovies from '../../components/UpcomingMovies';
import MoviesGrid from '../../components/MoviesGrid';


  

function Home(props) {
    //Modal Variables
    const [showModal, setModal] = useState(false);
    const handleOpen = () => setModal(true);
    const handleClose = () => setModal(false);
   

    //Tab Variables
    const [tabValue, setTabValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };



    return (
        <div>
            <Header baseUrl="/" onClickLogin={handleOpen}/>
            <div className="login-register-modal-container">
              <LoginModal showModal={showModal}  handleClose={handleClose} tabValue={tabValue} handleChange={ handleChange}></LoginModal>
            </div>
            <UpcomingMovies/>
            <MoviesGrid/>
        </div>
    )
}



export default Home
