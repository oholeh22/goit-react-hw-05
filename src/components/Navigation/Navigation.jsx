import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css'; // імпорт стилів

function Navigation() {
  return (
    <nav className={styles.headerNav}>
      <NavLink 
        to="/" 
        className={({ isActive }) => (isActive ? styles.active : '')} 
        end
      >
        Home
      </NavLink>
      <NavLink 
        to="/movies" 
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;

