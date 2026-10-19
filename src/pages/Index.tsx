import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import fieldImg from "@/assets/bg-about.jpg";
import maizeImg from "@/assets/hero-bg.jpg";
import seedlingsImg from "@/assets/bg-projects.jpg";
import wheatImg from "@/assets/bg-contact.jpg";
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

const LINK_ICONS: Record<string, typeof Globe> = {
  ResearchGate: Globe,
  "Google Scholar": BookOpen,
  ORCID: FileText,
  LinkedIn: Linkedin,
};

function SectionTitle({ title, id, context }: { title: string; id?: string; context?: string }) {
  return (
    <div className="section-title">
      {context && <p className="section-context">{context}</p>}
      <h2 id={id} className="section-heading">{title}</h2>
    </div>
  );
}

function ExternalArrow() {
  return <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />;
}

const Index = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const targets = NAV_ITEMS
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1).replace(/^\/+/, "");
    if (!hash) return;

    let id = hash;
    try {
      id = decodeURIComponent(hash);
    } catch {
      // Keep the literal hash if it contains malformed escape sequences.
    }

    const target = document.getElementById(id);
    if (!target) return;

    if (NAV_ITEMS.some((item) => item.id === id)) setActiveSection(id);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ScrollProgress />
      <BackToTop />

      <nav aria-label="Main navigation" className={`site-nav sticky top-0 z-40 ${scrolled ? "site-nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#hero" onClick={closeMobileMenu} className="nav-mark" aria-label="Dr. Isaac R. Fandika, home">
            I·R·F
          </a>
          <ul className="desktop-nav">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={activeSection === item.id ? "location" : undefined}
                  className={`nav-link ${activeSection === item.id ? "nav-link-active" : ""}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <DarkModeToggle />
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <ul id="mobile-navigation" className="mobile-nav">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={closeMobileMenu}
                  aria-current={activeSection === item.id ? "location" : undefined}
                  className={`mobile-nav-link ${activeSection === item.id ? "mobile-nav-link-active" : ""}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>

      <header id="hero" className="hero anchor-target">
        <div className="page-shell hero-layout">
          <div className="hero-copy">
            <p className="collaboration-note">Available for collaboration</p>
            <p className="hero-role">Chief Agricultural Research Scientist <span aria-hidden="true">·</span> DARS, Malawi</p>
            <h1 className="hero-name">Dr. Isaac Rhinnexious Fandika</h1>
            <p className="hero-intro">
              Irrigation agronomist advancing water-smart, climate-resilient
              agriculture for smallholder farmers in sub-Saharan Africa.
            </p>
            <p className="hero-affiliation">Department of Agricultural Research Services · Ministry of Agriculture</p>
            <ul className="interest-list" aria-label="Research interests">
              {HERO_KEYWORDS.map((keyword) => <li key={keyword}>{keyword}</li>)}
            </ul>
            <div className="hero-actions">
              <a href="#contact" className="action-primary"><Mail aria-hidden="true" /> Get in touch</a>
              <button type="button" className="action-secondary" disabled title="A CV file is not available in this project">
                <Download aria-hidden="true" /> Download CV
              </button>
            </div>
            <div className="hero-facts" aria-label="Professional profile facts">
              <div><strong>15+</strong><span>Years in applied research</span></div>
              <div><strong>{PUBLICATIONS.length}+</strong><span>Peer-reviewed papers</span></div>
            </div>
          </div>
          <figure className="portrait-frame">
            <img src={profileImg} width="640" height="640" alt="Dr. Isaac R. Fandika" fetchPriority="high" />
            <figcaption><MapPin aria-hidden="true" /> Malawi</figcaption>
          </figure>
        </div>
      </header>

      <main id="main-content">
        <section className="page-shell about-section section-space" aria-labelledby="about">
          <SectionTitle title="About" id="about" context="Biography" />
          <div className="about-layout">
            <div className="about-copy">
              <h3 className="about-lead">
                Dr. Isaac Rhinnexious Fandika is a seasoned irrigation agronomist improving water productivity for smallholder farming systems across sub-Saharan Africa.
              </h3>
              <p>
                His research focuses on innovative irrigation strategies, precision
                soil-moisture monitoring, and digital advisory tools. With over 15 years
                of applied research across Kasinthula and Bvumbwe research stations,
                he has published widely in peer-reviewed journals and led multi-country
                projects that translate science into field-ready solutions.
              </p>
            </div>
            <figure className="field-figure">
              <img src={fieldImg} width="1280" height="940" loading="lazy" alt="Irrigated field with a tractor, cattle, and agricultural workers" />
            </figure>
          </div>
        </section>

        <section className="page-shell education-section section-space anchor-target" aria-labelledby="education">
          <SectionTitle title="Education" id="education" context="Academic journey" />
          <ol className="education-list">
            {EDUCATION.map((item) => (
              <li key={item.degree} className="education-item">
                <span className="education-date">{item.years}</span>
                <div>
                  <h3>{item.degree}</h3>
                  {item.field && <p>{item.field}</p>}
                  <p className="muted">{item.uni}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="affiliations" className="page-shell section-space anchor-target" aria-labelledby="affiliations-title">
          <SectionTitle title="Affiliations" id="affiliations-title" context="Current positions" />
          <div className="affiliations-list">
            {AFFILIATIONS.map((item) => (
              <article key={item.role} className="affiliation-item">
                <h3>{item.role}</h3>
                <div>
                  <p className="affiliation-org">{item.org}</p>
                  <p className="muted">{item.detail}</p>
                  <p className="affiliation-location"><MapPin aria-hidden="true" />{item.location}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="publications" className="page-shell section-space anchor-target" aria-labelledby="publications-title">
          <SectionTitle title="Publications" id="publications-title" />
          <p className="section-intro">Selected peer-reviewed work</p>
          <ol className="publication-list">
            {[...PUBLICATIONS].sort((a, b) => b.year - a.year).map((item) => (
              <li key={`${item.year}-${item.title}`} className="publication-item">
                <span className="publication-year">{item.year}</span>
                <div className="publication-detail">
                  <h3>{item.title}</h3>
                  <p className="publication-authors">{item.authors}</p>
                  <p className="publication-meta"><em>{item.journal}</em>{item.openAccess && <span>Open access</span>}</p>
                </div>
                {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={`Read ${item.title}`}><span>Read paper</span><ExternalArrow /></a>}
              </li>
            ))}
          </ol>
        </section>

        <section id="projects" className="projects-section section-space anchor-target" aria-labelledby="projects-title">
          <div className="page-shell">
            <SectionTitle title="Projects & impact" id="projects-title" />
            <p className="section-intro">Research initiatives</p>
            <div className="project-image-strip" aria-hidden="true">
              <img src={maizeImg} width="1280" height="853" loading="lazy" alt="" />
              <img src={seedlingsImg} width="1280" height="853" loading="lazy" alt="" />
              <img src={wheatImg} width="1280" height="720" loading="lazy" alt="" />
            </div>
            <div className="project-list">
              {PROJECTS.map((item) => (
                <article key={item.title} className="project-item">
                  <div className="project-main">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-link">Learn more <ExternalArrow /></a>}
                  </div>
                  <div className="project-stat"><strong>{item.stat}</strong><span>{item.statLabel}</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-shell recognition-section section-space">
          <div id="awards" className="recognition-column anchor-target" aria-labelledby="awards-title">
            <SectionTitle title="Awards & honors" id="awards-title" context="Recognition" />
            <ol className="award-list">
              {AWARDS.map((item) => (
                <li key={item.name} className="award-item">
                  <span className="award-year">{item.year}</span>
                  <div><h3>{item.name}</h3><p className="muted">{item.org}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div id="media" className="recognition-column anchor-target" aria-labelledby="media-title">
            <SectionTitle title="Media" id="media-title" context="Press" />
            <ul className="media-list">
              {MEDIA.map((item) => (
                <li key={item.title}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <span><strong>{item.title}</strong><small>{item.source}</small></span>
                    <ExternalArrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="contact-section anchor-target" aria-labelledby="contact-title">
          <div className="page-shell contact-layout">
            <div className="contact-copy">
              <p className="contact-kicker">Contact</p>
              <h2 id="contact-title">Let's build water-smart futures.</h2>
              <p>Open to research partnerships, advisory roles, and collaborations on climate-resilient irrigation across sub-Saharan Africa.</p>
              <p className="contact-label">Institutional</p>
              <p className="contact-address">Department of Agricultural Research Services (DARS)<br />Ministry of Agriculture<br />P.O. Box 158, Lilongwe, Malawi</p>
            </div>
            <div className="contact-details">
              <p className="contact-label">Direct</p>
              <a href={`mailto:${CONTACT_INFO.email}`}><Mail aria-hidden="true" />{CONTACT_INFO.email}</a>
              <a href={`tel:${CONTACT_INFO.phone}`}><Phone aria-hidden="true" />{CONTACT_INFO.phone}</a>
              <p className="contact-label">Profiles</p>
              <div className="profile-links" role="group" aria-label="Professional profiles">
                {CONTACT_LINKS.map((item) => {
                  const Icon = LINK_ICONS[item.label] || ExternalLink;
                  return <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer"><Icon aria-hidden="true" />{item.label}</a>;
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <p className="footer-name">Dr. Isaac R. Fandika</p>
          <p>DARS · Mechro Limited · Malawi</p>
          <p>© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
