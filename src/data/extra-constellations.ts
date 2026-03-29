import { chainConstellation } from './constellationChain'
import type { Constellation } from './constellationTypes'

/**
 * Сто дополнительных «узоров неба»: исторические имена, астеризмы и сказочные подписи.
 * Не входят в официальные 88 IAU (кроме совпадения имён с известными астеризмами на небе).
 * Схемы — упрощённые цепочки для той же игры.
 */
const RAW = `
argo-navis|Корабль Арго|Argo Navis|Когда-то весь корабль Ясона был одним созвездием; сейчас это Киль, Корма и Паруса.
antinous|Антиной|Antinous|Историческая фигура рядом с Орлом в честь любимца римского императора.
cerberus|Цербер|Cerberus|Трёхглавый пёс из мифов иногда рисовали у ног Геркулеса на старых картах.
rangifer|Северный олень|Rangifer|Бывшее северное созвездие с оленем; сегодня звёзды вошли в другие фигуры.
robur-carolinum|Дуб Карла|Robur Carolinum|«Королевский дуб» XVII века — красивая, но недолгая небесная шутка картографов.
quadrans|Стенной квадрант|Quadrans Muralis|Созвездие убрали, но метеорный поток Квадрантиды напоминает о нём каждый январь.
officina-typographica|Типография|Officina Typographica|Памятник книгопечатанию среди звёзд эпохи Просвещения.
machina-electrica|Электрическая машина|Machina Electrica|Название времен опытов с электричеством и грозовыми «искрами».
frederici-honores|Почёт Фридриха|Frederici Honores|Историческая дань прусскому королю на небесной карте.
sceptrum-brandenburgicum|Скипетр Бранденбурга|Sceptrum Brandenburgicum|Скипетр на звёздном своде XVII века.
apis|Священный бык Апис|Apis|Египетский бык среди звёзд на старых атласах.
felis|Кошка|Felis|Кошка гонялась за мышью на исторических картах рядом с Орионом.
gallus|Петух|Gallus|Петух на «небесной ферме» рядом с Парусами и Кормой.
anser|Гусь|Anser|Гусь в Млечном Пути — маленькое старое имя у лебединой фигуры.
jordanus|Река Иордан|Jordanus|Река из звёзд на картах XVII–XVIII веков.
siren|Сирены|Sirenum|Морские сирены на пути к Золотому руну.
tarandus|Олень Тарандус|Tarandus|Ещё одно оленье имя из прошлых каталогов.
tigris|Тигр|Tigris|Полоса звёзд напоминала тигра у реки.
vesuvius|Везувий|Vesuvius|Вулкан на карте для любителей Италии и географии.
hippopotamus|Бегемот|Hippopotamus|Редкое историческое имя на южных картах.
anchor|Якорь|Anchor|Якорь моряков среди звёзд — память о мореплавании.
cancer-minor|Рак малый|Cancer Minor|Шутливое «дополнение» к знаку Рака на старых гравюрах.
psalterium-georgii|Псалтырь Георга|Psalterium Georgii|Арфа в честь короля Георга на небе.
honores-hevelii|Почёт Гевелия|Honores Hevelii|Дань великому составителю звёздных карт.
lilium|Лилия|Lilium|Цветок на карте как гербозначимый узор.
camelopardus-old|Старый жираф|Camelopardalis vetus|Напоминание, как менялись границы «жирафа» на небе.
nubecula-major|Большое облако|Nubecula Major|Старое имя для Магелланова Облака.
nubecula-minor|Малое облако|Nubecula Minor|Старое имя для Малого Магелланова Облака.
bufo|Жаба|Bufo|Забавное историческое существо на южных картах.
limax|Слизняк|Limax|Крошечное «небесное животное» из старых списков.
sagitta-antonii|Стрела Антония|Sagitta Antonii|Историческое имя стрелы на небе.
archimedis|Саркофаг Архимеда|Archimedis|Редкое памятное имя эпохи классики.
charles-oak|Дуб Карла II|Robur Carolinum alt.|Связано с английской историей и прозвищем короля.
antinous-canis|Пёс Антиноя|Canis Antinous|Вариант рисунка рядом с ярким Орлом.
cerberus-et-baculum|Цербер с палкой|Cerberus et Baculum|Сложный мифологический ярлык на старой гравюре.
river-ernidanus|Верх Эридана|Eridanus head|Условное имя для «истока» длинной реки из звёзд.
river-po|Река По|Padus|Река на итальянских небесных картах прошлого.
triangulum-minus|Малый треугольник|Triangulum Minus|Историческое крошечное треугольное пятнышко.
solarium|Солнечные часы|Solarium|«Часы» на небе рядом с эклиптикой в старой символике.
telescopium-herschelii|Телескоп Гершеля|Telescopium Herschelii|Память о больших телескопах открытий.
battery|Батарея пушек|Battery|Военно-морской узор на редких картах.
compass-rose|Роза ветров|Compass rose|Навигационный узор, перекликающийся с Компасом на небе.
great-rift|Большой разлом|Great Rift|Тёмная пыль рассекает Млечный Путь.
galactic-core-dir|К центру Галактики|Galactic center|Стрелец указывает в сторону центра Млечного Пути.
cassiopeia-w|Трон Кассиопеи|Cassiopeia W|Буква W — кресло царицы.
andromeda-line|Линия к галактике|Andromeda line|Цепочка ведёт к туманности Андромеды M31.
pegasus-square|Квадрат Пегаса|Pegasus Square|Большой квадрат — тело летающего коня.
cygnus-cross|Северный крест|Northern Cross|Лебедь вдоль Млечного Пути — крест с Денебом наверху.
aquarius-jar|Кувшин Водолея|Water jar|Классический рисунок струи воды из кувшина.
capricorn-fish-tail|Рыбий хвост Козерога|Sea-goat tail|Миф о козле с рыбьим хвостом.
pisces-cord|Шнур Рыб|Pisces cord|Две рыбы соединены верёвкой на картах.
libra-scales|Чаши Весов|Libra scales|Когда-то это были клешни Скорпиона.
aries-horn|Рог Овна|Aries horn|Плавная дуга зодиакального Овна.
taurus-face|Морда быка|Taurus face|Гиады и Альдебаран — голова быка.
gemini-feet|Ноги Близнецов|Gemini feet|Две цепочки внизу от Кастора и Поллукса.
cancer-beehive|Улей в Раке|Beehive cluster|Яркое скопление «Улей» внутри Рака.
leo-triangle|Треугольник у Льва|Leo triangle|Яркие звёзды рядом с хвостом Льва.
bootes-kite|Змей у Волопаса|Boötes kite|Ромб возле Арктура похож на воздушного змея.
virgo-spica-spike|Шип у Спики|Spike|Яркая Спика — как колос у Девы.
scorpius-sting|Жало Скорпиона|Scorpion sting|Кончик хвоста с яркими звёздами.
ophiuchus-waist|Пояс Змееносца|Ophiuchus waist|Середина фигуры между двумя частями Змеи.
serpens-gap|Разрыв Змеи|Serpens split|Змея на картах разорвана на две части вокруг Змееносца.
draco-coils|Витки Дракона|Draco coils|Дракон обвивается вокруг Малой Медведицы.
cepheus-house|Домик Цефея|Cepheus house|Форма как детский домик у Полярной.
perseus-chain|Цепь Персея|Perseus chain|Цепочка от Алголь к скоплениям и туманностям.
auriga-capella-cap|Шапка Капеллы|Capella cap|Яркая Капелла — вершина пятиугольника Возничего.
lyra-harp|Корпус лиры|Lyra frame|Ромбик возле Веги — корпус музыкальной лиры.
aquila-shaft|Столб к Орлу|Aquila shaft|Цепочка вниз от Альтаира.
sagitta-arrow|Маленькая стрела|Sagitta arrow|Крошечная стрела летит мимо Лебедя.
delphinus-leap|Прыжок Дельфина|Dolphin leap|Ромб с хвостиком — дельфин в небе.
equuleus-head|Голова Малого коня|Foal head|Крошечный узор рядом с Пегасом.
canes-leash|Поводок гончих|Hounds leash|Две звезды как поводок у Волопаса.
coma-cluster|Скопление Волос|Coma cluster|Роскошное скопление в Волосах Вероники.
crater-cup|Чаша у Волопаса|Crater cup|Чаша на спине Волопаса в мифе.
hydra-neck|Шея Гидры|Hydra neck|Начало длинной змеи у Рака и Секстанта.
puppis-stern|Кормовая палуба|Puppis deck|Яркие звёзды кормы корабля Арго.
vela-sail-panel|Парус|Vela sail|Парус корабля Арго у Млечного Пути.
carina-keel-line|Кильный ряд|Carina keel|Линия вдоль киля с Канопусом.
centaur-legs|Ноги Кентавра|Centaur legs|Нижняя часть огромного Кентавра.
lupus-beast|Зверь Волка|Lupus beast|Жертва на алтаре в мифе о Центавре.
ara-altar|Жертвенный алтарь|Ara altar|Алтарь у края Млечного Пути.
corona-australis-jewel|Камень Южной короны|Corona Austr. jewel|Дуга «подковки» у Стрельца.
telescopium-tube|Труба телескопа|Telescope tube|Крошечное созвездие-телескоп на юге.
microscopium-lens|Линза микроскопа|Microscope lens|Микроскоп у Козерога на карте.
sculptor-easel|Мольберт Скульптора|Sculptor easel|Стол скульптора у южного горизонта.
fornax-furnace|Огонь печи|Fornax fire|Печь с тысячами далёких галактик на снимках.
phoenix-wing|Крыло Феникса|Phoenix wing|Птица поднимается из звёзд у Эридана.
grus-neck|Шея журавля|Grus neck|Журавль тянет шею к югу.
tucana-beak|Клюв тукана|Tucan beak|Большой клюв у Малого Магелланова Облака.
indus-spear|Копьё Индуса|Indus spear|Фигура с копьём на южном небе.
musca-wing|Крыло мухи|Musca wing|Маленькая муха рядом с Южным Крестом.
chamaeleon-tail|Хвост хамелеона|Chameleon tail|Прижимается к южному полюсу мира.
octans-pole|Около южного полюса|Near south pole|Здесь нет ярких звёзд, зато важная точка карты.
apus-tail|Хвост райской птицы|Apus tail|Райская птица у самого юга.
dorado-fish|Золотая рыбка|Dorado fish|Рыбка у Магелланова Облака.
volans-splash|Брызги летучей рыбы|Volans splash|Рыба «выпрыгивает» из воды на карте.
reticulum-net|Сетка в окуляре|Reticulum net|Сетка для измерений в старых телескопах.
horologium-pendulum|Маятник часов|Horologium pendulum|Часы с маятником на южном небе.
eridanus-river|Река Эридан|Eridanus river|Длинная река от Ориона к югу.
cetus-monster|Чудовище Кит|Cetus monster|Морское чудище из мифа об Андромеде.
`

function parseRaw(): Constellation[] {
  const rows = RAW.trim().split('\n').map((line) => line.trim()).filter(Boolean)
  if (rows.length !== 100) {
    throw new Error(`extra-constellations: expected 100 rows, got ${rows.length}`)
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
