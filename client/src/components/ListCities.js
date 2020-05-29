import React,{Fragment, useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { FixedSizeList } from "react-window";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { MenuItem } from '@material-ui/core';



const ListCities = () => {
const [cities, setCities] = useState([]);

//handle change state
const handleChange = (event) => {
    setCities(event.target.value);
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
           <Paper className="selectCity">
                     {" "}
                 <table class="table mt-5 text-center">
                        <thead>
                             <tr>
                                 <th>City </th>
                             </tr>
                        </thead>
                    <tbody>
                        {cities.map(business => (
                                <MenuItem>
                                    <td>{business.city}</td>
                                 </MenuItem> 
                            ))}
      
                        </tbody>
                    </table>
            </Paper>
    )
};

export default ListCities;