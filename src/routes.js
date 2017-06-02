import Home from './components/pages/Home';
import About from './components/pages/About';
import Person from './components/pages/Person';
import PersonEdit from './components/pages/PersonEdit';
import SessionEdit from './components/pages/SessionEdit';
import Session from './components/pages/Session';
import Report from './components/pages/Report';

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/home/',
    component: Home
  },
  {
    path: '/person/:id/',
    component: PersonEdit
  },
  {
    path: '/person/',
    component: Person
  },
  {
    path: '/session/:id/',
    component: SessionEdit
  },
  {
    path: '/session/',
    component: Session
  },
  {
    path: '/report/',
    component: Report
  },
  {
    path: '/about/',
    component: About
  }
];
