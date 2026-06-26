import { useNavigate } from 'react-router-dom';
import { BookOpen, Camera, CalendarDays, Users, Pen, Package } from 'lucide-react';
import styles from './LandingPage.module.css';

export function LandingPage() {
  const navigate = useNavigate();
  const goLogin = () => navigate('/login');

  return (
    <div className={styles.page}>
      <Nav onLogin={goLogin} />
      <Hero onCta={goLogin} />
      <Strip
        bg="#FAF6ED"
        icon={<BookOpen size={40} strokeWidth={1.5} />}
        label="Diario de vida"
        title="El diario que siempre quisiste llevar"
        body="Anota lo que pasó hoy. Un momento, una frase, una historia. Cada nota queda fechada y guardada para siempre, organizada por hijo y por día."
        flip={false}
      />
      <Strip
        bg="#A6B1E7"
        icon={<Camera size={40} strokeWidth={1.5} />}
        label="Fotos"
        title="Fotos con contexto, no solo imágenes"
        body="Sube una foto y cuéntale qué estaba pasando. La familia comenta. En diez años verás la foto y sabrás exactamente cómo fue ese día."
        flip={true}
      />
      <Strip
        bg="#FAF6ED"
        icon={<CalendarDays size={40} strokeWidth={1.5} />}
        label="Calendario"
        title="La rutina también es un recuerdo"
        body="El fútbol del martes, el taller de cerámica, el cumpleaños de la abuela — todo queda registrado y se convierte en la historia de lo que vivían."
        flip={false}
      />
      <Strip
        bg="#417178"
        icon={<Users size={40} strokeWidth={1.5} />}
        label="Familia"
        title="La familia conectada, sin redes sociales"
        body="Invita a los abuelos, los tíos, el papá. Cada uno ve y comenta desde su propia cuenta. Privado, seguro, solo para los tuyos."
        flip={true}
        dark={true}
      />
      <ComingSoon />
      <Quote />
      <CtaFinal onCta={goLogin} />
      <Footer />
    </div>
  );
}

/* ── Nav ─────────────────────────────────────────────────────────────────── */
function Nav({ onLogin }: { onLogin: () => void }) {
  return (
    <header className={styles.nav}>
      <span className={styles.navBrand}>Aquelentonces</span>
      <button className={styles.navBtn} onClick={onLogin}>Entrar</button>
    </header>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>Para madres y padres</p>
        <h1 className={styles.heroTitle}>
          Todo lo que vives hoy,<br />
          será <em>aquelentonces</em>.
        </h1>
        <p className={styles.heroSub}>
          El diario de vida de tus hijos. Las notas, las fotos, los dibujos,
          los comentarios de la familia — todo junto, guardado, para cuando
          quieras volver a vivirlo.
        </p>
        <div className={styles.heroActions}>
          <button className={styles.ctaHero} onClick={onCta}>Empezar gratis</button>
          <span className={styles.heroNote}>Sin tarjeta. Sin compromisos.</span>
        </div>
      </div>

      <div className={styles.heroCard}>
        <div className={styles.heroCardChip}>Sofía, 4 años · martes 24 jun</div>
        <p className={styles.heroCardEntry}>
          "Hoy fue su primer día de baile.<br />Entró sin mirar atrás."
        </p>
        <div className={styles.heroCardMeta}>
          <span className={styles.heroCardDot} />
          <span>Guardado en Aquelentonces</span>
        </div>
      </div>
    </section>
  );
}

/* ── Strip (sección feature full-width) ─────────────────────────────────── */
interface StripProps {
  bg: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  body: string;
  flip: boolean;
  dark?: boolean;
}

function Strip({ bg, icon, label, title, body, flip, dark }: StripProps) {
  return (
    <section className={styles.strip} style={{ background: bg }}>
      <div className={`${styles.stripInner} ${flip ? styles.stripFlip : ''}`}>
        <div className={`${styles.stripText} ${dark ? styles.stripDark : ''}`}>
          <p className={styles.stripLabel}>{label}</p>
          <h2 className={styles.stripTitle}>{title}</h2>
          <p className={styles.stripBody}>{body}</p>
        </div>
        <div className={styles.stripVisual}>
          <div className={`${styles.stripIconBox} ${dark ? styles.stripIconBoxLight : ''}`}>
            {icon}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Coming soon ─────────────────────────────────────────────────────────── */
function ComingSoon() {
  const items = [
    { Icon: Pen,     label: 'Dibujos de los hijos',     body: 'Un canvas donde dibujan directamente en la app. Cada trazo guardado con su nombre y su edad.' },
    { Icon: Package, label: 'Imprime sus momentos',      body: 'Álbumes físicos, calendarios y postales hechos con sus propios recuerdos.' },
  ];
  return (
    <section className={styles.soon}>
      <p className={styles.soonEyebrow}>Próximamente</p>
      <h2 className={styles.soonTitle}>Lo que viene</h2>
      <div className={styles.soonGrid}>
        {items.map(({ Icon, label, body }) => (
          <div key={label} className={styles.soonCard}>
            <Icon size={32} strokeWidth={1.5} className={styles.soonIcon} />
            <h3 className={styles.soonCardTitle}>{label}</h3>
            <p className={styles.soonCardBody}>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Quote / manifiesto ──────────────────────────────────────────────────── */
function Quote() {
  return (
    <section className={styles.quote}>
      <blockquote className={styles.quoteText}>
        Un recuerdo guardado hoy<br />vale mil fotos en diez años.
      </blockquote>
      <p className={styles.quoteBody}>
        Aquelentonces no es una app de productividad. Es el lugar donde guardas
        lo que tu hijo era — sus palabras, sus rutinas, sus días. Para que cuando
        crezca, puedas volver a verlo crecer.
      </p>
    </section>
  );
}

/* ── CTA final ───────────────────────────────────────────────────────────── */
function CtaFinal({ onCta }: { onCta: () => void }) {
  return (
    <section className={styles.ctaFinal}>
      <h2 className={styles.ctaFinalTitle}>Empieza hoy.</h2>
      <p className={styles.ctaFinalSub}>Gratis. Privado. Solo para tu familia.</p>
      <button className={styles.ctaFinalBtn} onClick={onCta}>Empezar gratis</button>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerBrand}>Aquelentonces</span>
      <span className={styles.footerCopy}>© {new Date().getFullYear()}</span>
    </footer>
  );
}
