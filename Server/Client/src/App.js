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
import closeLab from './Components/Pages/Mahasiswa/tutup';
import {BrowserRouter, Route,} from 'react-router-dom';
import dataDosen from './Components/Pages/Admin/dataDosen';
import {AuthRoute} from 'react-router-auth';
import dataSiswa from './Components/Pages/Admin/dataSiswa';
import HttpsRedirect from 'react-https-redirect';

class App extends React.Component {

  render() {

    const isAuthenticated = 
      localStorage.getItem("logintoken") !== null && typeof localStorage.getItem("logintoken") !== "undefined" 
   
    return (
      <HttpsRedirect>
      <BrowserRouter>	
    		<React.Fragment>

	    		<Route path="/" exact={true} component={Index} />
	    		<Route path="/LoginAdmin" exact={true} component={LoginAdmin} />
          <Route path="/LoginMahasiswa" exact={true} component={LoginMahasiswa} />
	    		<Route path="/LoginDosen" exact={true} component={LoginDosen} />
          
          <AuthRoute path="/MenuAdmin" redirectTo="/LoginAdmin" exact={true} component={MenuAdmin} authenticated={isAuthenticated}/>
          
          <AuthRoute path="/MenuDosen" redirectTo="/LoginDosen" exact={true} component={MenuDosen} authenticated={isAuthenticated}/>
          <AuthRoute path="/ProfileDosen" redirectTo="/LoginDosen" exact={true} component={ProfileDosen} authenticated={isAuthenticated}/>
          <AuthRoute path="/HistoryDosen" redirectTo="/LoginDosen" exact={true} component={HistoryDosen} authenticated={isAuthenticated}/>
          <AuthRoute path="/openLab" redirectTo="/LoginDosen" exact={true} component={openLab} authenticated={isAuthenticated}/>

          <AuthRoute path="/MenuMahasiswa" redirectTo="/LoginMahasiswa"  exact={true} component={MenuMahasiswa} authenticated={isAuthenticated}/>
          <AuthRoute path="/ProfileSiswa" redirectTo="/LoginMahasiswa" exact={true} component={ProfileSiswa} authenticated={isAuthenticated}/>
          <AuthRoute path="/closeLab" redirectTo="/LoginMahasiswa" exact={true} component={closeLab} authenticated={isAuthenticated}/>
          <AuthRoute path="/openDoor" redirectTo="/LoginMahasiswa" exact={true} component={openDoor} authenticated={isAuthenticated}/>
          
          <AuthRoute path="/HistoryAdminDosen" redirectTo="/LoginAdmin"  exact={true} component={HistoryAdminDosen}  authenticated={isAuthenticated}/>
          <AuthRoute path="/ProfileAdmin" redirectTo="/LoginAdmin"  exact={true} component={ProfileAdmin}  authenticated={isAuthenticated}/>
          <AuthRoute path="/MenuHistory" redirectTo="/LoginAdmin"  exact={true} component={MenuHistory}  authenticated={isAuthenticated}/>
          <AuthRoute path="/MenuData" redirectTo="/LoginAdmin"  exact={true} component={MenuData}  authenticated={isAuthenticated}/>
          <AuthRoute path="/HistoryAdminSiswa" redirectTo="/LoginAdmin"  exact={true} component={HistoryAdminSiswa}  authenticated={isAuthenticated}/>
          <AuthRoute path="/CreateUser" redirectTo="/LoginAdmin"  exact={true} component={CreateUser}  authenticated={isAuthenticated}/>
          <AuthRoute path="/createSiswa" redirectTo="/LoginAdmin"  exact={true} component={createSiswa}  authenticated={isAuthenticated}/>
          <AuthRoute path="/createDosen" redirectTo="/LoginAdmin"  exact={true} component={createDosen}  authenticated={isAuthenticated}/>
          <AuthRoute path="/dataDosen" redirectTo="/LoginAdmin"  exact={true} component={dataDosen}  authenticated={isAuthenticated}/>
          <AuthRoute path="/dataSiswa" redirectTo="/LoginAdmin"  exact={true} component={dataSiswa}  authenticated={isAuthenticated}/>

      	</React.Fragment>
      </BrowserRouter>
      </HttpsRedirect>
    );
  }
}

export default App;
