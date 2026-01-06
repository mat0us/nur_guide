
import React, { useState, useMemo } from 'react';
import { SectionType } from './types';
import { PATTERNS, RESOURCES, BOOKS } from './data';
import { PatternCard } from './components/PatternCard';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>(SectionType.Patterns);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Vše');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(PATTERNS.map(p => p.category)));
    return ['Vše', ...cats];
  }, []);

  const filteredPatterns = useMemo(() => {
    return PATTERNS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Vše' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const scrollToPattern = (id: string) => {
    const element = document.getElementById(`pattern-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      element.classList.add('ring-8', 'ring-cyan-500', 'ring-opacity-20');
      setTimeout(() => {
        element.classList.remove('ring-8', 'ring-cyan-500', 'ring-opacity-20');
      }, 2000);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case SectionType.Patterns:
        return (
          <div className="space-y-8 sm:space-y-12 animate-fadeIn max-w-[1400px] mx-auto">
            <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 sm:gap-8 text-center sm:text-left">
              <div className="max-w-2xl mx-auto sm:mx-0">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tighter uppercase italic leading-tight">Bible UI Patternů</h2>
                <p className="text-slate-500 text-base sm:text-lg lg:text-xl leading-relaxed font-medium">
                  Interaktivní katalog osvědčených řešení pro ty nejkomplexnější problémy v rozhraní. 
                  Vycházíme z knihy Jennifer Tidwell: <strong>Designing Interfaces</strong>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative group w-full">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-600 transition-colors">🔍</span>
                  <input 
                    type="text" 
                    placeholder="Vyhledat v bible..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-6 py-4 rounded-[1.5rem] border-2 border-slate-100 focus:border-cyan-500 focus:ring-0 outline-none w-full sm:w-80 lg:w-96 bg-white transition-all shadow-sm font-bold text-slate-700 text-sm sm:text-base"
                  />
                </div>
              </div>
            </header>

            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-6 scrollbar-hide border-b border-slate-100 -mx-5 px-5 sm:mx-0 sm:px-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all ${
                    selectedCategory === cat 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                    : 'bg-white text-slate-400 border border-slate-200 hover:border-cyan-300 hover:text-cyan-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {filteredPatterns.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                {filteredPatterns.map(p => {
                  const related = PATTERNS.filter(rp => rp.category === p.category && rp.id !== p.id).slice(0, 6);
                  return (
                    <PatternCard 
                      key={p.id} 
                      pattern={p} 
                      related={related}
                      onRelatedClick={scrollToPattern}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="py-20 sm:py-32 text-center bg-white rounded-[2rem] sm:rounded-[4rem] border-4 border-dashed border-slate-100 px-6">
                <div className="text-5xl sm:text-6xl mb-4 sm:mb-6 opacity-20">🔎</div>
                <p className="text-slate-400 text-xl sm:text-2xl font-black uppercase tracking-tighter">Nenalezen žádný vzor.</p>
                <button onClick={() => {setSearchQuery(''); setSelectedCategory('Vše');}} className="mt-4 sm:mt-6 text-cyan-600 font-black uppercase tracking-widest text-xs sm:text-sm hover:underline">Vynulovat filtry</button>
              </div>
            )}
          </div>
        );
      case SectionType.Theory:
        return (
          <div className="space-y-16 animate-fadeIn max-w-6xl mx-auto py-8 sm:py-12">
            {/* HCI INTRO */}
            <section className="text-center space-y-6 px-4">
              <span className="text-cyan-600 font-black uppercase tracking-[0.3em] text-xs">Human-Computer Interaction</span>
              <h2 className="text-4xl sm:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-tight">Designová Psychologie</h2>
              <p className="text-slate-500 text-lg sm:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
                Cílem HCI není vizuální krása, ale vytvoření rozhraní, které je pro člověka <span className="text-slate-900 font-bold italic underline decoration-cyan-400">pohodlné a intuitivní</span>. Musíme pochopit limity lidského mozku, ne ho jen kopírovat.
              </p>
            </section>

            {/* CORE PSYCHOLOGY GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
              <TheoryCard 
                title="CASA Paradigm" 
                tag="Sociální reakce"
                desc="Computers Are Social Actors. Lidé podvědomě aplikují sociální pravidla na stroje. Pokud je bot zdvořilý, jsme zdvořilí i my. Pokud je dominantní, reagujeme jako na dominantního člověka." 
              />
              <TheoryCard 
                title="Uncanny Valley" 
                tag="Vizuální shoda"
                desc="Přílišná lidskost v designu (avatary, hlasy) může vyvolat odpor. Cílem je navrhnout spolehlivé agenty, ne 'falešné lidi'. Jakmile systém udělá chybu, iluze se rozpadne." 
              />
              <TheoryCard 
                title="The 2s Rule" 
                tag="Latence"
                desc="Dvě sekundy jsou průměrný čas odezvy LLM. Víc než jedna sekunda pauzy v konverzaci je pro člověka trapná. Řešením je streamování odpovědí nebo 'filler words' (Hmm, moment...)." 
              />
              <TheoryCard 
                title="Satisficing" 
                tag="Rozhodování"
                desc="Lidé nehledají absolutně nejlepší řešení, ale to první 'dost dobré'. Kliknou na to, co se zdá, že vede k cíli, i když to není optimální cesta. Design musí jít 'naproti'." 
              />
              <TheoryCard 
                title="Fitts's Law" 
                tag="Ergonomie"
                desc="Doba k dosažení cíle je funkcí vzdálenosti a velikosti cíle. Nejdůležitější akce musí být nejblíže kurzoru/palci a musí být největší." 
              />
              <TheoryCard 
                title="Mental Map" 
                tag="Orientace"
                desc="Uživatel si v hlavě staví mapu aplikace. Pokud mu prvky neustále reorganizujete (jako v Office), mapu rozbijete a uživatel se cítí ztracen." 
              />
            </div>

            {/* VISUAL STRUCTURES SECTION */}
            <div className="bg-white rounded-[3rem] p-8 sm:p-16 border border-slate-100 shadow-sm space-y-10">
              <div className="text-center space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase italic tracking-tight">3 Základní Vizuální Struktury</h3>
                <p className="text-slate-400 font-medium">Jak organizovat okna a obsah</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <StructureType 
                  title="Single Window" 
                  desc="Obsah vyplňuje celé okno. Pokud uživatel vybere něco jiného, okno se přepne. Ideální pro mobily a jednoduché webové aplikace." 
                  icon="📱"
                />
                <StructureType 
                  title="Divided Window" 
                  desc="Tzv. Two-Panel Selector. Vlevo seznam prvků, vpravo detail. Uživatel nemusí držet v paměti, co vybral. Skvělé pro e-maily a nastavení." 
                  icon="🖥️"
                />
                <StructureType 
                  title="Multi-window" 
                  desc="Plátno (Canvas) + Palety (Palette). Pro komplexní profesionální nástroje. Vysoká kognitivní zátěž, ale maximální paralelismus." 
                  icon="🎨"
                />
              </div>
            </div>
            
            {/* CONVERSATIONAL UI RULES */}
            <div className="space-y-8">
               <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm">💡</span>
                Zlatá pravidla interakce
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-8 rounded-[2rem] text-white space-y-4">
                  <h4 className="text-cyan-400 font-black uppercase text-sm tracking-widest">Explicit Yielding</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Nikdy nenechávejte uživatele hádat, kdo je na řadě. Zakončete promluvu bota otázkou, která vrací 'mikrofon' uživateli. "Zde je počasí. Chcete slyšet i předpověď na víkend?"
                  </p>
                </div>
                <div className="bg-cyan-600 p-8 rounded-[2rem] text-white space-y-4">
                  <h4 className="text-white font-black uppercase text-sm tracking-widest">Barge-in</h4>
                  <p className="text-cyan-100 text-sm leading-relaxed">
                    Uživatelé v hlasovém UI často přerušují systém, jakmile slyší svou volbu. Design musí být 'front-loaded' – nejdůležitější info dejte na začátek věty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case SectionType.Websites:
        return (
          <div className="space-y-8 sm:space-y-12 animate-fadeIn max-w-[1200px] mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter italic text-center sm:text-left">Vědomosti Zdarma</h2>
            <div className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-sm border border-slate-100 overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-6 sm:px-10 py-4 sm:py-6 text-left text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em]">Platforma</th>
                    <th className="hidden sm:table-cell px-10 py-6 text-left text-[11px] font-black uppercase tracking-[0.2em]">Klíčová Hodnota</th>
                    <th className="px-6 sm:px-10 py-4 sm:py-6 text-right text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em]">Akce</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RESOURCES.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 sm:px-10 py-6 sm:py-8">
                        <div className="font-black text-lg sm:text-xl text-slate-900 mb-1">{r.name}</div>
                        <div className="text-[10px] sm:text-sm text-slate-400 font-bold uppercase tracking-widest">{r.focus}</div>
                        <div className="sm:hidden mt-2 text-xs text-slate-500 font-medium">{r.offer}</div>
                      </td>
                      <td className="hidden sm:table-cell px-10 py-8 text-slate-600 font-medium leading-relaxed">{r.offer}</td>
                      <td className="px-6 sm:px-10 py-6 sm:py-8 text-right">
                        <a href={r.link} target="_blank" className="bg-slate-900 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all group-hover:bg-cyan-600 inline-block shadow-lg">Přejít ↗</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case SectionType.Inspiration:
        return (
          <div className="space-y-8 sm:space-y-12 animate-fadeIn max-w-[1400px] mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 uppercase tracking-tighter italic text-center sm:text-left">Inspirace</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
              <InspirationCard title="Dribbble" desc="Největší komunita designérů. Skvělé pro barvy, trendy a vizuální 'eye-candy'." link="https://dribbble.com" color="bg-rose-500" />
              <InspirationCard title="Mobbin" desc="Knihovna reálných obrazovek z nejlepších aplikací. Studium reálného UX v praxi." link="https://mobbin.com" color="bg-zinc-800" />
              <InspirationCard title="Awwwards" desc="Každodenní přísun špičkového webdesignu s důrazem na animace." link="https://awwwards.com" color="bg-zinc-900" />
              <InspirationCard title="Refero" desc="Tisíce screenshotů z reálných dashboardů a SaaS aplikací." link="https://refero.design" color="bg-indigo-900" />
              <InspirationCard title="UX Archive" desc="Analýza konkrétních flow (onboarding, checkout) z populárních aplikací." link="https://uxarchive.com" color="bg-cyan-700" />
              <InspirationCard title="Godly" desc="Weby, které definují trendy roku 2025." link="https://godly.website" color="bg-purple-900" />
              <InspirationCard title="Behance" desc="Kompletní příběhy designových projektů a hluboké case-studies." link="https://behance.net" color="bg-blue-600" />
              <InspirationCard title="SiteInspire" desc="Kurátorský výběr zaměřený na čistou vizuální formu a strukturu." link="https://siteinspire.com" color="bg-blue-900" />
              <InspirationCard title="Lapa" desc="Nejlepší zdroj pro studium landing pages a konverzního designu." link="https://lapa.ninja" color="bg-emerald-900" />
            </div>
          </div>
        );
      case SectionType.Testing:
        return (
          <div className="space-y-16 sm:space-y-24 animate-fadeIn max-w-[1400px] mx-auto pb-20">
            {/* HERO SECTION */}
            <div className="text-center space-y-6 max-w-3xl mx-auto px-4">
              <span className="text-cyan-600 font-black uppercase tracking-[0.3em] text-xs">Uživatelský výzkum</span>
              <h2 className="text-4xl sm:text-6xl font-black text-slate-900 uppercase tracking-tighter italic leading-tight">Umění naslouchat uživatelům</h2>
              <p className="text-slate-500 text-lg sm:text-xl font-medium leading-relaxed">
                Testování není o hledání chyb v kódu, ale o pochopení mentálních modelů lidí, kteří váš produkt používají.
              </p>
            </div>

            {/* PROCESS FLOW */}
            <div className="space-y-10">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-sm">01</span>
                Proces testování v 6 krocích
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Hypotézy", desc: "Často si jen myslíme, že lidé aplikaci používají určitým způsobem. Musíme si vypsat, co chceme ověřit." },
                  { title: "Volba metody", desc: "Dotazníky pro kvantitu, nebo hloubkové rozhovory a testování použitelnosti pro kvalitu." },
                  { title: "Nábor respondentů", desc: "Zásada 6 lidí: Testování s 6 uživateli odhalí až 85 % všech problémů s použitelností." },
                  { title: "Scénář", desc: "Sada úkolů, které uživatel plní. Musí být zasazeny do reálného kontextu, aby uživatel nehrál roli." },
                  { title: "Moderované sezení", desc: "Uživatel nahlas přemýšlí, moderátor sleduje, klade doplňující otázky, ale nenavádí." },
                  { title: "Výsledná zpráva", desc: "Matice zjištění: Co je kritické, co jen milé na vylepšení a jaká je pracnost oprav." }
                ].map((step, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="text-4xl font-black text-slate-100 group-hover:text-cyan-500/10 transition-colors mb-4">{i + 1}</div>
                    <h4 className="text-lg font-black text-slate-900 mb-2 uppercase">{step.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* QUESTIONS COMPARISON */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-red-50 p-8 sm:p-12 rounded-[2.5rem] border border-red-100 space-y-6">
                <h3 className="text-xl font-black text-red-900 uppercase tracking-tight">Jak se NEPTAT 🚫</h3>
                <div className="space-y-4">
                  {[
                    "Líbí se vám to?",
                    "Rozumíte tomu?",
                    "Je tu všechno, co potřebujete?",
                    "Klikl byste na tohle tlačítko?"
                  ].map((q, i) => (
                    <div key={i} className="bg-white/50 p-4 rounded-xl text-red-700 font-bold text-sm sm:text-base border border-red-200/50">
                      „{q}“ <span className="block text-[10px] uppercase font-black opacity-50 mt-1">Důvod: Navádíte k pozitivní odpovědi</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-green-50 p-8 sm:p-12 rounded-[2.5rem] border border-green-100 space-y-6">
                <h3 className="text-xl font-black text-green-900 uppercase tracking-tight">Jak se PTÁT SPRÁVNĚ ✅</h3>
                <div className="space-y-4">
                  {[
                    "Jak tomu rozumíte?",
                    "Co vám na této stránce chybí?",
                    "Jak byste to popsal vlastními slovy?",
                    "Ukažte mi, jak byste v této situaci postupoval."
                  ].map((q, i) => (
                    <div key={i} className="bg-white/50 p-4 rounded-xl text-green-700 font-bold text-sm sm:text-base border border-green-200/50">
                      „{q}“ <span className="block text-[10px] uppercase font-black opacity-50 mt-1">Důvod: Otevřená otázka bez sugestivnosti</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* METRICS SECTION */}
            <div className="bg-slate-900 rounded-[3rem] p-10 sm:p-20 text-white space-y-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full"></div>
              <div className="text-center space-y-4 relative z-10">
                <h3 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tighter">5 Pilířů Použitelnosti</h3>
                <p className="text-slate-400 font-medium text-lg">Co přesně během testování měříme?</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
                {[
                  { label: "Naučitelnost", val: "Nováček", desc: "Jak snadné je splnit úkol napoprvé?" },
                  { label: "Efektivita", val: "Pro", desc: "Jak rychle uživatel úkol zvládne?" },
                  { label: "Paměť", val: "Občasný", desc: "Vzpomene si po pauze, jak se to dělá?" },
                  { label: "Chybovost", val: "Všichni", desc: "Kolik chyb udělají a jak se z nich zotaví?" },
                  { label: "Spokojenost", val: "Emoce", desc: "Jaký mají z používání pocit (Happy UX)?" }
                ].map((m, i) => (
                  <div key={i} className="text-center space-y-3">
                    <div className="text-xs font-black text-cyan-400 uppercase tracking-widest">{m.val}</div>
                    <h4 className="text-xl font-black border-b border-white/10 pb-2 uppercase italic">{m.label}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed font-bold">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col selection:bg-cyan-200">
      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-2xl sticky top-0 z-[100] border-b border-slate-200 h-20 sm:h-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-10 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-6 group cursor-pointer" onClick={() => setActiveSection(SectionType.Patterns)}>
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-slate-900 rounded-2xl sm:rounded-3xl flex items-center justify-center text-white font-black text-xl sm:text-3xl shadow-lg transition-all transform -rotate-6 group-hover:rotate-0">DI</div>
            <div className="flex flex-col">
              <span className="font-black text-sm sm:text-2xl leading-none tracking-tighter text-slate-900 uppercase">Design Guide</span>
              <span className="hidden sm:inline text-[10px] font-black text-cyan-600 uppercase tracking-widest mt-1">Jennifer Tidwell Edition</span>
            </div>
          </div>
          <div className="flex gap-1 sm:gap-2">
            <NavButton active={activeSection === SectionType.Patterns} onClick={() => setActiveSection(SectionType.Patterns)}>Vzory</NavButton>
            <div className="hidden md:flex gap-1 sm:gap-2">
              <NavButton active={activeSection === SectionType.Theory} onClick={() => setActiveSection(SectionType.Theory)}>Teorie</NavButton>
              <NavButton active={activeSection === SectionType.Websites} onClick={() => setActiveSection(SectionType.Websites)}>Zdroje</NavButton>
              <NavButton active={activeSection === SectionType.Inspiration} onClick={() => setActiveSection(SectionType.Inspiration)}>Inspirace</NavButton>
              <NavButton active={activeSection === SectionType.Testing} onClick={() => setActiveSection(SectionType.Testing)}>Testování</NavButton>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-5 sm:px-10 pb-20 sm:pb-32 pt-4">
        {renderSection()}
      </main>

      <footer className="bg-slate-900 text-white py-12 sm:py-16 px-5 sm:px-10 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-black text-2xl tracking-tighter uppercase italic leading-tight">Designing Interfaces <span className="text-cyan-400">Study Companion</span></h3>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">Studijní nástroj vytvořený pro ty, kteří by na zkoušce něco nevěděli</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-6 sm:gap-10 text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">O projektu</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Metodika</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Kontakt</a>
            </div>
            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">© 2025 DESIGN GUIDE · VYTVOŘENO PRO KOMUNITU</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; children: React.ReactNode; onClick: () => void }> = ({ active, children, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-3 sm:px-6 py-2 sm:py-3 text-[9px] sm:text-[11px] font-black uppercase tracking-widest rounded-xl sm:rounded-2xl transition-all duration-300 ${
      active 
      ? 'bg-slate-900 text-white shadow-lg' 
      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {children}
  </button>
);

const TheoryCard: React.FC<{ title: string; tag: string; desc: string }> = ({ title, tag, desc }) => (
  <div className="bg-white p-8 sm:p-10 rounded-[2rem] border border-slate-100 hover:border-cyan-500/30 hover:shadow-xl transition-all group flex flex-col gap-4">
    <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full w-fit">{tag}</span>
    <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight italic">{title}</h3>
    <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">{desc}</p>
  </div>
);

const StructureType: React.FC<{ title: string; desc: string; icon: string }> = ({ title, desc, icon }) => (
  <div className="space-y-4 p-4">
    <div className="text-4xl">{icon}</div>
    <h4 className="text-lg font-black text-slate-900 uppercase">{title}</h4>
    <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
  </div>
);

const InspirationCard: React.FC<{ title: string; desc: string; link: string; color: string }> = ({ title, desc, link, color }) => (
  <div className="bg-white border border-slate-100 rounded-[2rem] sm:rounded-[3.5rem] p-8 sm:p-12 hover:shadow-2xl transition-all group flex flex-col justify-between min-h-[350px] sm:h-[450px] overflow-hidden relative">
    <div className={`absolute -top-20 -right-20 w-48 h-48 sm:w-64 sm:h-64 ${color} opacity-5 blur-[80px] sm:blur-[100px] group-hover:opacity-20 transition-opacity`}></div>
    <div className="space-y-4 sm:space-y-6 relative z-10">
      <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter italic">{title}</h3>
      <div className="w-10 sm:w-12 h-1 bg-slate-900 group-hover:bg-cyan-600 group-hover:w-full transition-all duration-500"></div>
      <p className="text-slate-400 text-sm sm:text-lg leading-relaxed font-medium">{desc}</p>
    </div>
    <a 
      href={link} 
      target="_blank" 
      className="inline-flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-slate-900 group-hover:text-cyan-600 transition-colors relative z-10"
    >
      Navštívit <span className="text-lg sm:text-xl group-hover:translate-x-4 transition-transform duration-300">→</span>
    </a>
  </div>
);

export default App;
