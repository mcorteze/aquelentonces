import { useNavigate } from 'react-router-dom';
import { BookOpen, Camera, CalendarDays, Users, Pen, Package, Heart, MessageCircle, Lock } from 'lucide-react';
import styles from './LandingPage.module.css';

/* picsum seeds fijos — misma imagen siempre, sin archivos locales */
const IMG = {
  hero:       'https://picsum.photos/seed/aqhero/900/700',
  niña:       'https://picsum.photos/seed/aqchild1/800/600',
  familia:    'https://picsum.photos/seed/aqfamily/1600/700',
  foto1:      'https://picsum.photos/seed/aqphoto1/400/400',
  foto2:      'https://picsum.photos/seed/aqphoto2/400/400',
  foto3:      'https://picsum.photos/seed/aqphoto3/400/400',
  foto4:      'https://picsum.photos/seed/aqphoto4/400/400',
};

export function LandingPage() {
  const navigate = useNavigate();
  const goLogin = () => navigate('/login');

  return (
    <div className={styles.page}>
      <Nav onLogin={goLogin} />
      <Hero onCta={goLogin} />
      <Trust />
      <FeatureSave />
      <FeatureSort />
      <FeatureShare />
      <FeaturePrint />
      <Testimonios />
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
      <nav className={styles.navLinks}>
        <a href="#features" className={styles.navLink}>Funciones</a>
        <a href="#testimonios" className={styles.navLink}>Testimonios</a>
      </nav>
      <div className={styles.navRight}>
        <button className={styles.navLoginBtn} onClick={onLogin}>Entrar</button>
        <button className={styles.navBtn} onClick={onLogin}>Empezar gratis</button>
      </div>
    </header>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section className={styles.hero}>
      {/* Columna texto */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          EL ESPACIO SEGURO<br />
          PARA GUARDAR Y COMPARTIR<br />
          <em>LA HISTORIA DE TUS HIJOS</em>
        </h1>
        <p className={styles.heroSub}>
          Cada foto, nota y momento — desde el primer día hasta hoy —
          organizado en el diario privado de tu familia.
        </p>
        <div className={styles.heroActions}>
          <button className={styles.ctaHero} onClick={onCta}>
            Empezar gratis
          </button>
          <span className={styles.heroNote}>Sin tarjeta. Sin compromisos.</span>
        </div>
        <div className={styles.heroBadges}>
          <div className={styles.heroBadge}><Lock size={13} /> Privado 100%</div>
          <div className={styles.heroBadge}><Heart size={13} /> Para toda la familia</div>
        </div>
      </div>

      {/* Columna imagen — mockup de teléfono con foto real */}
      <div className={styles.heroVisual}>
        <div className={styles.heroPhone}>
          <div className={styles.heroPhoneBar}>
            <div className={styles.heroPhoneDot} />
            <div className={styles.heroPhoneDot} />
            <div className={styles.heroPhoneDot} />
          </div>
          <img
            src={IMG.hero}
            alt="Sofía, 4 años"
            className={styles.heroPhoneImg}
          />
          <div className={styles.heroPhoneOverlay}>
            <div className={styles.heroPhoneName}>Sofía · 4 años</div>
            <div className={styles.heroPhoneEntry}>"Hoy fue su primer día de baile."</div>
            <div className={styles.heroPhoneTag}>Primer día</div>
          </div>
        </div>
        {/* Tarjetas flotantes */}
        <div className={styles.floatCard1}>
          <Heart size={14} style={{color:'#B83020'}} />
          <span>Abuela comentó tu foto</span>
        </div>
        <div className={styles.floatCard2}>
          <span className={styles.floatNum}>48</span>
          <span className={styles.floatLabel}>recuerdos guardados</span>
        </div>
      </div>
    </section>
  );
}

/* ── Trust bar ───────────────────────────────────────────────────────────── */
function Trust() {
  return (
    <div className={styles.trust}>
      <div className={styles.trustItem}>
        <span className={styles.trustNum}>247,468,978</span>
        <span className={styles.trustLabel}>fotos y videos guardados</span>
      </div>
      <div className={styles.trustDivider} />
      <div className={styles.trustBadge}>Conectando familias en todo el mundo</div>
      <div className={styles.trustDivider} />
      <div className={styles.trustItem}>
        <div className={styles.trustStars}>★★★★★</div>
        <span className={styles.trustLabel}>30k reseñas · 4.9 estrellas</span>
      </div>
    </div>
  );
}

/* ── Feature GUARDAR ─────────────────────────────────────────────────────── */
function FeatureSave() {
  return (
    <section className={styles.featureSection} style={{background: '#C0D2C7'}} id="features">
      <div className={styles.featureWrap}>
        <div className={styles.featureTextCol}>
          <p className={styles.featureEye}>GUARDA FÁCIL</p>
          <h2 className={styles.featureTitle}>El diario que siempre quisiste llevar</h2>
          <p className={styles.featureBody}>
            Anota lo que pasó hoy. Un momento, una frase, una historia completa.
            Cada nota queda fechada y organizada por hijo — nunca más pierdes un recuerdo.
          </p>
          <p className={styles.featureBody}>
            Escribe desde el celular o el computador. Sin formatos complicados.
            Solo tus palabras y la fecha.
          </p>
          <ul className={styles.featureList}>
            <li><BookOpen size={15} strokeWidth={2} /> Notas de cualquier largo</li>
            <li><BookOpen size={15} strokeWidth={2} /> Organizadas por hijo y fecha</li>
            <li><BookOpen size={15} strokeWidth={2} /> Buscables en segundos</li>
          </ul>
        </div>
        <div className={styles.featureImgCol}>
          {/* Mockup diario apilado */}
          <div className={styles.diarioStack}>
            <div className={styles.diarioCard} style={{transform:'rotate(-2deg) translateY(20px)', zIndex:1}}>
              <div className={styles.diarioCardDate}>Dom 22 jun</div>
              <div className={styles.diarioCardText}>"Se durmió en el auto cantando Moana."</div>
            </div>
            <div className={styles.diarioCard} style={{transform:'rotate(1deg) translateY(10px)', zIndex:2}}>
              <div className={styles.diarioCardDate}>Lun 23 jun</div>
              <div className={styles.diarioCardText}>"Quiere ser bailarina y veterinaria a la vez."</div>
            </div>
            <div className={`${styles.diarioCard} ${styles.diarioCardTop}`} style={{zIndex:3}}>
              <div className={styles.diarioCardDate}>Mar 24 jun · <span style={{color:'#417178'}}>Hoy</span></div>
              <div className={styles.diarioCardText}>"Hoy fue su primer día de baile. Entró sin mirar atrás. No volvió a buscarme con la mirada."</div>
              <div className={styles.diarioCardTag}>Hito</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Feature ORDENAR ─────────────────────────────────────────────────────── */
function FeatureSort() {
  return (
    <section className={styles.featureSection} style={{background: '#FAF6ED'}}>
      <div className={`${styles.featureWrap} ${styles.featureWrapFlip}`}>
        <div className={styles.featureTextCol}>
          <p className={styles.featureEye}>ORGANIZA RÁPIDO</p>
          <h2 className={styles.featureTitle}>Fotos con historia, no solo imágenes</h2>
          <p className={styles.featureBody}>
            Sube una foto y cuéntale qué estaba pasando. En diez años sabrás
            exactamente cómo fue ese día — no solo cómo se veía.
          </p>
          <p className={styles.featureBody}>
            Cada hijo tiene su propio espacio. La familia comenta.
            El timelapse se construye solo.
          </p>
          <ul className={styles.featureList}>
            <li><Camera size={15} strokeWidth={2} /> Contexto escrito en cada foto</li>
            <li><Camera size={15} strokeWidth={2} /> Comentarios de la familia</li>
            <li><Camera size={15} strokeWidth={2} /> Timelapse de crecimiento</li>
          </ul>
        </div>
        <div className={styles.featureImgCol}>
          <div className={styles.fotosGrid}>
            <div className={styles.fotosGridMain}>
              <img src={IMG.niña} alt="foto niña" className={styles.fotosGridImg} />
              <div className={styles.fotosGridCaption}>
                <div className={styles.fotosGridCaptionText}>"Primer día en el mar"</div>
                <div className={styles.fotosGridCaptionDate}>15 ene · 3 años</div>
              </div>
              <div className={styles.fotosGridComments}>
                <div className={styles.fotosComment}>
                  <div className={styles.fotosAvatar} style={{background:'#417178',color:'#E5FE73'}}>A</div>
                  <div className={styles.fotosBubble}>Qué hermosa mi niña</div>
                </div>
                <div className={styles.fotosComment}>
                  <div className={styles.fotosAvatar} style={{background:'#C0D2C7',color:'#335B60'}}>P</div>
                  <div className={styles.fotosBubble}>¡No le daba miedo el agua!</div>
                </div>
              </div>
            </div>
            <div className={styles.fotosGridThumbs}>
              {[IMG.foto1, IMG.foto2, IMG.foto3, IMG.foto4].map((src, i) => (
                <img key={i} src={src} alt="" className={styles.fotosThumb} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Feature COMPARTIR ───────────────────────────────────────────────────── */
function FeatureShare() {
  return (
    <section className={styles.featureSection} style={{background: '#A6B1E7'}}>
      <div className={styles.featureWrap}>
        <div className={styles.featureTextCol}>
          <p className={styles.featureEye}>COMPARTE SEGURO</p>
          <h2 className={styles.featureTitle}>La familia conectada, sin redes sociales</h2>
          <p className={styles.featureBody}>
            Elige a quién invitar y qué pueden ver. La familia y los amigos
            reciben una notificación cada vez que agregas algo nuevo.
          </p>
          <p className={styles.featureBody}>
            100% privado — sin anuncios, sin datos vendidos, sin publicaciones públicas.
          </p>
          <ul className={styles.featureList}>
            <li><Users size={15} strokeWidth={2} /> Invita a los abuelos, tíos, papá</li>
            <li><Lock size={15} strokeWidth={2} /> Solo quien tú elijas puede ver</li>
            <li><MessageCircle size={15} strokeWidth={2} /> Comentarios en tiempo real</li>
          </ul>
        </div>
        <div className={styles.featureImgCol}>
          <div className={styles.familiaPanel}>
            <div className={styles.familiaPanelTitle}>Familia Martínez</div>
            <div className={styles.familiaAvatars}>
              {[
                {i:'M', bg:'#E5FE73', c:'#335B60', name:'Mamá'},
                {i:'P', bg:'#C0D2C7', c:'#335B60', name:'Papá'},
                {i:'A', bg:'#FAF6ED', c:'#417178', name:'Abuela'},
                {i:'T', bg:'#417178', c:'#E5FE73', name:'Tía'},
                {i:'+', bg:'rgba(255,255,255,0.2)', c:'#FAF6ED', name:'Invitar'},
              ].map(m => (
                <div key={m.name} className={styles.familiaAvatarCol}>
                  <div className={styles.familiaAvatar} style={{background:m.bg, color:m.c}}>{m.i}</div>
                  <div className={styles.familiaAvatarName}>{m.name}</div>
                </div>
              ))}
            </div>
            <div className={styles.familiaFeed}>
              {[
                {av:'A', bg:'#FAF6ED', c:'#417178', msg:'Qué hermosa quedó esa foto ❤', time:'hace 2h'},
                {av:'P', bg:'#C0D2C7', c:'#335B60', msg:'Yo también fui a ese parque de niño', time:'ayer'},
                {av:'T', bg:'#417178', c:'#E5FE73', msg:'¡La quiero ver pronto!', time:'lun'},
              ].map((item, i) => (
                <div key={i} className={styles.familiaFeedItem}>
                  <div className={styles.familiaFeedAvatar} style={{background:item.bg, color:item.c}}>{item.av}</div>
                  <div className={styles.familiaFeedContent}>
                    <div className={styles.familiaFeedMsg}>{item.msg}</div>
                    <div className={styles.familiaFeedTime}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Feature IMPRIMIR ────────────────────────────────────────────────────── */
function FeaturePrint() {
  return (
    <section className={styles.printSection}>
      <img src={IMG.familia} alt="Familia" className={styles.printBg} />
      <div className={styles.printOverlay} />
      <div className={styles.printContent}>
        <p className={styles.printEye}>IMPRIME TUS FAVORITOS</p>
        <h2 className={styles.printTitle}>Convierte los recuerdos en objetos reales</h2>
        <div className={styles.printCards}>
          <div className={styles.printCard}>
            <Package size={24} strokeWidth={1.5} className={styles.printCardIcon} />
            <div className={styles.printCardTitle}>Álbumes fotográficos</div>
            <div className={styles.printCardBody}>Diseñados automáticamente con tus propias fotos y notas.</div>
          </div>
          <div className={styles.printCard}>
            <CalendarDays size={24} strokeWidth={1.5} className={styles.printCardIcon} />
            <div className={styles.printCardTitle}>Calendarios de familia</div>
            <div className={styles.printCardBody}>Un año de recuerdos en formato físico para colgar en casa.</div>
          </div>
          <div className={styles.printCard}>
            <Pen size={24} strokeWidth={1.5} className={styles.printCardIcon} />
            <div className={styles.printCardTitle}>Postales y tarjetas</div>
            <div className={styles.printCardBody}>Envía una postal con la foto favorita de los abuelos.</div>
          </div>
        </div>
        <p className={styles.printComingSoon}>Próximamente · En desarrollo</p>
      </div>
    </section>
  );
}

/* ── Testimonios ─────────────────────────────────────────────────────────── */
function Testimonios() {
  const items = [
    {
      quote: 'Llevamos 8 meses usando Aquelentonces y es la única app que toda la familia usa de verdad. Los abuelos entran todos los días a ver las fotos de los nietos.',
      name: 'Valentina R.',
      role: 'Mamá de 3 hijos, Santiago',
    },
    {
      quote: 'Lo que más me gusta es que las fotos tienen texto. En años más voy a saber exactamente qué estaba pasando en ese momento. Eso no tiene precio.',
      name: 'Camila M.',
      role: 'Mamá de Sofía, 4 años',
    },
  ];
  return (
    <section className={styles.testimonios} id="testimonios">
      <p className={styles.testimoniosEye}>LO QUE DICEN LAS FAMILIAS</p>
      <h2 className={styles.testimoniosTitle}>Miles de familias ya guardan sus recuerdos</h2>
      <div className={styles.testimoniosGrid}>
        {items.map((t, i) => (
          <div key={i} className={styles.testimonioCard}>
            <div className={styles.testimonioStars}>★★★★★</div>
            <blockquote className={styles.testimonioQuote}>{t.quote}</blockquote>
            <div className={styles.testimonioAuthor}>
              <div className={styles.testimonioName}>{t.name}</div>
              <div className={styles.testimonioRole}>{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA Final ───────────────────────────────────────────────────────────── */
function CtaFinal({ onCta }: { onCta: () => void }) {
  return (
    <section className={styles.ctaFinal}>
      <p className={styles.ctaFinalEye}>EMPIEZA GRATIS</p>
      <h2 className={styles.ctaFinalTitle}>Empieza hoy.</h2>
      <p className={styles.ctaFinalSub}>Gratis. Privado. Solo para tu familia.</p>
      <button className={styles.ctaFinalBtn} onClick={onCta}>Crear mi diario familiar</button>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>Aquelentonces</span>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>Privacidad</a>
          <a href="#" className={styles.footerLink}>Términos</a>
          <a href="#" className={styles.footerLink}>Contacto</a>
        </div>
        <span className={styles.footerCopy}>© {new Date().getFullYear()} Aquelentonces</span>
      </div>
    </footer>
  );
}
