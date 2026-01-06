
import React, { useState } from 'react';
import { Pattern } from '../types';

interface Props {
  pattern: Pattern;
  related?: Pattern[];
  onRelatedClick?: (id: string) => void;
}

// 🐦 Pidgeon Pattern Easter Egg komponenta
const PidgeonPatternExample: React.FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div 
      className="bg-white rounded-[2rem] shadow-xl border border-slate-200 p-6 sm:p-8 w-full max-w-xs h-[280px] cursor-pointer select-none group flex items-center justify-center"
      onClick={() => setIsClicked(!isClicked)}
    >      
      {/* Kontejner s obrázkem a šipkami */}
      <div className="relative flex items-center justify-center">
        {/* Šipky ukazující na obrázek */}
        <div className={`absolute -left-8 top-1/2 -translate-y-1/2 text-2xl transition-all duration-300 ${isClicked ? 'opacity-0 -translate-x-2' : 'opacity-100 animate-pulse'}`}>
          👉
        </div>
        <div className={`absolute -right-8 top-1/2 -translate-y-1/2 text-2xl transition-all duration-300 ${isClicked ? 'opacity-0 translate-x-2' : 'opacity-100 animate-pulse'}`}>
          👈
        </div>
        <div className={`absolute left-1/2 -top-8 -translate-x-1/2 text-2xl transition-all duration-300 ${isClicked ? 'opacity-0 -translate-y-2' : 'opacity-100 animate-pulse'}`}>
          👇
        </div>
        <div className={`absolute left-1/2 -bottom-8 -translate-x-1/2 text-2xl transition-all duration-300 ${isClicked ? 'opacity-0 translate-y-2' : 'opacity-100 animate-pulse'}`}>
          👆
        </div>
        
        {/* Hlavní kontejner s obrázkem */}
        <div className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-white shadow-lg transition-all duration-500 ${isClicked ? 'rotate-3 scale-105' : 'group-hover:scale-105'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-cyan-50"></div>
          <img 
            src="/img/pidgeon1.png" 
            alt="pidgeon" 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isClicked ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
          />
          <img 
            src="/img/pidgeon2.png" 
            alt="pidgeon surprised" 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${isClicked ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
          />
        </div>
        
        {/* Text pod holubem - absolutně pozicovaný */}
        <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 text-center transition-all duration-300 whitespace-nowrap ${isClicked ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div className="text-xl font-black text-cyan-600">Vrrkuú!</div>
          <div className="text-[10px] text-slate-400 mt-1">Holub tě pozdravuje</div>
        </div>
      </div>
      
    </div>
  );
};

export const PatternCard: React.FC<Props> = ({ pattern, related, onRelatedClick }) => {
  return (
    <div id={`pattern-${pattern.id}`} className="bg-white border border-slate-200 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group scroll-mt-24 text-black">
      {/* VISUAL HERO SECTION */}
      <div className="bg-slate-100 p-4 sm:p-8 border-b border-slate-200 min-h-[300px] sm:min-h-[360px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 left-6 flex gap-1.5 z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
        </div>
        <div className="w-full max-w-full sm:max-w-[95%] transform group-hover:scale-[1.01] transition-transform duration-500 flex justify-center">
          <PatternExample id={pattern.id} />
        </div>
      </div>
      
      <div className="p-6 sm:p-10 space-y-6 sm:space-y-8 flex-1 bg-white">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600 bg-cyan-50 px-3 py-1.5 rounded-full">
              {pattern.category}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">{pattern.name}</h3>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed italic border-l-4 border-cyan-400 pl-4 sm:pl-6 font-medium">
            {pattern.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 sm:gap-y-8">
          <Section icon="🔍" title="Co to je?" content={pattern.what} />
          <Section icon="🎯" title="Kdy použít?" content={pattern.useWhen} />
          <Section icon="💡" title="Proč?" content={pattern.why} />
          <Section icon="🛠️" title="Jak na to?" content={pattern.how} />
        </div>
      </div>

      {related && related.length > 0 && (
        <div className="bg-slate-50 p-4 sm:p-6 border-t border-slate-100">
          <h4 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2 sm:ml-4">Další v sekci {pattern.category}</h4>
          <div className="flex flex-wrap gap-2 px-2 sm:px-4 pb-2">
            {related.map((r) => (
              <button
                key={r.id}
                onClick={() => onRelatedClick?.(r.id)}
                className="text-[10px] sm:text-[11px] font-bold text-slate-500 bg-white border border-slate-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl hover:border-cyan-500 hover:text-cyan-600 hover:shadow-sm transition-all whitespace-nowrap"
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Section: React.FC<{ icon: string; title: string; content: string }> = ({ icon, title, content }) => (
  <div className="space-y-1.5 sm:space-y-2">
    <h4 className="flex items-center gap-2 text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
      <span className="text-sm sm:text-base">{icon}</span> {title}
    </h4>
    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{content}</p>
  </div>
);

const PatternExample: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case 'safe-exploration':
      return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 h-[220px] sm:h-[280px] w-full max-w-sm relative overflow-hidden flex flex-col">
          <div className="p-4 sm:p-6 space-y-4">
             <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-slate-100 rounded"></div>
                <div className="flex gap-2">
                   <div className="w-6 h-6 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px]">↩</div>
                   <div className="w-6 h-6 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] opacity-30">↪</div>
                </div>
             </div>
             <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative">
                <div className="flex gap-4">
                   <div className="w-12 h-12 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center text-2xl">📸</div>
                   <div className="flex-1 space-y-2 py-1">
                      <div className="h-1.5 w-full bg-slate-200 rounded"></div>
                      <div className="h-1.5 w-1/2 bg-slate-200 rounded"></div>
                   </div>
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px]">×</div>
             </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex justify-between items-center">
             <div className="flex items-center gap-2">
                <span className="text-green-400 text-xs">✓</span>
                <span className="text-[9px] font-bold uppercase tracking-widest">Smazáno</span>
             </div>
             <button className="text-[9px] font-black text-cyan-400 uppercase">Zpět</button>
          </div>
        </div>
      );
    case 'instant-gratification':
      return (
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 p-6 sm:p-8 flex flex-col items-center gap-4 sm:gap-6 w-full max-w-xs sm:max-w-sm">
          <div className="w-full relative">
            <div className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-bold text-slate-400">Hledám...</div>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm">🔍</span>
          </div>
          <div className="w-full space-y-2 animate-fadeIn">
             <div className="p-3 bg-cyan-600 rounded-xl flex items-center gap-3 text-white shadow-lg shadow-cyan-100">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-lg">🍒</div>
                <div className="flex-1 space-y-1">
                   <div className="h-1.5 w-16 bg-white rounded"></div>
                   <div className="h-1 w-full bg-white/30 rounded"></div>
                </div>
             </div>
             <div className="p-3 bg-white border border-slate-100 rounded-xl flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-lg">🍓</div>
                <div className="flex-1 space-y-1">
                   <div className="h-1.5 w-20 bg-slate-800 rounded"></div>
                   <div className="h-1 w-full bg-slate-100 rounded"></div>
                </div>
             </div>
          </div>
          <div className="text-[8px] font-black text-cyan-600 uppercase tracking-widest animate-pulse">0.04s</div>
        </div>
      );
    case 'alternative-views':
      return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-6 w-full max-w-sm">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="h-3 w-16 sm:w-24 bg-slate-100 rounded"></div>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <div className="px-2 sm:px-4 py-1 bg-white shadow-sm rounded-md text-[9px] font-black text-cyan-600 uppercase">GRID</div>
              <div className="px-2 sm:px-4 py-1 text-[9px] font-bold text-slate-400 uppercase">LIST</div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="space-y-1.5 sm:space-y-2">
                <div className="aspect-[4/3] bg-slate-50 rounded-lg sm:rounded-xl border border-slate-100 flex items-center justify-center text-lg sm:text-xl">🖼️</div>
                <div className="h-1.5 w-full bg-slate-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'dashboard':
      return (
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 p-4 sm:p-8 space-y-6 sm:space-y-8 w-full max-w-sm">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="p-2 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 space-y-1 sm:space-y-2">
                <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase truncate">Metric</div>
                <div className="text-sm sm:text-2xl font-black text-slate-800">1.2k</div>
              </div>
            ))}
          </div>
          <div className="h-20 sm:h-28 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100 flex items-end justify-between px-4 sm:px-8 py-2 sm:py-4">
            {[30, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
              <div key={i} style={{ height: `${h}%` }} className="w-2 sm:w-4 bg-cyan-500 rounded-t-sm sm:rounded-t-lg opacity-80"></div>
            ))}
          </div>
        </div>
      );
    case 'wizard':
      return (
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 p-6 sm:p-8 flex flex-col gap-6 sm:gap-10 w-full max-w-sm sm:max-w-md">
          <div className="flex justify-between items-start px-2 sm:px-4 relative">
            <div className="absolute top-4 sm:top-5 left-8 right-8 h-0.5 sm:h-1 bg-slate-100 -translate-y-1/2 -z-0"></div>
            {[1,2,3].map(i => (
              <div key={i} className="flex flex-col items-center gap-2 z-10">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-base ring-4 ring-white ${i === 1 ? 'bg-cyan-600 text-white' : i === 2 ? 'bg-white border-2 sm:border-4 border-cyan-500 text-cyan-600' : 'bg-white border-2 sm:border-4 border-slate-100 text-slate-300'}`}>
                  {i === 1 ? '✓' : i}
                </div>
                <span className={`text-[7px] sm:text-[9px] font-black uppercase tracking-widest ${i === 2 ? 'text-cyan-600' : 'text-slate-400'}`}>Krok {i}</span>
              </div>
            ))}
          </div>
          <div className="bg-slate-50/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-100 space-y-4 sm:space-y-6">
             <div className="h-3 sm:h-4 w-3/4 bg-slate-200 rounded-full"></div>
             <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[1,2].map(i => (
                  <div key={i} className="h-10 sm:h-12 w-full bg-white rounded-xl border border-slate-200 shadow-sm"></div>
                ))}
             </div>
          </div>
        </div>
      );
    case 'breadcrumbs':
      return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-10 flex flex-col justify-center h-[180px] sm:h-[220px] w-full max-w-md relative overflow-hidden">
          <div className="flex items-center gap-2 sm:gap-4 text-[8px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap overflow-x-auto scrollbar-hide">
            <span className="text-slate-300">DOMŮ</span>
            <span className="text-slate-200">/</span>
            <span className="text-slate-300">OBCHOD</span>
            <span className="text-slate-200">/</span>
            <span className="text-slate-300">MOBILY</span>
            <span className="text-slate-200">/</span>
            <span className="text-cyan-600 border-b-2 border-cyan-100 pb-1">IPHONE 15</span>
          </div>
          <div className="mt-8 space-y-3">
             <div className="h-6 sm:h-8 w-2/3 bg-slate-50 rounded-lg border border-slate-100"></div>
             <div className="flex gap-2">
                <div className="h-1.5 w-12 bg-slate-100 rounded-full"></div>
                <div className="h-1.5 w-20 bg-slate-100 rounded-full"></div>
             </div>
          </div>
        </div>
      );
    case 'escape-hatch':
      return (
        <div className="bg-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-xl h-[240px] sm:h-[280px] w-full max-w-xs sm:max-w-sm relative overflow-hidden flex flex-col border border-white/5">
          <div className="p-2 sm:p-3 bg-slate-800 border-b border-white/5 flex justify-between items-center z-20">
             <div className="flex gap-1 sm:gap-1.5 ml-1 sm:ml-2">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500/50"></div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/50"></div>
             </div>
             <button className="px-2 sm:px-4 py-1 sm:py-1.5 bg-white/10 rounded-md sm:rounded-lg text-[8px] sm:text-[9px] text-white font-black uppercase tracking-widest border border-white/10">ZRUŠIT ×</button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-2xl text-center space-y-3 sm:space-y-4 w-full max-w-[240px] scale-90 sm:scale-100 border border-slate-100">
               <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cyan-50 rounded-full mx-auto flex items-center justify-center text-2xl sm:text-3xl">🔒</div>
               <div className="space-y-1">
                  <div className="h-2.5 w-32 sm:w-40 bg-slate-100 rounded-full mx-auto"></div>
                  <div className="h-1 w-20 bg-slate-50 rounded-full mx-auto"></div>
               </div>
               <div className="h-8 sm:h-10 w-full bg-cyan-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-black text-[8px] sm:text-[10px] uppercase tracking-widest">Zaplatit</div>
               <div className="text-[8px] sm:text-[9px] font-black text-slate-300 uppercase tracking-[0.1em] underline underline-offset-4">Zpět k nákupu</div>
            </div>
          </div>
        </div>
      );
    case 'fat-menus':
      return (
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-xl border border-slate-200 h-[280px] sm:h-[320px] w-full max-w-sm sm:max-w-xl overflow-hidden flex flex-col relative scale-[0.85] sm:scale-100">
          <div className="p-3 sm:p-4 bg-white border-b border-slate-100 flex items-center gap-4 sm:gap-8 z-30">
             <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-900 rounded-lg flex-shrink-0"></div>
             <div className="flex gap-4 sm:gap-6 items-center overflow-x-hidden whitespace-nowrap">
                <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Produkty</div>
                <div className="text-[8px] sm:text-[10px] font-black text-cyan-600 uppercase tracking-widest flex items-center gap-1">Kategorie ▾</div>
                <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Podpora</div>
             </div>
          </div>
          <div className="absolute top-[50px] sm:top-[65px] left-0 right-0 bg-white shadow-xl border-b border-slate-100 p-4 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 z-20">
             {[1,2].map(i => (
               <div key={i} className="space-y-3">
                  <div className="text-[9px] sm:text-[11px] font-black text-slate-900 uppercase border-b border-cyan-500/10 pb-1">Kategorie {i}</div>
                  <div className="space-y-1.5">
                    {[1,2,3].map(j => <div key={j} className="h-1.5 w-16 sm:w-20 bg-slate-100 rounded"></div>)}
                  </div>
               </div>
             ))}
             <div className="hidden sm:block space-y-3">
                <div className="text-[11px] font-black text-slate-900 uppercase border-b border-cyan-500/10 pb-1">Kategorie 3</div>
                <div className="space-y-1.5">
                  {[1,2,3].map(j => <div key={j} className="h-1.5 w-20 bg-slate-100 rounded"></div>)}
                </div>
             </div>
             <div className="bg-slate-50 rounded-xl p-3 flex flex-col justify-between border border-slate-100 overflow-hidden">
                <div className="h-2 w-16 bg-slate-900 rounded mb-1.5"></div>
                <div className="h-6 w-full bg-cyan-600 rounded-md"></div>
             </div>
          </div>
          <div className="flex-1 p-6 opacity-5 blur-[1px]">
             <div className="h-8 w-1/2 bg-slate-900 rounded-full mb-6"></div>
             <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-slate-200 rounded-2xl"></div>
                <div className="h-24 bg-slate-200 rounded-2xl"></div>
             </div>
          </div>
        </div>
      );
    case 'center-stage':
      return (
        <div className="bg-slate-200 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl border border-slate-300/50 flex h-[260px] sm:h-[300px] w-full max-w-sm sm:max-w-xl overflow-hidden p-2 sm:p-3 gap-2 sm:gap-3 scale-[0.85] sm:scale-100">
          <div className="w-10 sm:w-16 bg-white/80 rounded-xl sm:rounded-2xl flex flex-col items-center py-4 sm:py-6 gap-3 sm:gap-5 border border-white/50">
             {[1,2,3,4].map(i => (
               <div key={i} className={`w-6 h-6 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-lg ${i === 2 ? 'bg-cyan-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                 {['↖','⬚','✏','◎'][i-1]}
               </div>
             ))}
          </div>
          <div className="flex-1 bg-white rounded-xl sm:rounded-[2rem] shadow-inner relative flex flex-col items-center justify-center overflow-hidden border border-slate-300/20">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-cyan-500 rounded-full border-[6px] sm:border-[10px] border-cyan-300 shadow-xl relative">
               <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg sm:rounded-xl shadow-md flex items-center justify-center text-sm sm:text-xl">⭐</div>
            </div>
          </div>
          <div className="hidden sm:block w-32 lg:w-48 bg-white/80 rounded-2xl p-4 space-y-6 border border-white/50">
             <div className="space-y-2">
                <div className="h-2 w-20 bg-slate-300 rounded-full"></div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
             </div>
             <div className="space-y-2">
                <div className="h-2 w-16 bg-slate-300 rounded-full"></div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
             </div>
          </div>
        </div>
      );
    case 'accordion':
      return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden w-full max-w-sm h-[200px] sm:h-[240px]">
          {[1,2,3].map(i => (
            <div key={i} className={`border-b border-slate-100 ${i === 2 ? 'bg-cyan-50/20' : ''}`}>
              <div className="p-4 flex justify-between items-center">
                <div className={`h-2.5 w-32 rounded ${i === 2 ? 'bg-cyan-600/40' : 'bg-slate-200'}`}></div>
                <div className={`text-[10px] ${i === 2 ? 'rotate-180 text-cyan-600' : 'text-slate-300'}`}>▼</div>
              </div>
              {i === 2 && (
                <div className="px-6 pb-6 space-y-2 animate-fadeIn">
                  <div className="h-1.5 w-full bg-slate-100 rounded"></div>
                  <div className="h-1.5 w-3/4 bg-slate-100 rounded"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    case 'two-panel-selector':
      return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 flex h-[200px] sm:h-[240px] w-full max-w-md overflow-hidden">
          <div className="w-16 sm:w-32 bg-slate-50 border-r border-slate-100 p-2 sm:p-4 space-y-2 sm:space-y-3">
            <div className="h-6 sm:h-8 w-full bg-cyan-600/10 border-l-2 sm:border-l-4 border-cyan-600 flex items-center px-1 sm:px-2 text-[8px] sm:text-[10px] font-bold text-cyan-600 overflow-hidden truncate">AKTIVNÍ</div>
            {[1,2,3,4].map(i => (
              <div key={i} className="h-4 sm:h-6 w-full bg-slate-200/30 rounded-md sm:rounded-lg"></div>
            ))}
          </div>
          <div className="flex-1 p-4 sm:p-8 space-y-4 sm:space-y-6">
            <div className="h-6 sm:h-8 w-1/2 bg-slate-100 rounded-lg"></div>
            <div className="space-y-2 sm:space-y-3">
              <div className="h-2 w-full bg-slate-50 rounded"></div>
              <div className="h-2 w-full bg-slate-50 rounded"></div>
              <div className="h-2 w-4/5 bg-slate-50 rounded"></div>
            </div>
          </div>
        </div>
      );
    case 'infinite-scroll':
      return (
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border border-slate-200 h-[280px] sm:h-[340px] w-full max-w-xs sm:max-w-sm overflow-hidden flex flex-col relative">
          <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-full"></div>
              <div className="space-y-1.5 flex-1">
                <div className="h-2 w-20 sm:w-24 bg-slate-900 rounded-full"></div>
                <div className="h-1 w-12 sm:w-16 bg-slate-200 rounded-full"></div>
              </div>
            </div>
            <div className="h-24 sm:h-32 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100"></div>
            <div className="pt-2 flex items-center gap-4 opacity-40">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 rounded-full"></div>
              <div className="space-y-1.5 flex-1">
                <div className="h-2 w-24 sm:w-32 bg-slate-900 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-12 sm:pt-20 pb-4 sm:pb-8 flex flex-col items-center gap-2 sm:gap-4 z-20">
             <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
             </div>
             <div className="text-[8px] sm:text-[9px] font-black text-cyan-600 uppercase tracking-widest">Načítám...</div>
          </div>
        </div>
      );
    case 'preview':
      return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[220px] sm:h-[260px] w-full max-w-sm">
          <div className="p-2 sm:p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <div className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase">FILTR: ČERNOBÍLÁ</div>
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-cyan-600 rounded-full flex items-center justify-center text-white text-[8px]">✓</div>
          </div>
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop')] bg-cover grayscale flex items-center justify-center">
               <div className="bg-black/40 backdrop-blur-md text-white text-[8px] sm:text-[10px] font-black px-3 py-1.5 rounded-full border border-white/20">LIVE NÁHLED</div>
            </div>
            <div className="w-24 sm:w-40 bg-slate-50 p-3 sm:p-6 space-y-3 sm:space-y-5 border-l border-slate-100">
               <div className="h-1.5 w-full bg-slate-200 rounded"></div>
               <div className="h-8 sm:h-10 w-full bg-cyan-600 rounded-lg sm:rounded-xl"></div>
            </div>
          </div>
        </div>
      );
    case 'smart-menu-items':
      return (
        <div className="bg-slate-900 rounded-[2rem] shadow-xl p-6 sm:p-8 h-[200px] sm:h-[240px] w-full max-w-sm relative overflow-hidden">
          <div className="flex gap-4">
             <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-cyan-500/20">📁</div>
             <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-xl text-slate-600 italic">...</div>
          </div>
          <div className="absolute top-16 left-12 w-48 bg-white rounded-xl shadow-2xl py-2 border border-slate-100 animate-fadeIn">
             <div className="px-4 py-2 hover:bg-cyan-50 text-[10px] font-black text-slate-800 flex justify-between items-center">
                <span>SMAZAT SLOŽKU</span>
                <span className="text-[8px] text-slate-300">Del</span>
             </div>
             <div className="h-px bg-slate-50 my-1"></div>
             <div className="px-4 py-2 hover:bg-cyan-50 text-[10px] font-bold text-slate-500">Přejmenovat</div>
          </div>
        </div>
      );
    case 'forgiving-format':
      return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6 w-full max-w-sm">
           <div className="space-y-2">
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Platební karta</div>
              <div className="relative">
                 <div className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl font-mono text-xs">4412 8800 1234</div>
                 <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <span className="text-[8px] font-black text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded">VISA</span>
                    <span className="text-cyan-400 animate-pulse text-xs">✨</span>
                 </div>
              </div>
           </div>
           <div className="bg-cyan-900 rounded-xl p-4 shadow-xl transform rotate-1">
              <div className="w-8 h-6 bg-amber-400/80 rounded mb-2"></div>
              <div className="text-[10px] font-mono text-white tracking-widest">4412 8800 1234 9982</div>
           </div>
        </div>
      );
    case 'pidgeon-pattern':
      return <PidgeonPatternExample />;
    default:
      return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 h-[200px] sm:h-[240px] flex flex-col justify-center gap-4 w-full max-w-xs">
           <div className="h-5 sm:h-6 w-3/4 bg-slate-100 rounded-full"></div>
           <div className="space-y-2">
             <div className="h-2.5 w-full bg-slate-50 rounded"></div>
             <div className="h-2.5 w-full bg-slate-50 rounded"></div>
           </div>
           <div className="h-10 sm:h-12 w-full bg-cyan-600/10 border-2 border-dashed border-cyan-600/30 rounded-xl"></div>
        </div>
      );
  }
};
