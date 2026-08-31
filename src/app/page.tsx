"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Projetos com links reais e descrições bilíngues
const PROJETOS = [
  {
    id: 1,
    titulo: "PredictiveGuard",
    tech: "Python • Scikit-Learn",
    descricao: {
      pt: "Modelo de Machine Learning para simular e prever falhas em maquinário industrial.",
      en: "Machine Learning model to simulate and predict failures in industrial machinery."
    },
    thumb: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=400&auto=format&fit=crop",
    bg: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1920&auto=format&fit=crop",
    bgColor: "#7f1d1d",
    link: "https://github.com/cagnato/predictive-guard",
  },
  {
    id: 2,
    titulo: "BitSocial",
    tech: "Python • SQL",
    descricao: {
      pt: "Rede social voltada para devs interagirem e compartilharem ideias.",
      en: "Social network aimed at devs to interact and share ideas."
    },
    thumb: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop",
    bg: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1920&auto=format&fit=crop",
    bgColor: "#1e3a8a",
    link: "https://github.com/cagnato/SocialBit",
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
    link: "#", 
  },
  {
    id: 4,
    titulo: "Matchup Score",
    tech: "React • Next.js",
    descricao: {
      pt: "Plataforma de reserva de quadras inspirada em lobbies de jogos.",
      en: "Court reservation platform inspired by gaming lobbies."
    },
    thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop",
    bg: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1920&auto=format&fit=crop",
    bgColor: "#581c87",
    link: "https://github.com/cagnato/MatchUp-Score",
  },
  {
    id: 5,
    titulo: "Jogo de Ritmo",
    tech: "Java • Arduino",
    descricao: {
      pt: "Jogo de ritmo com suporte a guitarra física (Projeto PowerJorge).",
      en: "Rhythm game with physical guitar support (PowerJorge Project)."
    },
    thumb: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=400&auto=format&fit=crop",
    bg: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1920&auto=format&fit=crop",
    bgColor: "#78350f",
    link: "https://github.com/larissaadames/PowerJorge/tree/Main4",
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

  // --- FUNÇÕES DECLARADAS ANTES DOS USEEFFECTS (Evita o erro de escopo) ---
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
    setTimeout(() => setCarregandoJogo(false), 2000);
  };

  const fecharJogo = () => {
    setTelaAtiva("dashboard");
  };

  // --- USEEFFECTS ---
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
            className="flex flex-col items-center justify-center z-10 w-full"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-light tracking-wide mb-16 text-stone-200"
            >
              {idioma === "PT" ? "Bem-vindo de volta ao meu Portfólio" : "Welcome Back to My Portfolio"}
            </motion.h1>

            <div className="flex gap-16 items-center">
              <div className="flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-opacity cursor-not-allowed">
                <div className="w-24 h-24 rounded-full bg-stone-800/50 border-2 border-stone-600 flex items-center justify-center text-3xl font-light">+</div>
                <span className="text-sm tracking-wider">{idioma === "PT" ? "Novo Usuário" : "Add User"}</span>
              </div>

              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={entrarNoSistema}
                className="flex flex-col items-center gap-4 cursor-pointer group"
              >
                <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-b from-stone-400 to-transparent">
                  <div className="w-full h-full rounded-full bg-stone-800 border-4 border-[#0b0c10] overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center">
                    <img src="/perfil.jpeg" alt="Davi Cagnato" className="w-full h-full object-cover" draggable="false" />
                  </div>
                </div>
                <span className="text-lg tracking-wider font-medium text-white flex items-center gap-2">Davi Cagnato</span>
              </motion.div>
            </div>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-10 flex items-center gap-2 text-stone-400 text-sm">
              <span className="w-4 h-4 rounded-full border border-stone-400 flex items-center justify-center text-[10px]">X</span>
              <span>{idioma === "PT" ? "Selecionar" : "Select"}</span>
            </motion.div>
          </motion.div>
        )}

        {/* DASHBOARD PRINCIPAL */}
        {telaAtiva === "dashboard" && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="w-full h-screen flex flex-col pt-10 px-12 relative"
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
            <header className="flex justify-between items-center mb-16">
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

                {/* Barra de Pesquisa */}
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
                        autoFocus
                        type="text"
                        placeholder={idioma === "PT" ? "Buscar jogo..." : "Search game..."}
                        value={textoBusca}
                        onChange={(e) => {setTextoBusca(e.target.value); setProjetoFocado(0);}}
                        className="bg-stone-800/80 border border-stone-600 rounded-full px-4 py-1 text-sm text-white focus:outline-none focus:border-stone-400 transition-colors"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Engrenagem (Troca de Idioma) */}
                <div className="relative group flex items-center">
                  <svg onClick={() => setIdioma(idioma === "PT" ? "EN" : "PT")} aria-label="Configurações (Idioma)" className="w-6 h-6 hover:text-white cursor-pointer transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="ml-2 text-xs font-bold border border-stone-500 rounded px-1 text-stone-400">{idioma}</span>
                </div>

                {/* Avatar Perfil */}
                <div onClick={voltarProLogin} className="w-9 h-9 rounded-full bg-stone-800 border-2 border-stone-400 cursor-pointer hover:border-white transition-all ml-2 overflow-hidden flex items-center justify-center">
                  <img src="/perfil.jpeg" alt="Davi" className="w-full h-full object-cover" draggable="false" />
                </div>
                <span className="font-light tracking-wider ml-1">{hora}</span>
              </div>
            </header>

            {/* Projetos */}
            {abaAtiva === "projetos" && (
              <>
                <div className="flex gap-4 items-end mb-10 overflow-visible px-4 h-[300px]">
                  {projetosFiltrados.length === 0 ? (
                    <div className="w-full text-center text-stone-500 font-light text-xl mt-20">
                      {idioma === "PT" ? "Nenhum jogo encontrado." : "No games found."}
                    </div>
                  ) : (
                    projetosFiltrados.map((projeto, index) => {
                      const isFocused = index === projetoFocado;
                      return (
                        <motion.div
                          key={projeto.id}
                          onClick={() => setProjetoFocado(index)}
                          layout
                          initial={false}
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
                  <motion.div key={`info-${projetosFiltrados[projetoFocado].id}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-3 max-w-2xl px-4 mt-auto mb-16">
                    <h1 className="text-4xl font-bold tracking-wide text-white drop-shadow-md">{projetosFiltrados[projetoFocado].titulo}</h1>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="px-2 py-1 bg-white text-black font-bold text-xs rounded-sm shadow-sm">HIGHLIGHT</span>
                      <span className="text-stone-200 font-medium tracking-wide drop-shadow-md">{projetosFiltrados[projetoFocado].tech}</span>
                    </div>
                    <p className="text-stone-300 text-lg leading-relaxed mt-2 drop-shadow-md">
                      {idioma === "PT" ? projetosFiltrados[projetoFocado].descricao.pt : projetosFiltrados[projetoFocado].descricao.en}
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <button onClick={abrirJogo} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-stone-200 transition-colors flex items-center gap-2 shadow-lg">
                        <span className="text-xl">▶</span> {idioma === "PT" ? "Jogar" : "Play Game"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            )}

            {/* Sobre Mim */}
            {abaAtiva === "sobre" && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col md:flex-row gap-12 max-w-5xl px-4 mt-4">
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
                    <p className="text-stone-300 text-base md:text-lg leading-relaxed text-justify whitespace-pre-line">
                      {idioma === "PT" 
                        ? `Desenvolvedor Full-stack apaixonado por resolver problemas e dar vida a ideias. Minha base técnica foi construída no ensino médio técnico pelo SESI/SENAI em Desenvolvimento de Sistemas, e hoje atuo como pesquisador bolsista pelo PIBIC. Tenho um interesse crescente pelas áreas de infraestrutura e segurança da informação, buscando sempre criar sistemas resilientes.

Acredito muito no equilíbrio entre hard e soft skills: além da dedicação acadêmica que me rendeu premiações e medalhas, atuo em uma equipe semi-profissional de vôlei. O esporte me ensina diariamente sobre trabalho em equipe, comunicação rápida sob pressão e foco — habilidades que aplico todos os dias no código.`
                        : `Full-stack developer passionate about solving problems and bringing ideas to life. My technical foundation was built in high school at SESI/SENAI in Systems Development, and today I work as a PIBIC research scholar. I have a growing interest in infrastructure and information security, always seeking to build resilient systems.

I strongly believe in the balance between hard and soft skills: beyond academic dedication that earned me awards, I play in a semi-professional volleyball team. Sports teach me daily about teamwork, fast communication under pressure, and focus — skills I apply every day to code.`}
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

            {/* Conquistas (Trophies) */}
            {abaAtiva === "conquistas" && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-8 max-w-5xl px-4 mt-4 pb-12 overflow-y-auto custom-scrollbar">
                <div>
                  <h1 className="text-3xl font-bold tracking-wide mb-2 text-white flex items-center gap-3">
                    <span className="text-yellow-500">🏆</span> {idioma === "PT" ? "Galeria de Troféus" : "Trophy Gallery"}
                  </h1>
                  <p className="text-stone-400">{idioma === "PT" ? "Certificações acadêmicas, olimpíadas e bolsas de pesquisa." : "Academic certifications, olympiads, and research scholarships."}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Platina */}
                  <div className="flex items-center gap-6 bg-stone-900/80 p-5 rounded-2xl border border-blue-400/30 backdrop-blur-md shadow-xl cursor-default group">
                    <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-[0_0_20px_rgba(147,197,253,0.6)] flex-shrink-0">
                      <defs><linearGradient id="platGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F8FAFC" /><stop offset="50%" stopColor="#94A3B8" /><stop offset="100%" stopColor="#334155" /></linearGradient><radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="60%" stopColor="#CBD5E1" /><stop offset="100%" stopColor="#64748B" /></radialGradient></defs>
                      <path d="M 30 90 L 70 90 L 75 97 L 25 97 Z" fill="url(#platGrad)"/><path d="M 35 82 L 65 82 L 70 90 L 30 90 Z" fill="url(#platGrad)"/><path d="M 45 70 L 55 70 L 55 82 L 45 82 Z" fill="url(#platGrad)"/><path d="M 25 85 C -5 50, 15 20, 30 10 C 15 30, 10 65, 38 75 Z" fill="url(#platGrad)"/><path d="M 75 85 C 105 50, 85 20, 70 10 C 85 30, 90 65, 62 75 Z" fill="url(#platGrad)"/><path d="M 40 82 C 15 65, 25 30, 38 18 C 25 35, 28 65, 48 72 Z" fill="#E2E8F0"/><path d="M 60 82 C 85 65, 75 30, 62 18 C 75 35, 72 65, 52 72 Z" fill="#E2E8F0"/><circle cx="50" cy="42" r="24" fill="url(#sphereGrad)" /><text x="50" y="46" fontFamily="sans-serif" fontSize="12" fill="#94A3B8" textAnchor="middle" fontWeight="900" letterSpacing="1">PS</text>
                    </svg>
                    <div className="flex flex-col gap-1">
                      <span className="text-blue-300 text-xs font-bold uppercase tracking-widest drop-shadow-sm">{idioma === "PT" ? "Troféu de Platina" : "Platinum Trophy"}</span>
                      <h3 className="text-white font-semibold text-lg">{idioma === "PT" ? "Base de Elite" : "Elite Foundation"}</h3>
                      <p className="text-stone-400 text-sm">{idioma === "PT" ? "Formado no Ensino Médio Técnico pelo SESI/SENAI em Desenvolvimento de Sistemas." : "Graduated from Technical High School by SESI/SENAI in Systems Development."}</p>
                    </div>
                  </div>
                  {/* Ouro */}
                  <div className="flex items-center gap-6 bg-stone-900/80 p-5 rounded-2xl border border-yellow-600/30 backdrop-blur-md shadow-xl cursor-default">
                    <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] flex-shrink-0">
                      <defs><linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FDE047" /><stop offset="50%" stopColor="#EAB308" /><stop offset="100%" stopColor="#A16207" /></linearGradient></defs>
                      <path d="M 20 30 C 0 30, 5 65, 35 60" fill="none" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round"/><path d="M 80 30 C 100 30, 95 65, 65 60" fill="none" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round"/><path d="M 28 20 L 72 20 L 65 65 C 65 80, 55 85, 50 85 C 45 85, 35 80, 35 65 Z" fill="url(#goldGrad)"/><path d="M 45 85 L 55 85 L 65 95 L 35 95 Z" fill="url(#goldGrad)"/><path d="M 25 20 L 75 20" stroke="#FEF08A" strokeWidth="2" /><text x="50" y="47" fontFamily="sans-serif" fontSize="11" fill="#713F12" textAnchor="middle" fontWeight="bold">△□</text><text x="50" y="59" fontFamily="sans-serif" fontSize="11" fill="#713F12" textAnchor="middle" fontWeight="bold">◯✕</text>
                    </svg>
                    <div className="flex flex-col gap-1">
                      <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest drop-shadow-sm">{idioma === "PT" ? "Troféu de Ouro" : "Gold Trophy"}</span>
                      <h3 className="text-white font-semibold text-lg">{idioma === "PT" ? "Pesquisador PIBIC" : "PIBIC Researcher"}</h3>
                      <p className="text-stone-400 text-sm">{idioma === "PT" ? "Bolsista de iniciação científica, unindo rigor acadêmico à tecnologia prática." : "Scientific initiation scholar, bridging academic rigor with practical technology."}</p>
                    </div>
                  </div>
                  {/* Prata */}
                  <div className="flex items-center gap-6 bg-stone-900/80 p-5 rounded-2xl border border-stone-400/30 backdrop-blur-md shadow-xl cursor-default">
                    <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-[0_0_15px_rgba(148,163,184,0.5)] flex-shrink-0">
                      <defs><linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F8FAFC" /><stop offset="50%" stopColor="#94A3B8" /><stop offset="100%" stopColor="#475569" /></linearGradient></defs>
                      <path d="M 20 30 C 0 30, 5 65, 35 60" fill="none" stroke="url(#silverGrad)" strokeWidth="6" strokeLinecap="round"/><path d="M 80 30 C 100 30, 95 65, 65 60" fill="none" stroke="url(#silverGrad)" strokeWidth="6" strokeLinecap="round"/><path d="M 28 20 L 72 20 L 65 65 C 65 80, 55 85, 50 85 C 45 85, 35 80, 35 65 Z" fill="url(#silverGrad)"/><path d="M 45 85 L 55 85 L 65 95 L 35 95 Z" fill="url(#silverGrad)"/><path d="M 25 20 L 75 20" stroke="#F1F5F9" strokeWidth="2" /><text x="50" y="47" fontFamily="sans-serif" fontSize="11" fill="#334155" textAnchor="middle" fontWeight="bold">△□</text><text x="50" y="59" fontFamily="sans-serif" fontSize="11" fill="#334155" textAnchor="middle" fontWeight="bold">◯✕</text>
                    </svg>
                    <div className="flex flex-col gap-1">
                      <span className="text-stone-300 text-xs font-bold uppercase tracking-widest drop-shadow-sm">{idioma === "PT" ? "Troféu de Prata" : "Silver Trophy"}</span>
                      <h3 className="text-white font-semibold text-lg">{idioma === "PT" ? "Destaque Lógico" : "Logical Highlight"}</h3>
                      <p className="text-stone-400 text-sm">{idioma === "PT" ? "Vencedor de prêmios de Melhor Trabalho em Raciocínio Algorítmico e POO." : "Winner of Best Project awards in Algorithmic Reasoning and OOP."}</p>
                    </div>
                  </div>
                  {/* Bronze */}
                  <div className="flex items-center gap-6 bg-stone-900/80 p-5 rounded-2xl border border-orange-700/30 backdrop-blur-md shadow-xl cursor-default">
                    <svg viewBox="0 0 100 100" className="w-20 h-20 drop-shadow-[0_0_15px_rgba(194,65,12,0.4)] flex-shrink-0">
                      <defs><linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FDBA74" /><stop offset="50%" stopColor="#C2410C" /><stop offset="100%" stopColor="#7C2D12" /></linearGradient></defs>
                      <path d="M 20 30 C 0 30, 5 65, 35 60" fill="none" stroke="url(#bronzeGrad)" strokeWidth="6" strokeLinecap="round"/><path d="M 80 30 C 100 30, 95 65, 65 60" fill="none" stroke="url(#bronzeGrad)" strokeWidth="6" strokeLinecap="round"/><path d="M 28 20 L 72 20 L 65 65 C 65 80, 55 85, 50 85 C 45 85, 35 80, 35 65 Z" fill="url(#bronzeGrad)"/><path d="M 45 85 L 55 85 L 65 95 L 35 95 Z" fill="url(#bronzeGrad)"/><path d="M 25 20 L 75 20" stroke="#FFEDD5" strokeWidth="2" /><text x="50" y="47" fontFamily="sans-serif" fontSize="11" fill="#431407" textAnchor="middle" fontWeight="bold">△□</text><text x="50" y="59" fontFamily="sans-serif" fontSize="11" fill="#431407" textAnchor="middle" fontWeight="bold">◯✕</text>
                    </svg>
                    <div className="flex flex-col gap-1">
                      <span className="text-orange-500 text-xs font-bold uppercase tracking-widest drop-shadow-sm">{idioma === "PT" ? "Troféu de Bronze" : "Bronze Trophy"}</span>
                      <h3 className="text-white font-semibold text-lg">{idioma === "PT" ? "Comunicação Global" : "Global Communication"}</h3>
                      <p className="text-stone-400 text-sm">{idioma === "PT" ? "Medalhista de Bronze na OBLI (2024) e participação de destaque na HMUN (2025)." : "Bronze Medalist at OBLI (2024) and prominent participation at HMUN (2025)."}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* TELA DE JOGO ABERTO (Splash Screen -> Game View) */}
        {telaAtiva === "jogo" && (
          <motion.div 
            key="jogoAberta"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-[#0b0c10] flex flex-col"
          >
            {/* Fundo do Jogo */}
            <div 
              style={{ backgroundImage: `url(${projetosFiltrados[projetoFocado]?.bg})` }}
              className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm"
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c10]/50 to-[#0b0c10]"></div>

            {carregandoJogo ? (
              // TELA DE LOADING (SPLASH SCREEN)
              <div className="flex-1 flex items-center justify-center relative z-10 flex-col gap-8">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-6xl font-bold tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                >
                  {projetosFiltrados[projetoFocado]?.titulo}
                </motion.h1>
                <div className="w-12 h-12 border-4 border-stone-500 border-t-white rounded-full animate-spin"></div>
              </div>
            ) : (
              // INTERIOR DO JOGO (HUB DO PROJETO)
              <div className="flex-1 relative z-10 p-12 flex flex-col justify-between">
                
                {/* Botão de Fechar */}
                <div className="flex justify-between items-start">
                  <button onClick={fecharJogo} className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-stone-600 rounded-full hover:bg-white hover:text-black hover:border-white transition-all backdrop-blur-md">
                    <span className="font-bold">⮐</span> {idioma === "PT" ? "Voltar ao Menu" : "Back to Menu"}
                  </button>
                  <span className="text-stone-400 font-medium tracking-widest uppercase text-sm">
                    {projetosFiltrados[projetoFocado]?.tech}
                  </span>
                </div>

                {/* Info Central */}
                <div className="max-w-3xl">
                  <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">{projetosFiltrados[projetoFocado]?.titulo}</h1>
                  <p className="text-xl text-stone-300 leading-relaxed drop-shadow-md mb-10">
                    {idioma === "PT" ? projetosFiltrados[projetoFocado]?.descricao.pt : projetosFiltrados[projetoFocado]?.descricao.en}
                  </p>
                  
                  {/* Link real do GitHub abrindo na mesma aba */}
                  <a href={projetosFiltrados[projetoFocado]?.link} target="_self" className="inline-block px-12 py-4 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    {idioma === "PT" ? "Acessar Repositório no GitHub" : "Open GitHub Repository"}
                  </a>
                </div>

              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </main>
  );
}