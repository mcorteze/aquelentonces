import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, CalendarDays, Camera, Pen, Package } from 'lucide-react';
import styles from './LandingPage.module.css';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <LandingNav onLogin={() => navigate('/login')} />
      <Hero onCta={() => navigate('/login')} />
      <Features />
      <Roadmap />
      <CtaFinal onCta={() => navigate('/login')} />
      <Footer />
    </div>
  );
}

/* ── Navbar ──────────────────────────────────────────────────────────────── */
function LandingNav({ onLogin }: { onLogin: () => void }) {
  return (
    <header className={styles.nav}>
      <span className={styles.navBrand}>Aquelentonces</span>
      <button className={styles.navBtn} onClick={onLogin}>
        Entrar
      </button>
    </header>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <p className={styles.heroEyebrow}>Para madres y padres que quieren recordar</p>
        <h1 className={styles.heroTitle}>
          Todo lo que vives hoy,<br />
          será <em>aquelentonces</em>.
        </h1>
        <p className={styles.heroSub}>
          El diario de vida de tus hijos. Las tareas, las fotos, los dibujos,
          los comentarios de la familia — todo junto, organizado y guardado
          para cuando quieras volver a verlo.
        </p>
        <div className={styles.heroActions}>
          <button className={styles.ctaPrimary} onClick={onCta}>
            Empezar gratis
          </button>
          <span className={styles.heroNote}>Sin tarjeta. Sin compromisos.</span>
        </div>
      </div>
      <div className={styles.heroBlobWrap} aria-hidden="true">
        <div className={styles.heroBlob} />
        <div className={styles.heroFrame}>
          <div className={styles.heroFrameInner}>
            <span className={styles.heroFrameLabel}>Sofía, 4 años</span>
            <p className={styles.heroFrameEntry}>
              "Hoy fue su primer día de baile. Entró sin mirar atrás."
            </p>
            <span className={styles.heroFrameDate}>Martes, 24 de junio de 2025</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Features ────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    Icon: BookOpen,
    title: 'El diario que siempre quisiste llevar',
    body: 'Anota lo que pasó hoy. Un momento, una frase, una historia. Cada nota queda fechada y guardada para siempre, organizada por hijo.',
    bg: 'var(--aq-bg)',
  },
  {
    Icon: Camera,
    title: 'Fotos con contexto, no solo imágenes',
    body: 'Sube una foto y cuéntale qué estaba pasando. La familia puede comentar. En diez años verás la foto y sabrás exactamente cómo fue ese día.',
    bg: 'var(--aq-sec-verde)',
  },
  {
    Icon: CalendarDays,
    title: 'La rutina también es un recuerdo',
    body: 'Las tareas del día, el fútbol del martes, el cumpleaños de la abuela — todo queda en el calendario y se convierte en historial de lo que vivían.',
    bg: 'var(--aq-bg)',
  },
  {
    Icon: Users,
    title: 'La familia conectada',
    body: 'Invita a los abuelos, los tíos, el papá. Cada uno ve y comenta desde su cuenta. Un muro familiar privado que no es una red social.',
    bg: 'var(--aq-sec-lavanda)',
  },
  {
    Icon: Pen,
    title: 'Sus dibujos, guardados para siempre',
    body: 'Próximamente: un canvas donde tus hijos dibujan directamente en la app. Cada trazo queda guardado con su nombre y su edad.',
    bg: 'var(--aq-bg)',
    soon: true,
  },
  {
    Icon: Package,
    title: 'Imprime sus momentos favoritos',
    body: 'Próximamente: convierte los recuerdos en álbumes físicos, calendarios y postales. Del diario digital a tus manos.',
    bg: 'var(--aq-sec-salmon)',
    soon: true,
  },
];

function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.featuresHeader}>
        <h2 className={styles.sectionTitle}>Todo en un solo lugar</h2>
        <p className={styles.sectionSub}>
          Diseñado para que no tengas que buscar en cinco apps distintas.
        </p>
      </div>
      <div className={styles.featuresGrid}>
        {FEATURES.map(({ Icon, title, body, bg, soon }) => (
          <div key={title} className={styles.featureCard} style={{ background: bg }}>
            {soon && <span className={styles.soonBadge}>Próximamente</span>}
            <div className={styles.featureIconWrap}>
              <Icon size={28} strokeWidth={1.75} />
            </div>
            <h3 className={styles.featureTitle}>{title}</h3>
            <p className={styles.featureBody}>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Roadmap / promesa ───────────────────────────────────────────────────── */
function Roadmap() {
  return (
    <section className={styles.roadmap}>
      <div className={styles.roadmapInner}>
        <h2 className={styles.roadmapTitle}>
          Un recuerdo guardado hoy<br />vale mil fotos en diez años.
        </h2>
        <p className={styles.roadmapBody}>
          Aquelentonces no es una app de productividad.
          Es el lugar donde guardas lo que tu hijo era
          — sus palabras, sus rutinas, sus días.
          Para que cuando crezca, puedas volver a verlo crecer.
        </p>
      </div>
    </section>
  );
}

/* ── CTA Final ───────────────────────────────────────────────────────────── */
function CtaFinal({ onCta }: { onCta: () => void }) {
  return (
    <section className={styles.ctaFinal}>
      <h2 className={styles.ctaFinalTitle}>Empieza hoy.</h2>
      <p className={styles.ctaFinalSub}>
        Gratis. Privado. Solo para tu familia.
      </p>
      <button className={styles.ctaFinalBtn} onClick={onCta}>
        Empezar gratis
      </button>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerBrand}>Aquelentonces</span>
      <span className={styles.footerYear}>© {new Date().getFullYear()}</span>
    </footer>
  );
}
