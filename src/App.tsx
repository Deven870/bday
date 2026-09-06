import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Gift,
  Heart,
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
import songArtwork from './assets/WhatsApp Image 2026-09-06 at 20.30.09.jpeg'

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
    `To My Chipkali, From Your Panda, ❤️

If someone had told me back in 2017, when we first met as nothing more than two people connected through a mutual friend, that you would one day become one of the most important people in my life, I probably would have laughed.

Because how could I have known that a random introduction would turn into years of memories, endless conversations, countless laughs, stupid fights, ridiculous gossip, long-distance friendship, our first trip together, and a bond that I now cannot imagine my life without?

Some people enter your life by chance.

Some stay because of circumstances.

And then there are a very few people who become family — not because you were born into the same family, but because you chose each other.

You are that person for me.

You are my Naina, and I am your Aditi. ❤️

And honestly, I don't think this is something that belongs to just this lifetime. If there are a hundred lifetimes waiting for us, I want to find you in every single one of them. I want to meet you again, become your friend again, irritate you again, listen to all your stories again, gossip about absolutely everything again, and somehow find our way back to being us.

Because some bonds just feel too familiar to belong to only one lifetime.

You are one of my chosen family — one of those very few people I didn't get by birth, but somehow got lucky enough to find along the way. And I want you to know that I will always protect that bond with everything I have. I would protect you with my life, because that's what family means to me.

You've seen so many versions of me.

The happy me.
The emotional me.
The dramatic me. 😂
The completely insane me.
The one who has a thousand things to rant about.
The one who sometimes doesn't even need to say what's wrong because you somehow know.

And through every version, you've stayed.

That's probably one of the things I love about you the most — your consistency. In a world where people can come and go like passing seasons, you became one of the few people who stayed through every season of my life.

We've grown up together in so many ways.

From being strangers in 2017, to friends in 2018, to becoming inseparable in 2019, to surviving college ending and that crazy COVID era in 2020, to proving that even different cities couldn't make us distant in 2021, and finally making our first trip together in 2026…

We've collected years of memories.

And somehow, every chapter has made me more certain that I want you in all the chapters that are still left.

I love irritating you.

Actually, I LOVE irritating you. 😂

And I know somewhere deep down, you love getting irritated by me too. 😌 Because let's be honest — you don't do those things for just anyone. The way you tolerate my nonsense, entertain my drama, listen to my endless rants, and somehow still choose to keep me around is proof enough that I'm special.

Or at least that's what I'm going to believe. 😂

Our friendship has always had this beautiful balance of comfort and chaos.

We can have the deepest conversations one moment and then be gossiping about the most ridiculous thing the next.

We can go from emotional to completely stupid within seconds.

We can annoy each other, roast each other, complain about everything, laugh until our stomachs hurt, and still know that underneath all of it is a kind of love that doesn't need constant reassurance.

Because we just know.

You know that no matter how much I irritate you, I'll always be there.

And I know that no matter how much you pretend to be annoyed with me, you'll always be there too.

That's our thing.

And I wouldn't trade it for anything.

You have this incredible ability to make things feel lighter simply by being around. Somehow, the heaviest days don't feel quite as heavy when I have you to talk to. The darkest nights don't feel quite as dark when I know there's someone on the other side of the phone who will listen.

You are comfort.

You are warmth.

You are home in a way that only a few people ever become.

And if I ever get another lifetime, I hope I get another chance to find you.

I'll choose you again.

And again.

And again.

Because if this lifetime gave me one of its greatest gifts, it was giving me you.

So, my Naina, here's to everything we've already lived through and everything that's still waiting for us.

Here's to more trips that we'll probably plan terribly.

More sunsets and sunrises.

More dinner dates and random lunch plans.

More hours of gossip that absolutely nobody else needs to know about. 😂

More arguments over absolutely nothing.

More irritating each other.

More growing together.

More memories.

More birthdays.

More versions of us.

And most importantly…

more of you and me.

I don't know what the future will look like. I don't know where life will take us, which cities we'll live in, what we'll become, or how many things will change along the way.

But I know one thing.

I want you there.

In every version of my future.

In every lifetime.

In every universe where we somehow get the chance to find each other again.

You will always be my Naina.

And I'll always be your Aditi.

Not just because that's what we call each other…

but because somewhere along the way, those names became another way of saying home. ❤️

Happy Birthday, my favourite human.

Thank you for choosing me as your person, for staying through every season, for tolerating my nonsense, for letting me irritate you, and for being the kind of friend who slowly, quietly, and permanently became family.

I love you more than words can ever properly explain.

This lifetime is ours.
And if we're lucky enough to have another one…
I'll find you there too.

Always your Aditi.
Always my Naina.
In this lifetime, and every lifetime after. ❤️✨`,
  music: '/Jaane Kyun Dostana Original Motion Picturetrack 320 Kbps.mp3',
  backgroundMusic: '/Bruno_Mar_-_Count_On_Me_(mp3.pm).mp3',
  voiceMessage: '',
  photos: [
    { image: '/gallery/Screenshot_20260903_104341_Photos.jpg', caption: 'A memory worth keeping close.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260903_104401_Photos.jpg', caption: 'One of our favorite moments.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260903_104623_Photos.jpg', caption: 'A little snapshot of us.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260903_104730_Photos.jpg', caption: 'The kind of moment that makes me smile.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260903_104805_Photos.jpg', caption: 'A memory I will always cherish.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260903_104810_Photos.jpg', caption: 'Another beautiful moment together.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260903_104818_Photos.jpg', caption: 'A moment that feels like home.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_110219_Photos.jpg', caption: 'Keeping this one in my heart.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_110226_Photos.jpg', caption: 'A sweet piece of our story.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_110618_Photos.jpg', caption: 'The little moments mean the most.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_110639_Photos.jpg', caption: 'A favorite memory with you.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_112016_Photos.jpg', caption: 'A memory made even better together.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_112442_Photos.jpg', caption: 'A moment I never want to forget.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_112533_Photos.jpg', caption: 'A small moment, a big smile.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_112537_Photos.jpg', caption: 'One more beautiful memory.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_112555_Photos.jpg', caption: 'Together is my favorite place to be.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_112620_Photos.jpg', caption: 'A treasured page in our story.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_112655_Photos.jpg', caption: 'A moment full of happiness.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_112725_Photos.jpg', caption: 'A memory made for the scrapbook.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_112739_Photos.jpg', caption: 'Still smiling about this one.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_112744_Photos.jpg', caption: 'A lovely moment to remember.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_112748_Photos.jpg', caption: 'A little joy from our journey.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_112958_Photos.jpg', caption: 'One of the moments I hold dear.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_113011_Photos.jpg', caption: 'A beautiful memory of us.', date: 'September 2026' },
    { image: '/gallery/Screenshot_20260904_113208_Photos.jpg', caption: 'Here is to many more memories.', date: 'September 2026' },
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
    {
      year: '2017',
      title: 'Where It All Began 🌱',
      description: 'The year we met for the very first time. You were just a friend\'s friend, someone I probably would not have met if that one mutual friend had not introduced us. Little did we know that this random introduction would become one of the most important friendships of our lives. Life had already decided you were going to stay.',
    },
    {
      year: '2018',
      title: 'From Strangers to Friends 🫶',
      description: 'The year we actually became friends. Between random conversations, hanging out, laughing at stupid things, and spending more time together, you stopped being a friend\'s friend and became my friend. That mutual friend eventually disappeared, and somehow we became part of an exclusive club of weirdos that no longer exists. 😂 Looking back, one person brought us together, only for us to become each other\'s constant.',
    },
    {
      year: '2019',
      title: 'Growing Together ❤️',
      description: 'Our friendship became something much deeper. We grew together, got closer, and became the kind of friends who could face almost anything together. We saw each other through different situations, moods, phases, and more chaos than either of us would admit. We became those friends who know too much about each other and still choose to stay. 😂',
    },
    {
      year: '2020',
      title: 'The Farewell, Lockdown & Us 🎓🎂',
      description: 'The year of college farewell, a pandemic, lockdowns, and one very memorable COVID birthday. College ended, everyone went separate ways, and life suddenly changed. But our friendship did not. I still remember the cake you made and showed me over a video call. College ended, people got separated, and life moved on. Somehow, we did not. ❤️',
    },
    {
      year: '2021',
      title: 'Miles Apart, Still Close 🌍',
      description: 'The long-distance friendship era: me in Chandigarh, you in Lucknow, and somehow our friendship still survived the distance. Different cities, routines, and lives, but the same friendship. Distance never managed to make us distant. Some friendships do not depend on how often you meet; they depend on knowing the other person will always be there. 😂❤️',
    },
    {
      year: '2026',
      title: 'Finally, Our First Trip! ✈️🌄',
      description: 'After years of friendship, different cities, countless conversations, endless gossip, and a million plans, we finally went on our first trip together. Insane is probably the most accurate word. 😂 It gave us new memories, inside jokes, and enough material to gossip about for years. Here is to many more trips, dinner dates, lunch plans, stupid conversations, adventures, and memories.',
    },
    {
      year: 'Forever',
      title: 'And Now… Forever 🥂❤️',
      description: 'This is only a little reminder of where we started, how far we have come, and everything we have survived together. From being a friend\'s friend in 2017 to becoming friends, each other\'s constant, and surviving college, lockdown, different cities, distance, and life together. We have come this far together, and we are staying together forever. ❤️',
    },
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
  const galleryRef = useRef<HTMLDivElement | null>(null)
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
    if (!muted && birthdayConfig.music) {
      musicAudioRef.current?.play().catch(() => setMusicPlaying(false))
    } else {
      musicAudioRef.current?.pause()
    }
  }, [muted])

  useEffect(() => {
    const audio = backgroundAudioRef.current
    if (!audio) return
    if (backgroundMusicPlaying && !muted && screen >= 2 && screen < 9) {
      void audio.play().catch(() => setBackgroundMusicPlaying(false))
    } else {
      audio.pause()
      if (screen >= 9) audio.currentTime = 0
    }
  }, [backgroundMusicPlaying, muted, screen])

  useEffect(() => {
    if (!selectedPhoto) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPhoto(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [selectedPhoto])

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
    const target = screen === 7 ? 9 : Math.min(screen + 1, totalScreens - 1)
    navigateTo(target)
  }

  const previousScreen = () => {
    const target = screen === 9 ? 7 : Math.max(screen - 1, 0)
    navigateTo(target)
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
        setMuted(false)
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

  const scrollGallery = (direction: 'left' | 'right') => {
    galleryRef.current?.scrollBy({
      left: direction === 'right' ? galleryRef.current.clientWidth * 0.82 : -galleryRef.current.clientWidth * 0.82,
      behavior: 'smooth',
    })
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

              <div className="gallery-rail">
                <button type="button" className="gallery-arrow gallery-arrow-left" onClick={() => scrollGallery('left')} aria-label="Previous photo">
                  ←
                </button>
                <div className="gallery-grid" ref={galleryRef}>
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
                        <p>{photo.caption}</p>
                      </div>
                    </motion.article>
                  ))}
                </div>
                <button type="button" className="gallery-arrow gallery-arrow-right" onClick={() => scrollGallery('right')} aria-label="Next photo">
                  →
                </button>
              </div>

              <button type="button" className="cta-button small" onClick={nextScreen}>
                See our story <ArrowRight size={16} />
              </button>
              {selectedPhoto && (
                <motion.div className="photo-lightbox" role="dialog" aria-modal="true" aria-label="Memory detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setSelectedPhoto(null)}>
                  <button type="button" className="lightbox-close" onClick={() => setSelectedPhoto(null)} aria-label="Close memory">× <span>Close</span></button>
                  <img src={selectedPhoto.image} alt={selectedPhoto.caption} onClick={(event) => event.stopPropagation()} />
                  <p onClick={(event) => event.stopPropagation()}>{selectedPhoto.caption}</p>
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
                Our song <ArrowRight size={16} />
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
              ) : null}

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
                <img className="song-artwork-image" src={songArtwork} alt="Our song artwork" />

                <audio ref={musicAudioRef} src={birthdayConfig.music} preload="metadata" onEnded={() => setMusicPlaying(false)} />

                <button
                  type="button"
                  className="play-button"
                  aria-label={musicPlaying ? 'Pause music' : 'Play music'}
                  onClick={() => {
                    if (musicPlaying) {
                      musicAudioRef.current?.pause()
                      setMusicPlaying(false)
                    } else {
                      setMuted(false)
                      void musicAudioRef.current?.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false))
                    }
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
                I hope we make many more memories.
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
