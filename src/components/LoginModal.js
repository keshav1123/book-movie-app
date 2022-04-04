import { Tabs } from "@material-ui/core";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Modal } from "@material-ui/core";
import React from "react";
import { Box } from "@material-ui/core";
import { Tab } from "@material-ui/core";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
};


export default function LoginModal({showModal, handleClose, tabValue, handleChange}){
    const TabPanel = ({children, value, index}) => {
        return(
                value===index && <div>{children}</div>
        );
    }  
    return(
        <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Tabs value={tabValue} onChange={handleChange}>
                    <Tab label="Login"/>
                    <Tab label="Register"/>
                </Tabs>
                <center>
                    <TabPanel value={tabValue} index={0} key="login-tab">
                        <LoginForm onClose={handleClose}/>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <RegisterForm/>
                    </TabPanel>
                </center>
            </Box>
        </Modal>
    );
}