import WhatsAppIcon from './icons/WhatsAppIcon';
import { useLang } from '../LanguageContext';

const CAR_PATH = "m 71.419033,46.759889 c -0.934896,-2.409155 -3.804281,-4.351485 -7.631344,-5.165768 -1.436599,-0.305668 -4.31104,-0.412708 -5.922862,-0.220565 -2.400137,0.286119 -5.420603,1.452593 -6.886964,2.659681 -0.904531,0.7446 -1.756568,1.842561 -2.06342,2.658991 -0.385014,1.024392 -0.54223,0.988487 -0.413654,-0.09448 0.251412,-2.117604 1.258318,-3.516376 3.548969,-4.930162 1.712533,-1.056966 3.099337,-1.539015 5.521181,-1.919149 2.501462,-0.392629 5.552321,-0.163865 7.953097,0.596349 3.801118,1.203637 6.461323,3.968772 6.270321,6.517649 l -0.05431,0.72469 z m 52.398297,0.670836 c -0.0161,-0.06338 -0.0179,-0.452306 -0.005,-0.864276 0.15144,-4.480611 6.90108,-7.781338 14.02114,-6.856665 5.26626,0.683926 9.2309,3.694492 9.1753,6.967307 l -0.0147,0.868872 -0.25518,-0.729709 c -0.4431,-1.267033 -1.46881,-2.382938 -3.14405,-3.42045 -2.3776,-1.4725 -4.92637,-2.130247 -8.25472,-2.130247 -3.20182,0 -5.75503,0.670872 -8.09324,2.12654 -1.67403,1.042196 -2.70549,2.164896 -3.14587,3.424157 -0.14033,0.401338 -0.2684,0.677851 -0.28456,0.614471 z m 24.75155,-2.215841 c -0.79622,-1.378602 -1.40304,-2.096797 -2.31843,-2.743918 -0.33843,-0.239248 -0.46356,-0.398609 -0.31276,-0.398387 0.47414,9.58e-4 5.2115,0.813325 7.46545,1.280608 2.48866,0.515942 5.21613,1.337646 5.86668,1.767457 l 0.42034,0.277731 -5.50168,0.01033 c -5.10557,0.0096 -5.51018,-0.0043 -5.6196,-0.193813 z m 13.63267,-0.140757 c -0.52248,-0.463011 -2.56553,-1.379727 -4.22219,-1.894473 -1.79538,-0.557867 -5.26192,-1.300251 -6.60507,-1.414518 -0.99735,-0.08485 -1.08957,-0.269105 -0.13466,-0.269105 1.01588,0 4.69647,-0.266474 4.69619,-0.340004 -3.9e-4,-0.09641 -1.72122,-0.549214 -3.79846,-0.999484 -6.2775,-1.360736 -14.11656,-1.965201 -24.05004,-1.854481 -7.08905,0.07901 -10.51394,0.308003 -18.473,1.23512 -2.68973,0.313314 -7.62814,0.423701 -10.585814,0.236626 -2.680804,-0.169566 -4.492574,-0.370372 -7.337483,-0.813247 -2.180442,-0.339435 -6.570756,-1.256101 -6.431125,-1.342769 0.04223,-0.02623 0.777125,0.07758 1.633092,0.230637 2.980424,0.532953 4.008831,0.594311 9.81808,0.585783 5.73881,-0.0084 7.63006,-0.105116 15.59532,-0.7973 7.73728,-0.672377 15.85385,-1.331453 17.91602,-1.454806 2.70133,-0.16159 8.16512,-0.06865 10.73052,0.182533 7.08575,0.693765 14.12859,2.414422 18.81713,4.597268 l 1.27158,0.592025 0.76915,1.843647 c 0.42304,1.014007 0.74484,1.859967 0.71515,1.879912 -0.0298,0.01993 -0.17566,-0.07157 -0.32439,-0.203364 z M 42.870202,44.649836 c 0,-0.324826 2.799366,-2.586346 4.119628,-3.328118 1.344667,-0.755488 3.705077,-1.691557 5.163283,-2.047613 1.520997,-0.371388 3.774617,-0.661563 5.051358,-0.650419 l 0.982533,0.0086 -1.237885,0.268737 c -2.87481,0.624102 -5.496415,1.697203 -7.043493,2.883116 -0.871862,0.668326 -2.20831,2.286098 -2.20831,2.673162 0,0.263402 -0.01796,0.265379 -2.413556,0.265379 -1.327457,0 -2.413558,-0.03276 -2.413558,-0.07283 z m -1.668797,-0.686589 c -0.005,-1.113002 0.891408,-2.634778 2.41257,-4.095603 l 0.744205,-0.714683 -0.06673,-1.478916 c -0.03671,-0.813397 -0.02959,-1.478906 0.01577,-1.478906 0.04537,0 0.294919,0.10371 0.554548,0.230472 0.380672,0.185858 0.753175,0.230473 1.924292,0.230473 1.699699,0 4.301583,-0.389317 10.286981,-1.539232 13.834691,-2.657926 23.264366,-4.021703 31.74755,-4.591525 3.407755,-0.228901 12.749529,-0.188639 15.780939,0.06802 6.48048,0.548666 11.50124,1.435528 16.3934,2.895721 2.46857,0.736809 5.50557,1.884699 5.31101,2.007389 -0.0564,0.03568 -1.03655,0.177106 -2.17772,0.314266 l -2.07479,0.24938 -2.61292,-0.796978 c -4.53496,-1.383245 -10.28674,-2.388652 -15.86009,-2.77233 -2.677,-0.184284 -9.799815,-0.181592 -12.624761,0.0048 -6.386138,0.4213 -13.11717,1.336891 -19.029964,2.588559 -3.026362,0.640641 -4.035601,0.899864 -3.869722,0.993919 0.08611,0.04882 0.616062,0.180188 1.177677,0.29191 4.058715,0.807432 7.878826,2.740242 10.768177,5.448218 0.275504,0.258207 0.458485,0.269022 17.080547,1.009148 9.241136,0.411478 18.138786,0.801236 19.772576,0.866126 1.63382,0.06489 3.05409,0.137423 3.15619,0.161177 0.10211,0.02374 -9.31979,0.04729 -20.937544,0.05229 l -21.1232,0.0091 -0.18274,-0.298332 c -0.331022,-0.540434 -1.764657,-1.821081 -2.861665,-2.556311 -5.583307,-3.742006 -15.181709,-5.056886 -22.82569,-3.126877 -3.978337,1.004472 -7.962713,3.250183 -10.206723,5.752794 l -0.670061,0.747281 z M 73.110129,43.31101 C 71.474584,41.314561 68.550357,39.642157 65.469642,38.941321 64.0094,38.609126 64.25843,38.543649 65.85773,38.839284 c 2.829634,0.523055 5.562558,1.516927 7.843124,2.852268 1.165541,0.682458 2.773485,1.861352 2.773485,2.033431 0,0.04169 -0.666672,0.07578 -1.481498,0.07578 H 73.51135 Z";

function CarHeroSVG({ accent }) {
  return (
    <svg viewBox="35 28 130 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', display: 'block', filter: `drop-shadow(0 20px 40px ${accent}58)` }}
      preserveAspectRatio="xMidYMid meet">
      <path d={CAR_PATH} fill="#FFFFFF" fillRule="evenodd" />
    </svg>
  );
}

export default function Hero({ accent }) {
  const { t } = useLang();

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(160deg, #0D0D0D 0%, #1a1a1a 60%, #0f0f0f 100%)',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
        backgroundSize: '40px 40px', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 700, height: 700, borderRadius: '50%',
        background: `${accent}14`, filter: 'blur(140px)',
        top: '10%', right: '-10%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '58%',
        display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
      }} className="hero-car-col">
        <CarHeroSVG accent={accent} />
      </div>

      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: 'clamp(100px, 14vw, 160px) clamp(16px, 5vw, 60px) clamp(60px, 8vw, 100px)',
        position: 'relative', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 40,
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: `${accent}18`, border: `1px solid ${accent}33`,
            borderRadius: 100, padding: '6px 14px', marginBottom: 28,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: accent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {t.hero.badge}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 4.5vw, 58px)', fontWeight: 900, lineHeight: 1.08,
            letterSpacing: '-0.03em', color: 'white', maxWidth: 700,
            marginBottom: 20,
          }}>
            {t.hero.title1}<br />
            {t.hero.title2} <span style={{ color: accent }}>{t.hero.titleAccent}</span>
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'rgba(255,255,255,0.82)',
            maxWidth: 460, lineHeight: 1.65, marginBottom: 44, fontWeight: 400,
          }}>
            {t.hero.subtitle}
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#catalogo" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: accent, color: 'white', padding: '15px 32px',
              borderRadius: 10, fontSize: 16, fontWeight: 700,
              boxShadow: `0 8px 32px ${accent}44`, transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${accent}55`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 8px 32px ${accent}44`; }}>
              {t.hero.cta} <span style={{ fontSize: 18 }}>→</span>
            </a>
            <a href="#contacto" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'white', padding: '15px 28px', borderRadius: 10, fontSize: 16, fontWeight: 600,
              transition: 'background 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}>
              <WhatsAppIcon size={18} /> {t.hero.contact}
            </a>
          </div>

          <div style={{ display: 'flex', gap: 'clamp(24px, 5vw, 48px)', marginTop: 56, flexWrap: 'wrap' }}>
            {t.hero.stats.map(([n, l]) => (
              <div key={n}>
                <div style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>{n}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div />
      </div>
    </section>
  );
}
