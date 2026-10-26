import { useEffect, useState, type FormEvent } from 'react';
import { CONTACT_EMAIL } from '../contact';

export type PortfolioModalType =
  | 'projects'
  | 'about'
  | 'skills'
  | 'process'
  | 'experiments'
  | 'contact'
  | null;

interface PortfolioModalsProps {
  activeModal: PortfolioModalType;
  onClose: () => void;
}

export function PortfolioModals({ activeModal, onClose }: PortfolioModalsProps) {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [filter, setFilter] = useState<'all' | 'parametrisk' | 'bim' | 'fastighet'>('all');

  // Close with Escape and stop the page behind the dialog from scrolling.
  useEffect(() => {
    if (!activeModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [activeModal, onClose]);

  // Reset the contact form each time the contact dialog is reopened.
  useEffect(() => {
    if (activeModal === 'contact') setContactSubmitted(false);
  }, [activeModal]);

  if (!activeModal) return null;

  // There is no backend on GitHub Pages, so the form opens the visitor's mail app
  // with everything pre-filled instead of pretending to send the message.
  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const subject = String(data.get('subject') ?? '');
    const message = String(data.get('message') ?? '');
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setContactSubmitted(true);
  };

  // Projekten här motsvarar filerna i public/pdfs/ (samma som i 3D-vyn på startsidan).
  const projects = [
    {
      id: 'parkering',
      title: 'Parkering i befintlig bebyggelse',
      category: 'fastighet',
      role: 'Examensarbete, författare',
      year: '2026',
      description:
        'Examensarbete på grundnivå (15 hp) inom samhällsbyggnad. Hur parkering kan lösas i redan byggd miljö, där ytan är begränsad och nya funktioner ska passa in i befintliga strukturer.',
      stack: ['Samhällsbyggnad', 'PBL', 'Platsanalys'],
      metric: 'KTH · Byggteknik och design',
    },
    {
      id: 'tunnel',
      title: 'Parametrisk tunnel',
      category: 'parametrisk',
      role: 'Projektör',
      year: '2026',
      description:
        'En liten men väl grundad parametrisk tunnel. Geometrin styrs av parametrar i Grasshopper och förs vidare till en BIM-modell i Revit.',
      stack: ['Rhino', 'Grasshopper', 'Revit'],
      metric: 'Grasshopper- och Revit-fil',
    },
    {
      id: 'skogsterrasserna',
      title: 'Skogsterrasserna',
      category: 'fastighet',
      role: 'Koncept och projektering',
      year: '2026',
      description:
        'Förslag till en ny stadsdel i Västra skogen, Solna, med gestaltningsprogram på svenska och engelska. Projektet användes också för att testa hur långt AI går att använda i ritarbetet – kika gärna på dörr- och väggplaceringarna.',
      stack: ['Stadsbyggnad', 'Gestaltningsprogram', 'AI'],
      metric: 'Gestaltningsprogram (SV/EN)',
    },
    {
      id: 'investeringskalkyl',
      title: 'Investeringskalkyl',
      category: 'fastighet',
      role: 'Fastighetsekonomi',
      year: '2026',
      description:
        'Beräkningsark för fastighetens kostnader och hyresintäkter, uppbyggt för att jämföra olika hyresgäster och upplägg.',
      stack: ['Excel', 'Fastighetsvärdering', 'Kalkyl'],
      metric: 'Kalkylark (XLSX)',
    },
    {
      id: 'konstruktion-rot',
      title: 'Konstruktion & ROT',
      category: 'bim',
      role: 'Grupparbete',
      year: 'KTH',
      description:
        'Projektering i grupp med samordning, konstruktion och redovisning, samt ett ROT-projekt om ombyggnad av en befintlig byggnad med fasader, sektioner och planer.',
      stack: ['Revit', 'AutoCAD', 'ROT', 'Konstruktion'],
      metric: 'Ritningar och rapporter (PDF)',
    },
    {
      id: 'portal',
      title: 'Portal & renderingar',
      category: 'bim',
      role: 'Projektering',
      year: 'KTH',
      description:
        'Tidigt skissarbete kring entré och portal, tillsammans med renderade vyer av interiören och utemiljön.',
      stack: ['SketchUp', 'Lumion', 'Rendering'],
      metric: 'Skiss och renderingar',
    },
  ];

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0c0c0c] border border-white/20 rounded-2xl p-6 sm:p-8 text-white shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors text-sm cursor-pointer"
          aria-label="Stäng"
        >
          ✕
        </button>

        {/* 1. PROJECTS MODAL */}
        {activeModal === 'projects' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-white/60">
              <span>Utvalda projekt</span>
              <span>·</span>
              <span>2024 — 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-2">
              Projekt
            </h2>
            <p className="text-sm sm:text-base text-white/70 mb-6 leading-relaxed">
              Ett urval av projekt inom byggteknik, BIM, parametrisk design och fastighetsutveckling – från examensarbete till kalkyl. Alla filer finns att öppna från startsidans 3D-vy.
            </p>

            {/* Filter pills */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 text-xs">
              {(
                [
                  { id: 'all', label: 'Alla projekt' },
                  { id: 'parametrisk', label: 'Parametrisk design' },
                  { id: 'bim', label: 'BIM & projektering' },
                  { id: 'fastighet', label: 'Fastighet & stad' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                    filter === tab.id
                      ? 'bg-white text-black font-medium'
                      : 'border border-white/20 text-white/70 hover:border-white/50 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Project list */}
            <div className="space-y-4">
              {filteredProjects.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/30 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                    <h3 className="text-lg font-medium text-white group-hover:text-white/90">
                      {item.title}
                    </h3>
                    <div className="text-xs text-white/50">
                      {item.role} · {item.year}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 mb-3 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs">
                    <div className="flex flex-wrap gap-2 text-white/60">
                      {item.stack.map((tech) => (
                        <span key={tech} className="bg-white/5 px-2 py-0.5 rounded border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className="text-white/50 italic text-[11px]">
                      {item.metric}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. ABOUT ME MODAL */}
        {activeModal === 'about' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-white/60">
              <span>Bakgrund</span>
              <span>·</span>
              <span>Bygg & design</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4">
              Om mig
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
              <p>
                Hej! Jag är en otroligt nyfiken person som verkligen gillar att kasta mig in i projekt och lära mig på vägen. Jag har en bakgrund inom design och bygg och studerar Byggteknik och design på KTH.
              </p>
              <p>
                Min professionella erfarenhet är betydligt mindre än min nyfikenhet, och jag har en tendens att lära mig nya saker snabbt. Jag är alltid på jakt efter nya utmaningar och möjligheter att växa.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-white/50 uppercase tracking-wider mb-1">Fokus</div>
                  <div className="font-medium text-white">Byggteknik, BIM & parametrisk design</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-white/50 uppercase tracking-wider mb-1">Tillgänglighet</div>
                  <div className="font-medium text-white">Öppen för nya roller och samarbeten</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-white/50 uppercase tracking-wider mb-1">Plats</div>
                  <div className="font-medium text-white">Stockholm</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. SKILLS & STACK MODAL */}
        {activeModal === 'skills' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-white/60">
              <span>Kompetenser</span>
              <span>·</span>
              <span>Verktyg & kunskap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4">
              Kompetenser & verktyg
            </h2>
            <p className="text-sm text-white/70 mb-6">
              Programvaror och kunskapsområden från utbildningen på KTH och mina egna projekt.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2">
                <div className="text-white font-medium text-sm flex items-center justify-between">
                  <span>CAD & BIM</span>
                  <span className="text-white/40">Revit · CAD</span>
                </div>
                <p className="text-white/60 text-[11px]">
                  Revit, AutoCAD och SketchUp – modellering, ritningar, planer, fasader och sektioner.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2">
                <div className="text-white font-medium text-sm flex items-center justify-between">
                  <span>Parametrisk design</span>
                  <span className="text-white/40">Rhino</span>
                </div>
                <p className="text-white/60 text-[11px]">
                  Rhino och Grasshopper – parameterstyrd geometri som förs vidare till BIM-modeller.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2">
                <div className="text-white font-medium text-sm flex items-center justify-between">
                  <span>Visualisering</span>
                  <span className="text-white/40">Lumion</span>
                </div>
                <p className="text-white/60 text-[11px]">
                  Lumion, rendering och 3D-modellering för presentationer och gestaltningsprogram.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2">
                <div className="text-white font-medium text-sm flex items-center justify-between">
                  <span>Byggprocess & fastighet</span>
                  <span className="text-white/40">KTH</span>
                </div>
                <p className="text-white/60 text-[11px]">
                  Bygglov & PBL, entreprenadprocessen, ROT-projekt, fastighetsjuridik och fastighetsvärdering.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. CREATIVE PROCESS MODAL */}
        {activeModal === 'process' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-white/60">
              <span>Arbetssätt</span>
              <span>·</span>
              <span>Så jobbar jag</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4">
              Min arbetsprocess
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed">
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  01. Förutsättningar & analys
                </div>
                <p className="text-white/60 text-xs">
                  Platsanalys, detaljplan och regelverk (PBL) – vad som får och kan byggas innan första linjen ritas.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  02. Skiss & parametrisk utforskning
                </div>
                <p className="text-white/60 text-xs">
                  Tidiga volymer och alternativ testas snabbt i Rhino och Grasshopper, där geometrin styrs av parametrar.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  03. BIM-modellering & projektering
                </div>
                <p className="text-white/60 text-xs">
                  Förslaget byggs upp i Revit med konstruktion, planer, fasader och sektioner, samordnat med övriga discipliner.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  04. Visualisering & ekonomi
                </div>
                <p className="text-white/60 text-xs">
                  Renderingar och gestaltningsprogram för att kommunicera idén, och kalkyler för att pröva att projektet håller ekonomiskt.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. EXPERIMENTS MODAL */}
        {activeModal === 'experiments' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-white/60">
              <span>Egna tester</span>
              <span>·</span>
              <span>Lab</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
              Experiment
            </h2>
            <p className="text-sm text-white/70 mb-5">
              Sidoprojekt där jag testar nya verktyg och arbetssätt inom bygg och design.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  Exp 01: Från Grasshopper till Revit
                </div>
                <p className="text-white/60 text-xs mb-2">
                  En parametrisk tunnel där geometrin tas fram i Grasshopper och sedan förs över till en BIM-modell i Revit.
                </p>
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Rhino · Grasshopper · Revit</span>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  Exp 02: AI som ritverktyg
                </div>
                <p className="text-white/60 text-xs mb-2">
                  Skogsterrasserna ritades av mig och matades sedan in i en AI-modell för att se hur långt den klarar planritningar – resultatet är lärorikt.
                </p>
                <span className="text-[10px] text-white/40 uppercase tracking-wider">AI · Planlösningar</span>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  Exp 03: Portfolio i 3D
                </div>
                <p className="text-white/60 text-xs mb-2">
                  Startsidan är en egen 3D-scen över Stockholm där varje byggnad öppnar ett projekt.
                </p>
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Blender · Three.js</span>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium text-sm mb-1">
                  Exp 04: Kalkylmodell för hyresgäster
                </div>
                <p className="text-white/60 text-xs mb-2">
                  Ett kalkylark som räknar fastighetens kostnader mot hyresintäkter för olika typer av hyresgäster.
                </p>
                <span className="text-[10px] text-white/40 uppercase tracking-wider">Excel · Fastighetsekonomi</span>
              </div>
            </div>
          </div>
        )}

        {/* 6. CONTACT MODAL */}
        {activeModal === 'contact' && (
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-widest text-white/60">
              <span>Kontakt</span>
              <span>·</span>
              <span>Säg hej</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
              Hör av dig
            </h2>
            <p className="text-sm text-white/70 mb-6">
              Har du ett projekt, en tjänst eller ett samarbete i åtanke? Skriv en rad här nedan eller mejla mig direkt.
            </p>

            {contactSubmitted ? (
              <div className="bg-white/5 border border-white/20 rounded-xl p-6 text-center py-10">
                <div className="text-3xl mb-3">✳︎</div>
                <h3 className="text-lg font-medium mb-1">Ditt mejlprogram öppnas nu</h3>
                <p className="text-sm text-white/60 max-w-md mx-auto mb-6">
                  Meddelandet är redan ifyllt – tryck bara på skicka. Öppnades inget? Skriv till{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs uppercase tracking-wider bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors cursor-pointer"
                >
                  Tillbaka
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleContactSubmit}
                className="space-y-4 text-left"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider text-white/60 mb-1">
                      Ditt namn
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      required
                      type="text"
                      placeholder="Förnamn Efternamn"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-white/60 mb-1">
                      Din e-post
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      required
                      type="email"
                      placeholder="namn@exempel.se"
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs uppercase tracking-wider text-white/60 mb-1">
                    Ämne
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    required
                    type="text"
                    placeholder="Tjänst / Examensarbete / Samarbete / Projekt"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider text-white/60 mb-1">
                    Meddelande
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Berätta kort om projektet eller rollen…"
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-white/50">
                    Direkt e-post: <a href={`mailto:${CONTACT_EMAIL}`} className="text-white underline">{CONTACT_EMAIL}</a>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      Avbryt
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs uppercase tracking-wider bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors cursor-pointer"
                    >
                      Skicka
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
