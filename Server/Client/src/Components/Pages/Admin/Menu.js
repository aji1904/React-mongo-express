import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import imgProfile from '../../Images/Profile.svg';
import imgRiwayat from '../../Images/History.svg';
import userAdd from '../../Images/userAdd.svg';
import folder from '../../Images/folder.png';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import LocalStorage from 'simple-webstorage/lib/local';

const styles = theme => ({
  root: {
    backgroundColor: 'white',
    flexGrow: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 'auto',
    width: 'auto',
    overflow: 'auto',
  },
  grow: {
    flexGrow: 2
  },
  img: {
    height: 100,
    width: 100,
    padding: 5,
  },
  Card: {

    [theme.breakpoints.down('xs')]: {
      backgroundColor: theme.palette.primary.main,
      height: 'auto',
      width: 250,
      margin: 10,
    },
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.primary.main,
    }, 
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 10,    
    backgroundColor: theme.palette.primary.main,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 20,
    width: 150,
  },
  Button: {
    width: 150, 
    borderRadius: 5,
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      width: 200,
    }
  },
  Grid: {
    marginTop: 200,
    [theme.breakpoints.down('xs')]: {
      marginTop: 65,
      paddingBottom: 10,
    }
  }
});

class MenuAdmin extends React.Component {
  state = {
    open: false,
  }

  handleClose = event => {
    this.setState({
      open: false,
    })
  }

  handleClickOpen = event => {
    this.setState({
      open: true,
    })
  }

  handleClickOut = event => {
    event.preventDefault();

    const storage = LocalStorage()
    storage.remove('logintoken')
    this.props.history.push('/')

    this.setState({
      open: false,
    })


  }


  render() {
  const { classes } = this.props;

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar> 
          <Typography variant="h6" align="left" color="inherit" className={classes.grow}>
            Menu Admin
          </Typography>
          <IconButton color="inherit" align="right" className={classes.IconButton} onClick={this.handleClickOpen}>
            <Icon className={classes.icon}>
              logout
            </Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid 
        container xs={24}
        direction="row"
        justify="center"
        alignContent="center"
        alignItems="center"
        className={classes.Grid}
      >
        <Card className={classes.Card}>
          <img src={imgProfile} alt="profile" className={classes.img}/>
          <Button
            to="/ProfileAdmin"
            component={Link}
            variant="contained"
            disableRipple
            color="secondary"
            className={classes.Button}
          >
            Profile
          </Button>
        </Card>        
        <Card className={classes.Card}>
          <img src={userAdd} alt="CreateUser" className={classes.img}/>
          <Button
            to="/CreateUser"
            component={Link}
            variant="contained"
            disableRipple
            color="secondary"
            className={classes.Button}
          >
            Create User
          </Button>
        </Card>
        <Card className={classes.Card}>
          <img src={imgRiwayat} alt="riwayat" className={classes.img}/>
          <Button
            to="/MenuHistory"
            component={Link}
            variant="contained"
            disableRipple
            color="secondary"
            className={classes.Button}
          >
            Riwayat
          </Button>
        </Card>        
        <Card className={classes.Card}>
          <img src={folder} alt="CreateUser" className={classes.img}/>
          <Button
            to="/MenuData"
            component={Link}
            variant="contained"
            disableRipple
            color="secondary"
            className={classes.Button}
          >
            Data User
          </Button>
        </Card>
      </Grid>

      { /* dialog button */}
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align="center">
            Apakah anda yakin ingin keluar dari Aplikasi ini
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Tidak
          </Button>
          <Button onClick={this.handleClickOut} color="primary" autoFocus>
            Iya
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
}
MenuAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAdmin);
