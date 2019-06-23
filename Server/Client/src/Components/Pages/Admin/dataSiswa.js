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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PeopleIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    flexGrow: 1,
  },
  Grow: {
    flexGrow: 1,
  },
  paper: {
    marginTop: 70,
    width: 500,
    overflowX: 'auto',
  },
  Content: {
    margin: 10,
  }
};

class dataSiswa extends React.Component {

  render() {
  const { classes, dense, secondary } = this.props;

    return (
      <div className={classes.root}>

        { /* Navbar */ }
        <AppBar position="fixed" color="primary">
          <Toolbar>
          <Typography variant="h6" color="inherit" align="left" className={classes.Grow}>
              <IconButton color="inherit" className={classes.IconButton} to="/MenuData" component={Link} >
                  <Icon className={classes.icon} >
                    arrow_back
                  </Icon>
                </IconButton>
            </Typography>
            <Typography variant="h6" color="inherit" align="right" className={classes.Grow}>
              Data Mahasiswa
            </Typography>
          </Toolbar>
        </AppBar>

        { /* Content Room */ }
        <div className={classes.Content}>
          <Center> 
            <Paper className={classes.paper}>
              <div className={classes.demo}>
                <List dense={dense}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PeopleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Siswa A"
                        secondary={secondary ? 'Secondary text' : 'nim siswa'}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                </List>
                <List dense={dense}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PeopleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Siswa B"
                        secondary={secondary ? 'Secondary text' : 'nim siswa'}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                </List>
              </div>
              </Paper>
          </Center>
        </div>

      </div>
    );
  }
}

dataSiswa.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(dataSiswa);
