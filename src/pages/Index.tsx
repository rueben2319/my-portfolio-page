import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";
import { useState, useEffect } from "react";

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
  },
  {
    title: "AI for Soil Moisture & Nutrient Monitoring",
    description:
      "Led the integration of low-cost sensors with machine-learning models to predict soil moisture and nutrient status, reducing water waste and fertiliser costs for resource-constrained farmers.",
  },
  {
    title: "Alternate-Furrow Irrigation Research",
    description:
      "Demonstrated that alternate-furrow irrigation can cut water use by 35 % in maize without significant yield penalty — findings now adopted in national extension guidelines.",
  },
  {
    title: "Shire Valley Wheat Dissemination",
    description:
      "Spearheaded on-farm wheat trials in the Shire Valley, proving winter-irrigated wheat viability and contributing to Malawi's food-security diversification strategy.",
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

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ─── HERO ─── */}
      <header className="relative overflow-hidden bg-primary/5 pb-12 pt-16 md:pt-24 md:pb-20">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-6 px-5 text-center md:flex-row md:text-left">
          <Avatar className="h-32 w-32 border-4 border-primary/20 shadow-lg md:h-40 md:w-40">
            <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-heading font-bold">
              IF
            </AvatarFallback>
          </Avatar>

          <div className="space-y-3">
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Dr. Isaac Rhinnexious Fandika
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Irrigation agronomist advancing <span className="text-primary font-semibold font-heading">water-smart, climate-resilient agriculture</span> for smallholder farmers in sub-Saharan Africa.
            </p>
            <p className="text-sm text-muted-foreground font-heading flex items-center justify-center gap-1 md:justify-start">
              <Briefcase className="h-4 w-4 text-primary" />
              Chief Agricultural Research Scientist (Irrigation) · DARS, Malawi
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-1 md:justify-start">
              {["Irrigation", "Water Productivity", "Monitoring Tools", "Climate Adaptation"].map((k) => (
                <Badge key={k} variant="secondary" className="font-heading">
                  {k}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ─── STICKY NAV ─── */}
      <nav
        className={`sticky top-0 z-40 border-b bg-background/90 backdrop-blur transition-shadow ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-2 md:py-0">
          <span className="font-heading text-sm font-semibold text-primary md:hidden">I. R. Fandika</span>
          {/* Desktop */}
          <ul className="hidden md:flex gap-1">
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => scrollTo(n.id)}
                  className="rounded-md px-3 py-2 text-sm font-heading font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-primary/5"
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
          {/* Mobile toggle */}
          <button
            className="md:hidden p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <ul className="md:hidden border-t px-5 pb-3 pt-2 space-y-1 bg-background">
            {NAV_ITEMS.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => { scrollTo(n.id); setMobileOpen(false); }}
                  className="block w-full text-left rounded-md px-3 py-2 text-sm font-heading font-medium text-muted-foreground hover:text-primary hover:bg-primary/5"
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* ─── MAIN CONTENT ─── */}
      <main className="mx-auto max-w-[1100px] space-y-16 px-5 py-14">
        {/* ABOUT */}
        <section id="about">
          <SectionHeading icon={<BookOpen />} title="About" />
          <p className="max-w-3xl leading-relaxed text-muted-foreground">
            Dr. Isaac Rhinnexious Fandika is a seasoned irrigation agronomist and Chief Agricultural Research Scientist
            at the Department of Agricultural Research Services (DARS) within Malawi's Ministry of Agriculture. His
            research focuses on improving water productivity for smallholder farming systems through innovative
            irrigation strategies, precision soil-moisture monitoring, and digital advisory tools. He earned his PhD in
            Plant Science (Irrigation Agronomy) from Massey University, New Zealand, where he investigated deficit
            irrigation and alternate-furrow techniques on tropical cereals. With over 15 years of applied research
            across Kasinthula and Bvumbwe research stations, Dr. Fandika has published widely in peer-reviewed journals
            and led multi-country projects that translate science into field-ready solutions. He also serves as Board
            Director and Chief Scientific Advisor at Mechro Limited, bridging agriculture and engineering expertise
            to scale climate-resilient technologies.
          </p>
        </section>

        <Separator />

        {/* EDUCATION */}
        <section id="education">
          <SectionHeading icon={<GraduationCap />} title="Education" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { degree: "PhD, Plant Science (Irrigation Agronomy)", uni: "Massey University, New Zealand", years: "2009 – 2012" },
              { degree: "MSc, Water Management", uni: "Cranfield University, UK", years: "2003 – 2004" },
              { degree: "BSc, Agriculture", uni: "University of Malawi", years: "1999 – 2002" },
            ].map((e) => (
              <Card key={e.degree} className="border-l-4 border-l-primary">
                <CardContent className="p-5 space-y-1">
                  <p className="font-heading font-semibold text-foreground">{e.degree}</p>
                  <p className="text-sm text-muted-foreground">{e.uni}</p>
                  <p className="text-xs text-primary font-heading font-medium">{e.years}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* AFFILIATIONS */}
        <section id="affiliations">
          <SectionHeading icon={<Briefcase />} title="Affiliations & Positions" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-5 space-y-1">
                <p className="font-heading font-semibold text-foreground">Chief Agricultural Research Scientist</p>
                <p className="text-sm text-muted-foreground">Department of Agricultural Research Services (DARS), Ministry of Agriculture, Malawi</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> Kasinthula & Bvumbwe Research Stations</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 space-y-1">
                <p className="font-heading font-semibold text-foreground">Board Director & Chief Scientific Advisor</p>
                <p className="text-sm text-muted-foreground">Mechro Limited</p>
                <p className="text-xs text-muted-foreground">Bridging agriculture & engineering for climate-resilient technology</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* PUBLICATIONS */}
        <section id="publications">
          <SectionHeading icon={<BookOpen />} title="Selected Publications" />
          <div className="space-y-3">
            {PUBLICATIONS.map((p, i) => (
              <Card key={i} className="group">
                <CardContent className="p-5 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-0.5 max-w-2xl">
                    <p className="text-sm text-muted-foreground">{p.authors}</p>
                    <p className="font-heading font-semibold text-foreground leading-snug">{p.title}</p>
                    <p className="text-sm text-muted-foreground italic">{p.journal}, {p.year}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                    {p.openAccess && <Badge variant="secondary" className="font-heading text-xs">Open Access</Badge>}
                    {p.url !== "#" && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* PROJECTS */}
        <section id="projects">
          <SectionHeading icon={<Lightbulb />} title="Projects & Impact" />
          <div className="grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((p) => (
              <Card key={p.title}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-heading">{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* AWARDS */}
        <section id="awards">
          <SectionHeading icon={<Award />} title="Awards & Honors" />
          <div className="grid gap-4 sm:grid-cols-3">
            {AWARDS.map((a) => (
              <Card key={a.name} className="text-center">
                <CardContent className="p-5 space-y-1">
                  <p className="font-heading font-semibold text-foreground">{a.name}</p>
                  <p className="text-sm text-muted-foreground">{a.org}</p>
                  <Badge variant="secondary" className="font-heading">{a.year}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* MEDIA */}
        <section id="media">
          <SectionHeading icon={<Newspaper />} title="Media & Press" />
          <div className="space-y-3">
            {MEDIA.map((m) => (
              <Card key={m.title} className="group">
                <CardContent className="p-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-heading font-semibold text-foreground leading-snug">{m.title}</p>
                    <p className="text-sm text-muted-foreground">{m.source}</p>
                  </div>
                  {m.url !== "#" && (
                    <a href={m.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* CONTACT */}
        <section id="contact">
          <SectionHeading icon={<Mail />} title="Contact & Links" />
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="font-heading font-semibold text-foreground">Institutional Contact</p>
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
                    <Button variant="outline" size="sm" className="font-heading gap-1.5">
                      <ExternalLink className="h-3.5 w-3.5" />
                      {l.label}
                    </Button>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t bg-muted/40 py-8">
        <div className="mx-auto max-w-[1100px] px-5 text-center space-y-2">
          <p className="text-sm text-muted-foreground font-heading">
            DARS · Ministry of Agriculture, Malawi · Mechro Limited
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Dr. Isaac R. Fandika. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Irrigation agronomy · water productivity · soil moisture monitoring · climate-resilient agriculture · Malawi
          </p>
        </div>
      </footer>
    </div>
  );
};

/* ── Reusable section heading ── */
function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <h2 className="mb-6 flex items-center gap-2 font-heading text-2xl font-bold text-foreground">
      <span className="text-primary">{icon}</span>
      {title}
    </h2>
  );
}

export default Index;
