import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
//import LocationOnIcon from '@material-ui/icons/LocationOn';
import './BotNav.css';


const styles = {
  root: {
    bottom: 0,
    position: 'absolute',

  },
};

class BotNav extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        style={{width:'100%', backgroundColor:'#e5e5e5' }}
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction icon={<i className="material-icons">person</i>} />
        <BottomNavigationAction icon={<FavoriteIcon />} />
        <BottomNavigationAction icon={<i className="material-icons">person_pin_circle</i>} />
      </BottomNavigation>
    );
  }
}

BotNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BotNav);