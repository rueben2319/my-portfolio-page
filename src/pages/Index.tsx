import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Lightbulb,
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
  ChevronRight,
  Globe,
  Linkedin,
  FileText,
  Trophy,
  Star,
  Sprout,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
  HERO_KEYWORDS,
} from "@/data/portfolio";

import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import ParticleBackground from "@/components/ParticleBackground";
import DarkModeToggle from "@/components/DarkModeToggle";
import CountUp from "@/components/CountUp";
import TypeWriter from "@/components/TypeWriter";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const PROJECT_ICONS = [Droplets, Cpu, Wheat, FlaskConical];
const LINK_ICONS: Record<string, typeof Globe> = {
  ResearchGate: Globe,
  "Google Scholar": BookOpen,
  ORCID: FileText,
  LinkedIn: Linkedin,
};

/* ── Animated wrapper ── */
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
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Section title ── */
function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="mb-12 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-3 text-muted-foreground max-w-lg mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-[hsl(var(--gradient-end))]"
      />
    </div>
  );
}

/* ── Parallax divider between sections ── */
function ParallaxDivider({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <div ref={ref} className="relative overflow-hidden py-24 md:py-32">
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-[hsl(var(--gradient-end)/.05)]"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.06),transparent_60%)]" />
      {children}
    </div>
  );
}

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const blob1Y = useTransform(heroProgress, [0, 1], [0, 120]);
  const blob2Y = useTransform(heroProgress, [0, 1], [0, -80]);

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
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <ParticleBackground />
      <BackToTop />

      {/* ═══════════ HERO ═══════════ */}
      <header ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <motion.div style={{ y: blob1Y }} className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[100px]" />
          <motion.div style={{ y: blob2Y }} className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-[hsl(var(--gradient-end)/.04)] blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,hsl(var(--primary)/0.05),transparent_60%)]" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="mx-auto flex max-w-[1100px] w-full flex-col items-center gap-10 px-6 text-center md:flex-row md:text-left md:gap-16"
        >
          {/* Profile image — large and prominent */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
            className="relative shrink-0 group"
          >
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary/20 to-[hsl(var(--gradient-end)/.15)] blur-2xl group-hover:blur-3xl transition-all duration-700" />
            <div className="relative h-48 w-48 md:h-56 md:w-56 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-4 ring-offset-background">
              <img
                src={profileImg}
                alt="Dr. Isaac R. Fandika"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Floating icon */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg"
            >
              <Sprout className="h-6 w-6" />
            </motion.div>
          </motion.div>

          <div className="space-y-5 max-w-xl">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
            >
              <Droplets className="h-3.5 w-3.5" />
              Chief Agricultural Research Scientist
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]"
            >
              Dr. Isaac R.{" "}
              <span className="gradient-text">Fandika</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                <TypeWriter
                  text="Irrigation agronomist advancing water-smart, climate-resilient agriculture for smallholder farmers in sub-Saharan Africa."
                  speed={22}
                  delay={900}
                />
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start"
            >
              <MapPin className="h-4 w-4 text-primary" />
              DARS, Ministry of Agriculture - Malawi
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-2 justify-center md:justify-start"
            >
              {HERO_KEYWORDS.map((k, i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.08 }}
                >
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
                    {k}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex gap-3 pt-2 justify-center md:justify-start"
            >
              <Button
                onClick={() => scrollTo("contact")}
                className="rounded-full gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                <Mail className="h-4 w-4" />
                Get in Touch
              </Button>
              <Button
                variant="outline"
                className="rounded-full gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all"
              >
                <Download className="h-4 w-4" />
                Download CV
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground/50 text-xs"
          >
            <span>Scroll</span>
            <ChevronRight className="h-4 w-4 rotate-90" />
          </motion.div>
        </motion.div>
      </header>

      {/* ═══════════ STICKY NAV ═══════════ */}
      <nav className={`sticky top-[3px] z-40 transition-all duration-300 ${scrolled ? "glass shadow-lg shadow-background/20" : "bg-background/80 backdrop-blur-md border-b"}`}>
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-2 md:py-0">
          <span className="text-sm font-bold text-foreground md:hidden">I. R. Fandika</span>
          <ul className="hidden md:flex gap-0.5">
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollTo(n.id)}
                  className={`relative rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${activeSection === n.id ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {n.label}
                  {activeSection === n.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-x-1 -bottom-[1px] h-0.5 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
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
              className="md:hidden border-t px-6 pb-4 pt-2 space-y-0.5 bg-background overflow-hidden"
            >
              {NAV_ITEMS.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => { scrollTo(n.id); setMobileOpen(false); }}
                    className={`block w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${activeSection === n.id ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="py-24">
        <div className="mx-auto max-w-[1100px] px-6">
          <SectionTitle title="About" subtitle="Research focus & background" />
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="relative inline-block mb-6">
                <BookOpen className="h-12 w-12 text-primary mx-auto" />
              </div>
              <p className="text-lg leading-loose text-muted-foreground">
                Dr. Isaac Rhinnexious Fandika is a seasoned irrigation agronomist
                and Chief Agricultural Research Scientist at the Department of
                Agricultural Research Services (DARS) within Malawi's Ministry of
                Agriculture. His research focuses on improving water productivity
                for smallholder farming systems through innovative irrigation
                strategies, precision soil-moisture monitoring, and digital
                advisory tools. He earned his PhD in Plant Science (Irrigation
                Agronomy) from Massey University, New Zealand, where he
                investigated deficit irrigation and alternate-furrow techniques on
                tropical cereals. With over 15 years of applied research across
                Kasinthula and Bvumbwe research stations, Dr. Fandika has
                published widely in peer-reviewed journals and led multi-country
                projects that translate science into field-ready solutions.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ EDUCATION — Timeline ═══════════ */}
      <ParallaxDivider>
        <section id="education" className="mx-auto max-w-[1100px] px-6">
          <SectionTitle title="Education" subtitle="Academic journey" />
          <div className="relative max-w-2xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
            {EDUCATION.map((e, i) => (
              <Reveal key={e.degree} delay={i * 0.15} className="relative flex gap-6 pb-12 last:pb-0">
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.2, type: "spring" }}
                  className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                >
                  <GraduationCap className="h-7 w-7" />
                </motion.div>
                <div className="pt-2">
                  <h3 className="text-lg font-bold text-foreground">{e.degree}</h3>
                  {e.field && <p className="text-sm font-medium text-primary">{e.field}</p>}
                  <p className="text-muted-foreground mt-1">{e.uni}</p>
                  <p className="text-sm font-mono text-muted-foreground/60 mt-1">{e.years}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </ParallaxDivider>

      {/* ═══════════ AFFILIATIONS ═══════════ */}
      <section id="affiliations" className="py-24">
        <div className="mx-auto max-w-[1100px] px-6">
          <SectionTitle title="Affiliations" subtitle="Current positions & roles" />
          <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
            {AFFILIATIONS.map((a, i) => (
              <Reveal key={a.role} delay={i * 0.15}>
                <div className="group text-center md:text-left">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4"
                  >
                    <Briefcase className="h-7 w-7" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{a.role}</h3>
                  <p className="text-muted-foreground mt-1">{a.org}</p>
                  <p className="text-sm text-muted-foreground mt-1">{a.detail}</p>
                  <div className="flex items-center gap-1.5 text-sm text-primary mt-2 justify-center md:justify-start">
                    <MapPin className="h-3.5 w-3.5" />
                    {a.location}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PUBLICATIONS ═══════════ */}
      <ParallaxDivider>
        <section id="publications" className="mx-auto max-w-[1100px] px-6">
          <SectionTitle title="Publications" subtitle="Selected peer-reviewed work" />
          <div className="space-y-6 max-w-3xl mx-auto">
            {PUBLICATIONS.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="group flex gap-4 items-start">
                  <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mt-0.5">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{p.authors}</p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="text-xs text-muted-foreground italic">{p.journal}</span>
                      <span className="text-xs font-mono text-muted-foreground/70">{p.year}</span>
                      {p.openAccess && (
                        <Badge className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] px-2 py-0 hover:bg-emerald-500/10">
                          Open Access
                        </Badge>
                      )}
                      {p.url !== "#" && (
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                          View <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </ParallaxDivider>

      {/* ═══════════ PROJECTS — Visual bento grid ═══════════ */}
      <section id="projects" className="py-24">
        <div className="mx-auto max-w-[1100px] px-6">
          <SectionTitle title="Projects & Impact" subtitle="Key research initiatives" />
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p, i) => {
              const Icon = PROJECT_ICONS[i] || Lightbulb;
              return (
                <Reveal key={p.title} delay={i * 0.12}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group relative rounded-3xl bg-gradient-to-br from-card to-card p-8 border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden"
                  >
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                        >
                          <Icon className="h-7 w-7" />
                        </motion.div>
                        <div className="text-right">
                          <CountUp value={p.stat} className="text-3xl font-extrabold gradient-text" />
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.statLabel}</p>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ AWARDS — Visual with large icons ═══════════ */}
      <ParallaxDivider>
        <section id="awards" className="mx-auto max-w-[1100px] px-6">
          <SectionTitle title="Awards & Honors" />
          <div className="grid gap-8 sm:grid-cols-3 max-w-3xl mx-auto">
            {AWARDS.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group text-center"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-4"
                  >
                    {i === 0 ? <Trophy className="h-9 w-9" /> : i === 1 ? <Star className="h-9 w-9" /> : <Award className="h-9 w-9" />}
                  </motion.div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{a.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{a.org}</p>
                  <p className="text-xs font-mono text-primary/70 mt-2">{a.year}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>
      </ParallaxDivider>

      {/* ═══════════ MEDIA ═══════════ */}
      <section id="media" className="py-24">
        <div className="mx-auto max-w-[1100px] px-6">
          <SectionTitle title="Media & Press" />
          <div className="space-y-6 max-w-3xl mx-auto">
            {MEDIA.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.1}>
                <div className="group flex gap-4 items-center">
                  <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Newspaper className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{m.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{m.source}</p>
                  </div>
                  {m.url !== "#" && (
                    <a href={m.url} target="_blank" rel="noopener noreferrer">
                      <motion.div whileHover={{ scale: 1.1 }} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
                        <ArrowUpRight className="h-5 w-5" />
                      </motion.div>
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="py-24">
        <div className="mx-auto max-w-[1100px] px-6">
          <SectionTitle title="Get in Touch" subtitle="Let's connect" />
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-6"
              >
                <Mail className="h-10 w-10" />
              </motion.div>
              <div className="space-y-1 mb-8">
                <p className="font-bold text-foreground text-lg">Institutional Contact</p>
                <p className="text-muted-foreground">Department of Agricultural Research Services (DARS)</p>
                <p className="text-muted-foreground">Ministry of Agriculture, P.O. Box 158, Lilongwe, Malawi</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {CONTACT_LINKS.map((l, i) => {
                  const Icon = LINK_ICONS[l.label] || ExternalLink;
                  return (
                    <motion.a
                      key={l.label}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="rounded-full gap-2 px-5 py-5 text-sm hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-all"
                      >
                        <Icon className="h-4 w-4" />
                        {l.label}
                      </Button>
                    </motion.a>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="relative border-t py-14">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-[1100px] px-6 text-center space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            DARS - Ministry of Agriculture, Malawi - Mechro Limited
          </p>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Dr. Isaac R. Fandika. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/40">
            Irrigation agronomy - water productivity - soil moisture monitoring - climate-resilient agriculture
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
