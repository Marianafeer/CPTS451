import React from 'react';
import ReactDOM from 'react-dom';
import Template from './Template';
import MultiSelect from "react-multi-select-component";
import Paper from '@material-ui/core/Paper';

//header menu
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//tabs
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


// these were from the Create React App script
import logo from './logo.svg';
import './App.css';

// bootstrap includes 
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormCheck from 'react-bootstrap/FormCheck';
import { TableSortLabel } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false, modalStateIGuess: "", states: [], cities: [], zipcodes: [], categories: [], businesses: [], names: [], userids: [], userinfo: [], favoriteBusinesses: [], friends: [], latesttips: [], favbusiness: [], businessInfo: [], allcategories: [], allreviews: [], getCategories: [], getReviews: [], businesstimes: [],
      selectedState: "", selectedCity: "", selectedZipCode: "", selectedCategory: "", selectedBusiness: "", selectedBusinessID: "", selectedAddress: "",  selectedStars: "" , selectedNumCheckins: "", selectedReviewRating: "" , selectedUserid: "",  sCount: "", cCount: "", zcCount: "", cacCount: "", 
      //user info
      selectedName: ""
    };

    this.bName = React.createRef();
    this.biName = React.createRef();
    this.cName = React.createRef();
    this.sName = React.createRef();
    this.zcName = React.createRef();
    this.sCount = React.createRef();
    this.cCount = React.createRef();
    this.zcCount = React.createRef();
    this.cacCount = React.createRef();

    //user info
    this.nName = React.createRef();
    this.uName = React.createRef();


  }

  showModal = () => this.setState({ modalIsOpen: true });
  hideModal = () => this.setState({ modalIsOpen: false });

  
  componentDidMount() {
    fetch("http://localhost:3030/state")
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let statesFromApi = data.map(state => {
          return { value: state.state, display: state.state }
        });
        this.setState({
          states: [{ value: '', display: 'Select A State' }].concat(statesFromApi),
          businesses: []
        });


      }).catch(error => {
        console.log(error);
      });


      fetch("http://localhost:3030/name")
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let namesFromApi = data.map(name => {
          return { value: name.name, display: name.name }
        });
        this.setState({
          names: [{ value: '', display: 'Select Name' }].concat(namesFromApi)
        });
      }).catch(error => {
        console.log(error);
      });


  }

  updateCities = (e) => {
    this.setState({ selectedState: e.target.value })
    fetch("http://localhost:3030/city/" + e.target.value)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let citiesFromApi = data.map(city => {
          return { value: city.city, display: city.city }
        });
        this.setState({
          cities: [{ value: '', display: 'Select A City' }].concat(citiesFromApi),
          businesses: [],
          zipcodes: []
        });
      }).catch(error => {
        console.log(error);
      });
  }


  //getting the zipcodes 
  updateZipcode = (e) => {
    this.setState({ selectedCity: e.target.value })
    fetch("http://localhost:3030/zipcode/" + e.target.value)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let zipcodeFromApi = data.map(zipcode => {
          return { value: zipcode.zipcode, display: zipcode.zipcode }
        });
        this.setState({
          zipcodes: [{ value: '', display: 'Select A ZipCode' }].concat(zipcodeFromApi),
          businesses: [],
        });
      }).catch(error => {
        console.log(error);
      });
  }

  updateCategory = (e) => {
    this.setState({ selectedZipCode: e.target.value })
    fetch("http://localhost:3030/category/" + e.target.value)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let categoriesFromApi = data.map(category => {
          return { value: category.category, display: category.category }
        });
        this.setState({
          categories: [{ value: '', display: 'Select A Category' }].concat(categoriesFromApi),
          businesses: [],
        });
      }).catch(error => {
        console.log(error);
      });
  }

  //getting the businesses in zipcode and category selected and All the business info.
  updateTable = (e) => {
    this.setState({ selectedCategory: e.target.value })
    fetch("http://localhost:3030/business/" + this.state.selectedZipCode + "/" + e.target.value)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let businessFromApi = data.map(business => {
          return { name: business.name, businessid: business.businessid, baddress: business.address, stars: business.stars,
          num_checkins: business.num_checkins, reviewrating: business.reviewrating}
        });
        this.setState({
          businesses: businessFromApi,
          businessInfo: [{ value: '', businessid: 'Select A BusinessID' }].concat(businessFromApi)
        });
      }).catch(error => {
        console.log(error);
      });

  }



  //get businessInfo
  updateBusinessInfoTable = (e) => {
    this.setState({ selectedBusinessID: e.target.value })
    fetch("http://localhost:3030/getcategories/" + e.target.value  )
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let allbusinessInfoFromApi = data.map(category=> {
          return { bcategory: category.category}
        });
        this.setState({
          //businessInfo: [{ value: '', businessid: 'Select A BusinessID' }].concat(businessInfoFromApi)
          allcategories: allbusinessInfoFromApi
        });
      }).catch(error => {
        console.log(error);
      });

      fetch("http://localhost:3030/getTime/" + e.target.value  )
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let businessTimesInfoFromApi = data.map(hours=> {
          return { opentime: hours.opentime, closetime: hours.closetime }
        });
        this.setState({
          //businessInfo: [{ value: '', businessid: 'Select A BusinessID' }].concat(businessInfoFromApi)
          businesstimes: businessTimesInfoFromApi
        });
      }).catch(error => {
        console.log(error);
      });

      fetch("http://localhost:3030/reviews/" + e.target.value  )
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let allreviewsFromApi = data.map(review=> {
          return { textreview: review.textreview, stars: review.stars, datereviewed: review.datereviewed}
        });
        this.setState({
          //businessInfo: [{ value: '', businessid: 'Select A BusinessID' }].concat(businessInfoFromApi)
          allreviews: allreviewsFromApi
        });
      }).catch(error => {
        console.log(error);
      });



  }
/*
//get business categories
getBusinessCategories = (e) => {
  this.setState({ selectedBusinessID: e.target.value })
  fetch("http://localhost:3030/getCategories/" + e.target.value)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let getCategoriesFromApi = data.map(category => {
        return {category: category.category}
      });
      this.setState({
        getCategories: getCategoriesFromApi
      });
    }).catch(error => {
      console.log(error);
    });
}
*/
/*
getbusinessReview = (e) => {
  this.setState({ selectedBusinessID: e.target.value })
  fetch("http://localhost:3030/reviews/" + e.target.value)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let getreviewsFromApi = data.map(review => {
        return {stars: review.stars}
      });
      this.setState({
        getReviews: getreviewsFromApi
      });
    }).catch(error => {
      console.log(error);
    });
}*/

  //user info
  updateUserid = (e) => {
    this.setState({ selectedName: e.target.value })
    fetch("http://localhost:3030/userid/" + e.target.value)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let useridFromApi = data.map(userid => {
          return { value: userid.userid, display: userid.userid }
        });
        this.setState({
          userids: [{ value: '', display: 'Select Your userID' }].concat(useridFromApi),
        });
      }).catch(error => {
        console.log(error);
      });
  }

  updateUserInfo = (e) => {
    this.setState({ selectedUserid: e.target.value })
    fetch("http://localhost:3030/userinfo/" + e.target.value)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let numFansFromApi = data.map(usertable => {
          return {name: usertable.name, fans: usertable.nfans, avgstars: usertable.avgstars, datejoined: usertable.datejoined,
          longitude: usertable.longitude, latitude: usertable.latitude, cool: usertable.cool, funny: usertable.funny, useful: usertable.useful }
        });
        this.setState({
          userinfo: numFansFromApi
        });
      }).catch(error => {
        console.log(error);
      });

      fetch("http://localhost:3030/favoriteBusinesses/" + e.target.value)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let favBusinessFromApi = data.map(business => {
          return { name: business.name, avgStarRating: business.reviewrating, city: business.city, zipcode: business.zipcode, address: business.address}
        });
        this.setState({
          favoriteBusinesses: favBusinessFromApi
        });
      }).catch(error => {
        console.log(error);
      });

      fetch("http://localhost:3030/friends/" + e.target.value)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let friendsFromApi = data.map(friend => {
          return { name: friend.name, avgstars: friend.avgstars, datejoined: friend.datejoined }
        });
        this.setState({
          friends: friendsFromApi
        });
      }).catch(error => {
        console.log(error);
      });

      fetch("http://localhost:3030/latesttips/" + e.target.value)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let latesttipsFromApi = data.map(review => {
          return { textreview: review.textreview }
        });
        this.setState({
          latesttips: latesttipsFromApi
        });
      }).catch(error => {
        console.log(error);
      });

  }


  //save users favorite business
  saveBusiness = (e) => {
    fetch("http://localhost:3030/favbusiness/" + this.state.selectedUserid + "/" + this.state.selectedBusiness, {
    method: 'POST',
    body: JSON.stringify(e.data), // this should be the data that you want to post
    })  
    .then(data => {
      let FavBusinessToApi = data.map(favorite => {
        return { value: favorite.userid}
      });
      this.setState({
        favbusiness: FavBusinessToApi
      });
    }).catch(error => {
      console.log(error);
    });
  }
  

  fetchStateCount = () => {
    fetch("http://localhost:3030/count/state/" + this.state.selectedState)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      this.setState ({
        sCount: data[0].count
      });
    }).catch(error => {
      console.log(error)
    })
  }

  fetchCityCount = () => {
    fetch("http://localhost:3030/count/city/" + this.state.selectedCity)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      this.setState ({
        cCount: data[0].count
      })
    }).catch(error => {
      console.log(error)
    })
  }

  fetchZipCodeCount = () => {
    fetch("http://localhost:3030/count/zipcode/" + this.state.selectedZipCode)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      this.setState ({
        zcCount: data[0].count
      })
    }).catch(error => {
      console.log(error)
    })
  }

  fetchCategoryCount = () => {
    fetch("http://localhost:3030/count/category/" + this.state.selectedCategory)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      this.setState ({
        cacCount: data[0].count
      })
    }).catch(error => {
      console.log(error)
    })
  }


  updateModal = (name, businessid, address, stars , num_checkins, reviewrating) => {
    this.setState({ selectedBusiness: name, selectedBusinessID: businessid, selectedAddress: address,
    selectedStars: stars, selectedNumCheckins: num_checkins, selectedReviewRating: reviewrating  });

    this.fetchStateCount();
    this.fetchCityCount();
    this.fetchZipCodeCount();
    this.fetchCategoryCount();
    this.showModal();
  }

  render() {
    return (
      <div className="App">  
        <header>
          <div className="logo-container">
          <img className="logoImg" src={logo} alt="logo" />
          <h2 className="logo">PERN</h2>
          </div>
        </header> 


      <Tabs style={{ float: "none", textAlign: "left", marginTop: "20px" }}>
        <TabList>
          <Tab > Business Search </Tab>
          <Tab>User Information </Tab>
        </TabList>

        {/*Business Search Tab */}
        <TabPanel>
        <div className="body">
          
        <div className= "selectState">        
          <Form>
          <Form.Label>Business Search</Form.Label>
            <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <div classname= "showStates">
              <Form.Label >State</Form.Label>
              <Form.Control as="select" value={this.state.selectedState} onChange={this.updateCities}>
                {this.state.states.map((state) => <option key={state.value} value={state.value}>{state.display}</option>)}
              </Form.Control>
              </div>
            </Form.Group>
            </Form>

            <Form>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>City</Form.Label>
              <Form.Control as="select" value={this.state.selectedCity} onChange={this.updateZipcode}>
                {this.state.cities.map((city) => <option key={city.value} value={city.value}>{city.display}</option>)}
              </Form.Control>
            </Form.Group>
            </Form>

            <Form>
            <Form.Group controlId="exampleForm.ControlSelect3">
              <Form.Label>ZipCode</Form.Label>
              <Form.Control as="select" value={this.state.selectedZipCode} onChange={this.updateCategory}>
                {this.state.zipcodes.map((zipcode) => <option key={zipcode.value} value={zipcode.value}> {zipcode.display } </option>)}
              </Form.Control>
            </Form.Group>
            </Form>


            <Form.Group controlId="exampleForm.ControlSelect4">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" value={this.state.selectedCategory} onChange={this.updateTable}>
                {this.state.categories.map((category) => <option key={category.value} value={category.value}> {category.display } </option>)}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect4">
              <Form.Label>BusinessID</Form.Label>
              <Form.Control as="select" value={this.state.selectedBusinessID} onChange={this.updateBusinessInfoTable}>
                {this.state.businessInfo.map((business) => <option key={business.businessid} value={business.businessid}> {business.businessid} </option>)}
              </Form.Control>
            </Form.Group>

          </Form>
        </div>

        <div className="Table">
        <Table striped bordered hover id="dataTable">
          <thead>
            <tr>
              <th>Business Name</th>
              <th>BusinessID</th>
              <th>State</th>
              <th>City</th>
              <th>zipcode</th>
            </tr>
          </thead>
          <tbody>
            {this.state.businesses.map((business) => <tr key={business.name} value={business.name}>
              <td onClick={() => this.updateModal(business.name, business.businessid, business.baddress, business.stars, business.num_checkins, business.reviewrating)}>{business.name}</td>
              <td> {business.businessid}</td>
              <td>{this.state.selectedState}</td>
              <td>{this.state.selectedCity}</td>
              <td>{this.state.selectedZipCode}</td>
              </tr>)}
              
          </tbody>
        </Table>
        </div>        

        <div className="TableInfo">     
          <Table striped bordered hover id="dataTable">
            <tbody>
          
              <th>Categories:</th>
              {this.state.allcategories.map((category) =>
              <tr key={category.bcategory} value={category.bcategory}>
                <td>{category.bcategory}</td>
              </tr>)}

              {this.state.businesstimes.map((hours) =>
             <tr key={hours.opentime} value={hours.closetime}>
                <th>Open Time:</th>
                <td>{hours.opentime}</td>
              </tr>)}

              {this.state.businesstimes.map((hours) =>
             <tr key={hours.opentime} value={hours.closetime}>
                <th>Close Time:</th>
                <td>{hours.closetime}</td>
              </tr>)}


            </tbody>
          </Table>
        </div>


        <div className="TableInfo">     
          <Table striped bordered hover id="dataTable">
            <tbody>
          
            <th>Reviews:</th>
            {this.state.allreviews.map((review) =>
             <tr key={review.textreview} value={review.textreview}>
                <td>{review.textreview}</td>
              </tr>)}

            <th>Stars:</th>
            {this.state.allreviews.map((review) =>
             <tr key={review.textreview} value={review.textreview}>
                <td>{review.stars}</td>
              </tr>)}
            
            <th>Date Reviewed:</th>
            {this.state.allreviews.map((review) =>
             <tr key={review.textreview} value={review.textreview}>
                <td>{review.datereviewed}</td>
              </tr>)}
            </tbody>
          </Table>
        </div>

      

        </div>
        <div className= "BusinessModal"> 
        <Modal show={this.state.modalIsOpen} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.selectedBusiness}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modalBody">
              <div id="bName">Name: {this.state.selectedBusiness}</div>
              <div id = "biName">BusinessID: {this.state.selectedBusinessID} </div>
              <div id="zcName" > Address: {this.state.selectedAddress} </div>
              <div> Stars: {this.state.selectedStars}</div>
              <div> Num Checking: {this.state.selectedNumCheckins}</div>
              <div> Review Rating: {this.state.selectedReviewRating}</div>
              <br></br>
              <div id="cCount">Businesses in City: {this.state.cCount}</div>
              <div id="sCount">Businesses in State: {this.state.sCount}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hidemodal}>
              Close
            </Button>
            <Button variant= "primary" onClick={this.state.saveBusiness}>
              Mark as Favorite
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
        </TabPanel>


        {/*User Information Tab */}
        <TabPanel>
        <div className="bodyUser">
        
        <div className = "selectUser">
          <Form>

            <Form.Label>User Information</Form.Label>
            {/*
            <Form>
              <Form.Control type ="input" placeholder="Enter your Name" >

              </Form.Control>
            </Form>*/}

            <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <div classname= "showStates">
              <Form.Label>Name</Form.Label>
              <Form.Control as="select" value={this.state.selectedName} onChange={this.updateUserid}>
                {this.state.names.map((name) => <option key={name.value} value={name.value}>{name.display}</option>)}
              </Form.Control>
              
              </div>
            </Form.Group>
            </Form>

            <Form>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>UserID</Form.Label>
              <Form.Control as="select" value={this.state.selectedUserid} onChange={this.updateUserInfo}>
                {this.state.userids.map((userid) => <option key={userid.value} value={userid.value}>{userid.display}</option>)}
              </Form.Control>
            </Form.Group>
            </Form>
          </Form>
        </div>


        <div className="UserTable">

          <Table striped bordered hover id="dataTable">
            <tbody>
              {this.state.userinfo.map((usertable) => 
              <tr key={usertable.value} value={usertable.value}>
                <th>Name:</th>
                <td>{usertable.name}</td>
              </tr>)}

              <tr><th>UserID</th><td>{this.state.selectedUserid}</td></tr>
              {this.state.userinfo.map((usertable) => 
              <tr key={usertable.value} value={usertable.value}>
                <th>Number Fans:</th>
                <td>{usertable.fans}</td>
              </tr>)}

              {this.state.userinfo.map((usertable) => 
              <tr key={usertable.value} value={usertable.value}>
                <th>Average Stars:</th>
                <td>{usertable.avgstars}</td>
              </tr>)}

              {this.state.userinfo.map((usertable) => 
              <tr key={usertable.value} value={usertable.value}>
                <th>Date Joined:</th>
                <td>{usertable.datejoined}</td>
              </tr>)}

              {this.state.userinfo.map((usertable) => 
              <tr key={usertable.value} value={usertable.value}>
                <th>Latitude:</th>
                <td>{usertable.latitude}</td>
              </tr>)}

              {this.state.userinfo.map((usertable) => 
              <tr key={usertable.value} value={usertable.value}>
                <th>Longitude:</th>
                <td>{usertable.longitude}</td>
              </tr>)}

            </tbody>
            </Table>

            <div classname = "UserTableVotes">
            <label textAlign = "center">User's Votes</label>
            <Table striped bordered hover id="dataTable">
            <tbody>
              {this.state.userinfo.map((usertable) => 
              <tr key={usertable.value} value={usertable.value}>
                <th>Cool:</th>
                <td>{usertable.cool}</td>
              </tr>)}

              {this.state.userinfo.map((usertable) => 
              <tr key={usertable.value} value={usertable.value}>
                <th>Funny:</th>
                <td>{usertable.funny}</td>
              </tr>)}

              {this.state.userinfo.map((usertable) => 
              <tr key={usertable.value} value={usertable.value}>
                <th>Useful:</th>
                <td>{usertable.useful}</td>
              </tr>)}

            </tbody>
      </Table>
      </div>

            

        </div>

      


        <div className="TableFriend">
        <label>User's Favorite Businesses </label>
        <Table striped bordered hover id="dataTable">
          <thead>
            <tr>
              <th>Business Name</th>
              <th>Avg Star Rating</th>
              <th>City</th>
              <th>Zipcode</th>
              <th>Address</th>
              <th>UnFav</th>
            </tr>
          </thead>
          <tbody>
            {this.state.favoriteBusinesses.map((business) => <tr key={business.name} value={business.name}>
              <td>{business.name}</td>
              <td>{business.avgStarRating}</td>
              <td>{business.city}</td>
              <td>{business.zipcode}</td>
              <td>{business.address}</td>
              <td><Button variant="secondary" onClick={this.hideModal}>
              UnFav
            </Button></td>
             
            </tr>)}
          </tbody>
        </Table>
        </div>

        <div className="TableFriend">
        <label>User's Friends </label>
        <Table striped bordered hover id="dataTable">
          <thead>
            <tr>
              <th>Friend's Name</th>
              <th>Star rating</th>
              <th>Date Joined</th>
              <th>Lastest Review</th>
            </tr>
          </thead>
          <tbody>
            {this.state.friends.map((friend) => <tr key={friend.name} value={friend.name}>
              <td>{friend.name}</td>
              <td>{friend.avgstars}</td>
              <td>{friend.datejoined}</td>
              {this.state.latesttips.map((review) => <tr key={review.textreview} value={review.textreview}>
              <td>{review.textreview}</td>
            </tr>)}
            </tr>)}

          </tbody>
        </Table>
        </div>

        </div>


        </TabPanel>


      </Tabs>
      </div>


    );
  }
}

export default App;