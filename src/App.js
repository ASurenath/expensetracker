import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Charts from './pages/Charts';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Flip } from 'react-toastify';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <Header style={{ position: 'fixed' }}></Header>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/dashboard'} element={<Dashboard />} />
        <Route path={'/charts'} element={<Charts />} />
        <Route path={'/categories'} element={<Categories />} />
      </Routes>

      <Footer></Footer>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />    </div>
  );
}

export default App;
