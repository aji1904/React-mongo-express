import React from 'react';
import Index from './Components/Pages/';
import LoginAdmin from './Components/Pages/Admin/admin';
import LoginMahasiswa from './Components/Pages/Mahasiswa/mahasiswa';
import LoginDosen from './Components/Pages/Dosen/dosen';
import ProfileAdmin from './Components/Pages/Admin/Profile';
import ProfileDosen from './Components/Pages/Dosen/Profile';
import ProfileSiswa from './Components/Pages/Mahasiswa/Profile';
import CreateUser from './Components/Pages/Admin/Create';
import createSiswa from './Components/Pages/Admin/createUser';
import createDosen from './Components/Pages/Admin/createDosen';
import HistoryAdminSiswa from './Components/Pages/Admin/HistorySiswa';
import HistoryAdminDosen from './Components/Pages/Admin/HistoryDosen';
import HistoryDosen from './Components/Pages/Dosen/History';
import MenuAdmin from './Components/Pages/Admin/Menu';
import MenuDosen from './Components/Pages/Dosen/Menu';
import MenuMahasiswa from './Components/Pages/Mahasiswa/Menu';
import MenuHistory from './Components/Pages/Admin/menuHistory';
import MenuData from './Components/Pages/Admin/menuData';
import openDoor from './Components/Pages/Dosen/openDoor';
import openLab from './Components/Pages/Mahasiswa/openLab';
import {BrowserRouter, Route,} from 'react-router-dom';
import dataDosen from './Components/Pages/Admin/dataDosen';
import dataSiswa from './Components/Pages/Admin/dataSiswa';

class App extends React.Component {
	
  render() {
    return (
      <BrowserRouter>	
    		<React.Fragment>
	    		<Route path="/" exact={true} component={Index} />
	    		<Route path="/LoginAdmin" exact={true} component={LoginAdmin} />
          <Route path="/LoginMahasiswa" exact={true} component={LoginMahasiswa} />
	    		<Route path="/LoginDosen" exact={true} component={LoginDosen} />
          <Route path="/MenuAdmin" exact={true} component={MenuAdmin} />
          <Route path="/MenuDosen" exact={true} component={MenuDosen} />
          <Route path="/MenuMahasiswa" exact={true} component={MenuMahasiswa} />
          <Route path="/MenuHistory" exact={true} component={MenuHistory} />
          <Route path="/MenuData" exact={true} component={MenuData} />
          <Route path="/ProfileAdmin" exact={true} component={ProfileAdmin} />
          <Route path="/ProfileDosen" exact={true} component={ProfileDosen} />
          <Route path="/ProfileSiswa" exact={true} component={ProfileSiswa} />
          <Route path="/HistoryAdminSiswa" exact={true} component={HistoryAdminSiswa} />
          <Route path="/HistoryAdminDosen" exact={true} component={HistoryAdminDosen} />
          <Route path="/HistoryDosen" exact={true} component={HistoryDosen} />
          <Route path="/CreateUser" exact={true} component={CreateUser} />
          <Route path="/createSiswa" exact={true} component={createSiswa} />
          <Route path="/createDosen" exact={true} component={createDosen} />
          <Route path="/openDoor" exact={true} component={openDoor} />
          <Route path="/openLab" exact={true} component={openLab} />
          <Route path="/dataDosen" exact={true} component={dataDosen} />
          <Route path="/dataSiswa" exact={true} component={dataSiswa} />

      	</React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
