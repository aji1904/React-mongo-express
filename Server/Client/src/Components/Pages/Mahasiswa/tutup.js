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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import LocalStorage from 'simple-webstorage/lib/local';
import axios from 'axios';
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
    marginTop: 100,
    [theme.breakpoints.down('xs')]: {
      marginTop: 80,
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
  textField: {
    marginBottom: 12,
  },
  select: {
    fontSize: '15px',
    padding: '14px 14px',
    marginTop: 15,
    width: 400,
    borderRadius: 5,
  }
});

class openDoor extends React.Component {
  state = {
    nama : '',
    ruangan : '',
    tanggal : '',
    data: {},
    pesan: '',
    open: false,
  } 

  componentDidMount() {
    this.getDate()
    const storage = LocalStorage()
    const token = storage.get('logintoken')
    axios.get(`http://localhost:4000/api/data/user/${token}`)
      .then(res => {
        console.log(res.data)
        this.setState(state => ({ data: res.data}))
      })
      .catch(err => {
        console.log(err)
      })
  }

  getDate = () => {
    var tanggal = new Date().toDateString();
    this.setState({ tanggal });
  }

  handleClose = event => {
    this.setState({
      open: false,
      pesan: '',
    })
  }

  handleChange = event => {
    const {name} = event.target

    this.setState({
      [name]:event.target.value,
    });
  }
  
  handleSubmit = event => {
    event.preventDefault();

    const data_log = {
      field: '0', 
      nama: this.state.data.nama,
      status_pintu: 'tertutup',
      tanggal: this.state.tanggal,
      ruangan: this.state.ruangan,
    }

    this.setState({
      field: '0', 
      nama: this.state.data.nama,
      tanggal : this.state.tanggal,
      status_pintu : 'tertutup',
      ruangan : '',
      open: true,
    })

    axios.post('http://localhost:4000/api/data/datalog', data_log)
      .then( res => {
        console.log('berhasil')
      })
      .catch( res => {
        console.log('gagal')
      })
  }

  render() {
  const { classes } = this.props;

    return (
      <div className={classes.root}>

        { /* Navbar*/} 
        <AppBar position="fixed" color="primary">
          <Toolbar>            
            <Typography variant="h6" color="inherit" align="left" className={classes.Grow}>
              <IconButton color="inherit" className={classes.IconButton} to="/MenuMahasiswa" component={Link} >
                  <Icon className={classes.icon} >
                    arrow_back
                  </Icon>
                </IconButton>
            </Typography>
            <Typography variant="h6" align="right" color="inherit" className={classes.Grow}>
              Tutup Pintu
            </Typography>
          </Toolbar>
        </AppBar>
          
        { /* Content Profile */ }
        <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}  >
        <div className={classes.Content}>
        <div>
          <Center>
            <TextValidator
              label="Ruang LAB"
              margin="dense"
              variant="outlined"
              style={{width : 400}}
              type="text"
              name="ruangan"
              value={this.state.ruangan}
              onChange={this.handleChange}
              validators = {['required', 'minStringLength: 5']}
              errorMessages = {['this field is null', 'Minimal 5 Karakter. Contoh: LAB 1']}
            />
          </Center>
        </div>
      
         <div>
            <Center>
              <Button variant="contained" type="submqit" color="primary" className={classes.button}>
                  Tutup Lab
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
          message={<span id="message-id" className={classes.pesan}>Pintu LAB Sudah Tertutup</span>}
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

openDoor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(openDoor);
