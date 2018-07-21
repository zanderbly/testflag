import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MyLocationIcon from '@material-ui/icons/MyLocation';

const styles = theme => ({

    root: {

      width: '100%',
      maxWidth: 150,
      backgroundColor: 'transparent',
      fontSize: 0,

    },
  });

class LocationSwitch extends React.Component {
    state = {
      checked: ['Location'],
    };
  
    handleToggle = value => () => {
      const { checked } = this.state;
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      this.setState({
        checked: newChecked,
      });
    };
  
    render() {
      const { classes } = this.props;
  
      return (
        <div className={classes.root}>
        
          <ListItem >
            <ListItemIcon>
              <MyLocationIcon style={{fontSize:'30px'}}/>
            </ListItemIcon>
            <ListItemText />
            <ListItemSecondaryAction>
              <Switch
                color='primary'
                onChange={this.handleToggle('Location')}
                checked={this.state.checked.indexOf('Location') !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>

      </div>
    );
  }
}
  
  LocationSwitch.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(LocationSwitch);