"use client";

import { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Merriweather } from 'next/font/google';

// Configurando a fonte clássica
const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Home() {
  const [montado, setMontado] = useState(false);
  const [idioma, setIdioma] = useState<"PT" | "EN">("PT");

  useEffect(() => {
    setTimeout(() => setMontado(true), 0);
  }, []);

  const alternarIdioma = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIdioma(idioma === "PT" ? "EN" : "PT");
  };

  if (!montado) return <div className="min-h-screen bg-stone-900" />;

  return (
    // A classe da fonte agora domina todo o contêiner sem ser sobrescrita
    <main className={`min-h-screen bg-[#2c1b12] bg-[linear-gradient(90deg,#22140d_0%,#362217_50%,#22140d_100%)] flex items-center justify-center p-4 relative overflow-hidden text-stone-900 select-none ${merriweather.className}`}>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div 
        onClick={alternarIdioma}
        className="absolute top-8 right-12 w-32 h-12 bg-gradient-to-b from-[#8b5a3e] to-[#5c331f] border border-[#3a1d0f] rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer hover:brightness-110 transition-all z-20 group"
        title={idioma === "PT" ? "Switch to English" : "Mudar para Português"}
      >
        <div className="w-[90%] h-[80%] border border-[#c68e58]/50 flex items-center justify-center">
          <span className="text-[#f4ecc2] font-bold tracking-widest text-sm drop-shadow-md group-hover:text-white transition-colors">
            {idioma === "PT" ? "PORTUGUÊS" : "ENGLISH"}
          </span>
        </div>
      </div>

      {/* ELEMENTOS DECORATIVOS DA MESA */}
      <div className="absolute top-20 left-24 w-24 h-28 bg-[#fdfbf7] rounded-sm shadow-xl -rotate-[15deg] p-2 flex flex-col pointer-events-none opacity-80">
        <div className="flex-1 bg-stone-800 w-full mb-2"></div>
      </div>
      
      <div className="absolute bottom-20 right-[25%] w-24 h-28 bg-[#fdfbf7] rounded-sm shadow-2xl rotate-[10deg] p-2 flex flex-col pointer-events-none opacity-90 z-0">
        <div className="flex-1 bg-stone-700 w-full mb-2"></div>
      </div>

      <div className="absolute top-1/3 left-12 w-32 h-48 bg-[#0f0a08] rounded-sm shadow-2xl rotate-6 border-l-4 border-black opacity-80 pointer-events-none"></div>

      <div className="absolute top-12 right-64 w-48 h-64 bg-[#1a2f23] rounded-sm shadow-2xl rotate-12 border-l-8 border-[#0f1f15] opacity-80 pointer-events-none">
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
      </div>

      <div className="absolute bottom-32 left-24 w-20 h-20 rounded-full border-[3px] border-[#1a0f0a]/40 opacity-50 pointer-events-none mix-blend-multiply"></div>
      <div className="absolute bottom-34 left-26 w-16 h-16 rounded-full border border-[#1a0f0a]/30 opacity-30 pointer-events-none mix-blend-multiply"></div>
      
      <div className="absolute bottom-12 left-[30%] flex items-center gap-1 -rotate-12 pointer-events-none opacity-60 mix-blend-multiply">
        <div className="w-12 h-12 rounded-full border-[3px] border-amber-900 shadow-sm"></div>
        <div className="w-4 h-1 bg-amber-900 -mt-2"></div>
        <div className="w-12 h-12 rounded-full border-[3px] border-amber-900 shadow-sm"></div>
      </div>
      
      <div className="absolute bottom-12 right-12 w-40 h-52 bg-[#f4ecc2] rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.6)] -rotate-6 opacity-90 pointer-events-none flex flex-col gap-3 p-5">
        <div className="w-full h-1 bg-stone-400/50 rounded-full"></div>
        <div className="w-3/4 h-1 bg-stone-400/50 rounded-full"></div>
      </div>
      <div className="absolute bottom-28 right-24 w-40 h-2 bg-gradient-to-b from-stone-800 to-black rounded-full shadow-[2px_5px_5px_rgba(0,0,0,0.5)] -rotate-12 pointer-events-none z-10">
        <div className="absolute top-0 -left-3 w-3 h-2 bg-stone-300 rounded-l-full"></div>
      </div>

      {/* WRAPPER DO LIVRO PRINCIPAL */}
      <div className="relative z-10 flex justify-center w-[900px]">
        {/* @ts-expect-error - Ignorando tipagem antiga da biblioteca */}
        <HTMLFlipBook 
          width={450} 
          height={600} 
          size="fixed"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          showCover={true}
          usePortrait={false}
          flippingTime={1000}
          style={{ backgroundColor: 'transparent' }}
          className="drop-shadow-2xl"
        >
          {/* PÁG 1: Capa */}
          <div className="bg-gradient-to-br from-[#7a4c33] via-[#8b5a3e] to-[#5c331f] border-l-[12px] border-[#3a1d0f] shadow-[-10px_10px_30px_rgba(0,0,0,0.8)] relative overflow-hidden rounded-r-md">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-30 mix-blend-multiply pointer-events-none"></div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[#2a0c0c] tracking-widest drop-shadow-sm mb-4">PORTFÓLIO</h1>
              <div className="w-full h-1 bg-[#2a0c0c]/80 mb-6 rounded-full shadow-sm"></div>
              <p className="text-lg text-[#2a0c0c] font-bold tracking-wide drop-shadow-sm">Feito por Davi Cagnato Pinto</p>
            </div>
          </div>

          {/* PÁG 2: Verso da Capa */}
          <div className="bg-[#5c331f] border-r-8 border-[#3a1d0f] shadow-[inset_15px_0_30px_rgba(0,0,0,0.8)] rounded-l-md relative h-full">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20 mix-blend-multiply pointer-events-none"></div>
          </div>

          {/* PÁG 3: Sobre o Autor */}
          <div className="bg-[#f4ecc2] p-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] relative border-l border-black/5 h-full">
            <h2 className="text-3xl font-bold text-[#4a1c1c] mb-6 border-b-2 border-dotted border-[#4a1c1c]/30 pb-2">
              {idioma === "PT" ? "Sobre o Autor" : "About the Author"}
            </h2>
            <div className="w-32 h-32 bg-stone-300 rounded-full mb-6 float-right ml-4 border-4 border-[#8b5a3e]/20 shadow-md"></div>
            <p className="text-stone-800 leading-relaxed text-sm text-justify">
              {idioma === "PT" 
                ? "Desenvolvedor Full-stack apaixonado por aprender. Utilizo a tecnologia para resolver problemas e dar vida a ideias, sejam elas profissionais ou hobbies. Minha jornada mistura lógica profunda com interfaces intuitivas." 
                : "Full-stack Developer passionate about learning. I use technology to solve problems and bring ideas to life, whether professional or personal hobbies. My journey blends deep logic with intuitive interfaces."}
            </p>
            <span className="absolute bottom-6 right-6 text-stone-400 text-sm">1</span>
          </div>

          {/* PÁG 4: Habilidades */}
          <div className="bg-[#f4ecc2] p-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] relative border-r border-black/5 h-full">
            <h2 className="text-3xl font-bold text-[#4a1c1c] mb-6 border-b-2 border-dotted border-[#4a1c1c]/30 pb-2">
              {idioma === "PT" ? "Arsenal Técnico" : "Technical Arsenal"}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-stone-800 text-base">{idioma === "PT" ? "Linguagens" : "Languages"}</h3>
                <p className="text-stone-600 text-sm mt-1">Python, JavaScript, TypeScript, Java, Kotlin.</p>
              </div>
              <div>
                <h3 className="font-bold text-stone-800 text-base">{idioma === "PT" ? "Ferramentas & Dados" : "Tools & Data"}</h3>
                <p className="text-stone-600 text-sm mt-1">SQL, Scikit-Learn, Git, Arduino.</p>
              </div>
              <div>
                <h3 className="font-bold text-stone-800 text-base">Web & UI</h3>
                <p className="text-stone-600 text-sm mt-1">React, Next.js, Tailwind CSS, UI/UX Design.</p>
              </div>
            </div>
            <span className="absolute bottom-6 left-6 text-stone-400 text-sm">2</span>
          </div>

          {/* PÁG 5: Índice */}
          <div className="bg-[#f4ecc2] p-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] relative border-l border-black/5 h-full">
            <h2 className="text-3xl font-bold text-[#4a1c1c] mb-8 border-b-2 border-dotted border-[#4a1c1c]/30 pb-2">
              {idioma === "PT" ? "Índice de Obras" : "Table of Contents"}
            </h2>
            <ul className="space-y-4 text-sm text-stone-800">
              <li className="flex justify-between border-b border-stone-300/50 pb-1 cursor-pointer hover:text-[#c0392b]">
                <span className="font-bold">I. PredictiveGuard</span><span className="text-stone-500">Pág 7</span>
              </li>
              <li className="flex justify-between border-b border-stone-300/50 pb-1 cursor-pointer hover:text-[#c0392b]">
                <span className="font-bold">II. BitSocial</span><span className="text-stone-500">Pág 9</span>
              </li>
              <li className="flex justify-between border-b border-stone-300/50 pb-1 cursor-pointer hover:text-[#c0392b]">
                <span className="font-bold">III. Guia de Vôlei</span><span className="text-stone-500">Pág 11</span>
              </li>
              <li className="flex justify-between border-b border-stone-300/50 pb-1 cursor-pointer hover:text-[#c0392b]">
                <span className="font-bold">IV. Matchup Score</span><span className="text-stone-500">Pág 13</span>
              </li>
              <li className="flex justify-between border-b border-stone-300/50 pb-1 cursor-pointer hover:text-[#c0392b]">
                <span className="font-bold">V. Jogo de Ritmo</span><span className="text-stone-500">Pág 15</span>
              </li>
            </ul>
            <span className="absolute bottom-6 right-6 text-stone-400 text-sm">3</span>
          </div>

          {/* PÁG 6: Proj 1 (Imagem) */}
          <div className="bg-[#f4ecc2] p-8 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] relative border-r border-black/5 h-full flex flex-col items-center justify-center">
            <div className="w-full h-64 bg-stone-300 rounded-md border-4 border-white shadow-md flex items-center justify-center">
              <span className="text-stone-500 text-sm">[Print PredictiveGuard]</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-[#4a1c1c] text-[#f4ecc2] text-[10px] rounded-full uppercase tracking-wider">Python</span>
              <span className="px-3 py-1 bg-[#4a1c1c] text-[#f4ecc2] text-[10px] rounded-full uppercase tracking-wider">Scikit-Learn</span>
            </div>
            <span className="absolute bottom-6 left-6 text-stone-400 text-sm">4</span>
          </div>

          {/* PÁG 7: Proj 1 (Texto) */}
          <div className="bg-[#f4ecc2] p-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] relative border-l border-black/5 h-full">
            <h2 className="text-3xl font-bold text-[#4a1c1c] mb-4">PredictiveGuard</h2>
            <p className="text-stone-800 leading-relaxed text-sm text-justify">
              {idioma === "PT" ? "Modelo de Machine Learning desenvolvido para simular e prever falhas em maquinário industrial, gerando alertas preditivos para evitar paradas não planejadas." : "Machine Learning model developed to simulate and predict industrial machinery failures, generating predictive alerts to prevent unplanned downtime."}
            </p>
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-2 bg-[#4a1c1c] text-white rounded hover:bg-[#3a1d0f] transition-colors text-sm">{idioma === "PT" ? "Ver Código" : "View Code"}</button>
            </div>
            <span className="absolute bottom-6 right-6 text-stone-400 text-sm">5</span>
          </div>

          {/* PÁG 8: Proj 2 (Imagem) */}
          <div className="bg-[#f4ecc2] p-8 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] relative border-r border-black/5 h-full flex flex-col items-center justify-center">
            <div className="w-full h-64 bg-stone-300 rounded-md border-4 border-white shadow-md flex items-center justify-center">
              <span className="text-stone-500 text-sm">[Print BitSocial]</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-[#4a1c1c] text-[#f4ecc2] text-[10px] rounded-full uppercase tracking-wider">Python</span>
              <span className="px-3 py-1 bg-[#4a1c1c] text-[#f4ecc2] text-[10px] rounded-full uppercase tracking-wider">SQL</span>
            </div>
            <span className="absolute bottom-6 left-6 text-stone-400 text-sm">6</span>
          </div>

          {/* PÁG 9: Proj 2 (Texto) */}
          <div className="bg-[#f4ecc2] p-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] relative border-l border-black/5 h-full">
            <h2 className="text-3xl font-bold text-[#4a1c1c] mb-4">BitSocial</h2>
            <p className="text-stone-800 leading-relaxed text-sm text-justify">
              {idioma === "PT" ? "Rede social voltada para devs, criada como um local descontraído para interagir, compartilhar ideias e relaxar fora do circuito puramente corporativo." : "Social network aimed at devs, created as a relaxed place to interact, share ideas, and unwind outside the corporate circuit."}
            </p>
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-2 bg-[#4a1c1c] text-white rounded hover:bg-[#3a1d0f] text-sm">{idioma === "PT" ? "Ver Projeto" : "View Project"}</button>
            </div>
            <span className="absolute bottom-6 right-6 text-stone-400 text-sm">7</span>
          </div>

          {/* PÁG 10: Proj 3 (Imagem) */}
          <div className="bg-[#f4ecc2] p-8 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] relative border-r border-black/5 h-full flex flex-col items-center justify-center">
             <div className="w-full h-64 bg-stone-300 rounded-md border-4 border-white shadow-md flex items-center justify-center">
              <span className="text-stone-500 text-sm">[Print Vôlei]</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-[#4a1c1c] text-[#f4ecc2] text-[10px] rounded-full uppercase tracking-wider">JavaScript</span>
            </div>
            <span className="absolute bottom-6 left-6 text-stone-400 text-sm">8</span>
          </div>

          {/* PÁG 11: Proj 3 (Texto) */}
          <div className="bg-[#f4ecc2] p-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] relative border-l border-black/5 h-full">
            <h2 className="text-3xl font-bold text-[#4a1c1c] mb-4">Guia de Vôlei</h2>
            <p className="text-stone-800 leading-relaxed text-sm text-justify">
              {idioma === "PT" ? "Transforma regras e táticas complexas de voleibol em uma experiência visual, interativa e responsiva." : "Transforms complex volleyball rules and tactics into a visual, interactive, and highly responsive experience."}
            </p>
            <span className="absolute bottom-6 right-6 text-stone-400 text-sm">9</span>
          </div>

          {/* PÁG 12: Proj 4 (Imagem) */}
          <div className="bg-[#f4ecc2] p-8 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] relative border-r border-black/5 h-full flex flex-col items-center justify-center">
            <div className="w-full h-64 bg-stone-300 rounded-md border-4 border-white shadow-md flex items-center justify-center"><span className="text-stone-500 text-sm">[Matchup]</span></div>
            <span className="absolute bottom-6 left-6 text-stone-400 text-sm">10</span>
          </div>

          {/* PÁG 13: Proj 4 (Texto) */}
          <div className="bg-[#f4ecc2] p-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] relative border-l border-black/5 h-full">
            <h2 className="text-3xl font-bold text-[#4a1c1c] mb-4">Matchup Score</h2>
            <p className="text-stone-800 text-sm text-justify">
              {idioma === "PT" ? "Plataforma para reserva de quadras e criação de eventos esportivos inspirada no sistema de lobbies." : "Platform for booking courts and creating sports events inspired by game lobby systems."}
            </p>
            <span className="absolute bottom-6 right-6 text-stone-400 text-sm">11</span>
          </div>

          {/* PÁG 14: Proj 5 (Imagem) */}
          <div className="bg-[#f4ecc2] p-8 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] relative border-r border-black/5 h-full flex flex-col items-center justify-center">
            <div className="w-full h-64 bg-stone-300 rounded-md border-4 border-white shadow-md flex items-center justify-center"><span className="text-stone-500 text-sm">[Ritmo]</span></div>
            <span className="absolute bottom-6 left-6 text-stone-400 text-sm">12</span>
          </div>

          {/* PÁG 15: Proj 5 (Texto) */}
          <div className="bg-[#f4ecc2] p-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] relative border-l border-black/5 h-full">
            <h2 className="text-3xl font-bold text-[#4a1c1c] mb-4">Jogo de Ritmo</h2>
            <p className="text-stone-800 text-sm text-justify">
              {idioma === "PT" ? "Jogo de ritmo em Java com suporte a guitarra física (Arduino)." : "Rhythm game in Java with physical guitar support via Arduino."}
            </p>
            <span className="absolute bottom-6 right-6 text-stone-400 text-sm">13</span>
          </div>

          {/* PÁG 16: Contato */}
          <div className="bg-[#f4ecc2] p-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.1)] relative border-r border-black/5 h-full flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-[#4a1c1c] mb-6">{idioma === "PT" ? "Contato" : "Contact"}</h2>
            <p className="text-stone-700">email@exemplo.com</p>
            <span className="absolute bottom-6 left-6 text-stone-400 text-sm">14</span>
          </div>

          {/* PÁG 17: Contracapa interna */}
          <div className="bg-[#5c331f] border-l-8 border-[#3a1d0f] shadow-[inset_-15px_0_30px_rgba(0,0,0,0.8)] rounded-r-md relative h-full">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20 mix-blend-multiply pointer-events-none"></div>
          </div>

          {/* PÁG 18: Contracapa Externa */}
          <div className="bg-[#5c331f] border-r-8 border-[#3a1d0f] shadow-[-10px_10px_30px_rgba(0,0,0,0.8)] rounded-l-md relative h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-30 mix-blend-multiply pointer-events-none"></div>
            <div className="w-16 h-16 border-2 border-[#3a1d0f] rounded-full opacity-30"></div>
          </div>

        </HTMLFlipBook>
      </div>

      {/* Versão Mobile */}
      <div className="md:hidden text-stone-300 text-center px-6 z-10">
        <p className="text-xl border-b border-stone-600 pb-2 mb-2 font-bold">Atenção</p>
        <p>A experiência imersiva deste tomo requer uma tela mais ampla.</p>
      </div>
    </main>
  );
}