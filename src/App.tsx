import { AnimatePresence, motion } from 'framer-motion'
import {
    ArrowRight,
    Gift,
    Heart,
    Mail,
    Mic,
    Pause,
    Play,
    Volume2,
    VolumeX
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import blowReactionImage from './assets/2.jpeg'
import rejectionImage from './assets/21.jpeg'

type BirthdayConfig = {
  personName: string
  birthdayDate: string
  pin: string
  greeting: string
  letter: string
  music: string
  backgroundMusic: string
  voiceMessage: string
  photos: Array<{ image: string; caption: string; date: string }>
  memories: Array<{ title: string; description: string; image: string }>
  timeline: Array<{ year: string; title: string; description: string }>
}

const birthdayConfig: BirthdayConfig = {
  personName: 'SANJU',
  birthdayDate: '07/09',
  pin: '0709',
  greeting: 'This little virtual gift is for you to make your special day even more memorable. Sending virtual hugs all the way!...',
  letter:
    `Happy Birthday, Sanju!! ❤️🎂
Being with you has been one of the best decisions of my life. In a world where people have shown me that they can be like passing seasons, you proved to me that not everyone is the same. You’ve been constant, and having someone like you in my life is one of my biggest joys.
You have this amazing ability to make my heaviest days lighter and my darkest nights brighter just by being there. I’ve always loved ranting about everything with you, and honestly, our gossip sessions are unbeatable! 😂❤️
You bring so much warmth, comfort, and happiness whenever you’re around. I love how you listen with your whole heart and somehow always make me feel seen, heard, and cherished.
I love you a lot, Sanju. ❤️ Here’s to many more trips, sunsets, sunrises, endless conversations, ridiculous gossip sessions, and most importantly, a lot more of us and this beautiful friendship. 🫶🏻
May you always be blessed with everything you dream of and everything your heart desires… so that you can eventually fulfil all my dreams too — starting with gifting me a Range Rover, because obviously I know I’m your favourite human. 😌😂🚗
Lots and lots of hugs, love, laughter, and happiness to you. ❤️
Happy Birthday once again, my favourite human! 🥹🫶🏻
Here’s to us, always. ❤️✨.`,
  music: '',
  backgroundMusic: '/Bruno_Mar_-_Count_On_Me_(mp3.pm).mp3',
  voiceMessage: '',
  photos: [
    {
      image:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
      caption: 'That night we laughed until the stars felt close.',
      date: 'June 2023',
    },
    {
      image:
        'https://images.unsplash.com/photo-1517841905240-472988c2477d?auto=format&fit=crop&w=900&q=80',
      caption: 'Every adventure feels sweeter with you beside me.',
      date: 'March 2024',
    },
    {
      image:
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
      caption: 'The quiet moments are the ones I cherish most.',
      date: 'January 2025',
    },
  ],
  memories: [
    {
      title: 'Our first date',
      description: 'The one where everything felt like a movie scene.',
      image:
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'The little getaway',
      description: 'A weekend of wandering, laughter, and late-night talks.',
      image:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Us now',
      description: 'A love that keeps growing, even in the quietest days.',
      image:
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80',
    },
  ],
  timeline: [
    { year: '2021', title: 'We met', description: 'And somehow everything felt different from the very start.' },
    { year: '2022', title: 'Our first adventure', description: 'A simple day turned into a story I still replay in my head.' },
    { year: '2023', title: 'Slowly, deeply', description: 'We learned each other in the softest, sweetest ways.' },
    { year: '2024', title: 'Still writing us', description: 'Every memory keeps becoming one more reason to stay close.' },
  ],
}

const totalScreens = 11
const pinLength = birthdayConfig.pin.length
type CandleState = 'lit' | 'blowing' | 'out' | 'wishMade'
type TransitionKind = 'bird' | 'page' | 'heart'

function StoryTransition({ kind }: { kind: TransitionKind }) {
  return (
    <div className={`story-transition story-transition-${kind}`} aria-hidden="true">
      {kind === 'bird' && (
        <motion.div className="origami-flight" initial={{ x: '-35vw', opacity: 0 }} animate={{ x: '35vw', opacity: [0, 1, 1, 0] }} transition={{ duration: .62 }}>
          <span className="origami-bird">◇</span>
          <span className="origami-trail">✦ - ✦</span>
        </motion.div>
      )}
      {kind === 'page' && <motion.div className="page-turn-sheet" initial={{ rotateY: 0, x: 0 }} animate={{ rotateY: -78, x: '110%' }} transition={{ duration: .58 }} />}
      {kind === 'heart' && <div className="heart-merge">{Array.from({ length: 9 }, (_, index) => <span key={`merge-heart-${index}`}>{index === 4 ? '♥' : '♡'}</span>)}</div>}
    </div>
  )
}

function HeartBackground({ screen }: { screen: number }) {
  const count = screen === 10 ? 28 : screen === 1 ? 5 : 12
  return (
    <div className="heart-background" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={`floating-heart-${index}`}
          className={`background-heart heart-tone-${index % 4}`}
          style={{
            left: `${(index * 31) % 100}%`,
            animationDelay: `${(index % 8) * -0.8}s`,
            animationDuration: `${8 + (index % 4)}s`,
          }}
        >
          {index % 5 === 0 ? '♡' : '♥'}
        </span>
      ))}
    </div>
  )
}

function App() {
  const [screen, setScreen] = useState(0)
  const [pinValue, setPinValue] = useState('')
  const [pinUnlocked, setPinUnlocked] = useState(false)
  const [giftOpened, setGiftOpened] = useState(false)
  const [giftDecision, setGiftDecision] = useState<'accept' | 'reject' | null>(null)
  const [candleState, setCandleState] = useState<CandleState>('lit')
  const [letterOpened, setLetterOpened] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [backgroundMusicPlaying, setBackgroundMusicPlaying] = useState(false)
  const [voicePlaying, setVoicePlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [screenFlash, setScreenFlash] = useState(false)
  const [typedLetter, setTypedLetter] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState<{ image: string; caption: string; date: string } | null>(null)
  const [wish, setWish] = useState('')
  const [wishSaved, setWishSaved] = useState(false)
  const [noAttempts, setNoAttempts] = useState(0)
  const [transitionKind, setTransitionKind] = useState<TransitionKind | null>(null)
  const touchStartX = useRef<number | null>(null)
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null)
  const musicAudioRef = useRef<HTMLAudioElement | null>(null)
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null)
  const candleTimerRef = useRef<number | null>(null)

  const progressDots = useMemo(
    () => Array.from({ length: totalScreens }, (_, index) => index),
    [],
  )

  useEffect(() => {
    document.title = `Happy Birthday ${birthdayConfig.personName}`
  }, [])

  useEffect(() => {
    if (!muted) {
      musicAudioRef.current?.play().catch(() => setMusicPlaying(false))
    } else {
      musicAudioRef.current?.pause()
    }
  }, [muted])

  useEffect(() => {
    const audio = backgroundAudioRef.current
    if (!audio) return
    if (backgroundMusicPlaying && screen >= 2 && screen < 10) {
      void audio.play().catch(() => setBackgroundMusicPlaying(false))
    } else {
      audio.pause()
      if (screen >= 10) audio.currentTime = 0
    }
  }, [backgroundMusicPlaying, screen])

  useEffect(() => {
    if (!voiceAudioRef.current) return
    if (voicePlaying) {
      void voiceAudioRef.current.play().catch(() => setVoicePlaying(false))
    } else {
      voiceAudioRef.current.pause()
    }
  }, [voicePlaying])

  useEffect(() => {
    if (!showConfetti) return
    const timeout = window.setTimeout(() => setShowConfetti(false), 1800)
    return () => window.clearTimeout(timeout)
  }, [showConfetti])

  useEffect(() => {
    if (!screenFlash) return
    const timeout = window.setTimeout(() => setScreenFlash(false), 700)
    return () => window.clearTimeout(timeout)
  }, [screenFlash])

  useEffect(() => {
    if (!letterOpened) return
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setTypedLetter(birthdayConfig.letter.slice(0, index))
      if (index >= birthdayConfig.letter.length) window.clearInterval(timer)
    }, 18)
    return () => window.clearInterval(timer)
  }, [letterOpened])

  useEffect(() => () => {
    if (candleTimerRef.current !== null) window.clearTimeout(candleTimerRef.current)
  }, [])

  const transitionFor = (from: number, to: number): TransitionKind => {
    if (from <= 2 && to <= 3) return 'bird'
    if ((from === 3 && to === 4) || (from === 4 && to === 5)) return 'page'
    return 'heart'
  }

  const navigateTo = (target: number) => {
    if (target === screen) return
    setTransitionKind(transitionFor(screen, target))
    window.setTimeout(() => setTransitionKind(null), 650)
    setScreen(target)
  }

  const nextScreen = () => {
    navigateTo(Math.min(screen + 1, totalScreens - 1))
  }

  const previousScreen = () => {
    navigateTo(Math.max(screen - 1, 0))
  }

  const handlePinInput = (digit: string) => {
    if (pinUnlocked) return
    if (pinValue.length >= pinLength) return

    const nextValue = `${pinValue}${digit}`
    setPinValue(nextValue)

    if (nextValue.length === pinLength) {
      if (nextValue === birthdayConfig.pin) {
        setPinUnlocked(true)
        setBackgroundMusicPlaying(true)
        if (backgroundAudioRef.current) {
          backgroundAudioRef.current.volume = 0.35
          void backgroundAudioRef.current.play().catch(() => setBackgroundMusicPlaying(false))
        }
        setShowConfetti(true)
        setScreenFlash(true)
        window.setTimeout(() => {
          navigateTo(2)
        }, 900)
      } else {
        setPinValue('')
        setScreenFlash(true)
      }
    }
  }

  const handlePinClear = () => setPinValue((current) => current.slice(0, -1))

  const replaySurprise = () => {
    setScreen(0)
    setPinValue('')
    setPinUnlocked(false)
    setGiftOpened(false)
    setGiftDecision(null)
    setNoAttempts(0)
    setCandleState('lit')
    setLetterOpened(false)
    setTypedLetter('')
    setWish('')
    setWishSaved(false)
    setSelectedPhoto(null)
    setMusicPlaying(false)
    setBackgroundMusicPlaying(false)
  }

  const shareSurprise = async () => {
    const shareData = {
      title: `Happy Birthday ${birthdayConfig.personName}`,
      text: `I made a birthday surprise for ${birthdayConfig.personName} ❤️`,
      url: window.location.href,
    }
    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined)
    } else {
      await navigator.clipboard?.writeText(window.location.href)
    }
  }

  const downloadBirthdayCard = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 800
    const context = canvas.getContext('2d')
    if (!context) return
    context.fillStyle = '#fffaf0'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.strokeStyle = '#182858'
    context.lineWidth = 8
    context.strokeRect(28, 28, canvas.width - 56, canvas.height - 56)
    context.textAlign = 'center'
    context.fillStyle = '#182858'
    context.font = 'bold 72px Georgia'
    context.fillText('HAPPY BIRTHDAY', 600, 285)
    context.fillStyle = '#c94961'
    context.font = 'bold 88px Georgia'
    context.fillText(birthdayConfig.personName, 600, 400)
    context.fillStyle = '#3155a5'
    context.font = '34px cursive'
    context.fillText('Made with all my love ❤️', 600, 525)
    const link = document.createElement('a')
    link.download = `${birthdayConfig.personName.toLowerCase()}-birthday-card.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const blowCandles = () => {
    if (candleState !== 'lit') return
    setCandleState('blowing')
    candleTimerRef.current = window.setTimeout(() => {
      setCandleState('out')
      setShowConfetti(true)
      candleTimerRef.current = window.setTimeout(() => setCandleState('wishMade'), 450)
    }, 650)
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return
    const endX = event.changedTouches[0]?.clientX ?? 0
    const distance = endX - touchStartX.current

    if (Math.abs(distance) > 50) {
      if (distance < 0 && screen < totalScreens - 1) nextScreen()
      if (distance > 0 && screen > 0) previousScreen()
    }

    touchStartX.current = null
  }

  const renderPinPad = () => {
    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

    return (
      <div className="pin-pad">
        {digits.map((digit) => (
          <button
            key={digit}
            type="button"
            aria-label={`Enter digit ${digit}`}
            className="pin-key"
            onClick={() => handlePinInput(digit)}
          >
            {digit}
          </button>
        ))}
        <button type="button" className="pin-key clear-key" onClick={handlePinClear}>
          Clear
        </button>
      </div>
    )
  }

  return (
    <div
      className={`birthday-app ${screenFlash ? 'flash' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        type="button"
        className="sound-toggle"
        aria-label={muted ? 'Unmute music' : 'Mute music'}
        onClick={() => setMuted((value) => !value)}
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <HeartBackground screen={screen} />
      {transitionKind && <StoryTransition kind={transitionKind} />}

      <audio ref={backgroundAudioRef} src={birthdayConfig.backgroundMusic} loop preload="auto" aria-label="Background birthday music" />

      {showConfetti && (
        <div className="confetti-layer" aria-hidden="true">
          {Array.from({ length: 28 }, (_, index) => (
            <span
              key={`confetti-${index}`}
              className="confetti-piece"
              style={{
                left: `${(index * 11) % 100}%`,
                background: ['#ff9cc6', '#ffd86a', '#b7c4ff', '#a2f0d5', '#ffc7d0'][index % 5],
                animationDelay: `${(index % 7) * 0.08}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="scene-frame">
        <AnimatePresence mode="wait">
          {screen === 0 && (
            <motion.section
              key="welcome"
              className="scene welcome-screen"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.7 }}
              onClick={nextScreen}
            >
              <div className="sparkles-layer" aria-hidden="true">
                {Array.from({ length: 18 }, (_, index) => (
                  <span
                    key={`spark-${index}`}
                    className="spark"
                    style={{
                      left: `${(index * 13) % 100}%`,
                      top: `${(index * 29) % 100}%`,
                      animationDelay: `${index * 0.28}s`,
                    }}
                  />
                ))}
              </div>

              <div className="welcome-copy">
                <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  Hey <span className="text-pink">❤️</span>
                </motion.p>
                <motion.h1
                  initial={{ y: 32, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  I made something special for you...
                </motion.h1>
                <motion.div
                  className="tap-hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Tap anywhere to begin
                </motion.div>
              </div>
            </motion.section>
          )}

          {screen === 1 && (
            <motion.section
              key="unlock"
              className="scene unlock-screen"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass-card lock-card">
                <p className="eyebrow">Before we continue...</p>
                <h2>There’s a little secret.</h2>
                <p className="instruction">Enter the secret code</p>

                <div className="pin-display" aria-label="Secret code entry">
                  {Array.from({ length: pinLength }, (_, index) => (
                    <span key={`pin-slot-${index}`} className={pinValue[index] ? 'filled' : ''}>
                      {pinValue[index] ?? '·'}
                    </span>
                  ))}
                </div>

                {renderPinPad()}

                {!pinUnlocked && pinValue.length === pinLength && pinValue !== birthdayConfig.pin && (
                  <p className="error-message">That code was close but not quite right.</p>
                )}
              </div>
            </motion.section>
          )}

          {screen === 2 && (
            <motion.section
              key="gift"
              className="scene gift-screen"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="gift-stage">
                <motion.div
                  className={`gift-box ${giftOpened ? 'opened' : ''}`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="gift-lid" />
                  <div className="gift-base" />
                  <div className="gift-ribbon ribbon-left" />
                  <div className="gift-ribbon ribbon-right" />
                </motion.div>
                <p className="gift-copy">Will you accept my gift?</p>
                <p className="accept-copy">It comes wrapped in all my favorite memories of you.</p>

                {giftDecision === 'reject' && (
                  <>
                    <div className="gift-rejected" aria-live="polite">
                      <span className="gift-panda">🥺</span>
                      <span>{noAttempts === 1 ? 'Why did you click no?' : noAttempts === 2 ? 'Seriously...? 🥺' : 'Nice try 😭❤️ You are still getting the gift.'}</span>
                    </div>
                    {noAttempts >= 3 && (
                      <motion.img className="rejection-image" src={rejectionImage} alt="A playful reaction to rejecting the gift" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} />
                    )}
                  </>
                )}

                <div className="gift-actions">
                  <button
                    type="button"
                    className="cta-button gift-choice accept"
                    onClick={() => {
                      setGiftDecision('accept')
                      setGiftOpened(true)
                      setShowConfetti(true)
                      window.setTimeout(() => navigateTo(3), 1100)
                    }}
                  >
                    Yes, always <Gift size={18} />
                  </button>

                  <button
                    type="button"
                    className="cta-button gift-choice reject"
                    onClick={() => {
                      setGiftDecision('reject')
                      setNoAttempts((value) => value + 1)
                    }}
                  >
                    No <span aria-hidden="true">🥺</span>
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {screen === 3 && (
            <motion.section
              key="birthday-reveal"
              className="scene birthday-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="balloon-stack" aria-hidden="true">
                {Array.from({ length: 18 }, (_, index) => (
                  <span
                    key={`balloon-${index}`}
                    className="balloon"
                    style={{
                      left: `${(index * 19) % 100}%`,
                      animationDelay: `${index * 0.22}s`,
                    }}
                  />
                ))}
              </div>

              <div className="birthday-copy">
                <p className="eyebrow">Happy Birthday</p>
                <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
                  {birthdayConfig.personName}
                </motion.h1>
                <p className="subtitle">This little virtual gift is for you to make your special day even more memorable. Sending virtual hugs all the way! ❤️</p>
              </div>

              <button type="button" className="cta-button small" onClick={nextScreen}>
                Continue <ArrowRight size={16} />
              </button>
            </motion.section>
          )}

          {screen === 4 && (
            <motion.section
              key="cake"
              className="scene cake-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="cake-wrap">
                <div className="cake-title">
                  <p className="eyebrow">Make a wish...</p>
                </div>

                {candleState !== 'lit' && (
                  <motion.img
                    className="blow-reaction-image"
                    src={blowReactionImage}
                    alt="A playful reaction after blowing out the candles"
                    initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 3 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                  />
                )}

                {candleState !== 'lit' && <div className="birthday-blow-message">Happy Birthday To You <span>❤️</span></div>}

                <div className="cake-scene">
                  <div className={`cake cake-${candleState}`} aria-label="Birthday cake">
                    <div className="cake-top" />
                    <div className="cake-mid" />
                    <div className="cake-base" />
                    <div className="cake-icing" />
                    {Array.from({ length: 4 }, (_, index) => (
                      <button
                        key={`candle-${index}`}
                        type="button"
                        className={`candle candle-${candleState}`}
                        aria-label="Birthday candle"
                        tabIndex={-1}
                        style={{ left: `${25 + index * 15}%` }}
                      >
                        <span className="flame" />
                        {(candleState === 'out' || candleState === 'wishMade') && <span className="candle-smoke">~</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {candleState === 'blowing' && <div className="wind-lines" aria-hidden="true">≈ ≈ →</div>}
                {candleState === 'wishMade' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="cake-message"
                  >
                    May every wish you make come true. <span>❤️</span>
                  </motion.div>
                ) : null}

                {candleState === 'wishMade' && (
                  <div className="wish-form">
                    <label htmlFor="birthday-wish">Now tell me... what did you wish for?</label>
                    <input id="birthday-wish" value={wish} onChange={(event) => { setWish(event.target.value); setWishSaved(false) }} placeholder="Keep it secret..." maxLength={120} />
                    <button type="button" className="wish-save" onClick={() => setWishSaved(true)}>{wishSaved ? 'Your wish is safe ❤️' : 'Keep it secret 🤫'}</button>
                  </div>
                )}

                <button type="button" className="cta-button small blow-button" disabled={candleState === 'blowing' || candleState === 'out'} onClick={candleState === 'wishMade' ? nextScreen : blowCandles}>
                  {candleState === 'lit' && '≈ Blow the candles'}
                  {candleState === 'blowing' && 'Blowing...'}
                  {candleState === 'out' && 'Wish Made ✨'}
                  {candleState === 'wishMade' && <>Continue <ArrowRight size={16} /></>}
                </button>
              </div>
            </motion.section>
          )}

          {screen === 5 && (
            <motion.section
              key="gallery"
              className="scene gallery-screen"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="section-heading">
                <p className="eyebrow">Memory gallery</p>
                <h2>Little pieces of us</h2>
              </div>

              <div className="gallery-grid">
                {birthdayConfig.photos.map((photo) => (
                  <motion.article
                    key={photo.caption}
                    className="photo-card"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <button type="button" className="photo-trigger" onClick={() => setSelectedPhoto(photo)} aria-label={`Open memory: ${photo.caption}`}>
                      <img src={photo.image} alt={photo.caption} loading="lazy" />
                    </button>
                    <div className="photo-meta">
                      <span>{photo.date}</span>
                      <p>{photo.caption}</p>
                    </div>
                  </motion.article>
                ))}
              </div>

              <button type="button" className="cta-button small" onClick={nextScreen}>
                See our story <ArrowRight size={16} />
              </button>
              {selectedPhoto && (
                <motion.div className="photo-lightbox" role="dialog" aria-modal="true" aria-label="Memory detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <button type="button" className="lightbox-close" onClick={() => setSelectedPhoto(null)} aria-label="Close memory">×</button>
                  <img src={selectedPhoto.image} alt={selectedPhoto.caption} />
                  <p>{selectedPhoto.caption}</p>
                  <span>{selectedPhoto.date}</span>
                </motion.div>
              )}
            </motion.section>
          )}

          {screen === 6 && (
            <motion.section
              key="timeline"
              className="scene timeline-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="section-heading">
                <p className="eyebrow">Our story</p>
                <h2>From then to now</h2>
              </div>

              <div className="timeline-list">
                {birthdayConfig.timeline.map((item) => (
                  <div key={item.year} className="timeline-item">
                    <div className="timeline-dot" aria-hidden="true" />
                    <div className="timeline-card">
                      <span>{item.year}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button type="button" className="cta-button small" onClick={nextScreen}>
                Continue <ArrowRight size={16} />
              </button>
            </motion.section>
          )}

          {screen === 7 && (
            <motion.section
              key="letter"
              className="scene letter-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="section-heading">
                <p className="eyebrow">A letter for you</p>
                <h2>Someone left you a note 💌</h2>
              </div>

              <button
                type="button"
                className={`letter-envelope ${letterOpened ? 'opened' : ''}`}
                onClick={() => setLetterOpened(true)}
              >
                <div className="envelope-top" />
                <div className="envelope-body" />
                <div className="envelope-letter">
                  <p>For {birthdayConfig.personName}</p>
                </div>
              </button>

              {letterOpened && (
                <motion.article
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="letter-content"
                >
                  <p>{typedLetter}<span className="typing-cursor">{typedLetter.length < birthdayConfig.letter.length ? '|' : ''}</span></p>
                </motion.article>
              )}

              <button type="button" className="cta-button small" onClick={nextScreen}>
                Read the voice note <ArrowRight size={16} />
              </button>
            </motion.section>
          )}

          {screen === 8 && (
            <motion.section
              key="voice"
              className="scene voice-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="section-heading">
                <p className="eyebrow">There’s something I wanted to say...</p>
                <h2>Voice message</h2>
              </div>

              {birthdayConfig.voiceMessage ? (
                <div className="audio-card">
                  <div className="audio-header">
                    <div className="audio-badge">
                      <Mic size={18} />
                    </div>
                    <div>
                      <p>Voice message</p>
                      <span>For you, always</span>
                    </div>
                  </div>

                  <div className="waveform" aria-hidden="true">
                    {Array.from({ length: 24 }, (_, index) => (
                      <span
                        key={`wave-${index}`}
                        className={voicePlaying ? 'active' : ''}
                        style={{ height: `${18 + ((index * 17) % 46)}px`, animationDelay: `${index * 0.08}s` }}
                      />
                    ))}
                  </div>

                  <audio ref={voiceAudioRef} src={birthdayConfig.voiceMessage} preload="metadata" />

                  <button
                    type="button"
                    className="play-button"
                    aria-label={voicePlaying ? 'Pause voice message' : 'Play voice message'}
                    onClick={() => setVoicePlaying((value) => !value)}
                  >
                    {voicePlaying ? <Pause size={18} /> : <Play size={18} />}
                    {voicePlaying ? 'Pause' : 'Play voice message'}
                  </button>
                </div>
              ) : (
                <div className="empty-state">
                  <Mail size={18} />
                  <p>No voice message added yet — the rest of the story still keeps shining.</p>
                </div>
              )}

              <button type="button" className="cta-button small" onClick={nextScreen}>
                Our song <ArrowRight size={16} />
              </button>
            </motion.section>
          )}

          {screen === 9 && (
            <motion.section
              key="song"
              className="scene music-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="section-heading">
                <p className="eyebrow">One song that reminds me of you...</p>
                <h2>Our song</h2>
              </div>

              <div className="music-card">
                <div className="artwork" aria-label="Album artwork">
                  <span>♥</span>
                </div>

                <div className="track-info">
                  <p className="track-name">Forever Us</p>
                  <p className="track-artist">A little song for my favorite person</p>
                </div>

                <audio ref={musicAudioRef} src={birthdayConfig.music || ''} preload="metadata" />

                <button
                  type="button"
                  className="play-button"
                  aria-label={musicPlaying ? 'Pause music' : 'Play music'}
                  onClick={() => {
                    if (!birthdayConfig.music) {
                      setMuted((value) => !value)
                      return
                    }
                    setMusicPlaying((value) => !value)
                  }}
                >
                  {musicPlaying ? <Pause size={18} /> : <Play size={18} />}
                  {musicPlaying ? 'Pause' : 'Play'}
                </button>

                <div className="progress-bar" aria-hidden="true">
                  <span style={{ width: musicPlaying ? '68%' : '18%' }} />
                </div>
              </div>

              <button type="button" className="cta-button small" onClick={nextScreen}>
                Final page <ArrowRight size={16} />
              </button>
            </motion.section>
          )}

          {screen === 10 && (
            <motion.section
              key="finale"
              className="scene finale-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="finale-glow" aria-hidden="true" />

              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="finale-intro">
                After all these memories...
              </motion.p>
              <motion.h2 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                I hope we make many more.
              </motion.h2>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                HAPPY BIRTHDAY <span>{birthdayConfig.personName}</span> <Heart size={32} />
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="finale-signoff">
                Made with <Heart size={14} /> just for you.
              </motion.p>
              <button type="button" className="cta-button small replay-button" onClick={replaySurprise}>
                Replay my surprise <ArrowRight size={16} />
              </button>
              <div className="final-actions">
                <button type="button" className="paper-action" onClick={() => void shareSurprise()}>Share the surprise</button>
                <button type="button" className="paper-action" onClick={downloadBirthdayCard}>Save birthday card</button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <div className="progress-indicator" aria-label="Story progress">
        {progressDots.map((dotIndex) => (
          <span key={`dot-${dotIndex}`} className={screen === dotIndex ? 'active' : ''} />
        ))}
      </div>
    </div>
  )
}

export default App
