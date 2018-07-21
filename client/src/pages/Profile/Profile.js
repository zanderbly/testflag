import React, { Component } from 'react';
// import Wrapper from '../../components/Wrapper'
import User1 from '../newLogin';
// import BotNav from '../../components/BotNav';

//shows user email and teams chosen, simple.

class Profile extends Component {
  state = {
    email: User1.email,
    teams: []
  }

  //probably not correct. It needs to collect the team names from the corresponding user ID
  componentDidMount() {
    // API.getTeams(this.props.match.params.id)
    //   .then(res => this.setState({ teams: res.data }))
    //   .catch(err => console.warn(err));
  }
  //change password if text entered into fields
  handleInputChange = event => {
    const { password, value } = event.target;
    this.setState({
      [password]: value
    });
  };

  render() {
    // const { classes } = this.props;
    return(
      <div>
        
      </div>
    )
  }
}

export default Profile;
   
  
      // <Wrapper>
      //   <Container fluid>
      //     <Row>
      //       <Col size="sm-4">
      //         <Jumbotron>
      //           <h2>Fly Your Flag</h2>
      //           <h4>Your teams</h4>
      //           <h4>Change your Password</h4>
      //         </Jumbotron>
      //         {this.state.teams.length ? (
      //           <List>
      //             {this.state.teams.map(team => (
      //             <ListItem key={User._id}>
      //                 <strong>
      //                 {team.name} in {team.league}
      //                 </strong>
      //               {/*<DeleteBtn onClick={() => this.deleteTeam(User._id)} /> */}
      //             </ListItem>
      //              ))}
      //           </List>
      //           ) : (
      //             <h3>No Teams Chosen</h3>
      //           )}
      //         <Form>
      //           <Input
      //             value={this.state.password}
      //             onChange={this.handleInputChange}
      //             name='password'
      //             placeholder='your password (at least 6 characters)'
      //           />
      //         </Form>
      //         <FormBtn
      //           disabled={!(this.state.password)}
      //           onClick={this.handleFormSubmit}
      //           >
      //           Reset Password
      //         </FormBtn>                
      //       </Col>
      //     </Row>
      //   </Container>
      // </Wrapper>
   
