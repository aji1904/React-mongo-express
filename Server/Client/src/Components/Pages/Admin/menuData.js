import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom';
import data from '../../Images/data.png';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';


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
  Grow: {
    flexGrow: 1
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
    width: 120, 
    borderRadius: 5,
    textTransform: 'capitalize',
    [theme.breakpoints.down('xs')]: {
      width: 200,
    }
  },
  Grid: {
    marginTop: 100,
    [theme.breakpoints.down('xs')]: {
      marginTop: 65,
      paddingBottom: 10,
    }
  },
});

class Profile extends React.Component {

  render() {
  const { classes } = this.props;

    return (
      <div className={classes.root}>

        { /* Navbar*/} 
        <AppBar position="static" color="primary">
          <Toolbar>            
            <Typography variant="h6" color="inherit" align="left" className={classes.Grow}>
              <IconButton color="inherit" className={classes.IconButton} to="/MenuAdmin" component={Link} >
                  <Icon className={classes.icon} >
                    arrow_back
                  </Icon>
                </IconButton>
            </Typography>
            <Typography variant="h6" align="right" color="inherit" className={classes.Grow}>
              Create User
            </Typography>
          </Toolbar>
        </AppBar>
          
        { /* Content */ }
        <Grid 
        container xs={24}
        direction="row"
        justify="center"
        alignContent="center"
        alignItems="center"
        className={classes.Grid}
      >
        <Card className={classes.Card}>
          <img src={data} alt="tentang" className={classes.img}/>
          <Button
            to="/dataSiswa"
            component={Link}
            variant="contained"
            disableRipple
            color="secondary"
            className={classes.Button}
          >
            Data Siswa
          </Button>
        </Card>
        <Card className={classes.Card}>
          <img src={data} alt="tentang" className={classes.img}/>
          <Button
            to="/dataDosen"
            component={Link}
            variant="contained"
            disableRipple
            color="secondary"
            className={classes.Button}
          >
            Data Dosen
          </Button>
        </Card>
      </Grid>


      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
