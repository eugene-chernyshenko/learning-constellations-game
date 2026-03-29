import { useCallback, useMemo, useState } from 'react'
import {
  CONSTELLATIONS,
  getConstellation,
  isZodiacConstellation,
  type Constellation,
} from './data/constellations'
import { StarField } from './components/StarField'

type Screen =
  | { name: 'home' }
  | { name: 'pick'; intent: 'learn' | 'connect' }
  | { name: 'learn'; id: string }
  | { name: 'playMenu' }
  | { name: 'connect'; id: string }
  | { name: 'guess' }

function shuffle<T>(items: T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickGuessTriplet(): {
  correct: Constellation
  options: Constellation[]
} {
  const correct = CONSTELLATIONS[Math.floor(Math.random() * CONSTELLATIONS.length)]
  const pool = CONSTELLATIONS.filter((c) => c.id !== correct.id)
  const wrong = shuffle(pool).slice(0, 2)
  const options = shuffle([correct, ...wrong])
  return { correct, options }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: 'home' })

  const goHome = useCallback(() => setScreen({ name: 'home' }), [])

  if (screen.name === 'home') {
    return (
      <div className="app">
        <header>
          <h1>Звёзды и созвездия</h1>
          <p className="subtitle">Узнай узор на небе и сыграй</p>
        </header>
        <div className="stack" style={{ marginTop: 8 }}>
          <button
            type="button"
            className="btn btnPrimary"
            onClick={() => setScreen({ name: 'pick', intent: 'learn' })}
          >
            Узнать созвездия
          </button>
          <button
            type="button"
            className="btn btnSecondary"
            onClick={() => setScreen({ name: 'playMenu' })}
          >
            Играть
          </button>
        </div>
      </div>
    )
  }

  if (screen.name === 'pick') {
    return (
      <PickScreen
        intent={screen.intent}
        onBack={goHome}
        onSelect={(id) => {
          if (screen.intent === 'learn') setScreen({ name: 'learn', id })
          else setScreen({ name: 'connect', id })
        }}
      />
    )
  }

  if (screen.name === 'learn') {
    return (
      <LearnScreen
        id={screen.id}
        onBack={() => setScreen({ name: 'pick', intent: 'learn' })}
      />
    )
  }

  if (screen.name === 'playMenu') {
    return (
      <div className="app">
        <div className="screenHeader">
          <button type="button" className="btn btnGhost backMini" onClick={goHome}>
            Назад
          </button>
          <h2>Выбери игру</h2>
          <span style={{ width: 88 }} aria-hidden />
        </div>
        <div className="stack">
          <button
            type="button"
            className="btn btnPrimary"
            onClick={() => setScreen({ name: 'pick', intent: 'connect' })}
          >
            Соедини звёзды
          </button>
          <button
            type="button"
            className="btn btnSecondary"
            onClick={() => setScreen({ name: 'guess' })}
          >
            Угадай созвездие
          </button>
        </div>
      </div>
    )
  }

  if (screen.name === 'connect') {
    return (
      <ConnectScreen
        id={screen.id}
        onBack={() => setScreen({ name: 'pick', intent: 'connect' })}
      />
    )
  }

  if (screen.name === 'guess') {
    return <GuessScreen onBack={() => setScreen({ name: 'playMenu' })} />
  }

  return (
    <div className="app">
      <p className="subtitle">Что-то пошло не так — вернись на главную.</p>
      <button type="button" className="btn btnGhost" onClick={goHome}>
        На главную
      </button>
    </div>
  )
}

type PickGroup = 'zodiac' | 'official' | 'extra'

function PickScreen({
  intent,
  onBack,
  onSelect,
}: {
  intent: 'learn' | 'connect'
  onBack: () => void
  onSelect: (id: string) => void
}) {
  const [group, setGroup] = useState<PickGroup | null>(null)

  const title =
    intent === 'learn' ? 'Какое созвездие изучим?' : 'Выбери созвездие'

  const zodiacList = useMemo(
    () => CONSTELLATIONS.filter((c) => isZodiacConstellation(c.id)),
    [],
  )
  const bonusList = useMemo(
    () => CONSTELLATIONS.filter((c) => c.id.startsWith('extra-')),
    [],
  )
  const classicExtraList = useMemo(
    () =>
      CONSTELLATIONS.filter(
        (c) => !isZodiacConstellation(c.id) && !c.id.startsWith('extra-'),
      ),
    [],
  )

  const groupTitle =
    group === 'zodiac'
      ? 'Зодиак'
      : group === 'official'
        ? 'Все официальные'
        : group === 'extra'
          ? 'Дополнительные узоры'
          : null

  const renderCard = (c: Constellation) => (
    <button
      key={c.id}
      type="button"
      className="card"
      onClick={() => onSelect(c.id)}
    >
      <StarField
        constellation={c}
        showAllEdges
        compact
        hideStarLabels
      />
      <div className="cardTitle">{c.nameRu}</div>
      <div className="cardLat">{c.nameLat}</div>
    </button>
  )

  return (
    <div className="app">
      <div className="screenHeader">
        <button type="button" className="btn btnGhost backMini" onClick={onBack}>
          Назад
        </button>
        <h2>{title}</h2>
        <span style={{ width: 88 }} aria-hidden />
      </div>

      {group === null ? (
        <div className="stack categoryPick">
          <p className="subtitle">Сначала выбери группу</p>
          <button
            type="button"
            className="btn btnPrimary"
            onClick={() => setGroup('zodiac')}
          >
            Зодиак
            <span className="categoryCount"> {zodiacList.length} созвездий</span>
          </button>
          <button
            type="button"
            className="btn btnSecondary"
            onClick={() => setGroup('official')}
          >
            Все официальные
            <span className="categoryCount"> {classicExtraList.length}</span>
          </button>
          <button
            type="button"
            className="btn btnSecondary"
            onClick={() => setGroup('extra')}
          >
            Дополнительные узоры
            <span className="categoryCount"> {bonusList.length}</span>
          </button>
          <p className="subtitle categoryHint">
            В третьей группе — астеризмы, скопления и ориентиры на небе; это не
            второй список официальных созвездий МАС.
          </p>
        </div>
      ) : (
        <>
          <button
            type="button"
            className="btn btnGhost backToGroups"
            onClick={() => setGroup(null)}
          >
            Назад к группам
          </button>
          <h3 className="sectionLabel pickGroupHeading">{groupTitle}</h3>
          {group === 'extra' && (
            <p className="subtitle" style={{ marginTop: -6, marginBottom: 10 }}>
              Астеризмы, скопления и навигационные узоры — не отдельные
              официальные созвездия МАС.
            </p>
          )}
          <div className="cardGrid">
            {(group === 'zodiac'
              ? zodiacList
              : group === 'official'
                ? classicExtraList
                : bonusList
            ).map(renderCard)}
          </div>
        </>
      )}
    </div>
  )
}

function LearnScreen({ id, onBack }: { id: string; onBack: () => void }) {
  const c = getConstellation(id)
  const [visibleEdges, setVisibleEdges] = useState(0)
  const [selectedStar, setSelectedStar] = useState<number | null>(null)

  if (!c) {
    return (
      <div className="app">
        <p>Не найдено</p>
        <button type="button" className="btn btnGhost" onClick={onBack}>
          Назад
        </button>
      </div>
    )
  }

  const maxEdge = c.edges.length
  const allShown = visibleEdges >= maxEdge

  return (
    <div className="app">
      <div className="screenHeader">
        <button type="button" className="btn btnGhost backMini" onClick={onBack}>
          Назад
        </button>
        <h2>{c.nameRu}</h2>
        <span style={{ width: 88 }} aria-hidden />
      </div>
      <p className="subtitle" style={{ margin: '-6px 0 0' }}>
        {c.nameLat}
      </p>

      <StarField
        constellation={c}
        learnVisibleEdges={visibleEdges}
        selectedStar={selectedStar}
        onStarClick={(i) => setSelectedStar(selectedStar === i ? null : i)}
      />

      <div className="learnToolbar">
        <div className="progressDots" aria-hidden>
          {c.edges.map((_, i) => (
            <span key={i} className={i < visibleEdges ? 'on' : ''} />
          ))}
        </div>
        {!allShown ? (
          <button
            type="button"
            className="btn btnPrimary"
            onClick={() =>
              setVisibleEdges((v) => Math.min(v + 1, maxEdge))
            }
          >
            Показать линию
          </button>
        ) : (
          <p className="toastOk">Узор целиком!</p>
        )}
      </div>

      <div className="panel">
        <p className="fact">{c.fact}</p>
      </div>
      <p className="subtitle" style={{ fontSize: '0.85em' }}>
        Нажми на звезду — увидишь её имя
      </p>
    </div>
  )
}

function ConnectScreen({ id, onBack }: { id: string; onBack: () => void }) {
  const c = getConstellation(id)
  const [progress, setProgress] = useState(0)

  if (!c) {
    return (
      <div className="app">
        <p>Не найдено</p>
        <button type="button" className="btn btnGhost" onClick={onBack}>
          Назад
        </button>
      </div>
    )
  }

  const order = c.connectOrder
  const total = order.length
  const done = progress >= total
  const nextStar = done ? null : order[progress]

  const onStarClick = (i: number) => {
    if (done) return
    if (i === nextStar) setProgress((p) => p + 1)
  }

  return (
    <div className="app">
      <div className="screenHeader">
        <button type="button" className="btn btnGhost backMini" onClick={onBack}>
          Назад
        </button>
        <h2>Соедини звёзды</h2>
        <span style={{ width: 88 }} aria-hidden />
      </div>
      <p className="subtitle">{c.nameRu}</p>

      <StarField
        constellation={c}
        connectProgress={progress}
        hintStarIndex={nextStar}
        onStarClick={onStarClick}
        hideStarLabels={false}
      />

      <div className="panel">
        {done ? (
          <p className="toastOk">Отлично! Созвездие готово!</p>
        ) : (
          <p className="fact">
            Нажимай звёзды по порядку. Подсказка: голубое кольцо — следующая
            звезда.
          </p>
        )}
      </div>

      {done && (
        <button
          type="button"
          className="btn btnSecondary"
          onClick={() => setProgress(0)}
        >
          Ещё раз
        </button>
      )}
    </div>
  )
}

function GuessScreen({ onBack }: { onBack: () => void }) {
  const [state, setState] = useState(() => pickGuessTriplet())
  const [picked, setPicked] = useState<string | null>(null)
  const [wrongId, setWrongId] = useState<string | null>(null)

  const nextRound = useCallback(() => {
    setState(pickGuessTriplet())
    setPicked(null)
    setWrongId(null)
  }, [])

  const onChoose = (id: string) => {
    if (picked) return
    if (id === state.correct.id) {
      setPicked(id)
      setWrongId(null)
    } else {
      setWrongId(id)
      window.setTimeout(() => setWrongId(null), 500)
    }
  }

  return (
    <div className="app">
      <div className="screenHeader">
        <button type="button" className="btn btnGhost backMini" onClick={onBack}>
          Назад
        </button>
        <h2>Как это созвездие?</h2>
        <span style={{ width: 88 }} aria-hidden />
      </div>

      <StarField
        constellation={state.correct}
        showAllEdges
        hideStarLabels
      />

      <div className="row" role="group" aria-label="Варианты названий">
        {state.options.map((opt) => {
          const isWrongFlash = wrongId === opt.id
          const isSuccess = picked === opt.id && opt.id === state.correct.id
          return (
            <button
              key={opt.id}
              type="button"
              className={`btn btnSecondary btnChoice${isWrongFlash ? ' btnChoiceWrong' : ''}`}
              onClick={() => onChoose(opt.id)}
              disabled={Boolean(picked)}
              style={
                isSuccess
                  ? {
                      borderColor: 'rgba(126, 232, 184, 0.8)',
                      boxShadow: '0 0 24px rgba(126, 232, 184, 0.35)',
                    }
                  : undefined
              }
            >
              {opt.nameRu}
            </button>
          )
        })}
      </div>

      {picked && (
        <>
          <p className="toastOk">Верно! Это {state.correct.nameRu}.</p>
          <p className="fact">{state.correct.fact}</p>
          <button type="button" className="btn btnPrimary" onClick={nextRound}>
            Следующий
          </button>
        </>
      )}
    </div>
  )
}
