import { chainConstellation, hashId } from './constellationChain'
import type { Constellation } from './constellationTypes'

/** Оставшиеся официальные созвездия IAU (42 шт.), схемы — упрощённые цепочки для игры. */
export const IAU_REMAINING_CONSTELLATIONS: Constellation[] = [
  chainConstellation(
    {
      id: 'antlia',
      nameRu: 'Насос',
      nameLat: 'Antlia',
      fact: 'Крошечное созвездие у Млечного Пути; на старых картах его рисовали как воздушный насос.',
    },
    5 + (hashId('antlia') % 3),
  ),
  chainConstellation(
    {
      id: 'apus',
      nameRu: 'Райская Птица',
      nameLat: 'Apus',
      fact: 'У самого южного неба; звёзды неяркие, зато там красивые туманности для телескопа.',
    },
    6,
  ),
  chainConstellation(
    {
      id: 'ara',
      nameRu: 'Жертвенник',
      nameLat: 'Ara',
      fact: 'У края Млечного Пути; в мифах на алтаре совершали подношения богам.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'caelum',
      nameRu: 'Резец',
      nameLat: 'Caelum',
      fact: 'Крошечное южное созвездие; Лакайль назвал его «инструментом гравёра» — на картах это резец скульптора.',
    },
    4,
  ),
  chainConstellation(
    {
      id: 'canes-venatici',
      nameRu: 'Гончие Псы',
      nameLat: 'Canes Venatici',
      fact: 'Две яркие звезды «ведут» Волопаса на охоте; ярчайшая — Кор Карол.',
    },
    5,
    1,
    'Кор Карол',
  ),
  chainConstellation(
    {
      id: 'carina',
      nameRu: 'Киль',
      nameLat: 'Carina',
      fact: 'Киль легендарного корабля Арго; там сверхяркая Канопус и туманность Киэта.',
    },
    7,
    3,
    'Канопус',
  ),
  chainConstellation(
    {
      id: 'centaurus',
      nameRu: 'Центавр',
      nameLat: 'Centaurus',
      fact: 'Огромное южное созвездие; Альфа Центавра — ближайшая к Солнцу звёздная система.',
    },
    7,
    2,
    'Альфа Центавра',
  ),
  chainConstellation(
    {
      id: 'cepheus',
      nameRu: 'Цефей',
      nameLat: 'Cepheus',
      fact: 'Царь с «домиком» у Полярной звезды; форма напоминает детский домик или корону.',
    },
    6,
  ),
  chainConstellation(
    {
      id: 'chamaeleon',
      nameRu: 'Хамелеон',
      nameLat: 'Chamaeleon',
      fact: 'У южного полюса неба; назван в честь хамелеона, который меняет цвет.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'circinus',
      nameRu: 'Циркуль',
      nameLat: 'Circinus',
      fact: 'Маленький набор звёзд похож на циркуль из школьного кабинета черчения.',
    },
    4,
  ),
  chainConstellation(
    {
      id: 'columba',
      nameRu: 'Голубь',
      nameLat: 'Columba',
      fact: '«Голубь Ноя» с оливковой веточкой — рядом с ярким Орионом.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'coma-berenices',
      nameRu: 'Волосы Вероники',
      nameLat: 'Coma Berenices',
      fact: 'Роскошное звёздное скопление из легенды о царице, отрезавшей косы ради мужа.',
    },
    6,
  ),
  chainConstellation(
    {
      id: 'corona-australis',
      nameRu: 'Южная Корона',
      nameLat: 'Corona Australis',
      fact: 'Подковка из звёзд у Стрельца — «южная сестра» Северной короны.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'crater',
      nameRu: 'Чаша',
      nameLat: 'Crater',
      fact: 'Чаша на спине Волопаса в древнем мифе о богах и птице-вране.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'dorado',
      nameRu: 'Золотая Рыба',
      nameLat: 'Dorado',
      fact: 'Южное созвездие; внутри него огромное Магелланово Облако с туманностями.',
    },
    6,
  ),
  chainConstellation(
    {
      id: 'eridanus',
      nameRu: 'Эридан',
      nameLat: 'Eridanus',
      fact: 'Длинная «река» из звёзд тянется от Ориона к далёкому югу неба.',
    },
    8,
  ),
  chainConstellation(
    {
      id: 'fornax',
      nameRu: 'Печь',
      nameLat: 'Fornax',
      fact: 'Названо в честь химической печи; на глубоких фото там тысячи галактик.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'grus',
      nameRu: 'Журавль',
      nameLat: 'Grus',
      fact: 'Яркий журавль над южным горизонтом; соседствует с Фениксом и Туканом.',
    },
    6,
  ),
  chainConstellation(
    {
      id: 'horologium',
      nameRu: 'Часы',
      nameLat: 'Horologium',
      fact: 'Маятниковые часы на южном небе — память о точных морских часах.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'hydrus',
      nameRu: 'Южная Гидра',
      nameLat: 'Hydrus',
      fact: 'Маленький «водяной змей» у южного полюса; не путать с большой Гидрой.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'indus',
      nameRu: 'Индейец',
      nameLat: 'Indus',
      fact: 'Фигура индейца с копьём на южном небе — одно из «новых» созвездий эпохи Великих географических открытий.',
    },
    6,
  ),
  chainConstellation(
    {
      id: 'lacerta',
      nameRu: 'Ящерица',
      nameLat: 'Lacerta',
      fact: 'Крошечная ящерица между Лебедем и Пегасом — почти незаметна без карты.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'lepus',
      nameRu: 'Заяц',
      nameLat: 'Lepus',
      fact: 'Заяц прячется у ног Ориона — в мифе его преследует охотник.',
    },
    6,
  ),
  chainConstellation(
    {
      id: 'lupus',
      nameRu: 'Волк',
      nameLat: 'Lupus',
      fact: 'Животное у ног Центавра; в старину его путали с жертвой на алтаре.',
    },
    6,
  ),
  chainConstellation(
    {
      id: 'mensa',
      nameRu: 'Столовая Гора',
      nameLat: 'Mensa',
      fact: 'Названо в честь Столовой горы у Кейптауна, где Лакайль наблюдал южное небо; ярких звёзд почти нет.',
    },
    4,
  ),
  chainConstellation(
    {
      id: 'microscopium',
      nameRu: 'Микроскоп',
      nameLat: 'Microscopium',
      fact: 'Крошечное созвездие в честь первых микроскопов — рядом с Козерогом.',
    },
    4,
  ),
  chainConstellation(
    {
      id: 'musca',
      nameRu: 'Муха',
      nameLat: 'Musca',
      fact: 'Единственное настоящее «насекомое» среди созвездий; рядом с Южным Крестом.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'norma',
      nameRu: 'Наугольник',
      nameLat: 'Norma',
      fact: 'Угольник плотника у Млечного Пути — рядом со Щитом и Южным Крестом.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'octans',
      nameRu: 'Октант',
      nameLat: 'Octans',
      fact: 'Содержит южный полюс мира; ярких звёзд нет, зато это важная точка на картах.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'pavo',
      nameRu: 'Павлин',
      nameLat: 'Pavo',
      fact: 'Павлиний хвост из звёзд на южном небе — один из красивых узоров.',
    },
    6,
  ),
  chainConstellation(
    {
      id: 'phoenix',
      nameRu: 'Феникс',
      nameLat: 'Phoenix',
      fact: 'Мифическая птица, возрождающаяся из пепла; цепочка звёзд у Эридана.',
    },
    6,
  ),
  chainConstellation(
    {
      id: 'pictor',
      nameRu: 'Живописец',
      nameLat: 'Pictor',
      fact: 'Мольберт и кисть на южном небе; рядом сверкает сверхяркая Канопус.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'puppis',
      nameRu: 'Корма',
      nameLat: 'Puppis',
      fact: 'Корма корабля Арго; в южных широтах эти звёзды поднимаются высоко.',
    },
    7,
  ),
  chainConstellation(
    {
      id: 'pyxis',
      nameRu: 'Компас',
      nameLat: 'Pyxis',
      fact: 'Корабельный компас на корме; соседствует с Кормой и Парусами.',
    },
    4,
  ),
  chainConstellation(
    {
      id: 'reticulum',
      nameRu: 'Сетка',
      nameLat: 'Reticulum',
      fact: 'Сетка в окуляре старого телескопа — крошечное южное созвездие.',
    },
    4,
  ),
  chainConstellation(
    {
      id: 'sculptor',
      nameRu: 'Скульптор',
      nameLat: 'Sculptor',
      fact: 'Стол скульптора у южного неба; там целое поле далёких галактик.',
    },
    6,
  ),
  chainConstellation(
    {
      id: 'sextans',
      nameRu: 'Секстант',
      nameLat: 'Sextans',
      fact: 'Морской секстант в честь приборов, которыми измеряли высоту звёзд.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'telescopium',
      nameRu: 'Телескоп',
      nameLat: 'Telescopium',
      fact: 'Крошечное созвездие в честь телескопа — память о науке Нового времени.',
    },
    4,
  ),
  chainConstellation(
    {
      id: 'triangulum-australe',
      nameRu: 'Южный Треугольник',
      nameLat: 'Triangulum Australe',
      fact: 'Яркий равнобедренный треугольник рядом с Южным Крестом — не спутать с северным Треугольником.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'tucana',
      nameRu: 'Тукан',
      nameLat: 'Tucana',
      fact: 'Птица с большим клювом; рядом Малое Магелланово Облако.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'volans',
      nameRu: 'Летучая Рыба',
      nameLat: 'Volans',
      fact: 'Рыба, выпрыгивающая из воды; у самого южного края неба.',
    },
    5,
  ),
  chainConstellation(
    {
      id: 'vulpecula',
      nameRu: 'Лисичка',
      nameLat: 'Vulpecula',
      fact: 'Маленькая лисица с гусём на старых рисунках; там знаменитая Туманность Гантель.',
    },
    6,
  ),
]
