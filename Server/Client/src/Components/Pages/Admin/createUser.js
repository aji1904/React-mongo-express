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
    color: 'white',
  },
  select: {
    fontSize: '15px',
    padding: '14px 14px',
    marginTop: 10,
    marginBottom: 5,
    width: 400,
    borderRadius: 5,
  }
});

class createUser extends React.Component {
  state = {
    nim : '',
    password : '',
    nama : '',
    kelas : '',
    email : '',
    status : '',
    pesan : '',
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
      pesan: '',
    })
  }

  handleSubmit = event => {
    event.preventDefault();

    const createUser = {
      nim: this.state.nim,
      password: this.state.password,
      nama: this.state.nama,
      kelas: this.state.kelas,
      email: this.state.email,
      status: this.state.status,
    }

    this.setState({
      nim : '',
      password : '',
      nama : '',
      kelas : '',
      email : '',
      status : '',
      open: true,
    })

    axios.post('http://localhost:4000/api/mahasiswa', createUser)
      .then( ({response}) => {
        this.setState(state => ({ pesan: response.data }) )
      })
      .catch( ({response}) => {
        this.setState(state => ({ pesan: response.data }) )
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
              Create Siswa
            </Typography>
          </Toolbar>
        </AppBar>
          
        { /* Content Profile */ }
        <ValidatorForm onSubmit={this.handleSubmit} ref="form" onError={errors => console.log(errors)}>
        <div className={classes.Content}>
        <div>
          <Center>
            <TextValidator
              label="NIM Siswa"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              style={{width : 400}}
              type="number"
              name="nim"
              value={this.state.nim}
              onChange={this.handleChange}
              validators = {['required', 'minStringLength: 12']}
              errorMessages = {['this field is null', 'Minimal 12 Karakter. Contoh: 061630700529']}
            />
          </Center>
        </div>
        <div>
          <Center>
            <TextValidator
              label="Password Siswa"
              className={classes.textField}
              margin="dense"
              value={this.state.password}
              onChange={this.handleChange}
              variant="outlined"
              style={{width : 400}}
              type="password"
              name="password"
              validators ={['required', 'minStringLength: 8']}
              errorMessages ={['this field is null', 'Minimal 8 Karakter.']}
            />
          </Center>
        </div>
        <div>
          <Center>
            <TextValidator
              label="Nama Siswa"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={this.state.nama}
              onChange={this.handleChange}
              style={{width : 400}}
              type="text"
              name="nama"
              validators = {['required', 'minStringLength: 6']}
              errorMessages = {['this field is null', 'Minimal 6 Karakter.']}
            />
          </Center>
        </div>

        <div>
          <Center>
            <TextValidator
              label="Kelas Siswa"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={this.state.kelas}
              onChange={this.handleChange}
              style={{width : 400}}
              type="text"
              name="kelas"
              validators = {['required', 'minStringLength: 4']}
              errorMessages = {['this field is null', 'Contoh: 6 CB.']}
            />
          </Center>
        </div>
        <div>
          <Center>
            <TextValidator
              label="Email Siswa"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleChange}
              style={{width : 400}}
              type="email"
              name="email"
              validators = {['required','isEmail','minStringLength: 6']}
              errorMessages = {['this field is null', 'Contoh: aji123@gmail.com']}
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
          autoHideDuration={5000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id" className={classes.pesan}>{this.state.pesan}</span>}
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

createUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(createUser);
