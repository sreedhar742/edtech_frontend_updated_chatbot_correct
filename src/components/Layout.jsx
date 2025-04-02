import React, { useContext, useState } from 'react';
import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSignOutAlt, 
  faChartLine, 
  faVolumeUp,
  faVolumeMute,
  faTrophy,
  faUser  // Added user icon
} from '@fortawesome/free-solid-svg-icons';
import './Layout.css';
import { AuthContext } from './AuthContext';
import NotificationDropdown from './NotificationDropdown';
import SoundConfigModal from './SoundConfigModal';
import { soundManager } from '../utils/SoundManager';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const { username, logout } = useContext(AuthContext);
  
  // Sound configuration state
  const [showSoundConfig, setShowSoundConfig] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(soundManager.isSoundEnabled);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigationLinks = [
    { path: '/student-dash', label: 'Student Dash' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/progress-dashboard', label: 'Progress' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/quests', label: 'Quests', icon: faTrophy }
  ];

  return (
    <div id="main-content" className="d-flex flex-column min-vh-100">
      <Navbar expand="lg" className="custom-navbar">
        <Container fluid>
          <Navbar.Brand className="h3 text-white">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel" className="text-white">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="ms-auto justify-content-end flex-grow-1 pe-3">
                {navigationLinks.map((link) => (
                  <Nav.Link
                    key={link.path}
                    className={`custom-nav-link mx-2 ${currentLocation.pathname === link.path ? 'active' : ''}`}
                    onClick={() => navigate(link.path)}
                  >
                    {link.icon && <FontAwesomeIcon icon={link.icon} className="mr-2" />}
                    {link.label}
                  </Nav.Link>
                ))}
                
                {/* Sound Toggle */}
                <Nav.Link 
                  className="custom-nav-link mx-2"
                  onClick={() => setShowSoundConfig(true)}
                >
                  <FontAwesomeIcon 
                    icon={isSoundEnabled ? faVolumeUp : faVolumeMute} 
                    className="text-white"
                  />
                </Nav.Link>

                {/* Added margin to create spacing */}
                <div className="ms-3">
                  <NotificationDropdown />
                </div>
                
                {/* Admin section with spacing */}
                <Nav.Item className="d-flex align-items-center ms-3">
                  <FontAwesomeIcon 
                    icon={faUser} 
                    className="text-white" 
                  />
                  <span className="ms-2 username-text admin-text">{username}</span>
                  <FontAwesomeIcon 
                    icon={faSignOutAlt} 
                    onClick={handleLogout}  
                    className="logout-icon text-white ms-3" 
                    style={{ cursor: 'pointer' }} 
                  />
                </Nav.Item>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <main className="flex-fill">
        <Container>{children}</Container>
      </main>

      <footer className="footer text-center">
        <p>&copy; AI EDUCATOR</p>
      </footer>

      {/* Sound Configuration Modal */}
      <SoundConfigModal 
        show={showSoundConfig} 
        onHide={() => setShowSoundConfig(false)} 
      />
    </div>
  );
};

export default Layout;