import './Main.css';

import Promo from '../Promo/Promo.js';
import NavTab from '../NavTab/NavTab.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs from '../Techs/Techs.js';
import AboutMe from '../AboutMe/AboutMe.js';
import Footer from '../Footer/Footer.js';


function Main(props) {
  return (
    <>
      <main className="main">
        <Promo />
        <NavTab />
        <div className="main__designer-curvature-compensator"></div>
        <AboutProject />
        <div className="main__designer-curvature-compensator"></div>
        <Techs />
        <div className="main__designer-curvature-compensator"></div>
        <AboutMe />
      </main>
      <Footer />
    </>
  );
};

export default Main;