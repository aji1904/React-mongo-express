import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Center from 'react-center';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const styles = {
  root: {
    flexGrow: 1,
  },
  Grow: {
    flexGrow: 1,
  },
  paper: {
    marginTop: 70,
    width: 'auto',
    overflowX: 'auto',
  },
  Content: {
    margin: 10,
  }
};

class HistoryDosen extends React.Component {
  state = {
    data: [],
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/api/data/histori/dosen`)
      .then(res => {
        console.log(res.data)
        this.setState(state => ({data: res.data }) )
      })
      .catch( err => {
        console.log(err)
      })
  }
  render() {
  const { classes } = this.props;

    return (
      <div className={classes.root}>

        { /* Navbar */ }
        <AppBar position="fixed" color="primary">
          <Toolbar>
          <Typography variant="h6" color="inherit" align="left" className={classes.Grow}>
              <IconButton color="inherit" className={classes.IconButton} to="/MenuHistory" component={Link} >
                  <Icon className={classes.icon} >
                    arrow_back
                  </Icon>
                </IconButton>
            </Typography>
            <Typography variant="h6" color="inherit" align="right" className={classes.Grow}>
              History
            </Typography>
          </Toolbar>
        </AppBar>

        { /* Content Room */ }
        <div className={classes.Content}>
          <Center>
            <Paper className={classes.paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>NIP_DOSEN</TableCell>
                    <TableCell>NAMA_DOSEN</TableCell>
                    <TableCell>RUANGAN</TableCell>
                    <TableCell>TANGGAL</TableCell>
                    <TableCell>LAMA_BUKA</TableCell>
                    <TableCell>KELAS</TableCell>
                  </TableRow>
                </TableHead>
                {this.state.data.map( (item, key) =>
                  <React.Fragment>
                     <TableBody>
                      <TableCell key={key}>{item.nip}</TableCell>
                      <TableCell key={key}>{item.dosen}</TableCell>
                      <TableCell key={key}>{item.ruangan}</TableCell>
                      <TableCell key={key}>{item.tanggal}</TableCell>
                      <TableCell key={key}>{item.lamaBuka}</TableCell>
                      <TableCell key={key}>{item.kelas}</TableCell>
                    </TableBody>  
                  </React.Fragment>
                )}
              </Table>
            </Paper>
          </Center>
        </div>

      </div>
    );
  }
}

HistoryDosen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HistoryDosen);
