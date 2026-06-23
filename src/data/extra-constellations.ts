import { chainConstellation } from './constellationChain'
import type { Constellation } from './constellationTypes'

/**
 * Дополнительные узоры неба: астеризмы, скопления и «наблюдательные» ориентиры.
 * Не дублируют официальные 88 созвездий МАС как карточки; часть имён — части тех же фигур на карте.
 * Схемы — упрощённые цепочки для игры.
 */
const RAW = `
compass-rose|Роза ветров|Compass rose|Узор компаса на морских картах — напоминание, как ориентироваться по сторонам света.
anchor|Якорь на небе|Anchor asterism|Морской якорь как символ: звёзды помогают не сбиться с пути ночью.
great-rift|Большой разлом|Great Rift|Тёмная полоса пыли рассекает Млечный Путь — видна без приборов.
galactic-core-dir|К центру Галактики|Galactic center|В сторону Стрельца — спрятан центр нашего Млечного Пути.
pole-star-path|Путь к Полярной|Pole star path|По «стороне ковша» Большой Медведицы находят Полярную звезду.
ecliptic-path|Дорога планет|Ecliptic|Солнце и планеты год за годом движутся почти по одной дуге неба.
cassiopeia-w|Буква W Кассиопеи|Cassiopeia W|Пять ярких звёзд — самый узнаваемый узор царицы.
andromeda-line|Цепочка к Андромеде|Andromeda chain|Яркая цепочка ведёт к туманности Андромеды M31.
pegasus-square|Квадрат Пегаса|Pegasus Great Square|Четыре звезды — тело летающего коня на небе.
cygnus-cross|Северный крест|Northern Cross|Лебедь вдоль Млечного Пути: Денеб наверху «креста».
aquarius-jar|Кувшин Водолея|Water jar|Узор струи воды из кувшина на звёздных картах.
capricorn-fish-tail|Рыбий хвост Козерога|Sea-goat tail|Часть фигуры зодиакального Козерога — коза с рыбьим хвостом.
pisces-cord|Шнур Рыб|Pisces cord|Две рыбки соединены верёвкой на классических картах.
libra-scales|Чаши Весов|Libra scales|Две чаши весов у зодиакальных Весов.
aries-horn|Изгиб Овна|Aries curve|Плавная дуга звёзд у зодиакального Овна.
taurus-face|Голова быка|Taurus face|Альдебаран и Гиады намечают голову Тельца.
gemini-feet|Ноги Близнецов|Gemini feet|Две цепочки внизу от ярких Кастора и Поллукса.
cancer-beehive|Улей в Раке|Beehive cluster|Яркое рассеянное скопление M44 внутри Рака.
leo-triangle|Треугольник у Льва|Leo triangle|Яркие звёзды у хвоста и бёдер Льва.
bootes-kite|Змей у Волопаса|Boötes kite|Ромб возле Арктура похож на воздушного змея.
virgo-spica-spike|Колос у Спики|Spica spike|Яркая Спика — как колос у зодиакальной Девы.
scorpius-sting|Жало Скорпиона|Scorpion sting|Кончик хвоста с яркими звёздами у Скорпиона.
ophiuchus-waist|Пояс Змееносца|Ophiuchus waist|Середина фигуры между двумя частями Змеи.
serpens-gap|Две части Змеи|Serpens split|Змея на картах разорвана вокруг Змееносца на «голову» и «хвост».
draco-coils|Витки Дракона|Draco coils|Дракон обвивается вокруг Малой Медведицы.
cepheus-house|Домик Цефея|Cepheus house|Фигура как детский домик у Полярной звезды.
perseus-chain|Цепь Персея|Perseus chain|Цепочка от Алголы к богатым туманностям и скоплениям.
auriga-capella-cap|Капелла в Возничем|Capella cap|Яркая Капелла — вершина пятиугольника Возничего.
lyra-harp|Корпус лиры|Lyra frame|Ромбик возле Веги — корпус музыкальной лиры.
aquila-shaft|Столб к Орлу|Aquila shaft|Цепочка вниз от яркого Альтаира.
sagitta-arrow|Маленькая стрела|Sagitta arrow|Крошечный астеризм-стрела рядом с Лебедем и Лирой.
delphinus-leap|Дельфин в прыжке|Dolphin leap|Ромб с хвостиком — узор Дельфина.
equuleus-head|Малый конь рядом с Пегасом|Foal head|Крошечный узор Малого коня у Пегаса.
canes-leash|Гончие у Волопаса|Hounds leash|Две яркие звезды Гончих как «поводок» охоты.
coma-cluster|Скопление Волос|Coma star cluster|Роскошное рассеянное скопление в Волосах Вероники.
crater-cup|Чаша|Crater cup|Чаша на классических картах рядом с Волопасом.
hydra-neck|Начало Гидры|Hydra head|Первый изгиб длинной змеи у Рака и Секстанта.
puppis-stern|Корма Арго|Puppis deck|Яркие звёзды кормы легендарного корабля.
vela-sail-panel|Парус Арго|Vela sail|Парус корабля Арго у Млечного Пути.
carina-keel-line|Киль Арго|Carina keel|Линия вдоль киля с сверхяркой Канопусом.
centaur-legs|Ноги Центавра|Centaurus legs|Нижняя часть огромного южного Центавра.
lupus-beast|Волк у Центавра|Lupus figure|Фигура Волка рядом с жертвенником и Кентавром.
ara-altar|Жертвенник|Ara figure|Алтарь у края Млечного Пути на звёздных картах.
corona-australis-jewel|Подковка Южной короны|Corona Austr. arc|Дуга звёзд у Стрельца.
telescopium-tube|Труба телескопа|Telescopium figure|Современный узор-компакт на южном небе.
microscopium-lens|Микроскоп|Microscopium figure|Крошечная фигура у Козерога на карте.
sculptor-easel|Мольберт Скульптора|Sculptor figure|Узор у южного горизонта — поле далёких галактик.
fornax-furnace|Поле галактик Печи|Fornax deep sky|В Печи на длинных снимках — тысячи галактик.
phoenix-wing|Крыло Феникса|Phoenix figure|Птица среди южных звёзд у Эридана.
grus-neck|Шея Журавля|Grus figure|Журавль тянет шею над южным горизонтом.
tucana-beak|Тукан и Облако|Tucana LMC|Большой клюв рядом с Малым Магеллановым Облаком.
musca-wing|Муха у Южного Креста|Musca figure|Крошечная фигура рядом с Южным Крестом.
chamaeleon-tail|Хамелеон у полюса|Chamaeleon figure|Прижимается к южному полюсу мира.
octans-pole|Около южного полюса|South pole region|Мало ярких звёзд, но важная точка на глобусе неба.
apus-tail|Райская птица|Apus figure|Фигура у самого юга небесного свода.
dorado-fish|Золотая рыба и Облако|Dorado LMC|Рыбка у Большого Магелланова Облака.
volans-splash|Летучая рыба|Volans figure|Рыба «выпрыгивает» из воды на карте.
reticulum-net|Сетка в окуляре|Reticulum figure|Сетка для измерений в старых телескопах.
horologium-pendulum|Часы|Horologium figure|Маятниковые часы на южной карте.
eridanus-river|Река Эридан|Eridanus river|Длинная цепочка от Ориона к югу.
eridanus-head|Верх Эридана|Eridanus head|Начало «реки» у Ориона.
orion-belt|Пояс Ориона|Orion's Belt|Три звезды в ряд — самый узнаваемый зимний узор.
orion-sword|Меч Ориона|Orion's Sword|Под поясом — звёзды и туманность; в темноте видна без телескопа.
pleiades-apt|Плеяды|Pleiades|Яркое рассеянное скопление в Тельце, хорошо видно невооружённым глазом.
hyades-v|V Гиад|Hyades|У Альдебарана — «нос» быка из ближнего скопления.
big-dipper|Большой ковш|Big Dipper|Семь звёзд внутри Большой Медведицы.
little-dipper|Малый ковш|Little Dipper|Ковшик с Полярной в Малой Медведице.
summer-triangle|Летний треугольник|Summer Triangle|Вега, Денеб и Альтаир — летний небесный треугольник.
winter-triangle|Зимний треугольник|Winter Triangle|Сириус, Процион и Бетельгейзе — зимний треугольник.
winter-hexagon|Зимний шестиугольник|Winter Hexagon|Шесть ярких звёзд почти замыкают зимнее кольцо.
coathanger|Вешалка Броуки|Brocchi's Cluster|Астеризм в Лисичке — похож на вешалку для одежды.
false-cross|Ложный крест|False Cross|Похож на Южный крест, но это звёзды Парусов и Кормы.
diamond-cross|Южный ромб|Diamond Cross|Ромб из ярких звёзд на южном небе.
m31-andromeda|Галактика Андромеды|M31|Ближайшая крупная галактика; в бинокль — овальный дымок.
orion-nebula-m42|Туманность Ориона|M42|Под средней звездой пояса; в темноте видна невооружённым глазом.
virgo-cluster-apt|Скопление галактик в Деве|Virgo Cluster|Направление к тысячам галактик в созвездии Дева.
double-cluster|Двойное скопление Персея|NGC 869/884|Два ярких скопления рядом на Млечном Пути.
southern-pointers|Указатели на Южный крест|Southern Pointers|Две яркие звезды Центавра указывают на Южный крест.
magellanic-clouds|Магеллановы Облака|Magellanic Clouds|Два спутника нашей Галактики — видны из южных широт.
sagittarius-teapot|Чайник Стрельца|Sagittarius Teapot|Яркие звёзды летом складываются в чайник: ручка, крышка и носик «льют» Млечный Путь.
leo-sickle|Серп Льва|Leo Sickle|Изогнутая цепочка у Регула — «серп» головы льва, один из самых узнаваемых весенних узоров.
spring-diamond|Весенний алмаз|Spring Diamond|Регул, Арктур, Спика и Денебола образуют большой ромб на весеннем небе.
hercules-keystone|Замочная скважина|Hercules Keystone|Трапециевидный «кирпичик» в Геркулесе — через него находят гигантское скопление M13.
raccoon|Енот|Raccoon|Фантазийный узор: если соединить звёзды по цепочке, можно представить мордочку и хвост енота.
`

function parseRaw(): Constellation[] {
  const rows = RAW.trim().split('\n').map((line) => line.trim()).filter(Boolean)
  if (rows.length === 0) {
    throw new Error('extra-constellations: RAW is empty')
  }
  return rows.map((line, i) => {
    const parts = line.split('|')
    if (parts.length !== 4) throw new Error(`Bad row: ${line}`)
    const [slug, nameRu, nameLat, fact] = parts
    const id = `extra-${slug}`
    const nStars = 4 + (i % 5)
    return chainConstellation({ id, nameRu, nameLat, fact }, nStars)
  })
}

export const EXTRA_CONSTELLATIONS: Constellation[] = parseRaw()
