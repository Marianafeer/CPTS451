import React from "react";
import PropTypes from "prop-types";
import "./BusinessSearch.css";
import { makeStyles, rgbToHex, hexToRgb } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import ListSubheader from "@material-ui/core/ListSubheader";

//geting the cities

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const columns = [
  { id: "BusinessName", label: "Business Name", minWidth: 170 },
  { id: "State", label: "State", minWidth: 100 },
  { id: "City", label: "City", minWidth: 100 },
];

const SelectStateStyle = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const SelectCityStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ResultStyle = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  );
}

function createData(BusinessName, State, City) {
  return { BusinessName, State, City };
}

const rows = [
  createData("India", "IN", "1324171354, 3287263"),
  createData("China", "CN", "1403500365"),
  createData("Italy", "IT", "60483973"),
  createData("United States", "US", "327167434"),
  createData("Canada", "CA", "37602103"),
  createData("Australia", "AU", "25475400"),
  createData("Germany", "DE", "83019200"),
  createData("Ireland", "IE", "4857000"),
  createData("Mexico", "MX", "126577691"),
  createData("Japan", "JP", "126317000"),
  createData("France", "FR", "67022000"),
  createData("United Kingdom", "GB", "67545757"),
  createData("Russia", "RU", "146793744"),
  createData("Nigeria", "NG", "200962417"),
  createData("Brazil", "BR", "210147125"),
];

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

function BusinessSearch() {
  const StateStyle = SelectStateStyle();
  const CityStyle = SelectCityStyle();
  const TableStyle = ResultStyle();
  const [currency, setCurrency] = React.useState("EUR");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="body">
      <div className="selectState">
        <form className={StateStyle.root} noValidate autoComplete="off">
          <div>
            <TextField
              id="select-state"
              select
              label="State"
              value={currency}
              onChange={handleChange}
              //   helperText="Please select the state"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
      </div>

      <Paper className="selectCity">
        <caption>City</caption>
        <br></br>
        <FixedSizeList
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              City
            </ListSubheader>
          }
          height={400}
          width={360}
          itemSize={46}
          itemCount={200}
        >
          {renderRow}
        </FixedSizeList>
      </Paper>

      <div className="Table">
        <Paper className={TableStyle.root}>
          <TableContainer className={TableStyle.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}

export default BusinessSearch;
