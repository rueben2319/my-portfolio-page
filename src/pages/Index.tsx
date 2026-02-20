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
  Droplets,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "affiliations", label: "Affiliations" },
  { id: "publications", label: "Publications" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "media", label: "Media" },
  { id: "contact", label: "Contact" },
];

const PUBLICATIONS = [
  {
    authors: "Fandika, I.R., Kadyampakeni, D. & Zingore, S.",
    title: "Performance of bucket-drip irrigation powered by gravity for smallholder farmers in Malawi",
    journal: "Irrigation Science",
    year: 2012,
    openAccess: true,
    url: "https://doi.org/10.1007/s00271-011-0296-2",
  },
  {
    authors: "Fandika, I.R., Kemp, P.D., Millner, J.P., Horne, D. & Roskruge, N.",
    title: "Irrigation and water-use efficiency in finger millet (Eleusine coracana)",
    journal: "New Zealand Journal of Crop and Horticultural Science",
    year: 2011,
    openAccess: false,
    url: "https://doi.org/10.1080/01140671.2011.577079",
  },
  {
    authors: "Fandika, I.R. et al.",
    title: "Alternate furrow irrigation of short-season maize in Malawi",
    journal: "Agricultural Water Management",
    year: 2012,
    openAccess: false,
    url: "#",
  },
  {
    authors: "Fandika, I.R. et al.",
    title: "Crop water productivity of sweet sorghum under deficit irrigation in Malawi",
    journal: "Journal of Arid Environments",
    year: 2013,
    openAccess: false,
    url: "#",
  },
  {
    authors: "Fandika, I.R. et al.",
    title: "Assessing soil water monitoring tools for irrigation scheduling in Malawi",
    journal: "African Journal of Agricultural Research",
    year: 2015,
    openAccess: true,
    url: "#",
  },
  {
    authors: "Fandika, I.R. et al.",
    title: "Virtual Irrigation Academy: bridging the gap between research and practice",
    journal: "Irrigation and Drainage",
    year: 2018,
    openAccess: true,
    url: "#",
  },
  {
    authors: "Fandika, I.R. et al.",
    title: "AI-assisted soil moisture sensing for smallholder irrigators in sub-Saharan Africa",
    journal: "Computers and Electronics in Agriculture",
    year: 2023,
    openAccess: true,
    url: "#",
  },
];

const PROJECTS = [
  {
    title: "Virtual Irrigation Academy (VIA)",
    description:
      "Co-developed and field-tested a mobile-based advisory platform that delivers real-time irrigation scheduling to smallholder farmers across southern Malawi, boosting water-use efficiency by up to 30 %.",
    stat: "30%",
    statLabel: "efficiency boost",
  },
  {
    title: "AI for Soil Moisture & Nutrient Monitoring",
    description:
      "Led the integration of low-cost sensors with machine-learning models to predict soil moisture and nutrient status, reducing water waste and fertiliser costs for resource-constrained farmers.",
    stat: "AI",
    statLabel: "powered sensing",
  },
  {
    title: "Alternate-Furrow Irrigation Research",
    description:
      "Demonstrated that alternate-furrow irrigation can cut water use by 35 % in maize without significant yield penalty — findings now adopted in national extension guidelines.",
    stat: "35%",
    statLabel: "water saved",
  },
  {
    title: "Shire Valley Wheat Dissemination",
    description:
      "Spearheaded on-farm wheat trials in the Shire Valley, proving winter-irrigated wheat viability and contributing to Malawi's food-security diversification strategy.",
    stat: "New",
    statLabel: "crop viability",
  },
];

const AWARDS = [
  { name: "John Dillon Fellowship", year: 2017, org: "ACIAR, Australia" },
  { name: "Agronomy Society of NZ Travel Award", year: 2010, org: "Agronomy Society of New Zealand" },
  { name: "Commonwealth Scholarship", year: 2009, org: "Commonwealth Scholarship Commission" },
];

const MEDIA = [
  {
    title: "Malawian scientist champions smart irrigation in the face of climate change",
    source: "Malawi Nation",
    url: "#",
  },
  {
    title: "Virtual Irrigation Academy pilots show promising results for smallholders",
    source: "CGIAR Research Program on WLE",
    url: "#",
  },
  {
    title: "AI-driven farming tools reach rural Malawi",
    source: "SciDev.Net",
    url: "#",
  },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ── Animated section wrapper ── */
function AnimatedSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ── Section heading ── */
function SectionHeading({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
      </div>
      {subtitle && <p className="mt-2 ml-[52px] text-sm text-muted-foreground">{subtitle}</p>}
    </div>
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
      {/* ─── HERO ─── */}
      <header className="relative overflow-hidden pb-16 pt-20 md:pt-28 md:pb-24">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/3 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/[0.02] blur-3xl" />
        </div>

        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-8 px-6 text-center md:flex-row md:text-left">
          {/* Avatar with gradient ring */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative shrink-0"
          >
            <div className="gradient-border h-36 w-36 rounded-full md:h-44 md:w-44">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10">
                <Droplets className="h-16 w-16 text-primary/60" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">
                Chief Agricultural Research Scientist
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Dr. Isaac R.{" "}
                <span className="gradient-text">Fandika</span>
              </h1>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Irrigation agronomist advancing water-smart, climate-resilient agriculture for smallholder farmers in sub-Saharan Africa.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
              <MapPin className="h-4 w-4 text-primary" />
              <span>DARS, Ministry of Agriculture · Malawi</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-2 md:justify-start">
              {["Irrigation", "Water Productivity", "Monitoring Tools", "Climate Adaptation"].map((k) => (
                <Badge key={k} variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
                  {k}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* ─── STICKY NAV ─── */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "glass shadow-lg shadow-background/20" : "bg-background/80 backdrop-blur-md border-b"
        }`}
      >
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-2 md:py-0">
          <span className="text-sm font-bold text-foreground md:hidden">I. R. Fandika</span>
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
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t px-6 pb-4 pt-2 space-y-0.5 bg-background"
          >
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => { scrollTo(n.id); setMobileOpen(false); }}
                  className={`block w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeSection === n.id ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
      <main className="mx-auto max-w-[1100px] space-y-20 px-6 py-16">
        {/* ABOUT */}
        <AnimatedSection id="about">
          <SectionHeading icon={<BookOpen className="h-5 w-5" />} title="About" subtitle="Research focus & background" />
          <div className="rounded-2xl glass p-6 sm:p-8">
            <p className="max-w-3xl leading-relaxed text-muted-foreground">
              Dr. Isaac Rhinnexious Fandika is a seasoned irrigation agronomist and Chief Agricultural Research Scientist
              at the Department of Agricultural Research Services (DARS) within Malawi's Ministry of Agriculture. His
              research focuses on improving water productivity for smallholder farming systems through innovative
              irrigation strategies, precision soil-moisture monitoring, and digital advisory tools. He earned his PhD in
              Plant Science (Irrigation Agronomy) from Massey University, New Zealand, where he investigated deficit
              irrigation and alternate-furrow techniques on tropical cereals. With over 15 years of applied research
              across Kasinthula and Bvumbwe research stations, Dr. Fandika has published widely in peer-reviewed journals
              and led multi-country projects that translate science into field-ready solutions.
            </p>
          </div>
        </AnimatedSection>

        {/* EDUCATION */}
        <AnimatedSection id="education">
          <SectionHeading icon={<GraduationCap className="h-5 w-5" />} title="Education" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { degree: "PhD, Plant Science", field: "Irrigation Agronomy", uni: "Massey University, NZ", years: "2009 – 2012" },
              { degree: "MSc, Water Management", field: "", uni: "Cranfield University, UK", years: "2003 – 2004" },
              { degree: "BSc, Agriculture", field: "", uni: "University of Malawi", years: "1999 – 2002" },
            ].map((e, i) => (
              <motion.div
                key={e.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="group h-full overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="h-1 bg-gradient-to-r from-primary to-[hsl(var(--gradient-end))]" />
                  <CardContent className="p-5 space-y-2">
                    <p className="font-bold text-foreground">{e.degree}</p>
                    {e.field && <p className="text-xs text-primary font-medium">{e.field}</p>}
                    <p className="text-sm text-muted-foreground">{e.uni}</p>
                    <p className="text-xs font-mono text-muted-foreground/70">{e.years}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* AFFILIATIONS */}
        <AnimatedSection id="affiliations">
          <SectionHeading icon={<Briefcase className="h-5 w-5" />} title="Affiliations" subtitle="Current positions & roles" />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                role: "Chief Agricultural Research Scientist",
                org: "Department of Agricultural Research Services (DARS)",
                detail: "Ministry of Agriculture, Malawi",
                location: "Kasinthula & Bvumbwe Research Stations",
              },
              {
                role: "Board Director & Chief Scientific Advisor",
                org: "Mechro Limited",
                detail: "Bridging agriculture & engineering",
                location: "Climate-resilient technology",
              },
            ].map((a, i) => (
              <motion.div
                key={a.role}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </div>
                    <p className="font-bold text-foreground">{a.role}</p>
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
          <SectionHeading icon={<BookOpen className="h-5 w-5" />} title="Publications" subtitle="Selected peer-reviewed work" />
          <div className="space-y-3">
            {PUBLICATIONS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Card className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <CardContent className="p-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1 max-w-2xl">
                      <p className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {p.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{p.authors}</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="italic">{p.journal}</span>
                        <span className="mx-1.5 font-mono">·</span>
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
                        <a href={p.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
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

        {/* PROJECTS */}
        <AnimatedSection id="projects">
          <SectionHeading icon={<Lightbulb className="h-5 w-5" />} title="Projects & Impact" subtitle="Key research initiatives" />
          <div className="grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="group h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base font-bold">{p.title}</CardTitle>
                      <div className="text-right shrink-0 ml-4">
                        <p className="text-2xl font-extrabold gradient-text">{p.stat}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{p.statLabel}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* AWARDS */}
        <AnimatedSection id="awards">
          <SectionHeading icon={<Award className="h-5 w-5" />} title="Awards & Honors" />
          <div className="grid gap-4 sm:grid-cols-3">
            {AWARDS.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
                  <CardContent className="p-6 space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <p className="font-bold text-foreground">{a.name}</p>
                    <p className="text-sm text-muted-foreground">{a.org}</p>
                    <Badge variant="outline" className="rounded-full font-mono text-xs">
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
          <SectionHeading icon={<Newspaper className="h-5 w-5" />} title="Media & Press" />
          <div className="space-y-3">
            {MEDIA.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Card className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                  <CardContent className="p-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {m.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{m.source}</p>
                    </div>
                    {m.url !== "#" && (
                      <a href={m.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 rounded-full hover:bg-primary/10 hover:text-primary">
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
          <SectionHeading icon={<Mail className="h-5 w-5" />} title="Contact & Links" />
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary to-[hsl(var(--gradient-end))]" />
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <p className="font-bold text-foreground">Institutional Contact</p>
                <p className="text-sm text-muted-foreground">Department of Agricultural Research Services (DARS)</p>
                <p className="text-sm text-muted-foreground">Ministry of Agriculture, P.O. Box 158, Lilongwe, Malawi</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "ResearchGate", url: "https://www.researchgate.net/profile/Isaac-Fandika" },
                  { label: "Google Scholar", url: "https://scholar.google.com/citations?user=PLACEHOLDER" },
                  { label: "ORCID", url: "https://orcid.org/0000-0002-XXXX-XXXX" },
                  { label: "LinkedIn", url: "https://www.linkedin.com/in/isaac-fandika" },
                ].map((l) => (
                  <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="rounded-full gap-1.5 hover:bg-primary/5 hover:text-primary hover:border-primary/30 transition-colors">
                      <ExternalLink className="h-3.5 w-3.5" />
                      {l.label}
                    </Button>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t py-10">
        <div className="mx-auto max-w-[1100px] px-6 text-center space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            DARS · Ministry of Agriculture, Malawi · Mechro Limited
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Dr. Isaac R. Fandika. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Irrigation agronomy · water productivity · soil moisture monitoring · climate-resilient agriculture · Malawi
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
