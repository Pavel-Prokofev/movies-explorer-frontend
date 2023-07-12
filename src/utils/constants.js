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