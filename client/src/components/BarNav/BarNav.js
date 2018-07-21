import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid, Row } from 'react-bootstrap';
import './BarNav.css';


const theme = createMuiTheme({
    palette: {
      primary: {
      
        main: '#e5e5e5',
        
      },
      secondary: {
        light: '#303f9f',
        main: '#303f9f',
       
        contrastText: '#ffcc00',
      },
      white: {
          main: '#ffffff'
      }
     
    },
  });

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
    fontSize: 25,
  },
  navButton: {
    fontSize: 15,
  },
    menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function BarNav(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
     <MuiThemeProvider theme={theme}>
      <AppBar position="static" color='primary'>
        <Toolbar>
         <Grid>
             <Row className='text-center'>
          <Typography variant="title" color='secondary' style={{fontFamily:'Raleway'}} className={classes.flex} >
            Fly Your Flag 
          </Typography>
          </Row>
          </Grid>
          
        </Toolbar>
      </AppBar>
      </MuiThemeProvider>
    </div>
  );
}

BarNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BarNav);