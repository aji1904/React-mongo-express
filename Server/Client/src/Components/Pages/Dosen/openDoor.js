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
    marginTop: 80,
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
    dosen : '',
    kelas : '',
    ruangan : '',
    tanggal : '',
    waktu: '',
  } 
  handleChange = event => {
    const {name} = event.target

    this.setState({
      [name]:event.target.value,
    });
  }
  
  handleSubmit = event => {
    event.preventDefault();

    const historydosen = {
      dosen: this.state.dosen,
      kelas: this.state.kelas,
      ruangan: this.state.ruangan,
      tanggal: this.state.tanggal,
      waktu: this.state.waktu,
    }

    axios.post('http://localhost:4000/api/historydosen', historydosen)
      .then(res=>{
        console.log(res);
        console.log(res.data);
      })
      .catch(err=>{
        console.error('error axios',err)
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
              <IconButton color="inherit" className={classes.IconButton} to="/MenuDosen" component={Link} >
                  <Icon className={classes.icon} >
                    arrow_back
                  </Icon>
                </IconButton>
            </Typography>
            <Typography variant="h6" align="right" color="inherit" className={classes.Grow}>
              Buka Pintu
            </Typography>
          </Toolbar>
        </AppBar>
          
        { /* Content Profile */ }
        <ValidatorForm ref="form" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}  >
        <div className={classes.Content}>
        <div>
          <Center>
            <TextValidator
              label="Kelas Siswa"
              className={classes.textField}
              margin="dense"
              variant="outlined"
              style={{width : 400}}
              type="text"
              name="kelas"
              value={this.state.kelas}
              onChange={this.handleChange}
              validators = {['required', 'minStringLength: 4']}
              errorMessages = {['this field is null', 'Minimal 4 Karakter. Contoh: 6 CB']}
            />
          </Center>
        </div>
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
            <select className={classes.select} name="waktu" value={this.state.waktu} onChange={this.handleChange} required>
              <option value="">Lama Peminjaman</option>
              <option value="1 JAM">1 JAM PELAJARAN</option>
              <option value="2 JAM">2 JAM PELAJARAN</option>
              <option value="3 JAM">3 JAM PELAJARAN</option>
            </select>
          </Center>
        </div>

         <div>
            <Center>
              <Button variant="contained" type="submqit" color="primary" className={classes.button}>
                  Buka Lab
                <SendIcon className={classes.rightIcon} style={{paddingLeft: 10,}}/>
              </Button>
            </Center>
          </div>
        </div>
      </ValidatorForm>

      </div>
    );
  }
}

openDoor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(openDoor);
