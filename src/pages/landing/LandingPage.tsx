import { useNavigate } from 'react-router-dom';
import { BookOpen, Camera, CalendarDays, Users, Pen, Package, Heart, Star } from 'lucide-react';
import styles from './LandingPage.module.css';

export function LandingPage() {
  const navigate = useNavigate();
  const goLogin = () => navigate('/login');

  return (
    <div className={styles.page}>
      <Nav onLogin={goLogin} />
      <Hero onCta={goLogin} />
      <StripDiario />
      <StripFotos />
      <StripCalendario />
      <StripFamilia />
      <SocialProof />
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
          El diario de vida de tus hijos. Notas, fotos, rutinas, comentarios
          de la familia — todo guardado, para cuando quieras volver a vivirlo.
        </p>
        <div className={styles.heroActions}>
          <button className={styles.ctaHero} onClick={onCta}>Empezar gratis</button>
          <span className={styles.heroNote}>Sin tarjeta. Sin compromisos.</span>
        </div>
      </div>

      <div className={styles.heroVisual}>
        {/* Mockup de pantalla de diario */}
        <div className={styles.phoneMockup}>
          <div className={styles.phoneHeader}>
            <div className={styles.phoneHeaderLeft}>
              <div className={styles.phoneAvatar}>S</div>
              <div>
                <div className={styles.phoneName}>Sofía</div>
                <div className={styles.phoneAge}>4 años · jun 2026</div>
              </div>
            </div>
            <Heart size={18} className={styles.phoneHeart} />
          </div>
          <div className={styles.phoneEntry}>
            <div className={styles.phoneDate}>Martes 24 junio</div>
            <p className={styles.phoneText}>"Hoy fue su primer día de baile. Entró sin mirar atrás."</p>
            <div className={styles.phoneTag}>Primer día</div>
          </div>
          <div className={styles.phoneEntry}>
            <div className={styles.phoneDate}>Lunes 23 junio</div>
            <p className={styles.phoneText}>"Le pregunté qué quería ser. Dijo: bailarina y veterinaria."</p>
          </div>
          <div className={styles.phoneStats}>
            <div className={styles.phoneStat}>
              <div className={styles.phoneStatNum}>48</div>
              <div className={styles.phoneStatLabel}>recuerdos</div>
            </div>
            <div className={styles.phoneStat}>
              <div className={styles.phoneStatNum}>3</div>
              <div className={styles.phoneStatLabel}>meses</div>
            </div>
            <div className={styles.phoneStat}>
              <div className={styles.phoneStatNum}>12</div>
              <div className={styles.phoneStatLabel}>fotos</div>
            </div>
          </div>
        </div>

        {/* Tarjeta flotante */}
        <div className={styles.floatingCard}>
          <Star size={14} className={styles.floatStar} />
          <span>Guardado en Aquelentonces</span>
        </div>
      </div>
    </section>
  );
}

/* ── Strip Diario ────────────────────────────────────────────────────────── */
function StripDiario() {
  return (
    <section className={styles.strip} style={{ background: '#FAF6ED' }}>
      <div className={styles.stripInner}>
        <div className={styles.stripText}>
          <p className={styles.stripEyebrow}>Diario de vida</p>
          <h2 className={styles.stripTitle}>El diario que siempre quisiste llevar</h2>
          <p className={styles.stripBody}>
            Anota lo que pasó hoy. Un momento, una frase, una historia completa.
            Cada nota queda fechada y organizada por hijo — nunca más pierdes un recuerdo.
          </p>
          <div className={styles.stripFeatures}>
            <div className={styles.stripFeature}><BookOpen size={16} strokeWidth={2} /> Por hijo y por día</div>
            <div className={styles.stripFeature}><BookOpen size={16} strokeWidth={2} /> Buscable en segundos</div>
            <div className={styles.stripFeature}><BookOpen size={16} strokeWidth={2} /> Privado, solo tuyo</div>
          </div>
        </div>
        <div className={styles.stripVisual}>
          <div className={styles.diarioMockup}>
            <div className={styles.diarioHeader}>
              <div className={styles.diarioMonth}>Junio 2026</div>
              <div className={styles.diarioCount}>12 entradas</div>
            </div>
            {[
              { day: 'Hoy', text: '"Primer día de baile. Entró sin mirar atrás."', tag: 'Hito' },
              { day: 'Ayer', text: '"Quiere ser bailarina y veterinaria."', tag: null },
              { day: 'Dom',  text: '"Se durmió en el auto cantando Moana."',  tag: null },
            ].map((e) => (
              <div key={e.day} className={styles.diarioEntry}>
                <div className={styles.diarioDay}>{e.day}</div>
                <div className={styles.diarioText}>{e.text}</div>
                {e.tag && <div className={styles.diarioTag}>{e.tag}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Strip Fotos ─────────────────────────────────────────────────────────── */
function StripFotos() {
  return (
    <section className={styles.strip} style={{ background: '#A6B1E7' }}>
      <div className={`${styles.stripInner} ${styles.stripFlip}`}>
        <div className={styles.stripText}>
          <p className={styles.stripEyebrow}>Fotos</p>
          <h2 className={styles.stripTitle}>Fotos con contexto, no solo imágenes</h2>
          <p className={styles.stripBody}>
            Sube una foto y cuéntale qué estaba pasando. La familia comenta.
            En diez años verás la foto y sabrás exactamente cómo fue ese día.
          </p>
          <div className={styles.stripFeatures}>
            <div className={styles.stripFeature}><Camera size={16} strokeWidth={2} /> Comentarios de la familia</div>
            <div className={styles.stripFeature}><Camera size={16} strokeWidth={2} /> Organizadas por fecha</div>
          </div>
        </div>
        <div className={styles.stripVisual}>
          <div className={styles.fotosMockup}>
            <div className={styles.fotosMainSlot}>
              <Camera size={36} strokeWidth={1} className={styles.fotosIcon} />
              <div className={styles.fotosCaption}>"Primer día en el mar"</div>
              <div className={styles.fotosDate}>15 ene · 3 años</div>
            </div>
            <div className={styles.fotosComments}>
              <div className={styles.fotosComment}>
                <div className={styles.fotosCommentAvatar}>A</div>
                <div className={styles.fotosCommentText}>Qué hermosa mi niña ❤</div>
              </div>
              <div className={styles.fotosComment}>
                <div className={styles.fotosCommentAvatar} style={{background:'#C0D2C7', color:'#335B60'}}>P</div>
                <div className={styles.fotosCommentText}>¡No le daba miedo el agua!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Strip Calendario ────────────────────────────────────────────────────── */
function StripCalendario() {
  return (
    <section className={styles.strip} style={{ background: '#FAF6ED' }}>
      <div className={styles.stripInner}>
        <div className={styles.stripText}>
          <p className={styles.stripEyebrow}>Calendario</p>
          <h2 className={styles.stripTitle}>La rutina también es un recuerdo</h2>
          <p className={styles.stripBody}>
            El fútbol del martes, el taller de cerámica, el cumpleaños de la abuela —
            todo queda registrado y se convierte en la historia de lo que vivían juntos.
          </p>
          <div className={styles.stripFeatures}>
            <div className={styles.stripFeature}><CalendarDays size={16} strokeWidth={2} /> Talleres y deportes</div>
            <div className={styles.stripFeature}><CalendarDays size={16} strokeWidth={2} /> Cumpleaños y hitos</div>
            <div className={styles.stripFeature}><CalendarDays size={16} strokeWidth={2} /> Rutina semanal y mensual</div>
          </div>
        </div>
        <div className={styles.stripVisual}>
          <div className={styles.calMockup}>
            <div className={styles.calHeader}>
              <span className={styles.calMonth}>Junio 2026</span>
            </div>
            <div className={styles.calGrid}>
              {['L','M','X','J','V','S','D'].map(d => (
                <div key={d} className={styles.calDayName}>{d}</div>
              ))}
              {Array.from({length: 30}, (_, i) => i + 1).map(n => (
                <div key={n} className={`${styles.calDay} ${[3,10,17,24].includes(n) ? styles.calDayEvent : ''} ${n === 24 ? styles.calDayToday : ''}`}>
                  {n}
                  {[3,10,17,24].includes(n) && <div className={styles.calDot} />}
                </div>
              ))}
            </div>
            <div className={styles.calEvents}>
              <div className={styles.calEvent}><span className={styles.calEventDot} style={{background:'#A6B1E7'}} />Fútbol · Mar y Jue</div>
              <div className={styles.calEvent}><span className={styles.calEventDot} style={{background:'#E5FE73'}} />Taller cerámica · Vie</div>
              <div className={styles.calEvent}><span className={styles.calEventDot} style={{background:'#417178'}} />Cumple abuela · 30 jun</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Strip Familia ───────────────────────────────────────────────────────── */
function StripFamilia() {
  return (
    <section className={styles.strip} style={{ background: '#417178' }}>
      <div className={`${styles.stripInner} ${styles.stripFlip}`}>
        <div className={`${styles.stripText} ${styles.stripTextDark}`}>
          <p className={`${styles.stripEyebrow} ${styles.stripEyebrowDark}`}>Familia</p>
          <h2 className={`${styles.stripTitle} ${styles.stripTitleDark}`}>La familia conectada, sin redes sociales</h2>
          <p className={`${styles.stripBody} ${styles.stripBodyDark}`}>
            Invita a los abuelos, los tíos, el papá. Cada uno ve y comenta
            desde su propia cuenta. Privado, seguro, solo para los tuyos.
          </p>
          <div className={`${styles.stripFeatures} ${styles.stripFeaturesDark}`}>
            <div className={styles.stripFeature}><Users size={16} strokeWidth={2} /> Hasta 10 familiares</div>
            <div className={styles.stripFeature}><Users size={16} strokeWidth={2} /> Sin publicidad, sin datos</div>
          </div>
        </div>
        <div className={styles.stripVisual}>
          <div className={styles.familyMockup}>
            <div className={styles.familyTitle}>Familia Martínez</div>
            <div className={styles.familyMembers}>
              {[
                { init: 'M', name: 'Mamá', color: '#E5FE73', text: '#335B60' },
                { init: 'P', name: 'Papá', color: '#C0D2C7', text: '#335B60' },
                { init: 'A', name: 'Abuela', color: '#FAF6ED', text: '#417178' },
                { init: 'T', name: 'Tía Laura', color: '#A6B1E7', text: '#1A1A1A' },
              ].map(m => (
                <div key={m.name} className={styles.familyMember}>
                  <div className={styles.familyMemberAvatar} style={{background: m.color, color: m.text}}>{m.init}</div>
                  <div className={styles.familyMemberName}>{m.name}</div>
                </div>
              ))}
            </div>
            <div className={styles.familyActivity}>
              <div className={styles.familyActivityItem}>
                <div className={styles.familyActivityAvatar} style={{background:'#FAF6ED', color:'#417178'}}>A</div>
                <div className={styles.familyActivityText}>
                  <strong>Abuela</strong> comentó una foto de Sofía
                  <div className={styles.familyActivityTime}>hace 2 horas</div>
                </div>
              </div>
              <div className={styles.familyActivityItem}>
                <div className={styles.familyActivityAvatar} style={{background:'#C0D2C7', color:'#335B60'}}>P</div>
                <div className={styles.familyActivityText}>
                  <strong>Papá</strong> agregó una nota del parque
                  <div className={styles.familyActivityTime}>ayer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Social Proof ────────────────────────────────────────────────────────── */
function SocialProof() {
  const items = [
    { Icon: Pen,     label: 'Dibujos de los hijos',
      body: 'Un canvas donde dibujan directamente en la app. Cada trazo guardado con su nombre y su edad.' },
    { Icon: Package, label: 'Imprime sus momentos',
      body: 'Álbumes físicos, calendarios y postales hechos con sus propios recuerdos.' },
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

/* ── Quote ───────────────────────────────────────────────────────────────── */
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
