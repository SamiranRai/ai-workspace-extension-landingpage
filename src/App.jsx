import { CONFIG, FEATURES, AUDIENCE, FAQ } from "./content.js";
import { IMG } from "./images.js";
import { useState } from "react";

const NAMES = CONFIG.platforms.map((p) => p.name);
const NAME_LIST = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
}).format(NAMES);

function Shot({ img, alt, sizes, priority = false }) {
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      width={img.w}
      height={img.h}
      alt={alt}
      decoding={priority ? "sync" : "async"}
      loading={priority ? "eager" : "lazy"}
      fetchpriority={priority ? "high" : "auto"}
    />
  );
}

function Actions({ onDark = false }) {
  return (
    <div className={`cta-row${onDark ? " on-dark" : ""}`}>
      <a className="btn" href="#waitlist">
        Join the waitlist · Chrome
      </a>
      <a className="btn ghost" href="#waitlist">
        Join the waitlist · Lifetime access
      </a>
    </div>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "loading", message: "" });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website: event.currentTarget.elements.website.value,
        }),
      });
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error(
          "The waitlist service is unavailable. Please try again after deployment.",
        );
      }
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "We couldn't join you to the waitlist.");
      }

      setEmail("");
      setStatus({
        type: "success",
        message: "You're on the list. We'll email you when it's ready.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit}>
      <label htmlFor="waitlist-email">Your email address</label>
      <input
        className="waitlist-trap"
        name="website"
        type="text"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="waitlist-fields">
        <input
          id="waitlist-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button className="btn" type="submit" disabled={status.type === "loading"}>
          {status.type === "loading" ? "Joining..." : "Join the waitlist"}
        </button>
      </div>
      <p className="waitlist-note">
        One email. No spam. Unsubscribe anytime.
      </p>
      {status.message && (
        <p className={`form-status ${status.type}`} role="status">
          {status.message}
        </p>
      )}
    </form>
  );
}

function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <a className="logo" href="#top" aria-label={`${CONFIG.name} home`}>
          <img src="/img/brand-mark-a-cube.svg" alt="" aria-hidden="true" />
          <span>Ai workspace</span>
        </a>
        <nav aria-label="Primary" className="nav-links">
          <a href="#search">Search</a>
          <a href="#folders">Folders</a>
          <a href="#who">Who it’s for</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="btn btn-sm" href="#waitlist">
          Join the waitlist
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <>
      <div className="hero-bg">
        <section className="hero wrap" id="top">
          <div className="works wrap" aria-label="Supported AIs">
            <p>Works with</p>
            <ul>
              {CONFIG.platforms.map((p) => (
                <li key={p.name}>
                  <i style={{ background: p.color }} />
                  {p.name}
                </li>
              ))}
            </ul>
          </div>
          <h1>
            Find any <span className="grad">AI chat</span> you’ve ever had.
          </h1>
          <p className="lede">
            AI Workspace is a Chrome extension that searches every message across{" "}
            {NAME_LIST}, from inside the sites you already use. Folders are
            coming next.
          </p>
          <Actions />
          <p className="fine">
            Works in Chrome and Edge. One payment, no subscription.
          </p>
          {/* Live demo goes inside #demo. The screenshot is the fallback until it is ready. */}
          <div className="frame" id="demo">
            <Shot
              img={IMG.hero}
              alt={`AI Workspace searching across ${NAME_LIST}`}
              sizes="(min-width: 1000px) 1000px, 92vw"
              priority
            />
          </div>
        </section>
      </div>
      {/* <section className="works wrap" aria-label="Supported AIs">
        <p>Works with</p>
        <ul>
          {CONFIG.platforms.map((p) => (
            <li key={p.name}>
              <i style={{ background: p.color }} />
              {p.name}
            </li>
          ))}
        </ul>
      </section> */}
    </>
  );
}

function FolderConcept() {
  const rows = [
    ["Clients", 12],
    ["Research", 8],
    ["Code snippets", 21],
    ["Ideas", 5],
  ];
  return (
    <div
      className="concept"
      role="img"
      aria-label="Concept of the folders feature"
    >
      <span className="chip">Concept preview</span>
      {rows.map(([n, c]) => (
        <div className="row" key={n}>
          <span className="dot" />
          {n}
          <b>{c}</b>
        </div>
      ))}
    </div>
  );
}

function Feature({ f, index }) {
  return (
    <section className={`feat-wrap${index % 2 ? " alt" : ""}`} id={f.id}>
      <div className={`wrap feat${f.flip ? " flip" : ""}`}>
        <div className="feat-text">
          <p className="label">
            {f.label}
            {f.soon && <span className="chip">Coming soon</span>}
          </p>
          <h2>{f.title}</h2>
          <ul className="ticks">
            {f.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <figure className="feat-media">
          <div className="stage">
            {f.img ? (
              <Shot
                img={IMG[f.img]}
                alt={f.caption}
                sizes="(min-width: 900px) 560px, 88vw"
              />
            ) : (
              <FolderConcept />
            )}
          </div>
          <figcaption>{f.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section className="alt sec" id="who" aria-labelledby="who-h">
      <div className="wrap">
        <h2 id="who-h" className="center">
          Made for people who use AI for real work.
        </h2>
        <ul className="grid3">
          {AUDIENCE.map((a) => (
            <li key={a.who} className="card">
              <p className="who">{a.who} look for</p>
              <h3>{a.line}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <section className="sec narrow-c center">
      <div className="wrap">
        <span className="lock" aria-hidden="true">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="11" width="16" height="10" rx="3" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        </span>
        <h2>Your chats stay in your browser.</h2>
        <p className="lede">
          The search index is built and kept on your device. We don’t read your
          chats and we don’t upload them to search them.
        </p>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="alt sec" id="faq" aria-labelledby="faq-h">
      <div className="wrap narrow">
        <h2 id="faq-h" className="center">
          Questions
        </h2>
        {FAQ.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="sec" id="waitlist">
      <div className="wrap">
        <div className="cta-panel">
          <h2>Be first to try AI Workspace.</h2>
          <p className="lede">
            Join the waitlist for Chrome access and lifetime pricing when we
            launch.
          </p>
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        {FEATURES.map((f, i) => (
          <Feature key={f.id} f={f} index={i} />
        ))}
        <Audience />
        <Privacy />
        <Faq />
        <FinalCta />
      </main>
      <footer className="foot">
        <div className="wrap foot-in">
          <span>
            © 2026 {CONFIG.name}. Not affiliated with OpenAI, Anthropic, Google
            or xAI.
          </span>
          <a href={`mailto:${CONFIG.bugEmail}`}>Report a bug</a>
        </div>
      </footer>
    </>
  );
}
