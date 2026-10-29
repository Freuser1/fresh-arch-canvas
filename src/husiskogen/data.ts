// All text and media for the Hus i skogen page. Files live in public/hus-i-skogen/.

export const media = (file: string) => `./hus-i-skogen/${file}`;

export const nav = [
  { id: 'ide', label: 'Idé' },
  { id: 'referenser', label: 'Referenser' },
  { id: 'huset', label: 'Huset' },
  { id: 'ritningar', label: 'Ritningar' },
  { id: 'tid', label: 'Tid' },
  { id: 'material', label: 'Material' },
  { id: 'val', label: 'Val' },
];

export const kept = [
  'Tre delar à 9,2 m',
  'Hallen genom hela huset',
  'Fyra pardörrar',
  'Bakdörren',
  'Ett tak över varje del',
];

export type Tag = 'natt' | 'dag' | 'vinter' | 'lumion';

export interface Render {
  file: string;
  title: string;
  note: string;
  tags: Tag[];
}

export const renders: Render[] = [
  { file: 'natt-sno.webp', title: 'Lyst inifrån', note: 'Vinternatt. Stora vardagsrummet lyser bakom engawan, ribborna mjukar upp övervåningen.', tags: ['natt', 'vinter'] },
  { file: 'fasad-natt.webp', title: 'Skymning i skogen', note: 'Zinktaken mot den mörka skogen, entrégårdens murar belysta nerifrån.', tags: ['natt'] },
  { file: 'fasad-dag.webp', title: 'Dag ett', note: 'Nybyggt i sommarljus: varmt trä, ljus betong, nytt trädäck.', tags: ['dag'] },
  { file: 'sodervy.webp', title: 'Söder', note: 'Huset bland tallar och ek, betongsockel och liggande panel ovanför.', tags: ['dag'] },
  { file: 'vinkel-entre.webp', title: 'Entrégården', note: 'Platsgjutna murar håller en enda gran och en granitsten. En ljuslinje under takfoten.', tags: ['natt', 'vinter'] },
  { file: 'norrsken.webp', title: 'Under norrskenet', note: 'Huset som en lykta i snön.', tags: ['natt', 'vinter'] },
  { file: 'aldrad-fasad.webp', title: 'Åldrad fasad', note: 'Några år senare: träet har silvrat, betongen har tagit mossa.', tags: ['dag'] },
  { file: 'lumion-kvall.webp', title: 'Entrén, kväll', note: 'Lumion-studie av entrégården i kvällsljus.', tags: ['lumion', 'vinter'] },
  { file: 'lumion-natt.webp', title: 'Norrsken, studie', note: 'Lumion-studie i nattljus.', tags: ['lumion', 'natt', 'vinter'] },
  { file: 'lumion-dag.webp', title: 'Vinterdag', note: 'Realtidsrendering från Lumion, dagsljus och snö.', tags: ['lumion', 'vinter'] },
  { file: 'lumion-snofall.webp', title: 'Snöfall', note: 'Realtidsrendering från Lumion med snöfall.', tags: ['lumion', 'vinter'] },
  { file: 'lumion-natt-2.webp', title: 'Natt vid sjön', note: 'Realtidsrendering från Lumion i nattljus.', tags: ['lumion', 'natt', 'vinter'] },
];

export const filters: { id: 'alla' | Tag; label: string }[] = [
  { id: 'alla', label: 'Alla' },
  { id: 'natt', label: 'Natt' },
  { id: 'dag', label: 'Dag' },
  { id: 'vinter', label: 'Vinter' },
  { id: 'lumion', label: 'Lumion' },
];

export interface Drawing {
  id: string;
  label: string;
  title: string;
  file: string;
  meta: string;
  points: string[];
  text: string;
}

export const drawings: Drawing[] = [
  {
    id: 'plan1',
    label: 'Entréplan',
    title: 'Hallen i mitten',
    file: 'plan-entre.webp',
    meta: 'Grund +9,000 · cirka 361 m²',
    points: ['Stora vardagsrummet, 79 m².', 'En konversationsgrop sänkt 450 mm.', 'Bastu, mysrum och entrégård.'],
    text: 'Vänster flygel: samlingsplatsen med konversationsgropen, köket och torrskafferiet med bakdörren ut. Mitten: stora vardagsrummet mot framsidan och matsalen bakom. Höger flygel: entré, gästrum, mysrum och spadelen med dusch, bastu och tvättstuga.',
  },
  {
    id: 'plan2',
    label: 'Plan 2',
    title: 'Under takfoten',
    file: 'plan-2.webp',
    meta: 'Plan 2 +12,000 · cirka 235 m²',
    points: ['Ett bibliotek mot skogen, 64 m².', 'Engawa längs båda flyglarna.', 'Altan med yogarum.'],
    text: 'Det korsformade övre planet: sovrum 2 och 3 bakåt, huvudsovrummet med bad, klädrum och loggia framåt. Biblioteket ligger över matsalen, öppningen över stora vardagsrummet lämnas fri. Till höger sovrum 4, ateljé och altanen på 34 m² med ett yogarum på 12 m².',
  },
  {
    id: 'sektion-a',
    label: 'Sektion A',
    title: 'Ljus från taket',
    file: 'sektion-tvar.webp',
    meta: 'Grund +9,000 · Plan 2 +12,000 · Plan 3 +15,300',
    points: ['Dubbel höjd i stora vardagsrummet.', 'Konversationsgropen −450.', 'Trappan längs galleriet.'],
    text: 'Tvärsektion genom mittdelen. Valmtaket bärs över hela djupet, med ljusinsläpp högt upp och galleriet på plan 2 som ett band av trä över rummet.',
  },
  {
    id: 'sektion-b',
    label: 'Sektion B',
    title: 'Tre tak, ett hus',
    file: 'sektion-langs.webp',
    meta: 'Längdsektion',
    points: ['Tre valmade tak.', 'Det höga taket över mitten.', 'Flyglarna lägre på var sida.'],
    text: 'Längdsektion genom alla tre delarna. Mittdelens höga tak håller ihop huset, flyglarna trappar ner mot skogen.',
  },
  {
    id: 'norr',
    label: 'Fasad norr',
    title: 'Flygel, hall, flygel',
    file: 'fasad-norr.webp',
    meta: 'Fasad norr',
    points: ['Ett högt mitttak.', 'Två lägre flyglar.', 'Ribbor framför övervåningen.'],
    text: 'Herrgårdens symmetri kommer från det höga mitttaket mellan två lägre flyglar. Ribborna filtrerar ljuset in i biblioteket.',
  },
  {
    id: 'soder',
    label: 'Fasad söder',
    title: 'Mot ljuset',
    file: 'fasad-soder.webp',
    meta: 'Fasad söder',
    points: ['Betongsockel, trä ovanför.', 'Djupa, tunna takfötter.', 'Entrén i mitten.'],
    text: 'Södra fasaden med entrén. Betongen bär huset, träet och zinken lägger sig ovanpå.',
  },
  {
    id: 'vast',
    label: 'Fasad väst',
    title: 'Gaveln mot väst',
    file: 'fasad-vast.webp',
    meta: 'Fasad väst',
    points: ['Ett tak över flygeln.', 'Liggande träpanel.', 'Få, noga placerade fönster.'],
    text: 'Den västra gaveln: en lugn vägg av betong och trä under ett eget valmtak.',
  },
  {
    id: 'ost',
    label: 'Fasad öst',
    title: 'Gaveln mot öst',
    file: 'fasad-ost.webp',
    meta: 'Fasad öst',
    points: ['Spadelens dörr ut i skogen.', 'Altanen ovanför.', 'Takfoten som skydd.'],
    text: 'Den östra gaveln med spadelen. Bastun har en egen dörr direkt ut till skogen.',
  },
  {
    id: 'iso-no',
    label: 'Isometri NO',
    title: 'Från nordost',
    file: 'iso-nordost.webp',
    meta: 'Isometri nordost',
    points: ['Tre delar à 9,2 m.', 'Glas mot skogen.', 'Entrégårdens murar.'],
    text: 'Samma fotavtryck som skissen, cirka 27,6 × 15,8 m. Hallen löper fortfarande genom hela huset.',
  },
  {
    id: 'iso-nv',
    label: 'Isometri NV',
    title: 'Från nordväst',
    file: 'iso-nordvast.webp',
    meta: 'Isometri nordväst',
    points: ['Ribbor över mittdelen.', 'Matsalen i glas.', 'Ett tak över varje del.'],
    text: 'Baksidan mot skogen: matsalen öppnar sig genom glas i full höjd, biblioteket ovanför bakom ribborna.',
  },
  {
    id: 'skiss',
    label: 'Skiss',
    title: 'Huset för hand',
    file: 'skiss.webp',
    meta: 'Skiss',
    points: ['Trä och zink.', 'Glas i bottenvåningen.', 'Skogen runt omkring.'],
    text: 'En handskiss av fasaden, där materialen och takens rytm först sattes.',
  },
];

export const materials = [
  { name: 'Betong', sub: 'Platsgjuten', file: 'tex-betong.webp', size: '180px', text: 'Formar 1800 × 900 med sex hål. En sandwich 150 / 200 / 150 för nordisk isolering.' },
  { name: 'Limträ', sub: 'Trä', file: 'tex-limtra.webp', size: '320px', text: 'Bärande limträ och träpanel, ute och inne: övervåningen, banden, ribborna och takfötterna.' },
  { name: 'Granit', sub: 'Från Kolmården', file: 'tex-granit.webp', size: '520px', text: 'Lokal sten för entrégården, eldstaden och trösklarna.' },
  { name: 'Zink', sub: 'Tak', file: 'tex-zink.webp', size: '300px', text: 'Falsat zinktak, tunna takfötter, oljade undersidor.' },
];

export const numbers = [
  { value: 596, label: 'm² rumsyta' },
  { value: 79, label: 'm² stora vardagsrummet' },
  { value: 46, label: 'm² altan och yogarum' },
  { value: 5, label: 'sovrum' },
];
