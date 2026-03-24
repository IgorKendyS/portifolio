"use client";

import { 
  Terminal, 
  Code2, 
  Server, 
  Cloud, 
  Database,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";

import { InteractiveTerminal } from "./components/InteractiveTerminal";
import { CacheTester } from "./components/CacheTester";
import { LiveLogs } from "./components/LiveLogs";
import { CICDPipeline } from "./components/CICDPipeline";
import { MetricsDashboard } from "./components/MetricsDashboard";
import { ArchitectureDiagram } from "./components/ArchitectureDiagram";
import { ApiPlayground } from "./components/ApiPlayground";

export default function Home() {
  const scrollVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30">
      <LiveLogs />
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-40 glass border-b border-white/5 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 flex items-center gap-2">
            <Terminal className="text-cyan-400" size={24} />
            ikendy.dev
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#sobre" className="hover:text-cyan-400 transition-colors">Sobre</a>
            <a href="#habilidades" className="hover:text-cyan-400 transition-colors">Habilidades</a>
            <a href="#experiencia" className="hover:text-cyan-400 transition-colors">Experiência</a>
            <a href="#contato" className="hover:text-cyan-400 transition-colors">Contato</a>
          </div>
          <a href="/curriculo.pdf" target="_blank" className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-md hover:bg-cyan-500/20 hover:border-cyan-400 transition-all text-sm font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            Ver Currículo <ExternalLink size={16} />
          </a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 space-y-32">
        
        {/* --- HERO SECTION --- */}
        <motion.section 
          initial="hidden" 
          animate="visible" 
          variants={scrollVariant}
          id="hero" 
          className="flex flex-col md:flex-row items-center justify-between gap-12 mt-12"
        >
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-slate-700/50 text-xs text-cyan-300 font-mono mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Disponível para novos desafios
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Construindo o futuro com <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 animate-gradient-x">
                Sistemas Escaláveis.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
              Olá, eu sou <strong className="text-slate-200">Igor Kendy</strong>. Um  Desenvolvedor Full-Stack focado em Backend, DevOps e Cloud. Crio infraestruturas resilientes e aplicações dinâmicas do servidor ao navegador.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#contato" className="bg-cyan-500 text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-cyan-400 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                Fale Comigo <ChevronRight size={18} />
              </a>
              <a href="https://github.com/IgorKendyS" target="_blank" rel="noreferrer" className="glass hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Github size={20} /> GitHub
              </a>
              <a href="https://linkedin.com/in/IgorKendyS" target="_blank" rel="noreferrer" className="glass hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>
          </div>
        </motion.section>


        {/* --- SOBRE (ABOUT) --- */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollVariant}
          id="sobre" 
          className="scroll-mt-24"
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="text-cyan-400 font-mono text-xl">01.</span> Perfil Profissional
          </h2>
          <div className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-cyan-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-cyan-500/10 transition-colors duration-700"></div>
            <p className="text-lg text-slate-300 leading-relaxed max-w-4xl relative z-10">
              Desenvolvedor Full-Stack com forte foco em backend e experiência prática na criação de APIs escaláveis, automações e integrações. Proficiente em <b className="text-indigo-300">Node.js, Python, Next.js, Vue.js, Docker</b> e bancos de dados relacionais. Sou motivado pela curiosidade técnica e focado em gerar valor de negócio através da tecnologia.
              <br/><br/>
              Busco sempre integrar equipes onde eu possa aplicar e aprimorar minhas habilidades, contribuindo para soluções de alto nível. Estou apto para trabalhos remotos ou híbridos em ambientes inovadores.
            </p>
          </div>
        </motion.section>


        {/* --- HABILIDADES (SKILLS) --- */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollVariant}
          id="habilidades" 
          className="scroll-mt-24"
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="text-cyan-400 font-mono text-xl">02.</span> Habilidades & Tech Stack
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -5 }} className="glass glass-hover rounded-xl p-6 transition-all">
              <Code2 className="text-indigo-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-4">Frontend & Linguagens</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• JS, C, Python</li>
                <li>• React.js & Next.js</li>
                <li>• Vue.js</li>
                <li>• Tailwind CSS & Bootstrap</li>
              </ul>
            </motion.div>
            
            <motion.div whileHover={{ y: -5 }} className="glass glass-hover rounded-xl p-6 transition-all">
              <Server className="text-cyan-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-4">Backend & APIs</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• Node.js & Express</li>
                <li>• Python & Automações</li>
                <li>• Integração de APIs RESTful</li>
                <li>• Cloud Functions / Serverless</li>
              </ul>
            </motion.div>
            
            <motion.div whileHover={{ y: -5 }} className="glass glass-hover rounded-xl p-6 transition-all">
              <Cloud className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-4">Cloud, DevOps & Dados</h3>
              <ul className="space-y-2 text-slate-400">
                <li>• Docker & Kubernetes</li>
                <li>• AWS & Google Cloud</li>
                <li>• MySQL, Postgres, Firebase</li>
                <li>• CI/CD & Linux Shell</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* --- TERMINAL INTERATIVO --- */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollVariant}
          id="terminal" 
          className="scroll-mt-24"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
             <span className="text-cyan-400 font-mono text-xl">03.</span> Ambiente Interativo (Terminal)
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl text-lg">
            Prove a minha skill de Cloud / DevOps na prática. Digite <code className="text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded text-sm font-semibold">help</code> para explorar minha stack simulando comandos UNIX reativos no seu navegador. Experimente <code className="text-cyan-400">ls</code>, <code className="text-cyan-400">cd projects</code> e <code className="text-cyan-400">cat k8s-cluster.yml</code>.
          </p>
          <InteractiveTerminal />
        </motion.section>

        {/* --- CACHE TESTER --- */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollVariant}
          id="benchmarks" 
          className="scroll-mt-24"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
             <span className="text-cyan-400 font-mono text-xl">04.</span> Performance & Caching
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl text-lg">
            Arquitetar código é mais do que escrever lógica. A otimização de consultas e escalabilidade determinam a vida útil de uma aplicação de alto volume. Faça o teste de requisição simulado abaixo:
          </p>
          <CacheTester />
        </motion.section>

        {/* --- ARCHITECTURE DIAGRAM --- */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollVariant}
          id="arquitetura" 
          className="scroll-mt-24"
        >
          <ArchitectureDiagram />
        </motion.section>

        {/* --- CI/CD PIPELINE --- */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollVariant}
          id="cicd" 
          className="scroll-mt-24"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
             <span className="text-cyan-400 font-mono text-xl">06.</span> Pipeline de Automação (CI/CD)
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl text-lg">
            Automatizar o processo de deploy reduz falhas operacionais e garante agilidade. Este é um simulador interativo de uma pipeline GitHub Actions implantando nossa aplicação num ambiente Kubernetes.
          </p>
          <CICDPipeline />
        </motion.section>

        {/* --- METRICS DASHBOARD --- */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollVariant}
          id="grafana" 
          className="scroll-mt-24"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
             <span className="text-cyan-400 font-mono text-xl">07.</span> Telemetria & Observabilidade
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl text-lg">
            Sistemas distribuídos exigem monitoramento contínuo para evitar gargalos em produção. Este simulador no formato Grafana monitora o uso de recursos dos pods na nossa infraestrutura simulada em tempo real.
          </p>
          <MetricsDashboard />
        </motion.section>

        {/* --- API PLAYGROUND --- */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollVariant}
          id="api-sandbox" 
          className="scroll-mt-24"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
             <span className="text-cyan-400 font-mono text-xl">08.</span> Teste de API (Sandbox)
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl text-lg">
            Um dos pilares de um Backend Engineer é projetar APIs seguras e autodescritivas. Este simulador interativo inspirado no Postman / Swagger permite testar envios de JSON para meus endpoints mockados, lidando com autenticações, status codes e latência de rede em tempo real.
          </p>
          <ApiPlayground />
        </motion.section>


        {/* --- EXPERIÊNCIA (EXPERIENCE) --- */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollVariant}
          id="experiencia" 
          className="scroll-mt-24"
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="text-cyan-400 font-mono text-xl">09.</span> Experiência Profissional
          </h2>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-cyan-600/50 before:to-transparent">
            
            {/* XP 1 */}
            <motion.div 
               initial={{ opacity: 0, x: -50 }} 
               whileInView={{ opacity: 1, x: 0 }} 
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] transition duration-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Briefcase size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-xl relative border-cyan-500/30 transition-colors shadow-lg">
                <div className="flex flex-col mb-2">
                  <span className="text-sm text-cyan-400 font-mono mb-1">Novembro 2024 - Atual</span>
                  <h3 className="text-xl font-bold text-white">Desenvolvedor</h3>
                  <span className="text-slate-400">Responza</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Configuração e manutenção de servidores Kubernetes e arquiteturas baseadas em Serverless Functions. Atuando diretamente no scale do produto e governança na nuvem.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-800 text-xs rounded text-slate-300">Kubernetes</span>
                  <span className="px-2 py-1 bg-slate-800 text-xs rounded text-slate-300">Serverless</span>
                  <span className="px-2 py-1 bg-slate-800 text-xs rounded text-slate-300">Cloud</span>
                </div>
              </div>
            </motion.div>

            {/* XP 2 */}
            <motion.div 
               initial={{ opacity: 0, x: 50 }} 
               whileInView={{ opacity: 1, x: 0 }} 
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.5, delay: 0.4 }}
               className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 text-slate-400 group-hover:text-indigo-400 group-hover:border-indigo-400 transition duration-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Briefcase size={18} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass p-6 rounded-xl relative group-hover:border-indigo-500/30 transition-colors">
                <div className="flex flex-col mb-2">
                  <span className="text-sm text-indigo-400 font-mono mb-1">Janeiro 2023 - Novembro 2024</span>
                  <h3 className="text-xl font-bold text-white">Desenvolvedor</h3>
                  <span className="text-slate-400">JEM Digital</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Criação de sistemas para gestão de tráfego pago, manutenção de sites PHP e WordPress. Desenvolvimento e integração de automações construindo bots em Python voltados para automação de tarefas diárias.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-800 text-xs rounded text-slate-300">Python</span>
                  <span className="px-2 py-1 bg-slate-800 text-xs rounded text-slate-300">PHP</span>
                  <span className="px-2 py-1 bg-slate-800 text-xs rounded text-slate-300">Automação (Bots)</span>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.section>


        {/* --- FORMAÇÃO E CURSOS --- */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollVariant}
          id="formacao" 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 scroll-mt-24"
        >
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-cyan-400 font-mono text-xl">10.</span> Academia
            </h2>
            <div className="glass p-6 rounded-xl h-full transition-transform hover:-translate-y-2 duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-800 rounded-lg text-purple-400">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Engenharia de Computação</h3>
                  <p className="text-slate-400 text-sm">IFSP - Campus Birigui (2018 - 2026)</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm">Cursando o 10º semestre com base forte em computação, algoritmos, estrutura de dados e matemática.</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-transparent">.</span> Certificações
            </h2>
            <div className="glass p-6 rounded-xl h-full flex flex-col justify-center gap-4 transition-transform hover:-translate-y-2 duration-300">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                <p className="text-slate-300 font-medium">AWS - Amazon Web Services <span className="text-slate-500 text-sm">(SENAI)</span></p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]"></div>
                <p className="text-slate-300 font-medium">Microsoft AI-900 <span className="text-slate-500 text-sm">(SENAI)</span></p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></div>
                <p className="text-slate-300 font-medium">Google Cloud <span className="text-slate-500 text-sm">(SENAI)</span></p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* --- CONTATO --- */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollVariant}
          id="contato" 
          className="py-20 text-center max-w-2xl mx-auto scroll-mt-24"
        >
          <h2 className="text-4xl font-bold mb-4">Pronto para o Próximo Nível?</h2>
          <p className="text-slate-400 mb-8">
            Minha caixa de entrada está sempre aberta. Seja para uma oportunidade profissional de trabalho ou somente para trocar uma ideia técnica.
          </p>
          <a href="mailto:igkendy.s@gmail.com" className="inline-flex space-x-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(56,189,248,0.2)]">
            <Mail size={24} />
            <span>Me envie um E-mail</span>
          </a>
        </motion.section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/5 py-8 text-center text-slate-500 text-sm">
        <p>Desenvolvido por Igor Kendy Sakaguchi © {new Date().getFullYear()}</p>
        <p className="mt-1 flex items-center justify-center gap-1">
          Feito com <Code2 size={14} className="text-cyan-400"/> usando Next.js, Framer Motion & Tailwind
        </p>
      </footer>

    </div>
  );
}
