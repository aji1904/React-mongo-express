import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Center from 'react-center';
import Polsri from '../Images/logo-polsri.svg';
import {Link} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    margin: theme.spacing.unit,
    width: 270,
    padding: 15,
    marginTop: 20,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  Logo: {
    width: 230,
    height: 270,
    marginTop: 27,
    marginBottom: 27,
  },
  Container: {
    margin: 5,
  },
  Link: {
    textDecoration: 'none',
    outline: 'none',
    padding: 0,
    margin: 0,
  },
  btnDialog: {
    margin: 0,
    width: 250,
    padding: 10,
  },
  List: {
    padding: 0,
    margin: 0,
    width: 250,
  },
  Dialog: {
    padding: 0,
    margin: 0,

  },
  DialogContent: {
    padding: 0,
    paddingBottom: 24,
    margin: 0,
  }
});

class Index extends React.Component {
  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar 
          position="static">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Welcome
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.Container}>
          <div>
            <Center>
              <img src={Polsri} className={classes.Logo} alt="logo"/>
            </Center>
          </div>
          <div>
            <Center>
              Silahkan Login Terlebih Dahulu
            </Center>
          </div>
          <Center>
            <div> {/*content button*/}
              <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClickOpen}>
                Login
                <SendIcon className={classes.rightIcon} />
              </Button>
              <Dialog
                open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleClose}
                className={classes.Dialog}
              >
              <DialogContent className={classes.DialogContent}>
                <List className={classes.List}>
                  <ListItem className={classes.ListItem}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      className={classes.btnDialog} 
                      component={Link} 
                      to="/LoginDosen" 
                      onClick={this.handleClose}
                    >
                      Login Sebagai Dosen
                    </Button>
                  </ListItem>
                  <ListItem className={classes.ListItem}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      className={classes.btnDialog} 
                      component={Link} 
                      to="/LoginAdmin" 
                      onClick={this.handleClose}
                    >
                      Login Sebagai Admin
                    </Button>
                  </ListItem>
                  <ListItem className={classes.ListItem}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      className={classes.btnDialog} 
                      component={Link} 
                      to="/LoginMahasiswa" 
                      onClick={this.handleClose}
                    >
                      Login Sebagai Mahasiswa
                    </Button>
                  </ListItem>
                </List>
              </DialogContent>
              </Dialog>
            </div>
          </Center> 
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
