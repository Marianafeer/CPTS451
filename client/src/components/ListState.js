import React,{Fragment, useEffect, useState} from 'react';
import { makeStyles, rgbToHex, hexToRgb } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { MenuItem } from '@material-ui/core';

const ListStates = () => {

const [states, setStates] = useState([]);
const [state, setState] = React.useState([]);

//handle change state
const handleChange = (event) => {
    setStates(event.target.value);
  };

const SelectStateStyle = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));

    const getStates = async () => {
        try {
            const response = await fetch(`http://localhost:5000/states`);
            //get data back but first parse
            const jsonData = await response.json()

            console.log(jsonData)
            setStates(jsonData)
        
        } catch (err) {
            console.error(err.message)
            
        }
    };

    useEffect(() => {
        getStates();
    } ,[]);

    console.log(states)

    const StateStyle = SelectStateStyle();

    const onClickHandler = event => {
      const value = event.target.innerHTML;
      this.setState({ value })
    }

    return (
        <div className="selectState">
        <form className={StateStyle.root} noValidate autoComplete="off">
          <div>
            <TextField
              id="select-state"
              select
              label="State"
              onChange={handleChange}
            >
                {states.map(business => (
                        <MenuItem>
                            <td>{business.state}</td>
                        </MenuItem> 
                    ))}

            </TextField>
          </div>
        </form>
      </div>
    )
};

export default ListStates;