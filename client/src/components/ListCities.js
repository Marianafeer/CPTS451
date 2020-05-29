import React,{Fragment, useEffect, useState} from 'react';
import { makeStyles, rgbToHex, hexToRgb } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { FixedSizeList } from "react-window";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const ListCities = () => {

const [cities, setCities] = useState([]);
const [city, setCity] = React.useState([]);

//handle change state
const handleChange = (event) => {
    setCity(event.target.value);
  };


    const getCity = async () => {
        try {
            const response = await fetch("http://localhost:5000/cities");
            //get data back but first parse
            const jsonData = await response.json()

            console.log(jsonData)
            setCities(jsonData)
        
        } catch (err) {
            console.error(err.message)
            
        }
    };

    useEffect(() => {
        getCity();
    } ,[]);

    console.log(cities);

    function renderRow(props) {
        const { index, style } = props;
      
        return (
          <ListItem button style={style} key={index}>
            <ListItemText primary={cities.map(business => (
                            <td>{business.city}</td>
                    ))} />
          </ListItem>
        );
      }

    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                         <th>City </th>
                    </tr>
                </thead>
                <tbody>
                    {cities.map(business => (
                        <tr>
                            <td>{business.city}</td>
                        </tr> 
                    ))}
      
                </tbody>
            </table>
        </Fragment>
    )
};

export default ListCities;