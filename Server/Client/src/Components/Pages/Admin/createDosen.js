import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Center from 'react-center';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

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
  Grow: {
    flexGrow: 1,
  },
  Content: {
    marginTop: 50,
    [theme.breakpoints.down('xs')]: {
      marginTop: 15,
      marginBottom: 50,
      paddingBottom: 10,
    },
    paddingBottom: 50,
    marginRight: 15,
    marginLeft: 15,
  },
  button: {
    width: 400,
    padding: 15,
    marginTop: 28,
    marginBottom: 50,
  },
  pesan: {
    color: 'red',
    paddingBottom: 10,
  }
});

class createDosen extends React.Component {
  state = {
    nip : '',
    password : '',
    nama : '',
    telepon : '',
    pesan: '',
    open: false,
  } 

  handleChange = event => {
    const {name} = event.target

    this.setState({
      [name]:event.target.value
    });
  }

  handleClose = event => {
    this.setState({
      open: false,
    })
  }

  handleSubmit = event => {
    event.preventDefault();

    const createDosen = {
      nip: this.state.nip,
      password: this.state.password,
      nama: this.state.nama,
      telepon: this.state.telepon,
    }

    this.setState({
      nip : '',  
      password : '',
      nama : '',
      telepon : '',
      open: true,
    })

    axios.post('http://localhost:4000/api/dosen', createDosen)
      .then( ({response})=>{
        this.setState(state => ({pesan: response.data}) )
      })
      .catch( ({response})=>{
        this.setState(state => ({pesan: response.data}) )
      })
  }

  render() {
  const { classes } = this.props;

    return (
      <div className={classes.root}>

        { /* Navbar*/} 
        <AppBar position="static" color="primary">
          <Toolbar>            
            <Typography variant="h6" color="inherit" align="left" className={classes.Grow}>
              <IconButton color="inherit" className={classes.IconButton} to="/createUser" component={Link} >
                  <Icon className={classes.icon} >
                    arrow_back
                  </Icon>
                </IconButton>
            </Typography>
            <Typography variant="h6" align="right" color="inherit" className={classes.Grow}>
              Create Dosen
            </Typography>
          </Toolbar>
        </AppBar>
          
        { /* Content Profile */ }
        <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
        <div className={classes.Content}> 
        <div>
          <Center>
            <TextValidator
              label="NIP Dosen"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              style={{width : 400}}
              type="number"
              name="nip"
              value={this.state.nip}
              onChange={this.handleChange}
              validators = {['required', 'minStringLength: 12']}
              errorMessages = {['this field is null', 'Minimal 12 Karakter. Contoh: 061630700529']}
            />
          </Center>
        </div>
        <div>
          <Center>
            <TextValidator
              label="Password Dosen"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              style={{width : 400}}
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              validators = {['required', 'minStringLength: 8']}
              errorMessages = {['this field is null', 'Minimal 8 Karakter.']}
            />
          </Center>
        </div>
        <div>
          <Center>
            <TextValidator
              label="Nama Dosen"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              style={{width : 400}}
              type="text"
              name="nama"
              value={this.state.nama}
              onChange={this.handleChange}
              validators = {['required', 'minStringLength: 6']}
              errorMessages = {['this field is null', 'Minimal 6 Karakter.']}
            />
          </Center>
        </div>
        <div>
          <Center>
            <TextValidator
              label="No Telepon"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              style={{width : 400}}
              type="number"
              name="telepon"
              value={this.state.telepon}
              onChange={this.handleChange}
              validators = {['required', 'minStringLength: 12']}
              errorMessages = {['this field is null', 'Minimal 12 Karakter. Contoh: 081234345656']}
            />
          </Center>
        </div>
         <div>
            <Center>
              <Button variant="contained" color="primary" type="submit" className={classes.button}>
                  Create
                <SendIcon className={classes.rightIcon} style={{paddingLeft: 10,}}/>
              </Button>
            </Center>
          </div>
        </div>
      </ValidatorForm>

    { /*Snackbar*/ }

    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={this.state.open}
      autoHideDuration={4000}
      onClose={this.handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{this.state.pesan}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={this.handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />

      </div>
    );
  }
}

createDosen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(createDosen);
