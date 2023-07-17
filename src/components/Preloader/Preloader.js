import './Preloader.css'

import { useLocation } from 'react-router-dom';

const Preloader = (props) => {

    const location = useLocation();

    return (
        <div className={`preloader ${props.preloaderOn ?
            ((location.pathname === '/movies' || location.pathname === '/saved-movies') ?
                'preloader_opened-movie' : 'preloader_opened') :
            'preloader_movie'}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader;