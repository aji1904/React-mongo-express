import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Logo from '../../Images/images.png';
import Center from 'react-center';
import SendIcon from '@material-ui/icons/Send';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import LocalStorage from 'simple-webstorage/lib/local';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

 
const styles = {
  root: {
    backgroundColor: 'white',
    flexGrow: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 'auto',
    overflow: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logo: {
    width: 149,
    height: 160,
    marginTop: 50,
    marginBottom: 30,
  },
  Container: {
    margin: 10,
    marginTop: 20,
  },
  textField:{
    width: 300,
    marginTop: 10,  
  },
  button: {
    width: 300,
    padding: 10,
    marginTop: 28,
  },
  rightIcon: {
    paddingLeft: 15,
  },
  Link: {
    textDecoration: 'none',
    outline: 'none',
    color: 'white',
  },
  pesan: {
    color: 'white',
  }
};

class LoginSiswa extends React.Component {
  state = {
    nim: '',
    password: '',
    role: 'Siswa',    
    showPassword: false,
    pesan: '',
    open: false,
  }

  handleChange = event => {
    const {name} = event.target

    this.setState({
      [name]:event.target.value
    });
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }

  handleClose = event => {
    this.setState({
      pesan: '',
      open: false,
    })
  }

  handleSubmit = event => {
    event.preventDefault();

    const storage = LocalStorage();
    

    const auth = {
      nim: this.state.nim,
      password: this.state.password,
      role: this.state.role,
    }

    this.setState({
      open: true,
      nim: '',
      password: '',
    })

    const data = this.props;
    axios.post('localhost:4000/api/auth', auth)
      .then(res => {
        this.setState(state => ({pesan: res.data.pesan}) )
        storage.set('logintoken', res.data.token)
      })
      .then(res =>  {
        // 
        setTimeout( () => {
            window.location.href = '/MenuMahasiswa'
          }, 500)
      })
      .catch( ({ response }) => {
        this.setState(state => ({ pesan: response.data }) )
      })
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Link to="/" className={classes.Link}>
              <IconButton color="inherit" className={classes.IconButton} >
                <Icon className={classes.icon}>
                  arrow_back
                </Icon>
              </IconButton>
            </Link>
            <Typography variant="h6" color="inherit" align="right" className={classes.grow}>
              Login Mahasiswa
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <Center>
            <img src={Logo} alt="logo" className={classes.logo} />
          </Center>
        </div>

        <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
        <div className={classes.Container}>
          <div>
            <Center>
              <TextValidator
                label="NIM Siswa"
                className={classes.textField}
                type="number"
                name="nim"
                margin="normal"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <Icon className={classes.icon}>
                          person
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={this.state.nim}
                onChange={this.handleChange}
                validators = {['required', 'minStringLength: 12']}
                errorMessages = {['this NIM Siswa is null', 'Minimal 12 Karakter. Contoh: 061630700529']}
              />
            </Center>
          </div>

          <div>
            <Center>
              <TextValidator
                className={classNames(classes.margin, classes.textField)}
                variant="outlined"
                type={this.state.showPassword ? 'text' : 'password'}
                label="Password"
                name="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={this.state.password}
                onChange={this.handleChange}
                validators = {['required', 'minStringLength: 6']}
                errorMessages = {['this Password is null', 'Minimal 6 Karakter.']}
              />
            </Center>
          </div>

          <div>
            <Center>
              <Button variant="contained" color="primary" type="submit" className={classes.button} >
                  Login
                <SendIcon className={classes.rightIcon} />
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

LoginSiswa.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginSiswa);
