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
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

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

  state = {
    data: [],
    open: false,
    pesan: '',
    nim: '',
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/api/data/dataSiswa`)
      .then(res => {
        console.log(res.data)
        this.setState({data: res.data })
      })
      .catch( err => {
        console.log(err)
      })
  }

  handleClickOpen = (nim) => {
    this.setState({
      open: true,
      nim: nim
    })
    console.log(nim)
  }

  handleClose = event => {
    this.setState({
      open: false,
      nim:''
    })
  }

  handleClickOut = event => {
    event.preventDefault();

    const deleteUser = {
      nim: this.state.nim
    }

    axios.post(`http://localhost:4000/api/data/deleteSiswa`, deleteUser)
      .then(res => {
        console.log(res.data)
        window.location.href = '/dataSiswa'
      })
      .catch( err => {
        console.log(err)
      })

    this.setState({
      open: false,
      nim:''
    })
  }


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
                  {this.state.data.map( (item, key) =>
                  <React.Fragment>
                    <List dense={dense}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <PeopleIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            key={key}
                            primary= {item.nama}
                            secondary={secondary ? 'Secondary text' : item.nim}
                          />
                          <ListItemSecondaryAction>
                            <IconButton onClick={(event)=> this.handleClickOpen(item.nim , event)}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                  </React.Fragment>
                )}

              </div>
              </Paper>
          </Center>
        </div>
        { /* dialog button */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description" align="center">
              Apakah anda ingin menghapus user ini ?
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

dataSiswa.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(dataSiswa);
