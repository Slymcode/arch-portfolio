"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HTMLFlipBook from "react-pageflip";
import {
  Compass,
  Ruler,
  Layers,
  Mail,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  X,
  Building2,
  Briefcase,
  Award,
  Maximize2,
  ShieldCheck,
  Zap,
  Maximize,
  Phone,
} from "lucide-react";

/* ======================
    1. ARCHITECTURAL GRID BACKGROUND
   ====================== */
const ArchitecturalBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#020202]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:200px_200px] opacity-50" />
      <Compass className="absolute top-[10%] left-[5%] text-cyan-500/10 w-24 h-24 md:w-48 md:h-48 rotate-12 stroke-[0.5px]" />
      <Ruler className="absolute bottom-[10%] right-[5%] text-cyan-500/10 w-32 h-32 md:w-64 md:h-64 -rotate-12 stroke-[0.5px]" />
      <Layers className="absolute top-[40%] right-[10%] text-cyan-500/5 w-16 h-16 md:w-32 md:h-32 stroke-[0.5px]" />
      <motion.div
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent z-10 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
      />
    </div>
  );
};

/* ======================
    2. PROJECT INSPECTION MODAL
   ====================== */
const ProjectInspectionModal = ({
  project,
  onClose,
}: {
  project: any | null;
  onClose: () => void;
}) => {
  const [currentImg, setCurrentImg] = useState(0);

  if (!project) return null;

  const nextImg = () =>
    setCurrentImg((prev) => (prev + 1) % project.images.length);
  const prevImg = () =>
    setCurrentImg(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 md:top-6 md:right-6 z-[120] text-white/50 hover:text-cyan-400 transition-colors bg-black/50 p-2 rounded-full border border-white/10"
          >
            <X size={24} className="md:w-8 md:h-8" />
          </button>

          {/* Left: Image Slider */}
          <div className="relative w-full md:w-[70%] h-[40vh] md:h-full bg-black flex items-center justify-center overflow-hidden group shrink-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImg}
                src={project.images[currentImg]}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="w-full h-full object-cover opacity-80"
              />
            </AnimatePresence>

            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 pointer-events-none">
              <div className="text-cyan-500 font-mono text-[8px] md:text-[10px] mb-2 uppercase tracking-[0.3em]">
                Frame_Capture // 00{currentImg + 1}
              </div>
              <div className="h-px w-20 md:w-32 bg-cyan-500/50" />
            </div>

            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              <button
                onClick={prevImg}
                className="p-2 md:p-4 bg-black/40 border border-white/10 text-white backdrop-blur-md"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImg}
                className="p-2 md:p-4 bg-black/40 border border-white/10 text-white backdrop-blur-md"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Right: Project Details Panel */}
          <div className="w-full md:w-[30%] h-auto md:h-full border-t md:border-t-0 md:border-l border-white/10 bg-[#050505] p-6 md:p-12 flex flex-col justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 text-cyan-600 font-mono text-[10px] mb-4 md:mb-6 tracking-widest uppercase">
                <Zap size={12} /> Project_Blueprint
              </div>
              <h2 className="text-3xl md:text-6xl font-black italic uppercase text-white leading-none mb-4 md:mb-6 tracking-tighter">
                {project.title.split(" ")[0]}
                <br />
                <span className="text-cyan-500">
                  {project.title.split(" ").slice(1).join(" ")}
                </span>
              </h2>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 md:mb-10 font-light">
                {project.longDesc}
              </p>

              <div className="space-y-4 md:space-y-6 border-t border-white/5 pt-6 md:pt-8">
                {project.specs.map((spec: any, i: number) => (
                  <div key={i} className="flex justify-between items-end">
                    <span className="text-[9px] font-mono text-gray-500 uppercase">
                      {spec.label}
                    </span>
                    <span className="text-[9px] font-bold text-white uppercase tracking-tight border-b border-cyan-900">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <button className="w-full bg-cyan-600 text-black font-black uppercase py-4 text-[9px] tracking-[0.2em] hover:bg-white transition-all">
                Download Technical PDF
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ======================
    3. CONTACT & ABOUT MODALS
   ====================== */
const ContactModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-[#0a0a0a] border border-cyan-500/30 p-6 md:p-8 w-full max-w-md relative shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl md:text-3xl font-black uppercase italic text-white mb-6">
            Contact Me
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-black/50 border border-white/10 p-3 text-sm focus:border-cyan-500 outline-none transition-all"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-black/50 border border-white/10 p-3 text-sm focus:border-cyan-500 outline-none transition-all"
            />
            <textarea
              placeholder="Your Message"
              rows={3}
              className="w-full bg-black/50 border border-white/10 p-3 text-sm focus:border-cyan-500 outline-none transition-all"
            />
            <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-4 uppercase tracking-[0.2em] text-xs transition-all">
              Send Inquiry
            </button>
          </form>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const AboutModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 backdrop-blur-md bg-black/80">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="bg-[#050505] border-l-4 border-cyan-500 p-6 md:p-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white"
          >
            <X size={24} />
          </button>
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center gap-4">
              <Building2 className="text-cyan-500" size={28} />
              <h2 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter text-white">
                Profile
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed font-light text-sm md:text-lg">
              Henry Uzoma is a visionary{" "}
              <span className="text-white">Architectural Technologist,</span>{" "}
              detail-oriented Architect and Interior Designer with over 5 years
              of experience in architectural design, interior space planning,
              and building construction. Highly skilled in AutoCAD, Revit, and
              3D visualization, delivering functional, aesthetically refined,
              and buildable design solutions. Experienced across all project
              phases including design development, site supervision, and project
              coordination. Adept at working in fast-paced, team-oriented, and
              remote design environments with strong attention to quality,
              safety, and industry standards.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-500 font-bold uppercase tracking-widest text-[9px]">
                  <Briefcase size={12} /> Core Experience
                </div>
                <ul className="space-y-2 text-[10px] text-gray-400 font-mono uppercase">
                  <li>• High-Rise Structural BIM</li>
                  <li>• Parametric Facade Engineering</li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-500 font-bold uppercase tracking-widest text-[9px]">
                  <Award size={12} /> Accreditations
                </div>
                <ul className="space-y-2 text-[10px] text-gray-400 font-mono uppercase">
                  <li>• LEED Certified</li>
                  <li>• AIA Associate</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

/* ======================
    4. MAIN PORTFOLIO COMPONENT
   ====================== */
export default function Portfolio() {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const totalPages = 10;
  const isMobile = viewport.width < 768;

  useEffect(() => {
    const update = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    const timer = setTimeout(() => bookRef.current?.pageFlip().flip(1), 1800);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(timer);
    };
  }, []);

  // Responsively scale the book based on viewport
  const PAGE_WIDTH = isMobile
    ? Math.min(viewport.width * 0.88, 380)
    : Math.min(viewport.width * 0.42, 520);

  const PAGE_HEIGHT = isMobile
    ? Math.min(viewport.height * 0.7, 580)
    : viewport.height * 0.85;

  const getXOffset = () => {
    if (isMobile) return 0;
    if (currentPage === 0) return -(PAGE_WIDTH / 2);
    if (currentPage === totalPages - 1) return PAGE_WIDTH / 2;
    return 0;
  };

  const projects = [
    {
      title: "Hotel 3D",
      image: "/img/hotel1/model2.jpg",
      images: ["/img/hotel1/model2.jpg", "/img/hotel1/model1.jpg"],
      desc: "Modern hotel project exploring load-bearing glass structures.",
      longDesc:
        "This project explores the limits of load-bearing glass structures. By utilizing a hybrid steel-tension system, we achieved a 40-story verticality.",
      specs: [
        { label: "Location", value: "Chicago, IL" },
        { label: "Status", value: "Built // 2024" },
        { label: "Tech", value: "Rhino / Karamba3D" },
      ],
    },
    {
      title: "Urban Hotel",
      image: "/img/hotel2/model.jpg",
      images: ["/img/hotel2/model.jpg"],
      desc: "Urban context integration and modular design.",
      longDesc:
        "A study in urban density and hospitality functionality within constrained site parameters.",
      specs: [
        { label: "Location", value: "Chicago, IL" },
        { label: "Status", value: "Built // 2024" },
        { label: "Tech", value: "Rhino" },
      ],
    },
    {
      title: "Bungalow",
      image: "/img/residential/5 bedroom bungalow/a.jpg",
      images: [
        "/img/residential/5 bedroom bungalow/a.jpg",
        "/img/residential/5 bedroom bungalow/b.jpg",
      ],
      desc: "Exploring raw concrete textures and modern residential forms.",
      longDesc:
        "A re-interpretation of modernism focused on thermal mass efficiency and sculptural exposed concrete.",
      specs: [
        { label: "Location", value: "Berlin, DE" },
        { label: "Area", value: "12,400 m²" },
        { label: "Tech", value: "Revit" },
      ],
    },
    {
      title: "Duplex",
      image: "/img/residential/5bdr duplex/a.jpg",
      images: [
        "/img/residential/5bdr duplex/a.jpg",
        "/img/residential/5bdr duplex/b.jpg",
        "/img/residential/5bdr duplex/c.jpg",
        "/img/residential/5bdr duplex/d.jpg",
      ],
      desc: "Parametric steel frameworks for residential use.",
      longDesc:
        "Integrating native flora within a generative structural mesh, functioning as an urban lung.",
      specs: [
        { label: "Location", value: "Lagos, NG" },
        { label: "Rating", value: "LEED Platinum" },
        { label: "Tech", value: "Grasshopper" },
      ],
    },
    {
      title: "Duplex",
      image: "/img/residential/6 bedroom duplex/a.jpg",
      images: [
        "/img/residential/6 bedroom duplex/a.jpg",
        "/img/residential/6 bedroom duplex/b.jpg",
      ],
      desc: "Parametric steel frameworks.",
      longDesc: "Integrating native flora within a generative structural mesh.",
      specs: [
        { label: "Location", value: "Lagos, NG" },
        { label: "Status", value: "Competition Winner" },
        { label: "Tech", value: "Grasshopper" },
      ],
    },
    {
      title: "Duplex Design",
      image: "/img/residential/duplex design/a.jpg",
      images: [
        "/img/residential/duplex design/a.jpg",
        "/img/residential/duplex design/b.jpg",
      ],
      desc: "Advanced residential spatial planning.",
      longDesc:
        "Focusing on natural ventilation and light penetration in high-density tropical climates.",
      specs: [
        { label: "Location", value: "Lagos, NG" },
        { label: "Tech", value: "Ladybug" },
      ],
    },
    {
      title: "Interior",
      image: "/img/interior/a.jpg",
      images: [
        "/img/interior/a.jpg",
        "/img/interior/b.jpg",
        "/img/interior/c.jpg",
      ],
      desc: "Minimalist interior rendering and material study.",
      longDesc:
        "Bespoke interior solutions combining sustainable timber and industrial steel elements.",
      specs: [
        { label: "Style", value: "Modern Minimalist" },
        { label: "Software", value: "3ds Max / V-Ray" },
      ],
    },
  ];

  const ProfilePage = () => (
    <div className="w-full h-full bg-[#050505] p-6 md:p-10 flex flex-col border-r border-cyan-500/20 relative">
      <div className="absolute top-0 right-0 w-12 h-12 md:w-24 md:h-24 border-t border-r border-cyan-500/10" />
      <div className="absolute bottom-0 left-0 w-12 h-12 md:w-24 md:h-24 border-b border-l border-cyan-500/10" />
      <div className="flex-grow flex flex-col justify-between">
        <header className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[8px] font-mono text-cyan-600 block uppercase tracking-tighter">
              Personnel_File // 001
            </span>
            <div className="h-px w-8 md:w-12 bg-cyan-500" />
          </div>
          <Maximize2 size={14} className="text-cyan-900" />
        </header>
        <div className="space-y-6 md:space-y-10">
          <div className="relative inline-block">
            <div className="relative z-10 border border-white/5 p-1 bg-gradient-to-br from-white/10 to-transparent">
              <img
                src="/img/profile.png"
                alt="Henry"
                className="w-24 h-24 md:w-44 md:h-44 object-cover grayscale brightness-75 contrast-125"
              />
            </div>
          </div>
          <div>
            <h1 className="text-4xl md:text-7xl font-black tracking-[-0.05em] uppercase leading-[0.8]">
              HENRY
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-700">
                UZOMA
              </span>
            </h1>
            <p className="mt-4 text-[9px] font-mono tracking-[0.2em] md:tracking-[0.4em] text-cyan-500 uppercase flex items-center gap-2">
              <span className="w-4 md:w-8 h-px bg-cyan-500/30" /> Architectural
              Technologist
            </p>
          </div>
        </div>
        <footer className="pt-6 border-t border-white/5 flex justify-between items-end">
          <span className="block font-mono text-[7px] text-gray-600 uppercase">
            Auth_Token: Verified_2025
          </span>
          <div className="text-right font-mono text-[8px] text-gray-500 uppercase">
            01 / REF: REV_A
          </div>
        </footer>
      </div>
    </div>
  );

  return (
    <main className="fixed inset-0 w-full h-full bg-[#020202] text-white flex items-center justify-center overflow-hidden">
      <ArchitecturalBackground />
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <ProjectInspectionModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <motion.div
        animate={{ x: getXOffset() }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
        className="relative z-20"
      >
        {viewport.width > 0 && (
          <HTMLFlipBook
            ref={bookRef}
            width={PAGE_WIDTH}
            height={PAGE_HEIGHT}
            size="fixed"
            minWidth={280}
            maxWidth={PAGE_WIDTH}
            minHeight={400}
            maxHeight={PAGE_HEIGHT}
            showCover={true}
            onFlip={(e) => setCurrentPage(e.data)}
            flippingTime={1000}
            useMouseEvents={true}
            usePortrait={isMobile}
            startPage={0}
            drawShadow={!isMobile}
            className="portfolio-book shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]"
            style={{ backgroundColor: "transparent" }}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.6}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            mobileScrollSupport={true}
            clickEventForward={true}
          >
            {/* FRONT COVER */}
            <div className="bg-[#0a0a0a] border border-white/5 flex flex-col relative overflow-hidden">
              <div className="absolute left-0 inset-y-0 w-8 md:w-12 border-r border-white/10 flex items-center justify-center bg-black/20">
                <span className="rotate-[-90deg] font-mono text-[8px] text-cyan-600 tracking-[0.5em] whitespace-nowrap uppercase">
                  Digital_Fabrication_2025
                </span>
              </div>
              <div className="ml-8 md:ml-12 flex-grow flex flex-col">
                <div className="p-6 md:p-10 flex justify-between items-start">
                  <div className="bg-cyan-600 text-black px-2 py-0.5 font-black italic text-lg">
                    HU
                  </div>
                </div>
                <div className="px-6 md:px-10 flex-grow flex flex-col justify-center">
                  <div className="space-y-2 mb-8">
                    <div className="h-px w-16 bg-cyan-500" />
                    <p className="text-[8px] tracking-[0.3em] text-cyan-500 font-mono uppercase">
                      Master_Portfolio
                    </p>
                  </div>
                  <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.75] text-white tracking-tighter">
                    ARCHI
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">
                      TECT.
                    </span>
                  </h1>
                </div>
                <div className="grid grid-cols-2 bg-white/5 text-[8px] font-mono uppercase tracking-[0.1em] border-t border-white/10">
                  <button
                    onClick={() => setIsAboutOpen(true)}
                    className="p-4 border-r border-white/10 hover:bg-cyan-600 hover:text-black transition-all flex items-center justify-between group"
                  >
                    <span>01 // About</span>
                    <ChevronRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                  <button
                    onClick={() =>
                      bookRef.current.pageFlip().flip(totalPages - 1)
                    }
                    className="p-4 hover:bg-cyan-600 hover:text-black transition-all flex items-center justify-between group"
                  >
                    <span>02 // Contact</span>
                    <ChevronRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* PROFILE PAGE */}
            <div className="bg-black">
              <ProfilePage />
            </div>

            {/* PROJECT PAGES */}
            {projects.map((p, i) => (
              <div
                key={i}
                className="bg-[#0a0a0a] border border-white/5 flex flex-col h-full overflow-hidden"
              >
                <div className="h-[50%] relative overflow-hidden">
                  <img
                    src={p.image}
                    className="w-full h-full object-cover grayscale"
                    alt={p.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                </div>
                <div className="p-6 md:p-12 flex-grow flex flex-col justify-between">
                  <h3 className="text-2xl md:text-5xl font-black uppercase italic leading-none text-white tracking-tighter">
                    {p.title}
                  </h3>
                  <p className="text-[10px] leading-relaxed text-gray-500 font-light line-clamp-2 md:line-clamp-none">
                    {p.desc}
                  </p>
                  <div className="flex justify-between items-end border-t border-white/5 pt-4">
                    <span className="text-cyan-900 text-4xl md:text-6xl font-black italic opacity-20 leading-none">
                      0{i + 1}
                    </span>
                    <button
                      onClick={() => setSelectedProject(p)}
                      className="px-4 py-2 border border-cyan-500/40 text-[8px] tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all uppercase flex items-center gap-2 group"
                    >
                      Inspect{" "}
                      <Maximize size={10} className="group-hover:scale-110" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* BACK COVER */}
            <div className="bg-[#080808] border border-white/5 p-8 md:p-14 flex flex-col justify-center h-full">
              <div className="space-y-8 md:space-y-12">
                <h2 className="text-2xl md:text-4xl font-black italic uppercase text-white tracking-tighter underline decoration-cyan-500 decoration-2 md:decoration-4 underline-offset-8">
                  Get In Touch
                </h2>
                <div className="space-y-4 md:space-y-6">
                  {/* Links */}
                  <a
                    href="mailto:mchenry2019@gmail.com"
                    className="flex items-center gap-3 md:gap-5 group"
                  >
                    <div className="p-2 md:p-3 border border-cyan-500/20 group-hover:bg-cyan-500 transition-all">
                      <Mail
                        size={16}
                        className="text-cyan-500 group-hover:text-black"
                      />
                    </div>
                    <div>
                      <span className="block text-[7px] font-mono text-cyan-900 uppercase">
                        Direct_Mail
                      </span>
                      <span className="text-[10px] md:text-xs text-gray-400">
                        mchenry2019@gmail.com
                      </span>
                    </div>
                  </a>
                  <a
                    href="tel:+2348138392800"
                    className="flex items-center gap-3 md:gap-5 group"
                  >
                    <div className="p-2 md:p-3 border border-cyan-500/20 group-hover:bg-cyan-500 transition-all">
                      <Phone
                        size={16}
                        className="text-cyan-500 group-hover:text-black"
                      />
                    </div>
                    <div>
                      <span className="block text-[7px] font-mono text-cyan-900 uppercase">
                        Voice_Line
                      </span>
                      <span className="text-[10px] md:text-xs text-gray-400">
                        +234 813 839 2800
                      </span>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/2348138392800"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 md:gap-5 group"
                  >
                    <div className="p-2 md:p-3 border border-cyan-500/20 group-hover:bg-cyan-500 transition-all">
                      <MessageSquare
                        size={16}
                        className="text-cyan-500 group-hover:text-black"
                      />
                    </div>
                    <div>
                      <span className="block text-[7px] font-mono text-cyan-900 uppercase">
                        Whatsapp
                      </span>
                      <span className="text-[10px] md:text-xs text-gray-400">
                        +234 813 839 2800
                      </span>
                    </div>
                  </a>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-between bg-white text-black px-4 py-3 md:px-6 md:py-4 font-bold uppercase text-[8px] md:text-[10px] tracking-[0.2em] hover:bg-cyan-500 transition-all"
                >
                  <span>Contact Me</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </HTMLFlipBook>
        )}
      </motion.div>
    </main>
  );
}
