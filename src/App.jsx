import Appointment from "./pages/Appointment";
import HistoryPage from "./pages/CreateHistoryPage";
import IndexPage from "./pages/IndexPage";
import MyAppointmentPage from "./pages/MyAppointmentPage";
import PatientHomePage from "./pages/PatientHomePage";
import PatientLogin from "./pages/PatientLogin";
import PatientRegister from "./pages/PatientRegister";
import ReportPage from "./pages/ReportPage";
import CreateHistoryPage from "./pages/CreateHistoryPage"
import PatientReport from "./pages/PatientReport";
import PatientProfile from "./pages/PatientProfile";
import UpdatePage from "./pages/UpdatePage";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorHomePage from "./pages/DoctorHomePage";
import DoctorAppointment from "./pages/DoctorAppointment";
import ExaminePage from "./pages/ExaminePage";
import ViewPatientDetail from "./pages/ViewPatientDetail";
import ViewPatientHistory from "./pages/ViewPatientHistory";
import AddReport from "./pages/AddReport";
import DoctorProfile from "./pages/DoctorProfile";
import {Route,Routes} from 'react-router-dom';
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={IndexPage}/>
        <Route path="/patientLogin" Component={PatientLogin}/>
        <Route path="/doctorLogin" Component={DoctorLogin}/>
        <Route path="/myAppointment" Component={MyAppointmentPage}/>
        <Route path="/addHistory" Component={HistoryPage}/>
        <Route path="/patientHomePage" Component={PatientHomePage}/>
        <Route path="/patientRegister" Component={PatientRegister}/>
        <Route path="/addAppointment" Component={Appointment}/>
        <Route path="/myReports" Component={ReportPage}/>
        <Route path="/addHistory" Component={CreateHistoryPage}/>
        <Route path="/viewPatientReport" Component={PatientReport}/>
        <Route path="/patientProfile" Component={PatientProfile}/>
        <Route path="/updateProfile" Component={UpdatePage}/>
        <Route path="/doctorHomePage" Component={DoctorHomePage}/>
        <Route path="/viewAppointment" Component={DoctorAppointment}/>
        <Route path="/examinePage" Component={ExaminePage}/>
        <Route path="/viewPatientDetail" Component={ViewPatientDetail}/>
        <Route path="/viewPatientHistory" Component={ViewPatientHistory}/>
        <Route path="/addReport" Component={AddReport}/>
        <Route path="/doctorProfile" Component={DoctorProfile}/>
        <Route path="*" Component={ErrorPage}/>
      </Routes>
      
    </div>
  );
}

export default App;