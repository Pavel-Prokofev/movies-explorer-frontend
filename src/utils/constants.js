// формула расчёта плавного изменения отступов и размеров боксов при изменении разрешения
// 
// результатом подставляемым в calс является решение не сложной системы уравнений на пропорцию
// 
// (
// {x * (R1/100) + z = L1
// {x * (R2/100) + z = L2
// (
// 
// R1 - начальная опорная ширина (к примеру ширина страницы или блока с элементом)
// R2 - конечная опорная ширина
// R/100 - 1% от опорной ширины
// L1 - начальный размер элемента
// L2 - конечный размер элемента
// x - колличество процентов от опорной ширины на которое меняется размер элемента
// z - компенсирующая константа
// 
// x = (L2 - L1) / ((R2 - R1) / 100)
// z = L1 - x * (R1/100) - считается всегда от R1 для единообразия погрешности при сокращёнии десятичной дроби до сотого знака после запятой
// 
// calc(x(% или vw) + z px)
// 
// Код для автоматизации расчёта, к сожалению пока не запилил, звяюсь, в тудушках на свбдное время =))

export const techsArrForTechs = [
  {
    id: 1,
    title: 'HTML'
  },
  {
    id: 2,
    title: 'CSS'
  },
  {
    id: 3,
    title: 'JS'
  },
  {
    id: 4,
    title: 'React'
  },
  {
    id: 5,
    title: 'Git'
  },
  {
    id: 6,
    title: 'Express.js'
  },
  {
    id: 7,
    title: 'mongoDB'
  }
];

export const linksArrForNavTab = [
  {
    id: 1,
    href: '#about-project',
    title: 'О проекте'
  },
  {
    id: 2,
    href: '#techs',
    title: 'Технологии'
  },
  {
    id: 3,
    href: '#about-me',
    title: 'Студент'
  }
];

export const linksArrForPortfolio = [
  {
    id: 1,
    href: 'https://github.com/Pavel-Prokofev/how-to-learn',
    title: 'Статичный сайт'
  },
  {
    id: 2,
    href: 'https://github.com/Pavel-Prokofev/travel_in_russia',
    title: 'Адаптивный сайт'
  },
  {
    id: 3,
    href: 'https://github.com/Pavel-Prokofev/express-mesto-gha',
    title: 'Одностраничное приложение'
  }
];

export const linksArrForFooter = [
  {
    id: 1,
    href: 'https://practicum.yandex.ru/',
    title: 'Яндекс.Практикум'
  },
  {
    id: 2,
    href: 'https://github.com/',
    title: 'Github'
  }
];

export const moviesArr = [
  {
    id: 1,
    nameRU: '«Роллинг Стоунз» в изгнании',
    duration: 61,
    image: '/uploads/stones_in_exile_b2f1b8f4b7.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=UXcqcdYABFw',
    like: true
  },
  {
    id: 2,
    nameRU: "All Tomorrow's Parties",
    duration: 82,
    image: '/uploads/all_tommoros_parties_33a125248d.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=D5fBhbEJxEU',
    like: false
  },
  {
    id: 3,
    nameRU: 'Без обратного пути',
    duration: 104,
    image: '/uploads/blur_a43fcf463d.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=6iYxdghpJZY',
    like: true
  },
  {
    id: 4,
    nameRU: 'Bassweight',
    duration: 61,
    image: '/uploads/zagruzhennoe_113f557116.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=dgSyC6me-jQ',
    like: false
  },
  {
    id: 5,
    nameRU: 'Taqwacore: The Birth of Punk Islam',
    duration: 80,
    image: '/uploads/taqwacore2_2f487d2e74.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=JMZ8DO9F4Mo',
    like: false
  },
  {
    id: 6,
    nameRU: 'Фавела на взрыве',
    duration: 80,
    image: '/uploads/881707734_640_d6a3a43358.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=Cugdwa7mndA',
    like: true
  },
  {
    id: 7,
    nameRU: 'Постеры, сошедшие со стен',
    duration: 72,
    image: '/uploads/posters_came_from_the_walls_2009_001_posters_180fe1a19f.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=VFMU3crg0sM',
    like: false
  },
  {
    id: 8,
    nameRU: 'Soul Power',
    duration: 92,
    image: '/uploads/images_5bfcbf36e6.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=8OprNgiOq-I',
    like: false
  },
  {
    id: 9,
    nameRU: '196 ударов в минуту',
    duration: 60,
    image: '/uploads/zagruzhennoe_1_fd5faff237.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=GsDRVpdgNJ4',
    like: true
  },
  {
    id: 10,
    nameRU: 'Hit So Hard: Школа жизни Патти Шемель',
    duration: 103,
    image: '/uploads/images_244e1fd56f.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=DMvFMeaGj_w',
    like: false
  },
  {
    id: 11,
    nameRU: 'Баллада о Дженезисе и Леди Джей',
    duration: 65,
    image: '/uploads/ballad_of_genesis_and_lady_jaye_10c27afa96.jpeg',
    trailerLink: 'https://www.youtube.com/watch?v=d8BX2FDrogo',
    like: true
  },
]