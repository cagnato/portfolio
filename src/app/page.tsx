"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJETOS = [
  {
    id: 1,
    titulo: "PredictiveGuard",
    tech: "Python • Scikit-Learn",
    descricao: {
      pt: "Modelo de Machine Learning para simular e prever falhas em maquinário industrial.",
      en: "Machine Learning model to simulate and predict failures in industrial machinery."
    },
    thumb: "/predictiveguard.png",
    bg: "/predictiveguard.png",
    bgColor: "#7f1d1d",
    linkGithub: "https://github.com/cagnato/predictive-guard",
    linkApp: null,
    linkDownload: "https://github.com/cagnato/predictive-guard/releases/tag/v1.0.0",
  },
  {
    id: 2,
    titulo: "SocialBit",
    tech: "Python • SQL",
    descricao: {
      pt: "Rede social voltada para devs interagirem e compartilharem ideias.",
      en: "Social network aimed at devs to interact and share ideas."
    },
    thumb: "/socialbit.png",
    bg: "/socialbit.png",
    bgColor: "#1e3a8a",
    linkGithub: "https://github.com/cagnato/SocialBit",
    linkApp: "https://socialbit.larissaadames.dev/home/",
  },
  {
    id: 3,
    titulo: "Guia de Vôlei",
    tech: "JavaScript",
    descricao: {
      pt: "Experiência visual e interativa sobre táticas e regras do voleibol.",
      en: "Visual and interactive experience about volleyball tactics and rules."
    },
    thumb: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=400&auto=format&fit=crop",
    bg: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1920&auto=format&fit=crop",
    bgColor: "#065f46",
    linkGithub: "https://github.com/cagnato/volei-interativo",
    linkApp: null,
  },
  {
    id: 4,
    titulo: "Matchup Score",
    tech: "React • Next.js",
    descricao: {
      pt: "Plataforma de reserva de quadras inspirada em lobbies de jogos.",
      en: "Court reservation platform inspired by gaming lobbies."
    },
    thumb: "/matchupscore.png",
    bg: "/matchupscore.png",
    bgColor: "#581c87",
    linkGithub: "https://github.com/cagnato/MatchUp-Score",
    linkApp: "https://matchupscore.larissaadames.dev/",
  },
  {
    id: 5,
    titulo: "PowerJorge",
    tech: "Java • Arduino",
    descricao: {
      pt: "Jogo de ritmo com suporte a guitarra física (Projeto PowerJorge).",
      en: "Rhythm game with physical guitar support (PowerJorge Project)."
    },
    thumb: "/powerjorge.png",
    bg: "/powerjorge.png",
    bgColor: "#78350f",
    linkGithub: "https://github.com/larissaadames/PowerJorge/tree/Main4",
    linkApp: null,
  },
];

export default function Home() {
  const [telaAtiva, setTelaAtiva] = useState<"login" | "dashboard" | "jogo">("login");
  const [abaAtiva, setAbaAtiva] = useState<"projetos" | "sobre" | "conquistas">("projetos");
  const [projetoFocado, setProjetoFocado] = useState(0);
  const [hora, setHora] = useState("");
  
  const [idioma, setIdioma] = useState<"PT" | "EN">("PT");
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [textoBusca, setTextoBusca] = useState("");
  const [carregandoJogo, setCarregandoJogo] = useState(false);

  const projetosFiltrados = PROJETOS.filter((p) => 
    p.titulo.toLowerCase().includes(textoBusca.toLowerCase())
  );

  const entrarNoSistema = () => setTelaAtiva("dashboard");
  
  const voltarProLogin = () => {
    setTelaAtiva("login");
    setAbaAtiva("projetos");
    setTextoBusca("");
    setBuscaAberta(false);
  };

  const abrirJogo = () => {
    setTelaAtiva("jogo");
    setCarregandoJogo(true);
    setTimeout(() => setCarregandoJogo(false), 1500);
  };

  const fecharJogo = () => setTelaAtiva("dashboard");

  useEffect(() => {
    const atualizarHora = () => {
      const agora = new Date();
      setHora(agora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    atualizarHora();
    const intervalo = setInterval(atualizarHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (telaAtiva !== "dashboard" || abaAtiva !== "projetos" || buscaAberta) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 768) return; 
      if (e.key === "ArrowRight") {
        setProjetoFocado((prev) => Math.min(prev + 1, projetosFiltrados.length - 1));
      } else if (e.key === "ArrowLeft") {
        setProjetoFocado((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && projetosFiltrados.length > 0) {
        abrirJogo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [telaAtiva, abaAtiva, projetoFocado, projetosFiltrados.length, buscaAberta]);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.4); }
      `}} />
      <main className="min-h-screen bg-[#0b0c10] text-white overflow-hidden select-none font-sans flex items-center justify-center relative z-0">
        
        <AnimatePresence mode="wait">
          {/* TELA DE LOGIN */}
          {telaAtiva === "login" && (
            <motion.div 
              key="login"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center z-10 w-full px-4"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-4xl font-light tracking-wide mb-16 text-stone-200 text-center"
              >
                {idioma === "PT" ? "Bem-vindo de volta ao meu Portfólio" : "Welcome Back to My Portfolio"}
              </motion.h1>

              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                <div className="flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-not-allowed">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-stone-800/50 border-2 border-stone-600 flex items-center justify-center text-3xl font-light">+</div>
                  <span className="text-sm tracking-wider">{idioma === "PT" ? "Novo Usuário" : "Add User"}</span>
                </div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={entrarNoSistema}
                  className="flex flex-col items-center gap-4 cursor-pointer group"
                >
                  <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-b from-stone-400 to-transparent">
                    <div className="w-full h-full rounded-full bg-stone-800 border-4 border-[#0b0c10] overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center">
                      <img src="/perfil.jpeg" alt="Davi Cagnato" className="w-full h-full object-cover" draggable="false" />
                    </div>
                  </div>
                  <span className="text-lg tracking-wider font-medium text-white flex items-center gap-2">Davi Cagnato</span>
                </motion.div>
              </div>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-10 flex items-center gap-2 text-stone-400 text-sm hidden md:flex">
                <span className="w-4 h-4 rounded-full border border-stone-400 flex items-center justify-center text-[10px]">X</span>
                <span>{idioma === "PT" ? "Selecionar" : "Select"}</span>
              </motion.div>
            </motion.div>
          )}

          {/* DASHBOARD DESKTOP */}
          {telaAtiva === "dashboard" && (
            <motion.div
              key="dashboard-desktop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="hidden md:flex w-full h-screen flex-col pt-10 px-12 relative"
            >
              {/* Fundo Dinâmico */}
              <AnimatePresence mode="wait">
                {abaAtiva === "projetos" && projetosFiltrados.length > 0 ? (
                  <motion.div 
                    key={`bg-${projetosFiltrados[projetoFocado]?.id || 0}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ backgroundImage: `url(${projetosFiltrados[projetoFocado]?.bg})` }}
                    className="absolute inset-0 -z-10 bg-cover bg-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/80 to-[#0b0c10]/30"></div>
                  </motion.div>
                ) : (
                  <motion.div key="bg-other" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 -z-10 bg-[#09090b]">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/80 to-transparent"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cabeçalho */}
              <header className="flex justify-between items-center mb-16 flex-shrink-0">
                <div className="flex gap-8 text-lg">
                  <button onClick={() => {setAbaAtiva("projetos"); setTextoBusca("");}} className={`pb-1 transition-colors ${abaAtiva === "projetos" ? "font-medium text-white border-b-2 border-white" : "font-light text-stone-400 hover:text-white"}`}>
                    {idioma === "PT" ? "Projetos" : "Projects"}
                  </button>
                  <button onClick={() => setAbaAtiva("sobre")} className={`pb-1 transition-colors ${abaAtiva === "sobre" ? "font-medium text-white border-b-2 border-white" : "font-light text-stone-400 hover:text-white"}`}>
                    {idioma === "PT" ? "Sobre Mim" : "About Me"}
                  </button>
                </div>
                
                <div className="flex items-center gap-6 text-stone-300">
                  <svg onClick={() => {setAbaAtiva("projetos"); setTextoBusca("");}} aria-label="Início" className="w-6 h-6 cursor-pointer hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <svg onClick={() => setAbaAtiva("conquistas")} aria-label="Conquistas" className={`w-6 h-6 cursor-pointer transition-colors ${abaAtiva === "conquistas" ? "text-white" : "hover:text-white"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a6 6 0 0 0 6-6V5H6v4a6 6 0 0 0 6 6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v6" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 5h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
                  </svg>
                  <div className="flex items-center">
                    <svg onClick={() => {setBuscaAberta(!buscaAberta); setAbaAtiva("projetos");}} aria-label="Buscar" className="w-6 h-6 hover:text-white cursor-pointer transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <AnimatePresence>
                      {buscaAberta && (
                        <motion.input 
                          initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                          animate={{ width: 200, opacity: 1, marginLeft: 12 }}
                          exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                          autoFocus type="text" placeholder={idioma === "PT" ? "Buscar jogo..." : "Search game..."}
                          value={textoBusca} onChange={(e) => {setTextoBusca(e.target.value); setProjetoFocado(0);}}
                          className="bg-stone-800/80 border border-stone-600 rounded-full px-4 py-1 text-sm text-white focus:outline-none focus:border-stone-400 transition-colors"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="relative group flex items-center">
                    <svg onClick={() => setIdioma(idioma === "PT" ? "EN" : "PT")} aria-label="Idioma" className="w-6 h-6 hover:text-white cursor-pointer transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <span className="ml-2 text-xs font-bold border border-stone-500 rounded px-1 text-stone-400">{idioma}</span>
                  </div>
                  <div onClick={voltarProLogin} className="w-9 h-9 rounded-full bg-stone-800 border-2 border-stone-400 cursor-pointer hover:border-white transition-all ml-2 overflow-hidden flex items-center justify-center">
                    <img src="/perfil.jpeg" alt="Davi" className="w-full h-full object-cover" draggable="false" />
                  </div>
                  <span className="font-light tracking-wider ml-1">{hora}</span>
                </div>
              </header>

              {/* Conteúdo Desktop */}
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {abaAtiva === "projetos" && (
                  <>
                    <div className="flex gap-4 items-end mb-10 overflow-visible px-4 h-[250px] lg:h-[300px] flex-shrink-0">
                      {projetosFiltrados.length === 0 ? (
                        <div className="w-full text-center text-stone-500 font-light text-xl mt-20">{idioma === "PT" ? "Nenhum jogo encontrado." : "No games found."}</div>
                      ) : (
                        projetosFiltrados.map((projeto, index) => {
                          const isFocused = index === projetoFocado;
                          return (
                            <motion.div
                              key={projeto.id}
                              onClick={() => setProjetoFocado(index)}
                              layout initial={false}
                              animate={{ width: isFocused ? 280 : 140, height: isFocused ? 280 : 140, y: isFocused ? -20 : 0 }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              className={`rounded-2xl cursor-pointer relative overflow-hidden flex-shrink-0 bg-stone-900 ${isFocused ? "border-[3px] border-white ring-4 ring-white/20 z-10 shadow-2xl" : "border border-stone-700 opacity-50 hover:opacity-100"}`}
                            >
                              <img src={projeto.thumb} alt={projeto.titulo} className="w-full h-full object-cover" draggable="false" />
                            </motion.div>
                          );
                        })
                      )}
                    </div>
                    {projetosFiltrados.length > 0 && (
                      <motion.div key={`info-${projetosFiltrados[projetoFocado].id}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-3 max-w-2xl px-4 mt-auto mb-16 flex-shrink-0">
                        <h1 className="text-4xl font-bold tracking-wide text-white drop-shadow-md">{projetosFiltrados[projetoFocado].titulo}</h1>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="px-2 py-1 bg-white text-black font-bold text-xs rounded-sm shadow-sm">HIGHLIGHT</span>
                          <span className="text-stone-200 font-medium tracking-wide drop-shadow-md">{projetosFiltrados[projetoFocado].tech}</span>
                        </div>
                        <p className="text-stone-300 text-lg leading-relaxed mt-2 drop-shadow-md line-clamp-2">
                          {idioma === "PT" ? projetosFiltrados[projetoFocado].descricao.pt : projetosFiltrados[projetoFocado].descricao.en}
                        </p>
                        <div className="mt-4 flex items-center gap-4">
                          <button onClick={abrirJogo} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-stone-200 transition-colors flex items-center gap-2 shadow-lg">
                            <span className="text-xl">▶</span> {idioma === "PT" ? "Jogar" : "Play Game"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </>
                )}

                {abaAtiva === "sobre" && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col md:flex-row gap-8 max-w-5xl px-4 overflow-y-auto custom-scrollbar pb-16">
                    <div className="w-64 h-80 bg-stone-800/80 border border-stone-600 rounded-xl flex-shrink-0 p-6 flex flex-col items-center shadow-2xl backdrop-blur-sm">
                       <div className="w-32 h-32 rounded-full bg-stone-900 border-4 border-stone-400 mb-6 overflow-hidden flex items-center justify-center">
                         <img src="/perfil.jpeg" alt="Davi Cagnato" className="w-full h-full object-cover" draggable="false" />
                       </div>
                       <h2 className="text-xl font-bold tracking-wide text-white text-center">Davi Cagnato</h2>
                       <span className="text-stone-400 text-sm mt-1 text-center">Full-stack Developer</span>
                    </div>
                    <div className="flex flex-col gap-8 flex-1">
                      <div>
                        <h1 className="text-3xl font-bold tracking-wide mb-4">{idioma === "PT" ? "Sobre o Autor" : "About the Author"}</h1>
                        <p className="text-stone-300 text-base leading-relaxed text-justify whitespace-pre-line">
                          {idioma === "PT" 
                            ? `Desenvolvedor Full-stack apaixonado por resolver problemas e dar vida a ideias. Minha base técnica foi construída no ensino médio técnico pelo SESI/SENAI em Desenvolvimento de Sistemas, e hoje atuo como pesquisador bolsista pelo PIBIC. Tenho um interesse crescente pelas áreas de infraestrutura e segurança da informação, buscando sempre criar sistemas resilientes.\n\nAcredito muito no equilíbrio entre hard e soft skills: além da dedicação acadêmica que me rendeu premiações e medalhas, atuo em uma equipe semi-profissional de vôlei. O esporte me ensina diariamente sobre trabalho em equipe, comunicação rápida sob pressão e foco — habilidades que aplico todos os dias no código.`
                            : `Full-stack developer passionate about solving problems and bringing ideas to life. My technical foundation was built in high school at SESI/SENAI in Systems Development, and today I work as a PIBIC research scholar. I have a growing interest in infrastructure and information security, always seeking to build resilient systems.\n\nI strongly believe in the balance between hard and soft skills: beyond academic dedication that earned me awards, I play in a semi-professional volleyball team. Sports teach me daily about teamwork, fast communication under pressure, and focus — skills I apply every day to code.`}
                        </p>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold tracking-wide mb-4 text-white">{idioma === "PT" ? "Habilidades" : "Skills"}</h2>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-stone-800/60 p-4 rounded-lg border border-stone-700 backdrop-blur-sm">
                            <span className="font-bold text-white block mb-1">{idioma === "PT" ? "Linguagens" : "Languages"}</span>
                            <span className="text-stone-400 text-sm">Python, JavaScript, TypeScript, Java, Kotlin</span>
                          </div>
                          <div className="bg-stone-800/60 p-4 rounded-lg border border-stone-700 backdrop-blur-sm">
                            <span className="font-bold text-white block mb-1">Web & UI</span>
                            <span className="text-stone-400 text-sm">React, Next.js, Tailwind CSS</span>
                          </div>
                          <div className="bg-stone-800/60 p-4 rounded-lg border border-stone-700 backdrop-blur-sm col-span-2">
                            <span className="font-bold text-white block mb-1">{idioma === "PT" ? "Ferramentas, Dados & Infraestrutura" : "Tools, Data & Infrastructure"}</span>
                            <span className="text-stone-400 text-sm">SQL, Scikit-Learn, Git, Arduino, Princípios de Segurança da Informação</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {abaAtiva === "conquistas" && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-8 max-w-5xl px-4 overflow-y-auto custom-scrollbar pb-16">
                    <div>
                      <h1 className="text-3xl font-bold tracking-wide mb-2 text-white flex items-center gap-3"><span className="text-yellow-500">🏆</span> {idioma === "PT" ? "Galeria de Troféus" : "Trophy Gallery"}</h1>
                      <p className="text-stone-400">{idioma === "PT" ? "Certificações acadêmicas, olimpíadas e bolsas de pesquisa." : "Academic certifications, olympiads, and research scholarships."}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Platina */}
                      <div className="flex items-center gap-6 bg-stone-900/80 p-5 rounded-2xl border border-blue-400/30 backdrop-blur-md shadow-xl cursor-default group">
                        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_20px_rgba(147,197,253,0.6)] flex-shrink-0"><defs><linearGradient id="platGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F8FAFC" /><stop offset="50%" stopColor="#94A3B8" /><stop offset="100%" stopColor="#334155" /></linearGradient><radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="60%" stopColor="#CBD5E1" /><stop offset="100%" stopColor="#64748B" /></radialGradient></defs><path d="M 30 90 L 70 90 L 75 97 L 25 97 Z" fill="url(#platGrad)"/><path d="M 35 82 L 65 82 L 70 90 L 30 90 Z" fill="url(#platGrad)"/><path d="M 45 70 L 55 70 L 55 82 L 45 82 Z" fill="url(#platGrad)"/><path d="M 25 85 C -5 50, 15 20, 30 10 C 15 30, 10 65, 38 75 Z" fill="url(#platGrad)"/><path d="M 75 85 C 105 50, 85 20, 70 10 C 85 30, 90 65, 62 75 Z" fill="url(#platGrad)"/><path d="M 40 82 C 15 65, 25 30, 38 18 C 25 35, 28 65, 48 72 Z" fill="#E2E8F0"/><path d="M 60 82 C 85 65, 75 30, 62 18 C 75 35, 72 65, 52 72 Z" fill="#E2E8F0"/><circle cx="50" cy="42" r="24" fill="url(#sphereGrad)" /><text x="50" y="46" fontFamily="sans-serif" fontSize="12" fill="#94A3B8" textAnchor="middle" fontWeight="900" letterSpacing="1">PS</text></svg>
                        <div className="flex flex-col gap-1">
                          <span className="text-blue-300 text-xs font-bold uppercase tracking-widest drop-shadow-sm">{idioma === "PT" ? "Troféu de Platina" : "Platinum Trophy"}</span>
                          <h3 className="text-white font-semibold text-base">{idioma === "PT" ? "Base de Elite" : "Elite Foundation"}</h3>
                          <p className="text-stone-400 text-xs">{idioma === "PT" ? "Formado no Ensino Médio Técnico pelo SESI/SENAI em Desenvolvimento de Sistemas." : "Graduated from Technical High School by SESI/SENAI in Systems Development."}</p>
                        </div>
                      </div>
                      {/* Ouro */}
                      <div className="flex items-center gap-6 bg-stone-900/80 p-5 rounded-2xl border border-yellow-600/30 backdrop-blur-md shadow-xl cursor-default">
                        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] flex-shrink-0"><defs><linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FDE047" /><stop offset="50%" stopColor="#EAB308" /><stop offset="100%" stopColor="#A16207" /></linearGradient></defs><path d="M 20 30 C 0 30, 5 65, 35 60" fill="none" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round"/><path d="M 80 30 C 100 30, 95 65, 65 60" fill="none" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round"/><path d="M 28 20 L 72 20 L 65 65 C 65 80, 55 85, 50 85 C 45 85, 35 80, 35 65 Z" fill="url(#goldGrad)"/><path d="M 45 85 L 55 85 L 65 95 L 35 95 Z" fill="url(#goldGrad)"/><path d="M 25 20 L 75 20" stroke="#FEF08A" strokeWidth="2" /><text x="50" y="47" fontFamily="sans-serif" fontSize="11" fill="#713F12" textAnchor="middle" fontWeight="bold">△□</text><text x="50" y="59" fontFamily="sans-serif" fontSize="11" fill="#713F12" textAnchor="middle" fontWeight="bold">◯✕</text></svg>
                        <div className="flex flex-col gap-1">
                          <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest drop-shadow-sm">{idioma === "PT" ? "Troféu de Ouro" : "Gold Trophy"}</span>
                          <h3 className="text-white font-semibold text-base">{idioma === "PT" ? "Pesquisador PIBIC" : "PIBIC Researcher"}</h3>
                          <p className="text-stone-400 text-xs">{idioma === "PT" ? "Bolsista de iniciação científica, unindo rigor acadêmico à tecnologia." : "Scientific initiation scholar, bridging academic rigor with technology."}</p>
                        </div>
                      </div>
                      {/* Prata */}
                      <div className="flex items-center gap-6 bg-stone-900/80 p-5 rounded-2xl border border-stone-400/30 backdrop-blur-md shadow-xl cursor-default">
                        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(148,163,184,0.5)] flex-shrink-0"><defs><linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F8FAFC" /><stop offset="50%" stopColor="#94A3B8" /><stop offset="100%" stopColor="#475569" /></linearGradient></defs><path d="M 20 30 C 0 30, 5 65, 35 60" fill="none" stroke="url(#silverGrad)" strokeWidth="6" strokeLinecap="round"/><path d="M 80 30 C 100 30, 95 65, 65 60" fill="none" stroke="url(#silverGrad)" strokeWidth="6" strokeLinecap="round"/><path d="M 28 20 L 72 20 L 65 65 C 65 80, 55 85, 50 85 C 45 85, 35 80, 35 65 Z" fill="url(#silverGrad)"/><path d="M 45 85 L 55 85 L 65 95 L 35 95 Z" fill="url(#silverGrad)"/><path d="M 25 20 L 75 20" stroke="#F1F5F9" strokeWidth="2" /><text x="50" y="47" fontFamily="sans-serif" fontSize="11" fill="#334155" textAnchor="middle" fontWeight="bold">△□</text><text x="50" y="59" fontFamily="sans-serif" fontSize="11" fill="#334155" textAnchor="middle" fontWeight="bold">◯✕</text></svg>
                        <div className="flex flex-col gap-1">
                          <span className="text-stone-300 text-xs font-bold uppercase tracking-widest drop-shadow-sm">{idioma === "PT" ? "Troféu de Prata" : "Silver Trophy"}</span>
                          <h3 className="text-white font-semibold text-base">{idioma === "PT" ? "Destaque Lógico" : "Logical Highlight"}</h3>
                          <p className="text-stone-400 text-xs">{idioma === "PT" ? "Vencedor de prêmios de Melhor Trabalho em Raciocínio Algorítmico e POO." : "Winner of Best Project awards in Algorithmic Reasoning and OOP."}</p>
                        </div>
                      </div>
                      {/* Bronze */}
                      <div className="flex items-center gap-6 bg-stone-900/80 p-5 rounded-2xl border border-orange-700/30 backdrop-blur-md shadow-xl cursor-default">
                        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(194,65,12,0.4)] flex-shrink-0"><defs><linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FDBA74" /><stop offset="50%" stopColor="#C2410C" /><stop offset="100%" stopColor="#7C2D12" /></linearGradient></defs><path d="M 20 30 C 0 30, 5 65, 35 60" fill="none" stroke="url(#bronzeGrad)" strokeWidth="6" strokeLinecap="round"/><path d="M 80 30 C 100 30, 95 65, 65 60" fill="none" stroke="url(#bronzeGrad)" strokeWidth="6" strokeLinecap="round"/><path d="M 28 20 L 72 20 L 65 65 C 65 80, 55 85, 50 85 C 45 85, 35 80, 35 65 Z" fill="url(#bronzeGrad)"/><path d="M 45 85 L 55 85 L 65 95 L 35 95 Z" fill="url(#bronzeGrad)"/><path d="M 25 20 L 75 20" stroke="#FFEDD5" strokeWidth="2" /><text x="50" y="47" fontFamily="sans-serif" fontSize="11" fill="#431407" textAnchor="middle" fontWeight="bold">△□</text><text x="50" y="59" fontFamily="sans-serif" fontSize="11" fill="#431407" textAnchor="middle" fontWeight="bold">◯✕</text></svg>
                        <div className="flex flex-col gap-1">
                          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest drop-shadow-sm">{idioma === "PT" ? "Troféu de Bronze" : "Bronze Trophy"}</span>
                          <h3 className="text-white font-semibold text-base">{idioma === "PT" ? "Comunicação Global" : "Global Communication"}</h3>
                          <p className="text-stone-400 text-xs">{idioma === "PT" ? "Medalhista de Bronze na OBLI (2024) e participação de destaque na HMUN (2025)." : "Bronze Medalist at OBLI (2024) and prominent participation at HMUN (2025)."}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* DASHBOARD MOBILE (PS App Style) */}
          {telaAtiva === "dashboard" && (
            <motion.div
              key="dashboard-mobile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex md:hidden w-full h-screen flex-col bg-[#121212] relative overflow-hidden"
            >
              <div className="flex justify-between items-center px-4 pt-6 pb-2">
                <h1 className="text-xl font-bold tracking-wide">{idioma === "PT" ? "Biblioteca" : "Library"}</h1>
                <div className="flex items-center gap-4">
                  <button onClick={() => setIdioma(idioma === "PT" ? "EN" : "PT")} className="text-xs font-bold border border-stone-500 rounded px-1.5 py-0.5 text-stone-300">{idioma}</button>
                  <div className="w-8 h-8 rounded-full bg-stone-700 overflow-hidden border border-stone-600" onClick={voltarProLogin}>
                    <img src="/perfil.jpeg" alt="Davi" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 px-4 py-3 overflow-x-auto custom-scrollbar flex-shrink-0">
                <button onClick={() => setAbaAtiva("projetos")} className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${abaAtiva === "projetos" ? "bg-stone-300 text-black" : "bg-transparent text-stone-300 border border-stone-600"}`}>
                  {idioma === "PT" ? "Projetos" : "Projects"}
                </button>
                <button onClick={() => setAbaAtiva("sobre")} className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${abaAtiva === "sobre" ? "bg-stone-300 text-black" : "bg-transparent text-stone-300 border border-stone-600"}`}>
                  {idioma === "PT" ? "Sobre Mim" : "About Me"}
                </button>
                <button onClick={() => setAbaAtiva("conquistas")} className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${abaAtiva === "conquistas" ? "bg-stone-300 text-black" : "bg-transparent text-stone-300 border border-stone-600"}`}>
                  {idioma === "PT" ? "Troféus" : "Trophies"}
                </button>
              </div>

              <AnimatePresence>
                {buscaAberta && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-3 flex-shrink-0">
                    <input 
                      autoFocus type="text" placeholder={idioma === "PT" ? "Buscar..." : "Search..."}
                      value={textoBusca} onChange={(e) => {setTextoBusca(e.target.value); setProjetoFocado(0);}}
                      className="w-full bg-stone-800/80 border border-stone-600 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-stone-400"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex-1 overflow-y-auto px-4 pb-24 custom-scrollbar">
                {abaAtiva === "projetos" && (
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {projetosFiltrados.length === 0 ? (
                      <div className="col-span-2 text-center text-stone-500 py-10">{idioma === "PT" ? "Nenhum jogo encontrado." : "No games found."}</div>
                    ) : (
                      projetosFiltrados.map((p, idx) => (
                        <div key={p.id} onClick={() => { setProjetoFocado(idx); abrirJogo(); }} className="aspect-square rounded-2xl overflow-hidden relative border border-stone-800 active:scale-95 transition-transform">
                          <img src={p.thumb} className="w-full h-full object-cover"/>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3">
                             <span className="text-[10px] font-bold text-stone-300 uppercase mb-0.5">{p.tech.split(' • ')[0]}</span>
                             <span className="font-bold text-sm leading-tight text-white drop-shadow-md">{p.titulo}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {abaAtiva === "sobre" && (
                  <div className="flex flex-col gap-6 mt-4">
                    <div className="flex items-center gap-4 bg-stone-900 p-4 rounded-2xl border border-stone-800">
                       <div className="w-20 h-20 rounded-full bg-stone-700 overflow-hidden border-2 border-stone-500 flex-shrink-0">
                         <img src="/perfil.jpeg" alt="Davi Cagnato" className="w-full h-full object-cover" />
                       </div>
                       <div>
                         <h2 className="text-xl font-bold text-white">Davi Cagnato</h2>
                         <span className="text-stone-400 text-sm">Full-stack Developer</span>
                       </div>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold tracking-wide mb-2">{idioma === "PT" ? "Sobre o Autor" : "About the Author"}</h1>
                      <p className="text-stone-300 text-sm leading-relaxed text-justify whitespace-pre-line">
                        {idioma === "PT" 
                          ? `Desenvolvedor Full-stack apaixonado por resolver problemas e dar vida a ideias. Minha base técnica foi construída no ensino médio técnico pelo SESI/SENAI em Desenvolvimento de Sistemas, e hoje atuo como pesquisador bolsista pelo PIBIC. Tenho um interesse crescente pelas áreas de infraestrutura e segurança da informação, buscando sempre criar sistemas resilientes.\n\nAcredito muito no equilíbrio entre hard e soft skills: além da dedicação acadêmica que me rendeu premiações e medalhas, atuo em uma equipe semi-profissional de vôlei. O esporte me ensina diariamente sobre trabalho em equipe, comunicação rápida sob pressão e foco — habilidades que aplico todos os dias no código.`
                          : `Full-stack developer passionate about solving problems and bringing ideas to life. My technical foundation was built in high school at SESI/SENAI in Systems Development, and today I work as a PIBIC research scholar. I have a growing interest in infrastructure and information security, always seeking to build resilient systems.\n\nI strongly believe in the balance between hard and soft skills: beyond academic dedication that earned me awards, I play in a semi-professional volleyball team. Sports teach me daily about teamwork, fast communication under pressure, and focus — skills I apply every day to code.`}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                       <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                         <span className="font-bold text-white block mb-1 text-sm">{idioma === "PT" ? "Linguagens" : "Languages"}</span>
                         <span className="text-stone-400 text-xs">Python, JavaScript, TypeScript, Java, Kotlin</span>
                       </div>
                       <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                         <span className="font-bold text-white block mb-1 text-sm">Web & UI</span>
                         <span className="text-stone-400 text-xs">React, Next.js, Tailwind CSS</span>
                       </div>
                       <div className="bg-stone-900 p-4 rounded-xl border border-stone-800">
                          <span className="font-bold text-white block mb-1 text-sm">{idioma === "PT" ? "Ferramentas, Dados & Infraestrutura" : "Tools, Data & Infrastructure"}</span>
                          <span className="text-stone-400 text-xs">SQL, Scikit-Learn, Git, Arduino, Princípios de Segurança da Informação</span>
                        </div>
                    </div>
                  </div>
                )}

                {abaAtiva === "conquistas" && (
                  <div className="flex flex-col gap-4 mt-2">
                     <div className="flex items-start gap-4 bg-stone-900 p-4 rounded-2xl border border-blue-400/30">
                        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_20px_rgba(147,197,253,0.6)] flex-shrink-0"><defs><linearGradient id="mplatGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F8FAFC" /><stop offset="50%" stopColor="#94A3B8" /><stop offset="100%" stopColor="#334155" /></linearGradient><radialGradient id="msphereGrad2" cx="35%" cy="35%" r="65%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="60%" stopColor="#CBD5E1" /><stop offset="100%" stopColor="#64748B" /></radialGradient></defs><path d="M 30 90 L 70 90 L 75 97 L 25 97 Z" fill="url(#mplatGrad2)"/><path d="M 35 82 L 65 82 L 70 90 L 30 90 Z" fill="url(#mplatGrad2)"/><path d="M 45 70 L 55 70 L 55 82 L 45 82 Z" fill="url(#mplatGrad2)"/><path d="M 25 85 C -5 50, 15 20, 30 10 C 15 30, 10 65, 38 75 Z" fill="url(#mplatGrad2)"/><path d="M 75 85 C 105 50, 85 20, 70 10 C 85 30, 90 65, 62 75 Z" fill="url(#mplatGrad2)"/><path d="M 40 82 C 15 65, 25 30, 38 18 C 25 35, 28 65, 48 72 Z" fill="#E2E8F0"/><path d="M 60 82 C 85 65, 75 30, 62 18 C 75 35, 72 65, 52 72 Z" fill="#E2E8F0"/><circle cx="50" cy="42" r="24" fill="url(#msphereGrad2)" /><text x="50" y="46" fontFamily="sans-serif" fontSize="12" fill="#94A3B8" textAnchor="middle" fontWeight="900" letterSpacing="1">PS</text></svg>
                        <div>
                          <span className="text-blue-300 text-[10px] font-bold uppercase tracking-widest">{idioma === "PT" ? "Platina" : "Platinum"}</span>
                          <h3 className="text-white font-semibold text-sm leading-tight">{idioma === "PT" ? "Base de Elite" : "Elite Foundation"}</h3>
                          <p className="text-stone-400 text-xs mt-1">{idioma === "PT" ? "Formado no Ensino Médio Técnico pelo SESI/SENAI em Desenvolvimento de Sistemas." : "Graduated from Technical High School by SESI/SENAI in Systems Development."}</p>
                        </div>
                     </div>
                     
                     <div className="flex items-start gap-4 bg-stone-900 p-4 rounded-2xl border border-yellow-600/30">
                        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] flex-shrink-0"><defs><linearGradient id="mgoldGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FDE047" /><stop offset="50%" stopColor="#EAB308" /><stop offset="100%" stopColor="#A16207" /></linearGradient></defs><path d="M 20 30 C 0 30, 5 65, 35 60" fill="none" stroke="url(#mgoldGrad2)" strokeWidth="6" strokeLinecap="round"/><path d="M 80 30 C 100 30, 95 65, 65 60" fill="none" stroke="url(#mgoldGrad2)" strokeWidth="6" strokeLinecap="round"/><path d="M 28 20 L 72 20 L 65 65 C 65 80, 55 85, 50 85 C 45 85, 35 80, 35 65 Z" fill="url(#mgoldGrad2)"/><path d="M 45 85 L 55 85 L 65 95 L 35 95 Z" fill="url(#mgoldGrad2)"/><path d="M 25 20 L 75 20" stroke="#FEF08A" strokeWidth="2" /><text x="50" y="47" fontFamily="sans-serif" fontSize="11" fill="#713F12" textAnchor="middle" fontWeight="bold">△□</text><text x="50" y="59" fontFamily="sans-serif" fontSize="11" fill="#713F12" textAnchor="middle" fontWeight="bold">◯✕</text></svg>
                        <div>
                          <span className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest">{idioma === "PT" ? "Ouro" : "Gold"}</span>
                          <h3 className="text-white font-semibold text-sm leading-tight">{idioma === "PT" ? "Pesquisador PIBIC" : "PIBIC Researcher"}</h3>
                          <p className="text-stone-400 text-xs mt-1">{idioma === "PT" ? "Bolsista de iniciação científica, unindo rigor acadêmico à tecnologia." : "Scientific initiation scholar, bridging academic rigor with technology."}</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-4 bg-stone-900 p-4 rounded-2xl border border-stone-400/30">
                        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(148,163,184,0.5)] flex-shrink-0"><defs><linearGradient id="msilverGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F8FAFC" /><stop offset="50%" stopColor="#94A3B8" /><stop offset="100%" stopColor="#475569" /></linearGradient></defs><path d="M 20 30 C 0 30, 5 65, 35 60" fill="none" stroke="url(#msilverGrad2)" strokeWidth="6" strokeLinecap="round"/><path d="M 80 30 C 100 30, 95 65, 65 60" fill="none" stroke="url(#msilverGrad2)" strokeWidth="6" strokeLinecap="round"/><path d="M 28 20 L 72 20 L 65 65 C 65 80, 55 85, 50 85 C 45 85, 35 80, 35 65 Z" fill="url(#msilverGrad2)"/><path d="M 45 85 L 55 85 L 65 95 L 35 95 Z" fill="url(#msilverGrad2)"/><path d="M 25 20 L 75 20" stroke="#F1F5F9" strokeWidth="2" /><text x="50" y="47" fontFamily="sans-serif" fontSize="11" fill="#334155" textAnchor="middle" fontWeight="bold">△□</text><text x="50" y="59" fontFamily="sans-serif" fontSize="11" fill="#334155" textAnchor="middle" fontWeight="bold">◯✕</text></svg>
                        <div>
                          <span className="text-stone-300 text-[10px] font-bold uppercase tracking-widest">{idioma === "PT" ? "Prata" : "Silver"}</span>
                          <h3 className="text-white font-semibold text-sm leading-tight">{idioma === "PT" ? "Destaque Lógico" : "Logical Highlight"}</h3>
                          <p className="text-stone-400 text-xs mt-1">{idioma === "PT" ? "Vencedor de prêmios de Melhor Trabalho em Raciocínio Algorítmico e POO." : "Winner of Best Project awards in Algorithmic Reasoning and OOP."}</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-4 bg-stone-900 p-4 rounded-2xl border border-orange-700/30">
                        <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(194,65,12,0.4)] flex-shrink-0"><defs><linearGradient id="mbronzeGrad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FDBA74" /><stop offset="50%" stopColor="#C2410C" /><stop offset="100%" stopColor="#7C2D12" /></linearGradient></defs><path d="M 20 30 C 0 30, 5 65, 35 60" fill="none" stroke="url(#mbronzeGrad2)" strokeWidth="6" strokeLinecap="round"/><path d="M 80 30 C 100 30, 95 65, 65 60" fill="none" stroke="url(#mbronzeGrad2)" strokeWidth="6" strokeLinecap="round"/><path d="M 28 20 L 72 20 L 65 65 C 65 80, 55 85, 50 85 C 45 85, 35 80, 35 65 Z" fill="url(#mbronzeGrad2)"/><path d="M 45 85 L 55 85 L 65 95 L 35 95 Z" fill="url(#mbronzeGrad2)"/><path d="M 25 20 L 75 20" stroke="#FFEDD5" strokeWidth="2" /><text x="50" y="47" fontFamily="sans-serif" fontSize="11" fill="#431407" textAnchor="middle" fontWeight="bold">△□</text><text x="50" y="59" fontFamily="sans-serif" fontSize="11" fill="#431407" textAnchor="middle" fontWeight="bold">◯✕</text></svg>
                        <div>
                          <span className="text-orange-500 text-[10px] font-bold uppercase tracking-widest">{idioma === "PT" ? "Bronze" : "Bronze"}</span>
                          <h3 className="text-white font-semibold text-sm leading-tight">{idioma === "PT" ? "Comunicação Global" : "Global Communication"}</h3>
                          <p className="text-stone-400 text-xs mt-1">{idioma === "PT" ? "Medalhista de Bronze na OBLI e participação na HMUN." : "Bronze Medalist at OBLI and participation at HMUN."}</p>
                        </div>
                     </div>
                  </div>
                )}
              </div>

              <div className="fixed bottom-0 w-full h-16 bg-[#18181b]/95 backdrop-blur-md border-t border-stone-800 flex justify-around items-center z-50">
                 <button onClick={() => {setAbaAtiva("projetos"); setBuscaAberta(false);}} className={`flex flex-col items-center gap-1 ${abaAtiva === "projetos" && !buscaAberta ? "text-white" : "text-stone-500"}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                 </button>
                 <button onClick={() => {setBuscaAberta(!buscaAberta); setAbaAtiva("projetos");}} className={`flex flex-col items-center gap-1 ${buscaAberta ? "text-white" : "text-stone-500"}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                 </button>
                 <button onClick={() => {setAbaAtiva("conquistas"); setBuscaAberta(false);}} className={`flex flex-col items-center gap-1 ${abaAtiva === "conquistas" ? "text-white" : "text-stone-500"}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15a6 6 0 0 0 6-6V5H6v4a6 6 0 0 0 6 6z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v6"/><path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8"/><path strokeLinecap="round" strokeLinejoin="round" d="M6 5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2"/><path strokeLinecap="round" strokeLinejoin="round" d="M18 5h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/></svg>
                 </button>
              </div>
            </motion.div>
          )}

          {/* TELA DE JOGO ABERTO (Responsivo: Desktop & Mobile) */}
          {telaAtiva === "jogo" && (
            <motion.div 
              key="jogoAberta"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-50 bg-[#0b0c10] flex flex-col overflow-y-auto pb-24 md:pb-0"
            >
              <div style={{ backgroundImage: `url(${projetosFiltrados[projetoFocado]?.bg})` }} className="fixed inset-0 bg-cover bg-center opacity-40 blur-sm pointer-events-none"></div>
              <div className="fixed inset-0 bg-gradient-to-b from-[#0b0c10]/70 via-[#0b0c10]/90 to-[#0b0c10] pointer-events-none"></div>

              {carregandoJogo ? (
                <div className="flex-1 flex items-center justify-center relative z-10 flex-col gap-8 min-h-screen">
                  <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-6xl font-bold tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-center px-4">
                    {projetosFiltrados[projetoFocado]?.titulo}
                  </motion.h1>
                  <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-stone-500 border-t-white rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="flex-1 relative z-10 p-6 md:p-12 flex flex-col min-h-screen justify-center md:justify-between">
                  <div className="flex justify-between items-start absolute top-6 left-6 right-6 md:static">
                    <button onClick={fecharJogo} className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-black/50 border border-stone-600 rounded-full hover:bg-white hover:text-black hover:border-white transition-all backdrop-blur-md text-sm md:text-base">
                      <span className="font-bold">⮐</span> {idioma === "PT" ? "Voltar" : "Back"}
                    </button>
                    <span className="text-stone-400 font-medium tracking-widest uppercase text-xs md:text-sm hidden md:block">
                      {projetosFiltrados[projetoFocado]?.tech}
                    </span>
                  </div>

                  <div className="max-w-3xl mt-20 md:mt-0">
                    <div className="md:hidden flex items-center gap-2 mb-4">
                       <span className="px-2 py-1 bg-white text-black font-bold text-[10px] rounded-sm shadow-sm">HIGHLIGHT</span>
                       <span className="text-stone-300 font-medium text-xs tracking-wide">{projetosFiltrados[projetoFocado]?.tech}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 drop-shadow-lg leading-tight">{projetosFiltrados[projetoFocado]?.titulo}</h1>
                    <p className="text-base md:text-xl text-stone-300 leading-relaxed drop-shadow-md mb-8 md:mb-10">
                      {idioma === "PT" ? projetosFiltrados[projetoFocado]?.descricao.pt : projetosFiltrados[projetoFocado]?.descricao.en}
                    </p>
                    
                    {/* Botões Dinâmicos de Link */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {projetosFiltrados[projetoFocado]?.linkApp && (
                        <a href={projetosFiltrados[projetoFocado]?.linkApp} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center px-8 py-3 md:px-10 md:py-4 bg-white text-black font-bold text-sm md:text-lg rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                          {idioma === "PT" ? "Acessar Projeto" : "Open Live Project"}
                        </a>
                      )}
                      {projetosFiltrados[projetoFocado]?.linkGithub && (
                        <a href={projetosFiltrados[projetoFocado]?.linkGithub} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center px-8 py-3 md:px-10 md:py-4 bg-stone-800 border border-stone-600 text-white font-bold text-sm md:text-lg rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                          {idioma === "PT" ? "Ver no GitHub" : "View on GitHub"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </>
  );
}