"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function Home() {
  const [copiado, setCopiado] = useState(false);
  const [montado, setMontado] = useState(false);
  const [abertoMobile, setAbertoMobile] = useState(false);
  const { theme, setTheme } = useTheme();

  const gavetaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line
    setMontado(true);

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (gavetaRef.current && !gavetaRef.current.contains(event.target as Node)) {
        setAbertoMobile(false);
      }
    };

    if (abertoMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [abertoMobile]);

  const copiarEmail = () => {
    navigator.clipboard.writeText("seu.email@gmail.com");
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#fafaf9] dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300 relative overflow-x-hidden">
      
      {/* WIDGET FLUTUANTE DE TEMA */}
      {montado && (
        <div ref={gavetaRef} className="fixed top-24 right-0 z-50 flex items-center group">
          <div 
            onClick={() => setAbertoMobile(!abertoMobile)}
            className={`bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-y border-l border-stone-300 dark:border-stone-700 dark:border-l-violet-500 rounded-l-2xl shadow-[0_0_25px_rgba(139,92,246,0.25)] p-3.5 flex items-center gap-4 transition-transform duration-300 ease-in-out cursor-pointer ${
              abertoMobile ? "translate-x-0" : "translate-x-[calc(100%-18px)]"
            } md:translate-x-[calc(100%-18px)] md:group-hover:translate-x-0`}
          >
            <span className="text-sm font-bold text-violet-700 dark:text-violet-400 uppercase tracking-wider pl-1 select-none">
              Tema
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setTheme(theme === "dark" ? "light" : "dark");
              }}
              className="relative w-16 h-8 rounded-full bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 p-1 transition-colors duration-300 focus:outline-none shadow-inner cursor-pointer"
              aria-label="Alternar tema"
              title="Alternar tema claro/escuro"
            >
              <div
                className={`w-6 h-6 rounded-full bg-white dark:bg-stone-900 shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center text-stone-700 dark:text-stone-200 ${
                  theme === "dark" ? "translate-x-8" : "translate-x-0"
                }`}
              >
                {theme === "dark" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        
        {/* CABEÇALHO / SOBRE MIM */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col-reverse md:flex-row items-center gap-8 py-12 md:py-20 border-b border-stone-200 dark:border-stone-800 mb-16 transition-colors"
        >
          <div className="flex-1 flex flex-col gap-5 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Olá, sou <span className="text-violet-700 dark:text-violet-400">[Seu Nome]</span>.
            </h1>
            
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl">
              Desenvolvedor Full-stack. Apaixonado por aprender, utilizo a tecnologia para resolver problemas e dar vida a ideias, sejam elas profissionais ou hobbies.
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
              <a href="LINK_DO_SEU_LINKEDIN" target="_blank" className="bg-violet-700 hover:bg-violet-800 dark:bg-violet-600 dark:hover:bg-violet-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-sm">
                LinkedIn
              </a>
              <a href="LINK_DO_SEU_GITHUB" target="_blank" className="bg-stone-900 dark:bg-stone-100 dark:text-stone-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-stone-800 dark:hover:bg-white transition-colors shadow-sm">
                GitHub
              </a>
              <button 
                onClick={copiarEmail}
                className="border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 w-32 py-3 rounded-lg font-semibold hover:border-stone-300 dark:hover:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800/50 transition-colors shadow-sm flex items-center justify-center"
              >
                {copiado ? "Copiado!" : "E-mail"}
              </button>
            </div>
          </div>

          <div className="w-40 h-40 md:w-56 md:h-56 bg-stone-200 dark:bg-stone-800 rounded-full shrink-0 border-4 border-white dark:border-stone-900 shadow-xl overflow-hidden flex items-center justify-center transition-colors">
            <span className="text-stone-500 dark:text-stone-400 text-sm font-medium text-center px-4">
              [Sua Foto]
            </span>
          </div>
        </motion.header>

        {/* SEÇÃO DE PROJETOS */}
        <section className="flex flex-col gap-20">
          
          {/* PROJETO 1 - IA */}
          <motion.article 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-8 md:gap-12 items-center"
          >
            <div className="w-full md:w-1/2 h-64 md:h-80 bg-stone-100 dark:bg-stone-900 rounded-2xl flex items-center justify-center border border-stone-200 dark:border-stone-800 shadow-sm shrink-0">
              <span className="text-stone-400 font-medium">[Gráfico Simulador IA]</span>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <h2 className="text-2xl font-bold">Simulador de Manutenção Preditiva</h2>
              <div className="flex gap-2">
                <span className="bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 text-xs px-3 py-1 rounded-full font-semibold border border-violet-200 dark:border-violet-800">Python</span>
                <span className="bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 text-xs px-3 py-1 rounded-full font-semibold border border-violet-200 dark:border-violet-800">Scikit-Learn</span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                Modelo de Machine Learning desenvolvido para simular e prever falhas em maquinário industrial, gerando alertas preditivos para evitar paradas não planejadas.
              </p>
              <div className="flex gap-3 mt-2">
                <button className="bg-stone-900 dark:bg-stone-100 dark:text-stone-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-stone-800 dark:hover:bg-white transition-colors">
                  Demonstração
                </button>
                <button className="border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-5 py-2.5 rounded-lg font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                  Código
                </button>
              </div>
            </div>
          </motion.article>

          {/* PROJETO 2 - BitSocial */}
          <motion.article 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center"
          >
            <div className="w-full md:w-1/2 h-64 md:h-80 bg-stone-100 dark:bg-stone-900 rounded-2xl flex items-center justify-center border border-stone-200 dark:border-stone-800 shadow-sm shrink-0">
              <span className="text-stone-400 font-medium">[Print Feed SocialBit]</span>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <h2 className="text-2xl font-bold">SocialBit</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-300 text-xs px-3 py-1 rounded-full font-semibold border border-stone-300 dark:border-stone-700">Python</span>
                <span className="bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-300 text-xs px-3 py-1 rounded-full font-semibold border border-stone-300 dark:border-stone-700">SQL</span>
                <span className="bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-300 text-xs px-3 py-1 rounded-full font-semibold border border-stone-300 dark:border-stone-700">JavaScript</span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                Rede social voltada para devs, criada como um local descontraído para interagir, compartilhar ideias e relaxar fora do circuito puramente corporativo.
              </p>
              <div className="flex gap-3 mt-2">
                <button className="bg-stone-900 dark:bg-stone-100 dark:text-stone-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-stone-800 dark:hover:bg-white transition-colors">
                  Ver Projeto
                </button>
                <button className="border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-5 py-2.5 rounded-lg font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                  Código
                </button>
              </div>
            </div>
          </motion.article>

          {/* PROJETO 3 - Guia de Vôlei */}
          <motion.article 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-8 md:gap-12 items-center"
          >
            <div className="w-full md:w-1/2 h-64 md:h-80 bg-stone-100 dark:bg-stone-900 rounded-2xl flex items-center justify-center border border-stone-200 dark:border-stone-800 shadow-sm shrink-0">
              <span className="text-stone-400 font-medium">[Print Guia de Vôlei]</span>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <h2 className="text-2xl font-bold">Guia Interativo de Vôlei</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs px-3 py-1 rounded-full font-semibold border border-amber-200 dark:border-amber-800">JavaScript</span>
                <span className="bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs px-3 py-1 rounded-full font-semibold border border-amber-200 dark:border-amber-800">UI/UX</span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                Projeto baseado em hobby pessoal. Transforma regras e táticas complexas de voleibol em uma experiência visual, interativa e altamente responsiva.
              </p>
              <div className="flex gap-3 mt-2">
                <button className="bg-stone-900 dark:bg-stone-100 dark:text-stone-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-stone-800 dark:hover:bg-white transition-colors">
                  Ver Projeto
                </button>
                <button className="border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-5 py-2.5 rounded-lg font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                  Código
                </button>
              </div>
            </div>
          </motion.article>

          {/* PROJETO 4 - Matchup Score (Novo) */}
          <motion.article 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row-reverse gap-8 md:gap-12 items-center"
          >
            <div className="w-full md:w-1/2 h-64 md:h-80 bg-stone-100 dark:bg-stone-900 rounded-2xl flex items-center justify-center border border-stone-200 dark:border-stone-800 shadow-sm shrink-0">
              <span className="text-stone-400 font-medium">[Print Matchup Score]</span>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <h2 className="text-2xl font-bold">Matchup Score</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 text-xs px-3 py-1 rounded-full font-semibold border border-cyan-200 dark:border-cyan-800">TypeScript</span>
                <span className="bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 text-xs px-3 py-1 rounded-full font-semibold border border-cyan-200 dark:border-cyan-800">JavaScript</span>
                <span className="bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 text-xs px-3 py-1 rounded-full font-semibold border border-cyan-200 dark:border-cyan-800">HTML/CSS</span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                Plataforma web para reserva de quadras e criação de eventos esportivos inspirada no sistema de lobbies de jogos. Permite gerenciar partidas públicas (livres) e privadas (com aprovação de participantes), facilitando a locação de espaços e a união de jogadores.
              </p>
              <div className="flex gap-3 mt-2">
                <button className="bg-stone-900 dark:bg-stone-100 dark:text-stone-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-stone-800 dark:hover:bg-white transition-colors">
                  Demonstração
                </button>
                <button className="border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-5 py-2.5 rounded-lg font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                  Código
                </button>
              </div>
            </div>
          </motion.article>

          {/* PROJETO 5 - Jogo de Ritmo em Java (Novo) */}
          <motion.article 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-8 md:gap-12 items-center"
          >
            <div className="w-full md:w-1/2 h-64 md:h-80 bg-stone-100 dark:bg-stone-900 rounded-2xl flex items-center justify-center border border-stone-200 dark:border-stone-800 shadow-sm shrink-0">
              <span className="text-stone-400 font-medium">[Print Jogo de Ritmo / Guitarra Arduino]</span>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <h2 className="text-2xl font-bold">PowerJorge (Java + Arduino)</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs px-3 py-1 rounded-full font-semibold border border-rose-200 dark:border-rose-800">Java (POO)</span>
                <span className="bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs px-3 py-1 rounded-full font-semibold border border-rose-200 dark:border-rose-800">JSON</span>
                <span className="bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs px-3 py-1 rounded-full font-semibold border border-rose-200 dark:border-rose-800">Hardware / Arduino</span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                Jogo de ritmo desenvolvido inteiramente em Java aplicando conceitos avançados de Orientação a Objetos. Possui persistência de dados via JSON, 3 músicas totalmente jogáveis e suporte duplo para jogar tanto no teclado quanto em uma guitarra física construída pelo grupo utilizando Arduino.
              </p>
              <div className="flex gap-3 mt-2">
                <button className="bg-stone-900 dark:bg-stone-100 dark:text-stone-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-stone-800 dark:hover:bg-white transition-colors">
                  Demonstração
                </button>
                <button className="border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-5 py-2.5 rounded-lg font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                  Código
                </button>
              </div>
            </div>
          </motion.article>

        </section>

        {/* RODAPÉ */}
        <footer className="py-8 md:py-12 border-t border-stone-200 dark:border-stone-800 mt-20 text-center text-stone-500 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>
              © {new Date().getFullYear()} [Seu Nome]. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <span className="hidden md:inline-block">Construído com Next.js & Tailwind</span>
              <div className="flex gap-4 font-medium">
                <a href="LINK_DO_SEU_LINKEDIN" target="_blank" className="hover:text-violet-700 dark:hover:text-violet-400 transition-colors">
                  LinkedIn
                </a>
                <a href="LINK_DO_SEU_GITHUB" target="_blank" className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}