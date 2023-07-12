import { NavLink } from 'react-router-dom';

function NavLinkBox(props) {
  return (
    <div className={`${props.location}__links`}>
      <div className={`${props.location}__links-box ${props.location}__links-box_LoggedIn`}>
        {props.location === 'navigation-popup' &&
          (<NavLink to="/" className={({ isActive }) => `
                    ${props.location}__link
                    ${props.location}__link-loggedin
                    ${props.location}__link-opacity
                    ${isActive ? `${props.location}__link-loggedin_active` : `${props.location}__link-loggedin_unactive`}
                  `} onClick={props.location === 'navigation-popup' && props.closeNavigationPopup}>
            Главная
          </NavLink>)
        }
        <NavLink to="/movies" className={({ isActive }) => `
                    ${props.location}__link
                    ${props.location}__link-loggedin
                    ${props.location}__link-opacity
                    ${isActive ? `${props.location}__link-loggedin_active` : `${props.location}__link-loggedin_unactive`}
                  `} onClick={props.location === 'navigation-popup' && props.closeNavigationPopup}>
          Фильмы
        </NavLink>
        <NavLink to="/saved-movies" className={({ isActive }) => `
                    ${props.location}__link
                    ${props.location}__link-loggedin
                    ${props.location}__link-opacity
                  ${isActive ? `${props.location}__link-loggedin_active` : `${props.location}__link-loggedin_unactive`}
                  `} onClick={props.location === 'navigation-popup' && props.closeNavigationPopup}>
          Сохранённые фильмы
        </NavLink>
      </div>
      <NavLink to="/profile" className={({ isActive }) => `
                  ${props.location}__link
                  ${props.location}__button-loggedin
                  ${props.location}__button-opacity
                  ${isActive ? `${props.location}__button-loggedin_active` : `${props.location}__button-loggedin_unactive`}
                `} onClick={props.location === 'navigation-popup' && props.closeNavigationPopup}>
        <div className={`${props.location}__button-profile-icon`}></div>
        Аккаунт
      </NavLink>
    </div>

  )
}

export default NavLinkBox;