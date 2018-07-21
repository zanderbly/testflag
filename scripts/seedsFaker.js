const mongoose = require('mongoose');
const db = require('../models');
const faker = require('faker');

//const minUsers = 200;
const usersToAdd = 15000;

const newUsers = [];

const teamArray = [
  "Baltimore Orioles",
  "Boston Red Sox",
  "New York Yankees",
  "Tampa Bay Rays",
  "Toronto Blue Jays",
  "Chicago White Sox",
  "Cleveland Indians",
  "Detroit Tigers",
  "Kansas City Royals",
  "Minnesota Twins",
  "Houston Astros",
  "Los Angeles Angels",
  "Oakland Athletics",
  "Seattle Mariners",
  "Texas Rangers",
  "Atlanta Braves",
  "Miami Marlins",
  "New York Mets",
  "Philadelphia Phillies",
  "Washington Nationals",
  "Chicago Cubs",
  "Cincinnati Reds",
  "Milwaukee Brewers",
  "Pittsburgh Pirates",
  "St. Louis Cardinals",
  "Arizona Diamondbacks",
  "Colorado Rockies",
  "Los Angeles Dodgers",
  "San Diego Padres",
  "San Francisco Giants",
  "Buffalo Bills",
  "Miami Dolphins",
  "New England Patriots",
  "New York Jets",
  "Baltimore Ravens",
  "Cincinnati Bengals",
  "Cleveland Browns",
  "Pittsburgh Steelers",
  "Houston Texans",
  "Indianapolis Colts",
  "Jacksonville Jaguars",
  "Tennessee Titans",
  "Denver Broncos",
  "Kansas City Chiefs",
  "Los Angeles Chargers",
  "Oakland Raiders",
  "Dallas Cowboys",
  "New York Giants",
  "Philadelphia Eagles",
  "Washington Redskins",
  "Chicago Bears",
  "Detroit Lions",
  "Green Bay Packers",
  "Minnesota Vikings",
  "Atlanta Falcons",
  "Carolina Panthers",
  "New Orleans Saints",
  "Tampa Bay Buccaneers",
  "Arizona Cardinals",
  "Los Angeles Rams",
  "San Francisco 49ers",
  "Seattle Seahawks",
  "Boston Celtics",
  "Brooklyn Nets",
  "New York Knicks",
  "Philadelphia 76ers",
  "Toronto Raptors",
  "Chicago Bulls",
  "Cleveland Cavaliers",
  "Detroit Pistons",
  "Indiana Pacers",
  "Milwaukee Bucks",
  "Atlanta Hawks",
  "Charlotte Hornets",
  "Miami Heat",
  "Orlando Magic",
  "Washington Wizards",
  "Denver Nuggets",
  "Minnesota Timberwolves",
  "Oklahoma City Thunder",
  "Portland Trail Blazers",
  "Utah Jazz",
  "Golden State Warriors",
  "Los Angeles Clippers",
  "Los Angeles Lakers",
  "Phoenix Suns",
  "Sacramento Kings",
  "Dallas Mavericks",
  "Houston Rockets",
  "Memphis Grizzlies",
  "New Orleans Pelicans",
  "San Antonio Spurs",
  "Atlanta United FC",
  "Chicago Fire",
  "Columbus Crew SC",
  "D.C. United",
  "Montreal Impact",
  "New England Revolution",
  "New York City FC",
  "New York Red Bulls",
  "Orlando City SC",
  "Philadelphia Union",
  "Toronto FC",
  "Colorado Rapids",
  "FC Dallas",
  "Houston Dynamo",
  "LA Galaxy",
  "Los Angeles FC",
  "Minnesota United FC",
  "Portland Timbers",
  "Real Salt Lake",
  "San Jose Earthquakes",
  "Seattle Sounders FC",
  "Sporting Kansas City",
  "Vancouver Whitecaps FC",
  "Boston Bruins",
  "Buffalo Sabres",
  "Detroit Red Wings",
  "Florida Panthers",
  "Montreal Canadiens",
  "Ottawa Senators",
  "Tampa Bay Lightning",
  "Toronto Maple Leafs",
  "Carolina Hurricanes",
  "Columbus Blue Jackets",
  "New Jersey Devils",
  "New York Islanders",
  "New York Rangers",
  "Philadelphia Flyers",
  "Pittsburgh Penguins",
  "Washington Capitals",
  "Chicago Blackhawks",
  "Colorado Avalanche",
  "Dallas Stars",
  "Minnesota Wild",
  "Nashville Predators",
  "St. Louis Blues",
  "Winnipeg Jets",
  "Anaheim Ducks",
  "Arizona Coyotes",
  "Calgary Flames",
  "Edmonton Oilers",
  "Los Angeles Kings",
  "San Jose Sharks",
  "Vancouver Canucks",
  "Vegas Golden Knights",
  ];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fyf_db');
mongoose.connection
  .once('open', () => {
    console.log('connected to userDB');
  })
  .on('error', err => {
    console.warn('warning', err);
  })
  .then(
      createUsers() 
  );

    db.User.remove({}, function(err){
      console.log('collection removed');
      })
      .then(() => db.User.collection.insertMany(newUsers))
      .then(data => {
        console.log(newUsers.length + ' users inserted');
        process.exit(0);
      })
      .catch(err => {
        console.warn(err);
        process.exit(1);
      });

  function createUsers() { 
    for (var i = 0; i <= usersToAdd; i++) {
      newUsers[i] = {
        email: (i+faker.internet.email()),
        password: faker.internet.password(),
        teams: [teamArray[randomTeam(0, 74)],
               teamArray[randomTeam(75, 148)]
      ],
              
        coordinates:{
          lat: randomLAT(33.39, 33.32),
          lng: randomLNG(-111.85, -111.75)          
        }
      };
  }
}
function randomLAT(max, min) {
  return Number.parseFloat((Math.random() * (max-min)) + min).toPrecision(5);
};

function randomLNG(max, min) {
  return Number.parseFloat((Math.random() * (max-min)) + min).toPrecision(6);
};

function randomTeam(min, max) {
  return ~~((Math.random() * (max-min)) + min);
};






