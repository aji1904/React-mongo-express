import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Center from 'react-center';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  Grow: {
    flexGrow: 1,
  },
  table: {
    minWidth: 300,
  },
  paper: {
    marginTop: 50,
    width: 500,
    overflowX: 'auto',
  },
  Content: {
    margin: 10,
  }
});

class ProfileDosen extends React.Component {

  render() {
  const { classes } = this.props;

    return (
      <div className={classes.root}>

        { /* Navbar*/} 
        <AppBar position="static" color="primary">
          <Toolbar>            
            <Typography variant="h6" color="inherit" align="left" className={classes.Grow}>
              <IconButton color="inherit" className={classes.IconButton} to="/MenuDosen" component={Link} >
                  <Icon className={classes.icon} >
                    arrow_back
                  </Icon>
                </IconButton>
            </Typography>
            <Typography variant="h6" align="right" color="inherit" className={classes.Grow}>
              Profile
            </Typography>
          </Toolbar>
        </AppBar>
          
        { /* Content Profile */ }
        <div className={classes.Content}>
          <Center>
            <Paper className={classes.paper}>
              <Table className={classes.table}>
                <TableBody>
                    <TableRow>
                      <TableCell align="left">NIM</TableCell>
                      <TableCell align="left">Aji</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="left">Nama</TableCell>
                      <TableCell align="left">Aji</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Kelas</TableCell>
                      <TableCell align="left">6 CB</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Status</TableCell>
                      <TableCell align="left">Ketua Kelas</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Email</TableCell>
                      <TableCell align="left">aji199804@gmail.com</TableCell>
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

ProfileDosen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileDosen);
