import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'
import NewProject from './components/pages/NewProject'
import Project from './components/pages/Projects';
import Projeto from './components/pages/Project';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';


function App() {
  return (
    <Router>
      <Navbar/>

      <Container customClass = 'min-height'>
        <Routes>
          <Route exact path="/" element = {<Home/>}/>
          <Route path="/projects" element = {<Project/>}/>
          <Route path="/NewProject" element = {<NewProject/>}/>
          <Route path="/Contact" element = {<Contact/>}/>
          <Route path="/Company" element = {<Company/>}/>
          <Route path="/project/:id" element = {<Projeto/>}/>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
