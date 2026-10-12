import { useEffect, useRef, useState } from "react";

type Step = "welcome" | "setup" | "loading" | "home";

type IconName =
  | "arrow"
  | "book"
  | "briefcase"
  | "calendar"
  | "check"
  | "chevron"
  | "clock"
  | "document"
  | "home"
  | "headphones"
  | "lightbulb"
  | "mail"
  | "message"
  | "microphone"
  | "paperclip"
  | "plus"
  | "sparkles"
  | "upload"
  | "user"
  | "users";

const interests = [
  {
    id: "lessons",
    title: "Plan lessons",
    description: "Build a study plan",
    icon: "book" as IconName,
    color: "mint",
  },
  {
    id: "schedule",
    title: "Schedule study",
    description: "Make time to learn",
    icon: "calendar" as IconName,
    color: "blue",
  },
  {
    id: "notes",
    title: "Review notes",
    description: "Turn notes into audio",
    icon: "document" as IconName,
    color: "yellow",
  },
  {
    id: "summaries",
    title: "Summarize topics",
    description: "Keep the key ideas",
    icon: "sparkles" as IconName,
    color: "lavender",
  },
  {
    id: "reminders",
    title: "Set reminders",
    description: "Stay on track",
    icon: "clock" as IconName,
    color: "purple",
  },
  {
    id: "other",
    title: "Something else",
    description: "Make it your own",
    icon: "plus" as IconName,
    color: "white",
  },
];

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="m9 18 6-6-6-6" />,
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22V5.5Z" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="3" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m15 18-6-6 6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    document: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    headphones: (
      <>
        <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
        <path d="M4 14h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2ZM20 14h-3v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-1-2Z" />
      </>
    ),
    lightbulb: (
      <>
        <path d="M9 18h6M10 22h4" />
        <path d="M8.2 14.5A7 7 0 1 1 15.8 14.5C14.8 15.3 14.5 16 14.5 18h-5c0-2-.3-2.7-1.3-3.5Z" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    message: (
      <>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
    microphone: (
      <>
        <rect x="9" y="3" width="6" height="12" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" />
      </>
    ),
    paperclip: <path d="m20.5 11.5-8.9 8.9a6 6 0 0 1-8.5-8.5l9.6-9.6a4 4 0 0 1 5.7 5.7l-9.6 9.6a2 2 0 0 1-2.8-2.8l8.9-8.9" />,
    plus: <path d="M12 5v14M5 12h14" />,
    sparkles: (
      <>
        <path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" />
        <path d="m18.5 14 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z" />
        <path d="m5 13 .7 2.1 2.1.7-2.1.7L5 18.6l-.7-2.1-2.1-.7 2.1-.7L5 13Z" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4M7 9l5-5 5 5" />
        <path d="M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="4" />
        <path d="M2 21a7 7 0 0 1 14 0M16 4.5a4 4 0 0 1 0 7.5M18 15a6 6 0 0 1 4 6" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function Robot({ compact = false, cup = false }: { compact?: boolean; cup?: boolean }) {
  return (
    <div className={`robot-scene ${compact ? "robot-scene--compact" : ""}`} aria-hidden="true">
      <span className="orb orb--one" />
      <span className="orb orb--two" />
      <span className="twinkle twinkle--one">✦</span>
      <span className="twinkle twinkle--two">✦</span>
      <svg className="robot" viewBox="0 0 300 260" role="img">
        <defs>
          <linearGradient id="body" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset=".58" stopColor="#f5f7ff" />
            <stop offset="1" stopColor="#cbd5f4" />
          </linearGradient>
          <linearGradient id="screen" x1="0" x2="1">
            <stop offset="0" stopColor="#11182c" />
            <stop offset=".5" stopColor="#18244c" />
            <stop offset="1" stopColor="#0b1021" />
          </linearGradient>
          <linearGradient id="tablet" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#b9d2ff" />
            <stop offset=".5" stopColor="#7d9cf7" />
            <stop offset="1" stopColor="#a68ce7" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#7181ba" floodOpacity=".25" />
          </filter>
        </defs>
        <ellipse cx="151" cy="225" rx="91" ry="18" fill="#8a91c5" opacity=".16" />
        {compact && (
          <>
            <path d="M76 126c-22 3-35 19-30 39 4 16 18 21 31 14" fill="url(#body)" stroke="#d6dcf1" />
            <circle cx="53" cy="146" r="13" fill="url(#body)" />
            <path d="M224 126c22 3 35 19 30 39-4 16-18 21-31 14" fill="url(#body)" stroke="#d6dcf1" />
            <circle cx="247" cy="146" r="13" fill="url(#body)" />
          </>
        )}
        <g filter="url(#shadow)">
          <path d="M99 143c0-26 22-44 51-44s51 18 51 44v43c0 30-22 50-51 50s-51-20-51-50v-43Z" fill="url(#body)" />
          <ellipse cx="150" cy="130" rx="66" ry="57" fill="url(#body)" stroke="#e6e9f6" strokeWidth="2" />
          <rect x="101" y="88" width="98" height="74" rx="35" fill="url(#screen)" />
          <path d="M117 104c21-14 53-16 70-4" fill="none" stroke="#7187d1" opacity=".22" strokeWidth="8" strokeLinecap="round" />
          <path d="M122 128c0-8 5-14 12-14s12 6 12 14" fill="none" stroke="#84bfff" strokeWidth="5" strokeLinecap="round" />
          <path d="M155 128c0-8 5-14 12-14s12 6 12 14" fill="none" stroke="#84bfff" strokeWidth="5" strokeLinecap="round" />
          {compact ? (
            <path d="M142 139c5 5 12 5 17 0" fill="none" stroke="#e2eaff" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <rect x="113" y="183" width="75" height="54" rx="9" fill="url(#tablet)" transform="rotate(7 113 183)" />
          )}
          {!compact && (
            <>
              <path d="m135 209 10 9 21-25" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="93" cy="186" rx="21" ry="28" fill="url(#body)" transform="rotate(-22 93 186)" />
              <ellipse cx="203" cy="192" rx="21" ry="27" fill="url(#body)" transform="rotate(26 203 192)" />
            </>
          )}
          {cup && (
            <>
              <path d="M123 172h52l-7 45h-38l-7-45Z" fill="#718de8" />
              <path d="M174 180h8c15 0 14 22 1 23h-11" fill="none" stroke="#718de8" strokeWidth="8" />
              <path d="M142 164c-10-13 10-15 1-30" fill="none" stroke="#d3c7f7" strokeWidth="3" strokeLinecap="round" opacity=".75" />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

function Progress({ active }: { active: number }) {
  return (
    <div className="progress-dots" aria-label={`Step ${active + 1} of 3`}>
      {[0, 1, 2].map((item) => (
        <span key={item} className={item === active ? "is-active" : ""} />
      ))}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button className="primary-button" type="button" onClick={onClick} disabled={disabled}>
      <span>{children}</span>
      <span className="button-arrow">
        <Icon name="arrow" size={16} />
      </span>
    </button>
  );
}

export default function App() {
  const [step, setStep] = useState<Step>("welcome");
  const [selected, setSelected] = useState<string[]>(["lessons"]);
  const [prompt, setPrompt] = useState("");
  const [voiceMode, setVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(true);
  const [composerMenuOpen, setComposerMenuOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<"Debate" | "Hint" | "Interview" | null>(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step !== "loading") return;
    const timer = window.setTimeout(() => setStep("home"), 2600);
    return () => window.clearTimeout(timer);
  }, [step]);

  function toggleInterest(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient--left" />
      <div className="ambient ambient--right" />

      <header className="brand">
        <span className="brand-mark">
          <Icon name="headphones" size={19} />
        </span>
        <span>eduvoice</span>
      </header>

      <section className={`experience experience--${step}`}>
        {step === "welcome" && (
          <div className="screen welcome-screen">
            <div className="welcome-visual">
              <Robot />
            </div>
            <div className="welcome-copy">
              <span className="eyebrow">Meet your learning companion</span>
              <h1>
                Learn your way.
                <br />
                <span>Speak naturally.</span>
              </h1>
              <p>
                Plan, understand, and remember more with a voice-first assistant built around
                you.
              </p>
              <Progress active={0} />
              <PrimaryButton onClick={() => setStep("setup")}>Get started</PrimaryButton>
            </div>
          </div>
        )}

        {step === "setup" && (
          <div className="screen setup-screen">
            <div className="setup-topbar">
              <button className="icon-button" type="button" onClick={() => setStep("welcome")} aria-label="Go back">
                <Icon name="chevron" />
              </button>
              <Progress active={1} />
              <span className="topbar-spacer" />
            </div>
            <Robot compact />
            <div className="section-heading">
              <span className="eyebrow">Personalize your space</span>
              <h2>What can I help with?</h2>
              <p>Choose a few to get started.</p>
            </div>
            <div className="interest-grid">
              {interests.map((interest) => {
                const isSelected = selected.includes(interest.id);
                return (
                  <button
                    className={`interest-card ${isSelected ? "is-selected" : ""}`}
                    key={interest.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => toggleInterest(interest.id)}
                  >
                    <span className={`interest-icon interest-icon--${interest.color}`}>
                      <Icon name={interest.icon} size={16} />
                    </span>
                    {isSelected && (
                      <span className="selected-check">
                        <Icon name="check" size={11} />
                      </span>
                    )}
                    <strong>{interest.title}</strong>
                    <span>{interest.description}</span>
                  </button>
                );
              })}
            </div>
            <PrimaryButton onClick={() => setStep("loading")} disabled={selected.length === 0}>
              Continue
            </PrimaryButton>
          </div>
        )}

        {step === "loading" && (
          <div className="screen loading-screen">
            <div className="floating-tools" aria-hidden="true">
              <span className="floating-tool floating-tool--calendar">
                <Icon name="calendar" />
              </span>
              <span className="floating-tool floating-tool--check">
                <Icon name="check" />
              </span>
              <span className="floating-tool floating-tool--mail">
                <Icon name="mail" />
              </span>
              <span className="floating-tool floating-tool--document">
                <Icon name="document" />
              </span>
            </div>
            <Robot compact cup />
            <div className="section-heading">
              <h2>Getting everything ready for you...</h2>
              <p>Your personalized learning space is taking shape.</p>
            </div>
            <div className="loading-bar">
              <span />
            </div>
            <small>Just a moment...</small>
          </div>
        )}

        {step === "home" && (
          <div className="screen home-screen">
            <div className="home-header">
              <div>
                <span className="eyebrow">Your learning space</span>
                <h2>Good morning, learner.</h2>
              </div>
              <span className="profile">EV</span>
            </div>

            <div className="voice-card">
              <button
                className="voice-orb"
                type="button"
                aria-label="Start voice mode"
                onClick={() => {
                  setIsListening(true);
                  setVoiceMode(true);
                }}
              >
                <span />
                <Icon name="microphone" size={26} />
              </button>
              <div>
                <span className="eyebrow">Eduvoice is ready</span>
                <h3>What do you want to learn?</h3>
                <p>Tap the mic or type a question to begin.</p>
              </div>
            </div>

            <div className="home-grid">
              <article className="focus-card">
                <span className="card-label">Up next</span>
                <span className="focus-icon">
                  <Icon name="book" />
                </span>
                <h3>Biology review</h3>
                <p>Cell structure · 20 min</p>
                <button type="button">Start session</button>
              </article>
              <article className="streak-card">
                <span className="card-label">This week</span>
                <strong>4</strong>
                <p>day learning streak</p>
                <div className="week-dots">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <span key={day} className={day < 5 ? "done" : ""} />
                  ))}
                </div>
              </article>
            </div>

            <div className="composer-wrap">
              {composerMenuOpen && (
                <div className="composer-menu">
                  <button
                    className="upload-option"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <span className="menu-option-icon menu-option-icon--upload">
                      <Icon name="upload" size={17} />
                    </span>
                    <span>
                      <strong>Upload a file</strong>
                      <small>PDF, image, notes, or document</small>
                    </span>
                  </button>
                  <div className="mode-heading">
                    <span>Learning mode</span>
                    {activeMode && (
                      <button type="button" onClick={() => setActiveMode(null)}>
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="mode-options">
                    {[
                      {
                        name: "Debate" as const,
                        description: "Challenge your point of view",
                        icon: "users" as IconName,
                      },
                      {
                        name: "Hint" as const,
                        description: "Get nudges, not answers",
                        icon: "lightbulb" as IconName,
                      },
                      {
                        name: "Interview" as const,
                        description: "Practice with live questions",
                        icon: "briefcase" as IconName,
                      },
                    ].map((mode) => (
                      <button
                        className={activeMode === mode.name ? "is-selected" : ""}
                        key={mode.name}
                        type="button"
                        onClick={() => {
                          setActiveMode(mode.name);
                          setComposerMenuOpen(false);
                        }}
                      >
                        <span className="menu-option-icon">
                          <Icon name={mode.icon} size={16} />
                        </span>
                        <span>
                          <strong>{mode.name}</strong>
                          <small>{mode.description}</small>
                        </span>
                        {activeMode === mode.name && <Icon name="check" size={15} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(activeMode || fileName) && (
                <div className="composer-context">
                  {activeMode && (
                    <span>
                      <Icon
                        name={
                          activeMode === "Debate"
                            ? "users"
                            : activeMode === "Hint"
                              ? "lightbulb"
                              : "briefcase"
                        }
                        size={13}
                      />
                      {activeMode} mode
                      <button type="button" aria-label={`Remove ${activeMode} mode`} onClick={() => setActiveMode(null)}>
                        ×
                      </button>
                    </span>
                  )}
                  {fileName && (
                    <span>
                      <Icon name="paperclip" size={13} />
                      {fileName}
                      <button type="button" aria-label="Remove attached file" onClick={() => setFileName("")}>
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}

              <form
                className="prompt-bar"
                onSubmit={(event) => {
                  event.preventDefault();
                  setPrompt("");
                  setFileName("");
                }}
              >
                <input
                  ref={fileInputRef}
                  className="file-input"
                  type="file"
                  accept=".pdf,.txt,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg"
                  onChange={(event) => {
                    setFileName(event.target.files?.[0]?.name ?? "");
                    setComposerMenuOpen(false);
                  }}
                />
                <button
                  className={`composer-add ${composerMenuOpen ? "is-open" : ""}`}
                  type="button"
                  aria-label="Add file or choose learning mode"
                  aria-expanded={composerMenuOpen}
                  onClick={() => setComposerMenuOpen((current) => !current)}
                >
                  <Icon name="plus" size={19} />
                </button>
                <input
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder={
                    activeMode ? `Ask in ${activeMode.toLowerCase()} mode...` : "Ask Eduvoice anything..."
                  }
                  aria-label="Ask Eduvoice anything"
                />
                <button className="composer-send" type="submit" aria-label="Send question">
                  <Icon name="arrow" />
                </button>
              </form>
            </div>

            <nav className="dashboard-nav" aria-label="Dashboard navigation">
              <button className="is-active" type="button" aria-label="Home" aria-current="page">
                <Icon name="home" size={19} />
                <span>Home</span>
              </button>
              <button type="button" aria-label="Chat">
                <Icon name="message" size={19} />
                <span>Chat</span>
              </button>
              <button
                className="nav-mic"
                type="button"
                aria-label="Start voice mode"
                onClick={() => {
                  setIsListening(true);
                  setVoiceMode(true);
                }}
              >
                <Icon name="microphone" size={23} />
              </button>
              <button type="button" aria-label="Library">
                <Icon name="book" size={19} />
                <span>Library</span>
              </button>
              <button type="button" aria-label="Profile">
                <Icon name="user" size={19} />
                <span>Profile</span>
              </button>
            </nav>
          </div>
        )}
      </section>

      {step !== "home" && (
        <div className="desktop-note">
          <span />
          Voice-first learning, designed around you
        </div>
      )}

      {voiceMode && (
        <div className="voice-mode" role="dialog" aria-modal="true" aria-label="Eduvoice voice mode">
          <div className="voice-mode__glow voice-mode__glow--one" />
          <div className="voice-mode__glow voice-mode__glow--two" />

          <header className="voice-mode__header">
            <button
              className="voice-close"
              type="button"
              aria-label="Close voice mode"
              onClick={() => setVoiceMode(false)}
            >
              <Icon name="chevron" size={20} />
            </button>
            <div className="voice-mode__identity">
              <span className="voice-mode__status-dot" />
              <span>Eduvoice</span>
            </div>
            <span className="voice-mode__header-spacer" />
          </header>

          <div className="voice-mode__content">
            <div className={`listening-orb ${isListening ? "is-listening" : ""}`}>
              <span className="listening-orb__ring listening-orb__ring--one" />
              <span className="listening-orb__ring listening-orb__ring--two" />
              <span className="listening-orb__shine" />
              <Icon name={isListening ? "microphone" : "sparkles"} size={34} />
            </div>

            <div className="voice-mode__copy" aria-live="polite">
              <span className="eyebrow">{isListening ? "Listening now" : "Voice paused"}</span>
              <h2>{isListening ? "Go ahead, I’m listening." : "Ready when you are."}</h2>
              <p>
                {isListening
                  ? "Ask a question, review a topic, or plan your next study session."
                  : "Tap the microphone to continue speaking."}
              </p>
            </div>

            <div className={`waveform ${isListening ? "is-active" : ""}`} aria-hidden="true">
              {[15, 28, 42, 24, 54, 35, 68, 48, 75, 39, 62, 31, 52, 26, 16].map(
                (height, index) => (
                  <span key={`${height}-${index}`} style={{ "--bar-height": `${height}px` } as React.CSSProperties} />
                ),
              )}
            </div>

            <div className="voice-suggestions">
              <span>Try saying</span>
              <div>
                <button type="button">Explain photosynthesis simply</button>
                <button type="button">Quiz me on my notes</button>
                <button type="button">Plan a 20-minute study session</button>
              </div>
            </div>
          </div>

          <div className="voice-mode__controls">
            <button
              className="voice-control voice-control--secondary"
              type="button"
              aria-label="Close voice mode"
              onClick={() => setVoiceMode(false)}
            >
              <span className="close-symbol" />
            </button>
            <button
              className={`voice-control voice-control--mic ${isListening ? "is-active" : ""}`}
              type="button"
              aria-label={isListening ? "Pause listening" : "Resume listening"}
              aria-pressed={isListening}
              onClick={() => setIsListening((current) => !current)}
            >
              <Icon name="microphone" size={27} />
            </button>
            <button
              className="voice-control voice-control--secondary"
              type="button"
              aria-label="Confirm voice input"
              onClick={() => setIsListening(false)}
            >
              <Icon name="check" size={22} />
            </button>
          </div>
          <span className="voice-mode__hint">
            {isListening ? "Tap the mic to pause" : "Tap the mic to resume"}
          </span>
        </div>
      )}
    </main>
  );
}
