import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  BookOpen,
  Award,
  Newspaper,
  Mail,
  ExternalLink,
  MapPin,
  Menu,
  X,
  ArrowUpRight,
  Download,
  Droplets,
  Cpu,
  Wheat,
  FlaskConical,
  Globe,
  Linkedin,
  FileText,
  Trophy,
  Star,
  Building2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

import {
  NAV_ITEMS,
  PUBLICATIONS,
  EDUCATION,
  AFFILIATIONS,
  PROJECTS,
  AWARDS,
  MEDIA,
  CONTACT_LINKS,
  CONTACT_INFO,
  HERO_KEYWORDS,
} from "@/data/portfolio";

import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import DarkModeToggle from "@/components/DarkModeToggle";

function scrollTo(id: string, delay = 0) {
  const go = () => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.querySelector("nav");
    const offset = nav ? nav.getBoundingClientRect().height + 16 : 60;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };
  if (delay) setTimeout(go, delay);
  else go();
}

const PROJECT_ICONS = [Droplets, Cpu, Wheat, FlaskConical];
const LINK_ICONS: Record<string, typeof Globe> = {
  ResearchGate: Globe,
  "Google Scholar": BookOpen,
  ORCID: FileText,
  LinkedIn: Linkedin,
};

/* ── Reveal wrapper ── */
function Reveal({
  children,
  className = "",
  id,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Section heading (editorial) ── */
function SectionHeading({
  eyebrow,
  title,
  number,
}: {
  eyebrow: string;
  title: string;
  number: string;
}) {
  return (
    <Reveal className="mb-10 md:mb-14 flex items-end justify-between gap-6 border-b border-border pb-6">
      <div>
        <p className="eyebrow mb-3 flex items-center gap-3">
          <span className="font-mono text-sage">{number}</span>
          <span className="h-px w-8 bg-border" />
          {eyebrow}
        </p>
        <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-foreground">
          {title}
        </h2>
      </div>
    </Reveal>
  );
}

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_ITEMS.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-forest selection:text-background">
      <ScrollProgress />
      <BackToTop />

      {/* ═══════════ STICKY NAV ═══════════ */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "glass" : "bg-background border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 sm:px-8 py-3">
          <button
            onClick={() => scrollTo("hero")}
            className="font-serif-display text-xl sm:text-2xl text-foreground"
          >
            I·R·F
          </button>
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollTo(n.id)}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    activeSection === n.id
                      ? "text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeSection === n.id && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-forest"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{n.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1">
            <DarkModeToggle />
            <Button
              onClick={() => scrollTo("contact")}
              size="sm"
              className="hidden md:inline-flex rounded-full bg-forest hover:bg-moss text-background"
            >
              Contact
            </Button>
            <button
              className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border px-5 pb-4 pt-2 space-y-0.5 bg-background overflow-hidden"
            >
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      scrollTo(n.id, 300);
                    }}
                    className={`block w-full text-left rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                      activeSection === n.id
                        ? "text-forest bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <header id="hero" className="relative isolate">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 pt-8 md:pt-16 pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left — text */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-sage" />
                  </span>
                  <span className="font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Available for collaboration
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-serif-display mt-8 text-[3.5rem] leading-[0.92] sm:text-7xl md:text-[5.5rem] lg:text-[6rem] text-forest"
                >
                  Dr. Isaac
                  <br />
                  <span className="italic text-moss">Rhinnexious</span>
                  <br />
                  Fandika
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
                >
                  Irrigation agronomist advancing water-smart, climate-resilient
                  agriculture for smallholder farmers in sub-Saharan Africa.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-10 flex flex-col gap-6"
              >
                <div className="flex flex-wrap gap-2">
                  {HERO_KEYWORDS.map((k) => (
                    <Badge
                      key={k}
                      variant="outline"
                      className="rounded-full border-border bg-transparent px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      {k}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => scrollTo("contact")}
                    className="rounded-full bg-forest hover:bg-moss text-background gap-2 h-11 px-5"
                  >
                    <Mail className="h-4 w-4" />
                    Get in touch
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full gap-2 h-11 px-5 border-border hover:bg-secondary"
                  >
                    <Download className="h-4 w-4" />
                    Download CV
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Right — portrait + quick stats bento */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="col-span-2 relative overflow-hidden rounded-[var(--radius)] border border-border aspect-[5/4] grain"
              >
                <img
                  src={profileImg}
                  alt="Dr. Isaac R. Fandika"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-forest/85 via-forest/40 to-transparent">
                  <p className="eyebrow text-background/80 mb-1">Chief Agricultural Research Scientist</p>
                  <p className="text-sm font-medium text-background flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    DARS · Ministry of Agriculture, Malawi
                  </p>
                </div>
              </motion.div>

              <Reveal delay={0.2} className="bento-card p-5">
                <p className="eyebrow mb-2">Experience</p>
                <p className="font-serif-display text-5xl text-forest">15+</p>
                <p className="text-xs text-muted-foreground mt-1">Years in applied research</p>
              </Reveal>

              <Reveal delay={0.3} className="bento-card p-5">
                <p className="eyebrow mb-2">Publications</p>
                <p className="font-serif-display text-5xl text-forest">{PUBLICATIONS.length}+</p>
                <p className="text-xs text-muted-foreground mt-1">Peer-reviewed papers</p>
              </Reveal>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════ ABOUT + EDUCATION ═══════════ */}
      <section className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 md:py-24">
        <SectionHeading number="01" eyebrow="Background" title="About" />
        <div id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* About narrative */}
          <Reveal className="lg:col-span-7 bento-card p-7 md:p-10">
            <p className="eyebrow mb-5">Biography</p>
            <p className="font-serif-display text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-[1.15]">
              Dr. Isaac Rhinnexious Fandika is a seasoned irrigation agronomist improving
              <span className="italic text-moss"> water productivity </span>
              for smallholder farming systems across sub-Saharan Africa.
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              His research focuses on innovative irrigation strategies, precision
              soil-moisture monitoring, and digital advisory tools. With over 15 years
              of applied research across Kasinthula and Bvumbwe research stations,
              he has published widely in peer-reviewed journals and led multi-country
              projects that translate science into field-ready solutions.
            </p>
          </Reveal>

          {/* Education stack */}
          <div id="education" className="lg:col-span-5 flex flex-col gap-5">
            <Reveal className="bento-card bento-dark p-7">
              <p className="eyebrow text-background/60 mb-3">02 · Education</p>
              <p className="font-serif-display text-3xl text-background leading-tight">
                Academic
                <br />
                <span className="italic">journey</span>
              </p>
            </Reveal>
            {EDUCATION.map((e, i) => (
              <Reveal key={e.degree} delay={i * 0.08} className="bento-card p-5 flex gap-4 items-start">
                <div className="shrink-0 h-11 w-11 rounded-xl bg-secondary text-forest flex items-center justify-center">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif-display text-xl text-foreground leading-tight">
                      {e.degree}
                    </h3>
                    <span className="text-[11px] font-mono text-sage shrink-0">{e.years}</span>
                  </div>
                  {e.field && <p className="text-sm text-moss mt-0.5">{e.field}</p>}
                  <p className="text-sm text-muted-foreground mt-1">{e.uni}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ AFFILIATIONS ═══════════ */}
      <section id="affiliations" className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 md:py-24">
        <SectionHeading number="03" eyebrow="Current positions" title="Affiliations" />
        <div className="grid gap-5 md:grid-cols-2">
          {AFFILIATIONS.map((a, i) => (
            <Reveal key={a.role} delay={i * 0.1} className="bento-card p-7 md:p-9 group">
              <div className="flex items-start justify-between mb-6">
                <div className="h-12 w-12 rounded-xl bg-secondary text-forest flex items-center justify-center">
                  <Building2 className="h-6 w-6" />
                </div>
                <span className="font-mono text-xs text-sage">0{i + 1}</span>
              </div>
              <h3 className="font-serif-display text-2xl md:text-3xl text-foreground leading-tight">
                {a.role}
              </h3>
              <p className="mt-3 text-base text-moss font-medium">{a.org}</p>
              <p className="text-sm text-muted-foreground mt-1">{a.detail}</p>
              <div className="mt-6 pt-5 hairline flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-sage" />
                {a.location}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ PUBLICATIONS ═══════════ */}
      <section id="publications" className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 md:py-24">
        <SectionHeading number="04" eyebrow="Selected peer-reviewed work" title="Publications" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Featured */}
          <Reveal className="lg:col-span-7 bento-card bento-dark p-7 md:p-10 group">
            <p className="eyebrow text-background/60 mb-5">Featured · {PUBLICATIONS[0].year}</p>
            <h3 className="font-serif-display text-3xl md:text-4xl text-background leading-[1.1]">
              {PUBLICATIONS[0].title}
            </h3>
            <p className="mt-5 text-sm text-background/70 leading-relaxed">{PUBLICATIONS[0].authors}</p>
            <div className="mt-8 pt-6 border-t border-background/15 flex items-center justify-between gap-4">
              <p className="italic text-mist">{PUBLICATIONS[0].journal}</p>
              {PUBLICATIONS[0].url && (
                <a
                  href={PUBLICATIONS[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-background hover:text-mist transition-colors"
                >
                  Read paper <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </Reveal>

          {/* Rest of publications */}
          <div className="lg:col-span-5 grid gap-5">
            {PUBLICATIONS.slice(1, 4).map((p, i) => (
              <Reveal key={i} delay={i * 0.08} className="bento-card p-5 flex gap-5 group">
                <p className="font-serif-display text-4xl text-sage shrink-0 leading-none">
                  {String(p.year).slice(2)}
                </p>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-forest transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-xs italic text-muted-foreground">{p.journal}</p>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs text-forest hover:underline"
                    >
                      View <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Remaining as bento row */}
          {PUBLICATIONS.slice(4).map((p, i) => (
            <Reveal
              key={i + 4}
              delay={i * 0.06}
              className="lg:col-span-6 bento-card p-6 flex gap-5 group"
            >
              <p className="font-serif-display text-5xl text-sage shrink-0 leading-none">
                {p.year}
              </p>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground leading-snug group-hover:text-forest transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{p.authors}</p>
                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  <span className="text-xs italic text-muted-foreground">{p.journal}</span>
                  {p.openAccess && (
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-sage">
                      <span className="h-1.5 w-1.5 rounded-full bg-sage" /> Open access
                    </span>
                  )}
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-xs text-forest hover:underline"
                    >
                      View <ArrowUpRight className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ PROJECTS ═══════════ */}
      <section id="projects" className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 md:py-24">
        <SectionHeading number="05" eyebrow="Research initiatives" title="Projects & impact" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {PROJECTS.map((p, i) => {
            const Icon = PROJECT_ICONS[i] || Droplets;
            const isLarge = i === 0;
            return (
              <Reveal
                key={p.title}
                delay={i * 0.08}
                className={`bento-card p-7 md:p-8 group ${
                  isLarge ? "lg:col-span-6 lg:row-span-2 bento-dark" : "lg:col-span-6"
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                      isLarge ? "bg-background/10 text-background" : "bg-secondary text-forest"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-serif-display text-5xl md:text-6xl leading-none ${
                        isLarge ? "text-background" : "text-forest"
                      }`}
                    >
                      {p.stat}
                    </p>
                    <p
                      className={`mt-1 text-[10px] uppercase tracking-[0.18em] ${
                        isLarge ? "text-background/60" : "text-muted-foreground"
                      }`}
                    >
                      {p.statLabel}
                    </p>
                  </div>
                </div>
                <h3
                  className={`font-serif-display text-2xl md:text-3xl leading-tight ${
                    isLarge ? "text-background" : "text-foreground"
                  }`}
                >
                  {p.title}
                </h3>
                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    isLarge ? "text-background/70" : "text-muted-foreground"
                  }`}
                >
                  {p.description}
                </p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      isLarge ? "text-mist hover:text-background" : "text-forest hover:text-moss"
                    }`}
                  >
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══════════ AWARDS + MEDIA ═══════════ */}
      <section className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          {/* Awards */}
          <div id="awards" className="lg:col-span-6">
            <Reveal className="mb-10 border-b border-border pb-6">
              <p className="eyebrow mb-3 flex items-center gap-3">
                <span className="font-mono text-sage">06</span>
                <span className="h-px w-8 bg-border" /> Recognition
              </p>
              <h2 className="font-serif-display text-4xl sm:text-5xl text-foreground">Awards & honors</h2>
            </Reveal>
            <div className="space-y-4">
              {AWARDS.map((a, i) => (
                <Reveal
                  key={a.name}
                  delay={i * 0.08}
                  className="bento-card p-5 flex items-center gap-5 group"
                >
                  <div className="shrink-0 h-12 w-12 rounded-xl bg-secondary text-forest flex items-center justify-center">
                    {i === 0 ? (
                      <Trophy className="h-6 w-6" />
                    ) : i === 1 ? (
                      <Star className="h-6 w-6" />
                    ) : (
                      <Award className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-forest transition-colors">
                      {a.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{a.org}</p>
                  </div>
                  <span className="font-serif-display text-2xl text-sage shrink-0">{a.year}</span>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Media */}
          <div id="media" className="lg:col-span-6">
            <Reveal className="mb-10 border-b border-border pb-6">
              <p className="eyebrow mb-3 flex items-center gap-3">
                <span className="font-mono text-sage">07</span>
                <span className="h-px w-8 bg-border" /> Press
              </p>
              <h2 className="font-serif-display text-4xl sm:text-5xl text-foreground">Media</h2>
            </Reveal>
            <div className="space-y-4">
              {MEDIA.map((m, i) => (
                <Reveal key={m.title} delay={i * 0.08} className="bento-card p-5 group">
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-5"
                  >
                    <div className="shrink-0 h-12 w-12 rounded-xl bg-secondary text-forest flex items-center justify-center">
                      <Newspaper className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground group-hover:text-forest transition-colors leading-snug">
                        {m.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                        {m.source}
                      </p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-forest transition-colors shrink-0" />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 md:py-24">
        <Reveal className="bento-card bento-dark p-8 md:p-14 lg:p-20 grain relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
            <div className="lg:col-span-7">
              <p className="eyebrow text-background/60 mb-5 flex items-center gap-3">
                <span className="font-mono text-mist">08</span>
                <span className="h-px w-8 bg-background/20" /> Contact
              </p>
              <h2 className="font-serif-display text-5xl sm:text-6xl md:text-7xl text-background leading-[0.95]">
                Let's build
                <br />
                <span className="italic text-mist">water-smart</span>
                <br />
                futures.
              </h2>
              <p className="mt-8 max-w-md text-background/70 leading-relaxed">
                Open to research partnerships, advisory roles, and collaborations
                on climate-resilient irrigation across sub-Saharan Africa.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <p className="eyebrow text-background/50 mb-3">Direct</p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="block font-serif-display text-2xl md:text-3xl text-background hover:text-mist transition-colors break-all"
                >
                  {CONTACT_INFO.email}
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="block mt-2 text-background/70 hover:text-mist transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>

              <div className="pt-6 border-t border-background/15">
                <p className="eyebrow text-background/50 mb-3">Institutional</p>
                <p className="text-background/80 text-sm leading-relaxed">
                  Department of Agricultural Research Services (DARS)
                  <br />
                  Ministry of Agriculture
                  <br />
                  P.O. Box 158, Lilongwe, Malawi
                </p>
              </div>

              <div className="pt-6 border-t border-background/15">
                <p className="eyebrow text-background/50 mb-4">Profiles</p>
                <div className="flex flex-wrap gap-2">
                  {CONTACT_LINKS.map((l) => {
                    const Icon = LINK_ICONS[l.label] || ExternalLink;
                    return (
                      <a
                        key={l.label}
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-background/20 px-3.5 py-2 text-xs text-background hover:bg-background hover:text-forest transition-colors"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {l.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-serif-display text-lg text-foreground">
            Dr. Isaac R. Fandika
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            DARS · Mechro Limited · Malawi
          </p>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
