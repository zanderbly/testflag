import React, { Component } from 'react';
// import {FormGroup, Form, Button, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import {Grid, Col, Row} from 'react-bootstrap';
import './newLogin.css';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import green from '@material-ui/core/colors/yellow'
import Button from '@material-ui/core/Button';
import API from "../../utils/API"
import LocationSwitch from '../../components/LocationSwitch';



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: green[500],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: green[500],
    },
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,   
  },
  button: {
    margin: theme.spacing.unit,
    fontSize:15,
    minWidth: 143,
  },
  input: {
    display: 'none',
  },
  
});

class User1 extends Component {
  
    state = {
      email: "",
      password: "",
    };
    
     handleInputChange = e => {
      this.setState({ [e.target.name] : e.target.value });
     };

     handleFormRegister = event => {
       event.preventDefault();
      if (this.state.email && this.state.password) {
      API.createUser({
        email: this.state.email,
        password: this.state.password,
        teams: [],
        coordinates: []
      })     
      //sets local storage to not ask for pw again
      .then(data => localStorage.setItem('isLoggedIn', true))
      //saves user email to local storage for use in map view
       .then(data => localStorage.setItem('userNow', this.state.email))
       .catch(err => Window.alert(err))
      //changes page to choose teams
      .then(window.location.assign('/TeamChooser'));
      //needs alerts for errors - email/password too short, email duplicate 
    }    
  
};




  handleFormLogIn = event => {
    event.preventDefault();
    //checks if there's an email and password entered
    if (this.state.email && this.state.password) {
      //checks the users DB to see if there's an email on record
    API.getUsers({
      email: this.state.email,
      password: this.state.password
    })
    .then(res => this.findOne({ email: this.state.email }, function(err, user) {
      if (user && user.password === this.body.password) {
        console.log('user and password are correct')
        //saves user email to local storage for use in map view
        .then(localStorage.setItem('userNow', this.state.email))
        //sets local storage to not ask for pw again
        .then(localStorage.setItem('isLoggedIn', true))
        //changes page to mapview
        .then(window.location.assign('/MapView'))
      .catch(err => console.warn(err)
       )
     }
    }))
  }
};


     
     render() {
       const { classes } = this.props;
        return (
          <div className='form'>
           {/* <Wrapper> */}
              <Grid>
                <Row className='email'>
                  <Col lg={12} xs={12}>
                    <FormControl className={classes.textField} >
                      <InputLabel htmlFor="email-simple" style={{ fontSize: '20px', fontFamily: 'Raleway'}}>Email</InputLabel>
                        <Input style={{padding: '0px 0px 5px'}}
                         className={classes.textField}
                         name='email'
                         value={this.state.email}
                         onChange={this.handleInputChange.bind(this)}
                          />
                    </FormControl>
                  </Col>
                </Row>
                <Row className='password'>
                  <Col lg={12} xs={12}>
                    <FormControl className={classes.textField} >
                      <InputLabel htmlFor="password-simple"   style={{fontSize: '20px', fontFamily: 'Raleway' }}>Password</InputLabel>
                        <Input style={{padding: '0px 0px 5px'}}
                         className={classes.textField}
                         type='password'                         
                         name='password'
                         value={this.state.password}
                         onChange={this.handleInputChange.bind(this)}
                          />
                    </FormControl>
                  </Col>
                </Row>
                <div className='but'>
                 <Row>
                  <Col md={12} xs={12}>
                    <Button variant='contained' color="primary" style={{fontFamily: 'Raleway'}}className={classes.button} onClick={this.handleFormLogIn.bind(this)} >
                      Login
                    </Button>
                    <Button variant="contained" color="default" style={{fontFamily: 'Raleway'}} className={classes.button} onClick={this.handleFormRegister.bind(this)} >
                      Register
                    </Button>
                  </Col>
                </Row>
              </div>
            </Grid>
          </div>              
        )
    }
}
    
export default withStyles(styles)(User1);

// export default User1;