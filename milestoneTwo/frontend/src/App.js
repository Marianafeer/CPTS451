import React from 'react';
import ReactDOM from 'react-dom';
import Template from './Template';


// these were from the Create React App script
import logo from './logo.svg';
import './App.css';

// bootstrap includes 
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false, modalStateIGuess: "", states: [], cities: [], zipcodes: [], categories: [], businesses: [],
      selectedState: "", selectedCity: "", selectedZipCode: "", selectedCategory: "", selectedBusiness: "", sCount: "", cCount: "", zcCount: "", cacCount: ""
    };

    this.bName = React.createRef();
    this.cName = React.createRef();
    this.sName = React.createRef();
    this.zcName = React.createRef();
    
    this.sCount = React.createRef();
    this.cCount = React.createRef();
    this.zcCount = React.createRef();
    this.cacCount = React.createRef();


  }

  showModal = () => this.setState({ modalIsOpen: true });
  hideModal = () => this.setState({ modalIsOpen: false });



  componentDidMount() {
    fetch("http://localhost:3030/category")
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let categoriesFromApi = data.map(category => {
        return { value: category.category, display: category.category }
      });
      this.setState({
        categories: [{ value: '', display: 'Select A Category' }].concat(categoriesFromApi),
        businesses: []
      });
    }).catch(error => {
      console.log(error);
    });

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
  }
/*
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
  }*/

  

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

  //getting categories
 getCategories = (e) => {
  this.setState({ selectedZipCode: e.target.value })
    fetch("http://localhost:3030/category")
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let categoriesFromApi = data.map(category => {
          return { value: category.category, display: category.category }
        });
        this.setState({
          categories: [{ value: '', display: 'Select A Category' }].concat(categoriesFromApi),
          businesses: []
        });
      }).catch(error => {
        console.log(error);
      });
  }

  //getting the businesses 
  updateTable = (e) => {
    this.setState({ selectedZipCode: e.target.value })
    fetch("http://localhost:3030/businesses/" + e.target.value)
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let businessFromApi = data.map(business => {
          return { value: business.name }
        });
        this.setState({
          businesses: businessFromApi
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
      });
    }).catch(error => {
      console.log(error)
    })
  }

  updateModal = (name) => {
    this.setState({ selectedBusiness: name });
    this.fetchStateCount();
    this.fetchCityCount();
    this.fetchZipCodeCount();
    this.fetchCategoryCount();
    this.showModal();
  }

  render() {
    return (
      <div className="App">   
        <div className="body">
        <Template />
        <div className= "selectState" >
          <Form>
          <Form.Group controlId="exampleForm.ControlSelect3">
              <div classname= "API">
              <Form.Label>Categories</Form.Label>
              <Form.Control as="select" value={this.state.selectedCategory} onChange={this.updateState}>
                {this.state.categories.map((category) => <option key={category.value} value={category.value}> {category.display} </option>)}
              </Form.Control>
              </div>
            </Form.Group>   
          </Form>
        </div>
        <div>
            OR
          </div>
        <div className= "selectState">        
          <Form>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <div classname= "API">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" value={this.state.selectedState} onChange={this.updateCities}>
                {this.state.states.map((state) => <option key={state.value} value={state.value}>{state.display}</option>)}
              </Form.Control>
              </div>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>City</Form.Label>
              <Form.Control as="select" value={this.state.selectedCity} onChange={this.updateZipcode}>
                {this.state.cities.map((city) => <option key={city.value} value={city.value}>{city.display}</option>)}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect3">
              <Form.Label>ZipCode</Form.Label>
              <Form.Control as="select" value={this.state.selectedZipCode} onChange={this.updateTable}>
                {this.state.zipcodes.map((zipcode) => <option key={zipcode.value} value={zipcode.value}> {zipcode.display} </option>)}
              </Form.Control>
            </Form.Group>   
          </Form>
        </div>

    

        <div className="Table">
        <Table striped bordered hover id="dataTable">
          <thead>
            <tr>
              <th>Business Name</th>
              <th>State</th>
              <th>City</th>
              <th>zipcode</th>
            </tr>
          </thead>
          <tbody>
            {this.state.businesses.map((business) => <tr key={business.value} value={business.value}>
              <td onClick={() => this.updateModal(business.value)}>{business.value}</td>
              <td>{this.state.selectedState}</td>
              <td>{this.state.selectedCity}</td>
              <td>{this.state.selectedZipCode}</td>
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
              <div id="zcName">ZipCode: {this.state.selectedZipCode}</div>
              <div id="cName">City: {this.state.selectedCity}</div>
              <div id="sName">State: {this.state.selectedState}</div>
              <div id="cCount">Businesses in City: {this.state.cCount}</div>
              <div id="sCount">Businesses in State: {this.state.sCount}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.hideModal}>
              Save Changes
                        </Button>
          </Modal.Footer>
        </Modal>
        </div>
      </div>
    );
  }
}

export default App;
