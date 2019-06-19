import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const styles = {
  root: {
    flexGrow: 1,
  },
  Grow: {
    flexGrow: 1,
  },
};

class About extends React.Component {

  render() {
  const { classes } = this.props;

    return (
      <div className={classes.root}>

        { /* Navbar */ }
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit" align="center" className={classes.Grow}>
              About
            </Typography>
          </Toolbar>
        </AppBar>

        { /* Content Room */ }
        <div>
        Tentang
        </div>

      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
