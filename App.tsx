import React, { useState, useEffect, useRef } from "react";
import { RetroWindow, GlitchText, PixelButton } from "./components/RetroUI";
import { MapPin, Copy, Heart, Star, Disc, X, Instagram } from "lucide-react";
import { CONFIG } from "./config";
import { GuestBookAI } from "./component/GuestBookAI";

const WEDDING_DATE = new Date(CONFIG.weddingDate);

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [guestName, setGuestName] = useState("Distinguished Guest");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [showEnableMusicPrompt, setShowEnableMusicPrompt] = useState(false);
    const [showCantCome, setShowCantCome] = useState(false);

  // Parse URL for guest name
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("to");
    if (to) setGuestName(to);
    else {
      const hash = window.location.hash.substring(1);
      if (hash) setGuestName(decodeURIComponent(hash));
    }
  }, []);

  // Parallax Scroll Listener
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Countdown Logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const distance = WEDDING_DATE.getTime() - now;
      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Attempt autoplay on first visit
  useEffect(() => {
    const firstVisitKey = "pixelheart_first_visit";
    const isFirstVisit = !localStorage.getItem(firstVisitKey);
    if (!isFirstVisit) return;
    if (!audioRef.current) return;
    audioRef.current.volume = 0.4;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        try {
          localStorage.setItem(firstVisitKey, "1");
        } catch {}
      })
      .catch((e) => {
        console.log("Autoplay blocked or failed:", e);
        setShowEnableMusicPrompt(true);
      });
  }, []);

  const handleEnter = () => {
    setIsEntered(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.log("Audio play failed", e);
          setShowEnableMusicPrompt(true);
        });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.log("Audio play failed", e);
          setShowEnableMusicPrompt(true);
        });
    }
  };

  return (
    <>
      {/* Single persistent audio element */}
      <audio ref={audioRef} src={CONFIG.audio.bgmUrl} loop preload="auto" playsInline />

      {!isEntered ? (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100] text-center p-4 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="w-full h-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-pink-900 via-black to-black animate-pulse"></div>
          </div>

          <RetroWindow title="SYSTEM_ALERT" className="z-10 max-w-md w-full animate-float">
            <div className="flex flex-col items-center gap-6 py-6">
              <div className="w-32 h-32 relative border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] bg-white overflow-hidden">
                {CONFIG.intro?.profileImage ? (
                  <img
                    src={CONFIG.intro.profileImage}
                    alt={CONFIG.intro.profileAlt || "profile"}
                    className={CONFIG.intro.profileClasses || "object-cover w-full h-full"}
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: CONFIG.intro.profileHtml }}
                  />
                )}
                <div className="absolute inset-0 bg-pink-500 mix-blend-multiply opacity-30"></div>
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold font-pixel text-pink-600">WEDDING_INVITATION.EXE</h2>
                <p className="font-console text-lg text-black">To: <span className="bg-black text-neon-green px-1 text-white font-bold">{guestName}</span></p>
              </div>

              <p className="text-sm font-console text-gray-600">Selamat datang...<br />kamu telah kami undang untuk menjadi saksi<br />dari awal petualangan hidup kami yang paling epik!</p>

              <PixelButton onClick={handleEnter} className="w-full">OPEN INVITATION [ENTER]</PixelButton>
            </div>
          </RetroWindow>
        </div>
      ) : (
        <div className="min-h-screen bg-[#111] text-gray-200 overflow-x-hidden selection:bg-pink-500 selection:text-white pb-20">
          {/* Fallback prompt when browser blocks autoplay */}
          {showEnableMusicPrompt && !isPlaying && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-60">
              <div className="bg-black/90 text-white p-3 rounded flex items-center gap-3 border border-white shadow-lg">
                <span className="font-console">Music is blocked by browser — click to enable</span>
                <button
                  onClick={async () => {
                    if (!audioRef.current) return;
                    try {
                      audioRef.current.volume = 0.4;
                      await audioRef.current.play();
                      setIsPlaying(true);
                      setShowEnableMusicPrompt(false);
                    } catch (e) {
                      console.log("Enable play failed", e);
                    }
                  }}
                  className="bg-green-500 text-black px-3 py-1 rounded font-pixel"
                >
                  Enable Music
                </button>
                <button onClick={() => setShowEnableMusicPrompt(false)} className="bg-gray-700 text-white px-2 py-1 rounded font-console">Dismiss</button>
              </div>
            </div>
          )}

          {/* Floating Music Control */}
          <div className="fixed top-4 right-4 z-50">
            <button onClick={toggleMusic} className={`w-12 h-12 flex items-center justify-center border-2 border-white rounded-full ${isPlaying ? "bg-green-500 animate-spin-slow" : "bg-red-500"}`}>
              {isPlaying ? <Disc size={24} className="text-black" /> : <X size={24} className="text-white" />}
            </button>
          </div>

          {/* --- HERO SECTION --- */}
          <header className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
            <div className="fixed inset-0 w-full h-full z-0 pointer-events-none will-change-transform" style={{ transform: `translateY(-${scrollY * 0.4}px)` }}>
              <video src={CONFIG.hero.backgroundUrl} className="w-full h-full object-cover opacity-40 scale-105" autoPlay loop muted playsInline />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111]/10 to-[#111]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl w-full">
              <div className="w-full bg-neon-green bg-pink-600 text-white overflow-hidden border-y-2 border-white shadow-lg">
                <div className="whitespace-nowrap animate-[marquee_10s_linear_infinite] font-pixel text-xl py-1">{CONFIG.hero.marqueeText}</div>
              </div>

              <div className="bg-black/80 backdrop-blur-sm p-8 border-4 border-white shadow-[8px_8px_0_0_#ff00ff] text-center transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <h3 className="font-japanese text-pink-500 text-2xl mb-2">結婚式への招待</h3>
                <GlitchText text={CONFIG.hero.title} className="font-pixel text-6xl md:text-8xl text-white block mb-4" />

                <div className="flex items-center justify-center gap-4 text-2xl md:text-4xl font-bold font-console text-green-400 my-4">
                  <span>{CONFIG.couple.groom.name}</span>
                  <Heart className="fill-pink-500 text-pink-500 animate-bounce" />
                  <span>{CONFIG.couple.bride.name}</span>
                </div>

                <p className="font-console text-xl mt-4 max-w-lg mx-auto leading-relaxed">{CONFIG.hero.subtitle}</p>
              </div>

              <div className="animate-bounce mt-10 drop-shadow-[0_2px_0_rgba(0,0,0,1)]"><span className="font-pixel text-xl text-white">SCROLL DOWN ▼</span></div>
            </div>
          </header>

          {/* --- COUNTDOWN & DETAILS --- */}
          <section className="relative z-10 py-20 px-4 bg-zinc-900 border-t-4 border-black">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-16">
              <RetroWindow title="COUNTDOWN_TIMER.exe" className="w-full md:rotate-2 hover:rotate-0 transition-transform">
                <div className="grid grid-cols-4 gap-2 text-center py-4">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="bg-black text-green-500 p-2 border-inner border-gray-700">
                      <span className="text-3xl font-pixel block">{String(value).padStart(2, "0")}</span>
                      <span className="text-xs uppercase text-gray-400">{unit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center border-t border-gray-400 pt-2">
                  <p className="text-sm font-bold">EVENT STATUS: <span className="text-red-600 animate-pulse">PENDING...</span></p>
                </div>
              </RetroWindow>

              <div className="text-left space-y-6">
                <h2 className="text-4xl font-pixel text-pink-500 mb-6 flex items-center gap-2"><Star className="fill-yellow-400 text-black" />EVENT KAMI</h2>

                <div className="bg-white text-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,255,1)]">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-black text-white p-2">
                      <span className="font-bold text-2xl font-console block text-center uppercase">{CONFIG.location.dateDisplay.split(" ")[0]}</span>
                      <span className="text-xs uppercase block text-center">{CONFIG.location.dateDisplay.split(" ")[1]}</span>
                    </div>
                    <div>
                      <div className="mb-2"><h3 className="font-bold font-pixel text-xl">{CONFIG.location.events.akad.title}</h3><p className="font-console text-lg">{CONFIG.location.events.akad.time}</p></div>
                      <div className="mb-2"><h3 className="font-bold font-pixel text-xl">{CONFIG.location.events.resepsi.title}</h3><p className="font-console text-lg">{CONFIG.location.events.resepsi.time}</p></div>
                      <div><h3 className="font-bold font-pixel text-xl">{CONFIG.location.events.walimah.title}</h3><p className="font-console text-lg">{CONFIG.location.events.walimah.time}</p></div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-black text-white p-2"><MapPin size={32} /></div>
                    <div>
                      <h3 className="font-bold font-pixel text-xl">LOCATION</h3>
                      <p className="font-console text-lg">{CONFIG.location.placeName}<br />{CONFIG.location.address}</p>
                      <a href={CONFIG.location.mapLink} target="_blank" rel="noreferrer" className="text-blue-700 underline text-sm hover:text-blue-500">VIEW ON MAP_NET &rarr;</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Window */}
            <div className="max-w-5xl mx-auto">
              <RetroWindow title="NAVIGATION_SYSTEM // SECTOR_7">
                <div className="relative w-full h-[400px] border-4 border-black bg-black">
                  <iframe src={CONFIG.location.mapEmbedUrl} width="100%" height="100%" style={{ border: 0, filter: "grayscale(100%) invert(90%) contrast(1.2)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  <div className="absolute top-4 left-4 bg-black/80 border border-green-500 p-2 text-green-500 font-console text-sm pointer-events-none hidden sm:block">COORDINATES: {CONFIG.location.coordinates}<br />SIGNAL: STRONG</div>
                  <div className="absolute bottom-4 right-4 bg-red-600/20 border border-red-500 p-1 text-red-500 font-pixel animate-pulse pointer-events-none">TARGET ZONE</div>
                </div>
              </RetroWindow>
            </div>
          </section>

          {/* rest of the page (profiles, gallery, gifts, footer) kept unchanged below */}

          {/* --- COUPLE PROFILE --- */}
          <section className="relative z-10 py-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] bg-fixed bg-purple-900 text-white border-t-4 border-black">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-center font-pixel text-5xl mb-16 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">PLAYERS SELECT</h2>

              <div className="grid md:grid-cols-2 gap-16">
                <div className="relative group">
                  <div className="absolute inset-0 bg-blue-600 transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
                  <div className="relative border-4 border-black bg-zinc-800 p-2">
                    <img src={CONFIG.couple.groom.photo} alt={CONFIG.couple.groom.name} className="w-full h-96 object-cover filter grayscale contrast-125 hover:filter-none transition-all duration-300" />
                    <div className="bg-black text-white p-4 mt-2">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-3xl font-pixel text-blue-400">{CONFIG.couple.groom.name} ({CONFIG.couple.groom.level})</h3>
                        <a href={CONFIG.couple.groom.instagramUrl} target="_blank" rel="noreferrer" className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1 hover:scale-110 transition-transform border border-white"><div className="bg-black p-1"><Instagram size={20} className="text-white" /></div></a>
                      </div>
                      <p className="font-console text-gray-400 mt-1">Class: {CONFIG.couple.groom.class} // Likes: {CONFIG.couple.groom.likes}</p>
                      <p className="mt-4 font-japanese text-xl">"{CONFIG.couple.groom.quote}"</p>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-pink-600 transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
                  <div className="relative border-4 border-black bg-zinc-800 p-2">
                    <img src={CONFIG.couple.bride.photo} alt={CONFIG.couple.bride.name} className="w-full h-96 object-cover filter grayscale contrast-125 hover:filter-none transition-all duration-300" />
                    <div className="bg-black text-white p-4 mt-2">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-3xl font-pixel text-pink-400">{CONFIG.couple.bride.name} ({CONFIG.couple.bride.level})</h3>
                        <a href={CONFIG.couple.bride.instagramUrl} target="_blank" rel="noreferrer" className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-1 hover:scale-110 transition-transform border border-white"><div className="bg-black p-1"><Instagram size={20} className="text-white" /></div></a>
                      </div>
                      <p className="font-console text-gray-400 mt-1">Class: {CONFIG.couple.bride.class} // Likes: {CONFIG.couple.bride.likes}</p>
                      <p className="mt-4 font-japanese text-xl">"{CONFIG.couple.bride.quote}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- GALLERY (PARALLAXISH) --- */}
      <section className="relative z-10 py-20 bg-black overflow-hidden border-t-4 border-black">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
           <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#111,#111_10px,#222_10px,#222_20px)]"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <RetroWindow title="GALLERY_VIEWER_V1.0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
               {CONFIG.gallery.map((src, i) => (
                 <div key={i} className={`relative border-2 border-gray-600 group overflow-hidden ${i % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                   <img 
                     src={src} 
                     alt={`Gallery ${i}`} 
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                   />
                   <div className="absolute bottom-0 left-0 bg-black/70 text-white text-xs font-console p-1 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                     IMG_00{i+1}.JPG
                   </div>
                 </div>
               ))}
            </div>
          </RetroWindow>
        </div>
      </section>

      <GuestBookAI />

           {/* --- GIFT SECTION (hidden behind toggle) --- */}
          <div className="relative z-10 py-12 px-4 bg-transparent">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <PixelButton onClick={() => setShowCantCome(v => !v)} className="mx-auto">Kamu tidak bisa datang? <br/> tekan aku!</PixelButton>
            </div>

            {showCantCome && (
              <section className="relative z-10 py-20 px-4 bg-gray-100 text-black border-t-8 border-pink-500 mt-6">
                <div className="max-w-4xl mx-auto px-4">
                  <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)]">
                    <h3 className="text-3xl font-pixel mb-2 text-center">GIFT TRANSFER PROTOCOL</h3>
                    <p className="font-console text-lg text-center mb-6">Your presence means the world to us,and we'll surely miss anyone unable to attend. If you'd like to share your well-wishes or a gift,you may send it through the accounts below.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {CONFIG.gift.banks.map((bank, index) => (
                        <div key={index} className="flex flex-col h-full bg-gray-50 border border-black/10 rounded-lg p-4 shadow-sm">
                          <div className="mb-2 text-sm text-gray-600 font-console">{bank.bankName}</div>
                          <div className="font-pixel text-2xl tracking-widest text-center my-2">{bank.accountNumber}</div>
                          <div className="text-center text-sm text-gray-700 mb-4">A/N {bank.accountHolder}</div>

                          <div className="mt-auto flex items-center justify-center gap-3">
                            <button
                              onClick={() => navigator.clipboard.writeText(bank.accountNumber).then(() => alert(`${bank.bankName} NUMBER COPIED!`))}
                              className="flex items-center gap-2 bg-black text-white px-4 py-2 font-pixel text-sm rounded hover:bg-gray-800"
                            >
                              <Copy size={14} /> COPY
                            </button>

                            <a
                              href={`https://wa.me/62882009564652/?text=${encodeURIComponent(`Halo, saya ingin mengirim hadiah ke ${bank.bankName} ${bank.accountNumber} atas nama ${bank.accountHolder}`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 bg-green-500 text-black px-4 py-2 font-pixel text-sm rounded hover:brightness-95"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
                                <path d="M20.52 3.48L3.48 20.52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M19 3H14L13 8L21 6L19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              SEND
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500">ありがとうございました</div>
                  </div>
                </div>
              </section>
            )}
          </div>
            {/* --- FOOTER --- */}
          
            <footer className="relative z-10 bg-black text-white py-12 text-center border-t border-gray-800">
              <GlitchText text="ITS JUST BEGINNING..." className="text-4xl font-pixel text-red-600 mb-4 block" />
              <p className="font-console text-gray-500 mb-4">CONTINUE? [Y/N]</p>
              <div className="text-xs text-gray-700 font-mono">© 2025 DYCTA & APRIL WEDDING.<br />BUILT WITH LOVE</div>
            </footer>
          </div>
        )}
    </>
  );
}
