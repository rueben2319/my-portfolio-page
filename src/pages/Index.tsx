import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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

/* ── Animated section wrapper with parallax ── */
function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ── Section heading with animated underline ── */
function SectionHeading({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="mb-10" ref={ref}>
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
        >
          {icon}
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-3 h-[2px] origin-left bg-gradient-to-r from-primary/40 to-transparent"
      />
    </div>
  );
}

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  // Parallax for hero
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  // Parallax for floating blobs
  const blob1Y = useTransform(heroProgress, [0, 1], [0, 150]);
  const blob2Y = useTransform(heroProgress, [0, 1], [0, -100]);
  const blob3Y = useTransform(heroProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Track active section
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

      {/* ─── HERO with Parallax ─── */}
      <header ref={heroRef} className="relative overflow-hidden pb-16 pt-24 md:pt-32 md:pb-28">
        {/* Animated background blobs */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            style={{ y: blob1Y }}
            className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl"
          />
          <motion.div
            style={{ y: blob2Y }}
            className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-primary/3 blur-3xl"
          />
          <motion.div
            style={{ y: blob3Y }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/[0.02] blur-3xl"
          />
          {/* Animated gradient mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.06),transparent_50%),radial-gradient(ellipse_at_bottom_left,hsl(var(--gradient-end)/0.04),transparent_50%)]" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="mx-auto flex max-w-[1100px] flex-col items-center gap-8 px-6 text-center md:flex-row md:text-left"
        >
          {/* Avatar with animated gradient ring */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 150 }}
            className="relative shrink-0 group"
          >
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--gradient-end))] opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
            <div className="gradient-border h-36 w-36 rounded-full md:h-44 md:w-44">
              <div className="h-full w-full overflow-hidden rounded-full bg-primary/10">
                <img
                  src={profileImg}
                  alt="Dr. Isaac R. Fandika"
                  className="h-full w-full rounded-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2"
            >
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Chief Agricultural Research Scientist
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Dr. Isaac R.{" "}
                <span className="gradient-text">Fandika</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                <TypeWriter
                  text="Irrigation agronomist advancing water-smart, climate-resilient agriculture for smallholder farmers in sub-Saharan Africa."
                  speed={25}
                  delay={800}
                />
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start"
            >
              <MapPin className="h-4 w-4 text-primary" />
              <span>DARS, Ministry of Agriculture - Malawi</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap justify-center gap-2 pt-2 md:justify-start"
            >
              {HERO_KEYWORDS.map((k, i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <Badge
                    variant="secondary"
                    className="rounded-full px-3 py-1 text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {k}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
      </header>

      {/* ─── STICKY NAV ─── */}
      <nav
        className={`sticky top-[3px] z-40 transition-all duration-300 ${
          scrolled
            ? "glass shadow-lg shadow-background/20"
            : "bg-background/80 backdrop-blur-md border-b"
        }`}
      >
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-2 md:py-0">
          <span className="text-sm font-bold text-foreground md:hidden">
            I. R. Fandika
          </span>
          <ul className="hidden md:flex gap-0.5">
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollTo(n.id)}
                  className={`relative rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeSection === n.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n.label}
                  {activeSection === n.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-x-1 -bottom-[1px] h-0.5 rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
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
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t px-6 pb-4 pt-2 space-y-0.5 bg-background"
          >
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => {
                    scrollTo(n.id);
                    setMobileOpen(false);
                  }}
                  className={`block w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeSection === n.id
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {n.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </nav>

      {/* ─── MAIN ─── */}
      <main className="relative z-10 mx-auto max-w-[1100px] space-y-24 px-6 py-20">
        {/* ABOUT */}
        <AnimatedSection id="about">
          <SectionHeading
            icon={<BookOpen className="h-5 w-5" />}
            title="About"
            subtitle="Research focus & background"
          />
          <div className="rounded-2xl glass p-6 sm:p-8 hover:shadow-xl transition-shadow duration-500">
            <p className="max-w-3xl leading-relaxed text-muted-foreground">
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
        </AnimatedSection>

        {/* EDUCATION */}
        <AnimatedSection id="education">
          <SectionHeading
            icon={<GraduationCap className="h-5 w-5" />}
            title="Education"
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {EDUCATION.map((e, i) => (
              <motion.div
                key={e.degree}
                initial={{ opacity: 0, y: 30, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <Card className="group h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="h-1 bg-gradient-to-r from-primary to-[hsl(var(--gradient-end))] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <CardContent className="p-5 space-y-2">
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {e.degree}
                    </p>
                    {e.field && (
                      <p className="text-xs text-primary font-medium">
                        {e.field}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">{e.uni}</p>
                    <p className="text-xs font-mono text-muted-foreground/70">
                      {e.years}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* AFFILIATIONS */}
        <AnimatedSection id="affiliations">
          <SectionHeading
            icon={<Briefcase className="h-5 w-5" />}
            title="Affiliations"
            subtitle="Current positions & roles"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {AFFILIATIONS.map((a, i) => (
              <motion.div
                key={a.role}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <Card className="group h-full border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <CardContent className="p-6 space-y-3">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
                    >
                      <Briefcase className="h-5 w-5 text-primary" />
                    </motion.div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {a.role}
                    </p>
                    <p className="text-sm text-muted-foreground">{a.org}</p>
                    <p className="text-xs text-muted-foreground">{a.detail}</p>
                    <div className="flex items-center gap-1 text-xs text-primary">
                      <MapPin className="h-3 w-3" />
                      {a.location}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* PUBLICATIONS */}
        <AnimatedSection id="publications">
          <SectionHeading
            icon={<BookOpen className="h-5 w-5" />}
            title="Publications"
            subtitle="Selected peer-reviewed work"
          />
          <div className="space-y-3">
            {PUBLICATIONS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <Card className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20">
                  <CardContent className="p-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1 max-w-2xl">
                      <p className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {p.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {p.authors}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="italic">{p.journal}</span>
                        <span className="mx-1.5 font-mono">-</span>
                        <span className="font-mono">{p.year}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
                      {p.openAccess && (
                        <Badge className="rounded-full bg-primary/10 text-primary border-primary/20 text-xs hover:bg-primary/10">
                          Open Access
                        </Badge>
                      )}
                      {p.url !== "#" && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* PROJECTS with CountUp stats */}
        <AnimatedSection id="projects">
          <SectionHeading
            icon={<Lightbulb className="h-5 w-5" />}
            title="Projects & Impact"
            subtitle="Key research initiatives"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -4 }}
              >
                <Card className="group h-full border-0 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base font-bold group-hover:text-primary transition-colors">
                        {p.title}
                      </CardTitle>
                      <div className="text-right shrink-0 ml-4">
                        <CountUp
                          value={p.stat}
                          className="text-2xl font-extrabold gradient-text"
                        />
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {p.statLabel}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* AWARDS */}
        <AnimatedSection id="awards">
          <SectionHeading
            icon={<Award className="h-5 w-5" />}
            title="Awards & Honors"
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {AWARDS.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -4, rotate: 1 }}
              >
                <Card className="group h-full border-0 shadow-md hover:shadow-xl transition-all duration-500 text-center overflow-hidden">
                  <CardContent className="p-6 space-y-3 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
                    >
                      <Award className="h-7 w-7 text-primary" />
                    </motion.div>
                    <p className="relative font-bold text-foreground group-hover:text-primary transition-colors">
                      {a.name}
                    </p>
                    <p className="relative text-sm text-muted-foreground">
                      {a.org}
                    </p>
                    <Badge
                      variant="outline"
                      className="relative rounded-full font-mono text-xs"
                    >
                      {a.year}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* MEDIA */}
        <AnimatedSection id="media">
          <SectionHeading
            icon={<Newspaper className="h-5 w-5" />}
            title="Media & Press"
          />
          <div className="space-y-3">
            {MEDIA.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <CardContent className="p-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {m.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {m.source}
                      </p>
                    </div>
                    {m.url !== "#" && (
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-full hover:bg-primary/10 hover:text-primary"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* CONTACT */}
        <AnimatedSection id="contact">
          <SectionHeading
            icon={<Mail className="h-5 w-5" />}
            title="Contact & Links"
          />
          <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-500">
            <div className="h-1 bg-gradient-to-r from-primary to-[hsl(var(--gradient-end))]" />
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <p className="font-bold text-foreground">
                  Institutional Contact
                </p>
                <p className="text-sm text-muted-foreground">
                  Department of Agricultural Research Services (DARS)
                </p>
                <p className="text-sm text-muted-foreground">
                  Ministry of Agriculture, P.O. Box 158, Lilongwe, Malawi
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {CONTACT_LINKS.map((l, i) => (
                  <motion.a
                    key={l.label}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full gap-1.5 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {l.label}
                    </Button>
                  </motion.a>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="relative border-t py-12">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.02] to-transparent" />
        <div className="relative mx-auto max-w-[1100px] px-6 text-center space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            DARS - Ministry of Agriculture, Malawi - Mechro Limited
          </p>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Dr. Isaac R. Fandika. All rights
            reserved.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Irrigation agronomy - water productivity - soil moisture monitoring -
            climate-resilient agriculture - Malawi
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
