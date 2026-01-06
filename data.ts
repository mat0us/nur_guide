
import { Pattern, Resource, Book } from './types';

export const BOOKS: Book[] = [
  {
    title: "Designing Interfaces",
    author: "Jennifer Tidwell, Charles Brewer & Aynne Valencia",
    year: "2020 (3. vydání)",
    description: "Základní kámen UI designu. Klasifikuje vzory do kategorií a vysvětluje jejich psychologický dopad na uživatele."
  },
  {
    title: "Don't Make Me Think",
    author: "Steve Krug",
    year: "2014",
    description: "Klíčová kniha o webové použitelnosti. Zaměřuje se na intuitivnost a minimalizaci kognitivní zátěže."
  },
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    year: "2013",
    description: "Psychologie designu. Vysvětluje fundamentální koncepty jako affordance a mapping."
  }
];

export const PATTERNS: Pattern[] = [
  // Kapitola 1: Psychologie a chování
  {
    id: "safe-exploration",
    name: "Safe Exploration",
    category: "Chování",
    description: "Umožněte uživatelům zkoumat rozhraní bez strachu z nevratných chyb.",
    what: "Možnost vyzkoušet akci a snadno se vrátit zpět.",
    useWhen: "U všech komplexních interakcí, kde uživatel tápe.",
    why: "Snižuje stres a zvyšuje ochotu učit se novým funkcím.",
    how: "Implementujte 'Undo', tlačítka 'Zrušit' a jasné cesty zpět."
  },
  {
    id: "instant-gratification",
    name: "Instant Gratification",
    category: "Chování",
    description: "Uživatelé chtějí vidět výsledek své snahy okamžitě.",
    what: "Okamžitá zpětná vazba po jakékoliv akci.",
    useWhen: "Při nahrávání souborů, odesílání formulářů nebo vyhledávání.",
    why: "Buduje důvěru v systém a pocit kontroly.",
    how: "Použijte animace, potvrzovací zprávy nebo progress bary."
  },

  // Kapitola 2: Informační architektura
  {
    id: "alternative-views",
    name: "Alternative Views",
    category: "Informační struktura",
    description: "Stejná data, různé způsoby zobrazení (např. Mapa vs. Seznam).",
    what: "Přepínač mezi vizuálně odlišnými prezentacemi téhož obsahu.",
    useWhen: "Když uživatelé mají různé cíle (např. najít hotel v okolí vs. najít nejlevnější hotel).",
    why: "Různé pohledy usnadňují různé typy rozhodování.",
    how: "Přidejte viditelný přepínač v horní části obsahu. Zachovejte stav filtrů při přepnutí."
  },
  {
    id: "dashboard",
    name: "Dashboard",
    category: "Informační struktura",
    description: "Přehled klíčových metrik a přístup k častým úkolům na jedné ploše.",
    what: "Stránka s vysokou hustotou informací a vizualizací.",
    useWhen: "V systémech pro správu dat, SaaS aplikacích nebo analytice.",
    why: "Umožňuje rychlou orientaci v celkovém stavu bez nutnosti procházet podstránky.",
    how: "Používejte karty (Cards), widgety a hierarchicky nejdůležitější info dejte nahoru."
  },
  {
    id: "wizard",
    name: "Wizard (Průvodce)",
    category: "Procesy",
    description: "Složitý úkol rozdělený do lineárních kroků.",
    what: "Sada obrazovek, kterými uživatel prochází popořadě.",
    useWhen: "Při instalaci, nastavení účtu nebo složité objednávce.",
    why: "Snižuje kognitivní zátěž tím, že ukazuje jen jednu část úkolu.",
    how: "Zobrazte indikátor pokroku a umožněte návrat k předchozím krokům."
  },

  // Kapitola 3: Navigace
  {
    id: "breadcrumbs",
    name: "Breadcrumbs (Drobečky)",
    category: "Navigace",
    description: "Vizuální cesta ukazující polohu stránky v hierarchii webu.",
    what: "Řada odkazů obvykle umístěná pod hlavním menu.",
    useWhen: "U hlubokých webů s více než 3 úrovněmi (e-shopy, dokumentace).",
    why: "Pomáhá uživateli pochopit kontext a snadno se vrátit o úroveň výš.",
    how: "Použijte oddělovače (např. >) a aktuální stránku nechte neaktivní."
  },
  {
    id: "escape-hatch",
    name: "Escape Hatch",
    category: "Navigace",
    description: "Způsob, jak se okamžitě dostat z 'uzamčené' situace.",
    what: "Jasně viditelné tlačítko pro ukončení procesu nebo návrat domů.",
    useWhen: "V modálních oknech, průvodcích nebo chybových stránkách.",
    why: "Zabraňuje pocitu uvíznutí a frustraci.",
    how: "Standardně tlačítko 'Zrušit' nebo klikatelný logotyp v záhlaví."
  },
  {
    id: "fat-menus",
    name: "Fat Menus (Mega menu)",
    category: "Navigace",
    description: "Rozbalovací menu, které zabírá velkou část obrazovky a obsahuje mnoho kategorií.",
    what: "Vícesloupcová navigace odhalená po kliku nebo hoveru.",
    useWhen: "Když web obsahuje obrovské množství sekcí (např. Amazon, velké portály).",
    why: "Umožňuje uživateli vidět celou šíři nabídky bez klikání.",
    how: "Seskupujte odkazy do logických bloků s nadpisy."
  },

  // Kapitola 4: Layout
  {
    id: "center-stage",
    name: "Center Stage",
    category: "Layout",
    description: "Hlavní pracovní plocha uprostřed s nástroji po stranách.",
    what: "Dominantní prvek zabírající většinu místa.",
    useWhen: "V editorech, mapách nebo nástrojích pro tvorbu.",
    why: "Soustředí pozornost na hlavní aktivitu.",
    how: "Okolní panely (sidemenu, vlastnosti) by měly být vizuálně méně výrazné."
  },
  {
    id: "accordion",
    name: "Accordion",
    category: "Layout",
    description: "Seznam sekcí, které lze rozbalit a sbalit.",
    what: "Vertikálně naskládané hlavičky s obsahem.",
    useWhen: "Když chcete ušetřit vertikální místo a uživatel potřebuje jen jednu sekci naráz.",
    why: "Zpřehledňuje dlouhé stránky.",
    how: "Jasně označte ikonou (chevron), že je sekce interaktivní."
  },

  // Kapitola 7: Seznamy
  {
    id: "two-panel-selector",
    name: "Two-Panel Selector",
    category: "Seznamy",
    description: "Seznam prvků v jednom panelu a detail vybraného prvku v druhém.",
    what: "Rozdělení obrazovky na selektor a detail.",
    useWhen: "E-maily, nastavení, správa souborů.",
    why: "Umožňuje rychlé přepínání bez ztráty kontextu seznamu.",
    how: "Aktivní prvek v seznamu musí být jasně zvýrazněn."
  },
  {
    id: "infinite-scroll",
    name: "Infinite Scroll",
    category: "Seznamy",
    description: "Načítání dalšího obsahu při dosažení konce stránky.",
    what: "Kontinuální proud dat.",
    useWhen: "Sociální sítě, zpravodajské feedy.",
    why: "Udržuje uživatele v toku (flow) bez přerušení navigací.",
    how: "Zajistěte, aby uživatel mohl stále najít důležité odkazy v zápatí."
  },

  // Kapitola 8: Akce a příkazy
  {
    id: "preview",
    name: "Preview",
    category: "Akce",
    description: "Zobrazení výsledku akce ještě před jejím potvrzením.",
    what: "Vizuální model výsledku.",
    useWhen: "Filtry fotek, tisk, mazání důležitých dat.",
    why: "Předchází chybám a dává uživateli jistotu.",
    how: "Zobrazte náhled vedle ovládacích prvků v reálném čase."
  },
  {
    id: "smart-menu-items",
    name: "Smart Menu Items",
    category: "Akce",
    description: "Položky menu, které mění svůj název nebo stav podle kontextu.",
    what: "Dynamické popisky akcí.",
    useWhen: "Když se akce liší podle vybraného objektu (např. 'Upravit fotku' vs. 'Upravit album').",
    why: "Zvyšuje jasnost a srozumitelnost rozhraní.",
    how: "Používejte slovesa v kombinaci s názvem objektu."
  },

  // Kapitola 10: Formuláře
  {
    id: "forgiving-format",
    name: "Forgiving Format",
    category: "Formuláře",
    description: "Systém akceptuje data v různých formátech a sám je opraví.",
    what: "Flexibilní vstupní pole.",
    useWhen: "Datum, telefonní čísla, PSČ.",
    why: "Snižuje frustraci z chybových hlášení u banálních formátů.",
    how: "Odstraňte mezery a pomlčky na pozadí, neobtěžujte jimi uživatele."
  }
];

export const RESOURCES: Resource[] = [
  { name: "Nielsen Norman Group", focus: "Výzkum & UX", offer: "Nejuznávanější zdroj studií o použitelnosti.", price: "Zdarma", link: "https://www.nngroup.com" },
  { name: "UI-Patterns.com", focus: "Knihovna vzorů", offer: "Katalog UI řešení s detailním vysvětlením.", price: "Zdarma", link: "http://ui-patterns.com" },
  { name: "Laws of UX", focus: "Psychologie", offer: "Interaktivní průvodce zákony UX designu.", price: "Zdarma", link: "https://lawsofux.com" },
  { name: "UX Collective", focus: "Praxe & Eseje", offer: "Kvalitní články od designerů z celého světa.", price: "Zdarma", link: "https://uxdesign.cc" },
  { name: "Material Design", focus: "Design Systém", offer: "Komplexní návod od Google na komponenty.", price: "Zdarma", link: "https://m3.material.io" },
  { name: "Apple Human Interface Guidelines", focus: "Standardy", offer: "Pravidla pro tvorbu špičkového UI od Apple.", price: "Zdarma", link: "https://developer.apple.com/design/human-interface-guidelines/" }
];
