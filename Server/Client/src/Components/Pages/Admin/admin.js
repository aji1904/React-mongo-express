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
});

class LoginAdmin extends React.Component {
  state = {
    username: '',
    password: '',
    role: 'admin',
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
      open: false,
      pesan: '',
    })
  }
  handleSubmit = event => {
    event.preventDefault();

    const storage = LocalStorage()

    const auth = {
      username: this.state.username,
      password: this.state.password,
      role : this.state.role
    }

    this.setState({
      open: true,
      username: '',
      password: '',
    })

    axios.post('http://localhost:4000/api/auth', auth)
      .then(res => {
        this.setState(state => ({pesan: res.data.pesan}) )
        storage.set('logintoken', res.data.token)
      })
      .then(res => new Promise(resolve => {
          setTimeout(() => {
            resolve(this.props.history.push('/MenuAdmin'));
          }, 500);
        })
      )

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
              <IconButton color="inherit" className={classes.IconButton}>
                <Icon className={classes.icon}>
                  arrow_back
                </Icon>
              </IconButton>
            </Link>
            <Typography variant="h6" color="inherit" align="right" className={classes.grow}>
              Login Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <Center>
            <img src={Logo} alt="logo" className={classes.logo} />
          </Center>
        </div>
        <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={erros => console.log(erros)}>
        <div className={classes.Container}>
          <div>
            <Center>
              <TextValidator
                label="Username"
                className={classes.textField}
                type="text"
                name="username"
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
                value={this.state.username}
                onChange={this.handleChange}
                validators = {['required', 'minStringLength: 5']}
                errorMessages = {['this Username is null', 'Minimal 5 Karakter. Contoh: Admin']}
              />
            </Center>
            <Center>
              <TextValidator
                id="outlined-adornment-password"
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
              <Button variant="contained" color="primary" className={classes.button} type="submit">
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
          autoHideDuration={5000}
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

LoginAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginAdmin);


