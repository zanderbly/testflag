import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { Col, Row } from '../../components/Grid';
//import { FormBtn } from '../../components/Form';
import API from "../../utils/API"

export class MapView extends Component {
  state = {
    users: [],
    teams: [],
    team: '',
    coordinates: [],
    userID: "1"
  };

  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      team: 'Phoenix Suns'
    };
  };

  componentDidMount() {
    this.getUsers();
    this.getTeams();
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };


  handleChange(event) {

    this.setState({team: event.target.value}, function() {

      this.getUsers();
    })

  };

  renderFans(users) {
    return users.team.map(coordinates =>
      <Marker 
      position={{ lat: coordinates.lat, lng: coordinates.lng }}
    />
    );
  }

  getUsers() {
    API.getUsersByTeam(this.state.team).then(res => {
      this.setState({ users: res.data })
    })
      .catch(err => console.log(err));
  };

  getTeams() {
    API.getTeams().then(res => {
      this.setState({ teams: res.data })
    })
      .catch(err => console.log(err));
    };

  render(user) {
    if (!this.props.google || !this.state.users) {
      return <div>Loading...</div>;
    }
    return (

      <div>
          <Map 
            google={this.props.google}
            onClick={this.onMapClick}
            initialCenter={{ lat: 33.356, lng: -111.79 }}
            zoom={14} >
            {this.state.users.map(user =>
              <Marker key={user._id} position={{ lat: user.coordinates[0].lat, lng: user.coordinates[0].lng }} />
            )}
          </Map>      
        <Row>
          <Col size="sm-4">
            {this.state.users.length ? (
              <select id='findTeam' className="mt-3" style={{ width: '100%' }} onChange={this.handleChange.bind(this)} >
                {/* make drop down menu with all team's in OP's list */}
                {this.state.teams.map(team => (
                  <option key={team._id} value={team._name} /*onClick={() => this.handleChange(team.name)} */>
                    {team.name}
                  </option>
                ))}
              </select>
            ) : (
                <h3 className="mt-2" style={{ color: 'white', textAlign: "center" }}>Choose a league </h3>
              )}
          </Col>
          <Col size="sm-8" />
        </Row>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBxQES5wS9zWkEtfsdjVPJXDxXXlH8FMzA"
})(MapView);
