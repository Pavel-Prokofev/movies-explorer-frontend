import { useNavigate } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1, { replace: true });
  };

  return (
    <section className="page-not-found">
      <div className="page-not-found__box">
        <div className="page-not-found__heading-box">
          <h2 className="page-not-found__heading" >404</h2>
          <p className="page-not-found__text">Страница не найдена</p>
        </div>
        <p className="page-not-found__link-back" onClick={goBack}>Назад</p>
      </div>
    </section>
  );
};

export default PageNotFound;