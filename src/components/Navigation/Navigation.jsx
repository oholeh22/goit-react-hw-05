import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={css.nav}>
      <ul>
        <li>
          <NavLink to="/" exact className={css.navLink} activeClassName={css.activeLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={css.navLink} activeClassName={css.activeLink}>
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={css.navLink} activeClassName={css.activeLink}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
