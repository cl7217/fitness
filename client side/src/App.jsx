import './App.css'
import React, { useState, createContext, useContext } from 'react'
import SignIn from './features/user/signIn'
import SignUp from './features/user/signUp'

import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/protected'
import ListPackages from './features/package/listPackages'
import History from './features/purchase/history'
import Lessons from './features/lesson/lessons'
import LetterAvatars from './features/user/Account'
import Navbar from './components/navbar'
import ResponsiveAppBar from './components/Nav'
import DashboardLayoutBasic from './components/Toolpad'
import CustomizedTables from './features/lesson/try'
import DataTable from './features/lesson/try'
import ActiveRentals from './features/rental/activeRentals'
import ColumnSpanningDerived from './features/lesson/try'
import ScheduleTable from './features/lesson/table'
import BasicDateCalendar from './components/calendar'
import TabsBottomNavExample from './components/menu'
import CompanyRegistrationStepper from './components/steps'
import CircularProgressButton from './components/circularProgress'
import LessonBooking from './components/lessonBooking'
import { Modal } from './components/Modal'
import MainLayout from './components/mainLayet'
import CreditCardForm from './components/creditCard'
import UserRentals from './features/rental/rentals'


// Create global modal context
const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    content: null,
    onClose: () => { }
  });

  const openModal = (title, content, onClose) => {
    setModalState({
      isOpen: true,
      title,
      content,
      onClose: onClose || (() => setModalState(prev => ({ ...prev, isOpen: false })))
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const updateModalContent = (newContent) => {
    setModalState(prev => ({ ...prev, content: newContent }));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, updateModalContent }}>

      <Routes>
        {/* נתיבים בלי ה-AppBar */}
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />

        {/* נתיבים עם AppBar דרך ה-Layout */}
        <Route element={<MainLayout />}>
          
          
          <Route path="packages" element={<ListPackages />} />
          <Route path='history-purchase' element={<History />} />
        {/* <ProtectedRoute>   */}
          <Route path='lessons' element={<ScheduleTable />} />
          {/* </ProtectedRoute> */}
          <Route path='rentals' element={<UserRentals />} />
          <Route path='calendar' element={<BasicDateCalendar />} />
          <Route path='menu' element={<TabsBottomNavExample />} />
          <Route path='steps' element={<CompanyRegistrationStepper />} />
          <Route path='progress' element={<CircularProgressButton />} />
          <Route path='booking' element={<LessonBooking />} />
          <Route path='account' element={<LetterAvatars />} />
          <Route path='toolpad' element={<DashboardLayoutBasic />} />
          <Route path="*" element={<><h2>404</h2><br /><p>page not found</p></>}></Route>
        </Route>
      </Routes>

{/* <CreditCardForm/> */}

      {/* Global Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={modalState.title}
      >
        {modalState.content}
      </Modal>
    </ModalContext.Provider>
  )
}

export default App
