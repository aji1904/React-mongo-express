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
import 

const styles = {
  root: {
    flexGrow: 1,
  },
  Grow: {
    flexGrow: 1,
  },
  paper: {
    marginTop: 50,
    width: 'auto',
    overflowX: 'auto',
  },
  Content: {
    margin: 10,
  }
};

class HistorySiswa extends React.Component {

  render() {
  const { classes } = this.props;

    return (
      <div className={classes.root}>

        { /* Navbar */ }
        <AppBar position="static" color="primary">
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
                    <TableCell>NIM</TableCell>
                    <TableCell>NAMA SISWA</TableCell>
                    <TableCell>KELAS</TableCell>
                    <TableCell>NAMA DOSEN</TableCell>
                    <TableCell>LAMA PINJAM</TableCell>
                    <TableCell>RUANG</TableCell>
                    <TableCell>TANGGAL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                      <TableCell>061630700529</TableCell>
                      <TableCell>Aji</TableCell>
                      <TableCell>6 CB</TableCell>
                      <TableCell>DOSEN 1</TableCell>
                      <TableCell>2 JAM</TableCell>
                      <TableCell>LAB 3</TableCell>
                      <TableCell>20 mei 2019</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Center>
        </div>

      </div>
    );
  }
}

HistorySiswa.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HistorySiswa);
