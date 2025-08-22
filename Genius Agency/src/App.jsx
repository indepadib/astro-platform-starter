import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowRight, LineChart, Megaphone, Mail, Rocket, Brain, BarChart3, ChevronRight, Star, BadgeCheck, Zap } from "lucide-react";

/**
 * FIX + ENHANCE
 * - Restores all the "missing" sections (Manifesto, Why Us stats, Split-screen white section, Testimonials marquee)
 * - Ensures animations are visible using framer-motion `initial/whileInView` on every block
 * - Keeps JSX valid and Tailwind classes compatible with Vite + Tailwind JIT
 * - Leaves deployment file contents as comments at bottom
 */

// ===== Helpers =====
const ease = [0.22, 1, 0.36, 1];
const fadeUp = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
const fade = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6, ease } } };
const stagger = (delay = 0.1) => ({ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: delay } } });

function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-black">
      <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-purple-500 border-solid" />
      <p className="mt-6 text-white/70 text-sm tracking-widest uppercase">Genius Agency</p>
    </div>
  );
}

function SoftBg({ y }) {
  return (
    <motion.div style={{ y }} className="absolute inset-0 -z-10">
      <div className="absolute -top-24 right-1/4 h-80 w-80 bg-purple-500 opacity-30 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 left-1/3 h-96 w-96 bg-emerald-400 opacity-25 blur-3xl rounded-full" />
    </motion.div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  // Dev-only sanity checks ("tests")
  useEffect(() => {
    if (import.meta && import.meta.env && import.meta.env.DEV) {
      const ids = ["top", "manifesto", "services", "why", "split", "projets", "contact"];
      ids.forEach((id) => console.assert(!!document.getElementById(id), `Section #${id} should exist`));
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {loading && <Loader />}

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 bg-black/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-purple-500 via-fuchsia-500 to-emerald-400" />
            <span className="font-semibold tracking-tight">Genius Agency</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <a href="#manifesto" className="hover:text-white">Manifesto</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#why" className="hover:text-white">Pourquoi nous</a>
            <a href="#split" className="hover:text-white">Méthode</a>
            <a href="#projets" className="hover:text-white">Cas clients</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <a href="https://calendly.com/" target="_blank" rel="noopener" className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-black hover:bg-white/90">
            Audit gratuit <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* HERO (split + parallax) */}
      <section id="top" className="relative overflow-hidden">
        <SoftBg y={y} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div variants={stagger(0.2)} initial="hidden" animate="show" className="grid lg:grid-cols-12 gap-10 items-center">
            <motion.div variants={fadeUp} className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
                <Sparkles className="h-4 w-4" /> Agence growth • data-driven • créative
              </p>
              <h1 className="mt-4 text-4xl sm:text-6xl font-semibold leading-[1.02] tracking-tight">
                On hacke votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-emerald-300">croissance</span>.
              </h1>
              <p className="mt-6 text-white/70 text-lg max-w-2xl">
                Des systèmes marketing intelligents, itérés vite, qui transforment l’attention en revenus mesurables.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="https://calendly.com/" target="_blank" rel="noopener" className="rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 py-3 hover:opacity-90 inline-flex items-center gap-2">
                  Démarrer un projet <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#services" className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 hover:bg-white/10 inline-flex items-center gap-2">Voir nos services</a>
              </div>

              {/* marquee brands */}
              <div className="mt-10 overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
                <div className="flex items-center gap-6 whitespace-nowrap text-xs opacity-60" style={{ animation: "marquee 24s linear infinite" }}>
                  {["Meta","Google","HubSpot","Shopify","Klaviyo","TikTok","LinkedIn","GA4"].map((b) => (
                    <span key={b} className="border border-white/10 rounded-md px-3 py-2">{b}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* KPI collage */}
            <motion.div variants={fadeUp} className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-7 opacity-20">
                  {Array.from({ length: 42 }).map((_, i) => (
                    <div key={i} className="border border-white/10" />
                  ))}
                </div>
                <div className="absolute inset-0 p-5 grid grid-cols-2 gap-4">
                  {[
                    { k: "+241% ROI Ads", d: "Meta/Google piloté valeur" },
                    { k: "+178% Trafic SEO", d: "Technique + contenu + maillage" },
                    { k: "x3 ROAS Meta", d: "Créatifs testés en boucle courte" },
                    { k: "CTR +62%", d: "Angles & hooks performants" },
                  ].map((s, i) => (
                    <div key={i} className="rounded-2xl bg-black/60 border border-white/10 p-4">
                      <p className="text-sm text-white/60">KPI</p>
                      <p className="text-xl font-semibold mt-1">{s.k}</p>
                      <p className="text-xs text-white/50 mt-1">{s.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="h-16 bg-white/10" />
      </section>

      {/* MANIFESTO (big type) */}
      <section id="manifesto" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger()} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="grid lg:grid-cols-12 gap-10 items-end">
            <motion.h2 variants={fadeUp} className="lg:col-span-7 text-4xl sm:text-6xl font-semibold leading-[1.05]">
              Des idées <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-purple-400">audacieuses</span>.
              Des résultats <span className="underline decoration-white/30 underline-offset-8">mesurables</span>.
            </motion.h2>
            <motion.p variants={fadeUp} className="lg:col-span-5 text-white/70 text-lg">
              Création, média et data : nous livrons des cycles d’itération rapides. Pas de blabla : des KPI, des tests, du scale.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl sm:text-5xl font-semibold tracking-tight text-center">
            Nos expertises clés
          </motion.h3>
          <p className="mt-4 text-center text-white/70 max-w-2xl mx-auto">Social, Ads, SEO, Email, Growth & Data. Un écosystème pensé pour la performance.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Réseaux sociaux", desc: "Stratégie éditoriale, production, community & reporting.", icon: <Megaphone className="h-5 w-5" /> },
              { title: "Campagnes publicitaires", desc: "Meta, Google, TikTok. Pilotage ROAS & CAC.", icon: <Rocket className="h-5 w-5" /> },
              { title: "SEO", desc: "Technique, contenu, netlinking. Trafic durable & qualifié.", icon: <LineChart className="h-5 w-5" /> },
              { title: "Email marketing", desc: "Flows & campagnes. CRM / automation.", icon: <Mail className="h-5 w-5" /> },
              { title: "Growth & Data", desc: "A/B testing, dashboards, attribution multi-touch.", icon: <Brain className="h-5 w-5" /> },
              { title: "Brand & Création", desc: "Identité visuelle, landings, assets premium.", icon: <BarChart3 className="h-5 w-5" /> },
            ].map((s, i) => (
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} key={i}>
                <div className="group h-full border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden rounded-2xl p-6">
                  <div className="flex items-center gap-3 text-lg text-white">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 text-black">
                      {s.icon}
                    </span>
                    {s.title}
                  </div>
                  <p className="mt-3 text-white/80 leading-relaxed">{s.desc}</p>
                  <div className="mt-5 h-0.5 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US — proofs & stats */}
      <section id="why" className="py-16 sm:py-24 border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3 items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h3 className="text-2xl font-semibold flex items-center gap-2"><BadgeCheck className="h-5 w-5"/> Pourquoi nous</h3>
            <p className="text-white/70 mt-2">Mix rare de stratégie, créativité et data. On parle KPIs, pas buzzwords.</p>
          </motion.div>
          <div className="grid grid-cols-3 gap-4 md:col-span-2">
            {[
              {n:"+240%", l:"ROI moyen Ads"},
              {n:"x3", l:"ROAS campagnes Meta"},
              {n:"-38%", l:"CAC moyen"},
              {n:"+178%", l:"Trafic SEO"},
              {n:"< 30j", l:"Time‑to‑launch"},
              {n:"95%", l:"Satisfaction"},
            ].map((k, i)=> (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-2xl border border-white/10 p-5 bg-white/5">
                <div className="text-2xl font-semibold">{k.n}</div>
                <div className="text-white/60 text-sm">{k.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT-SCREEN clair (contrast) */}
      <section id="split" className="bg-white text-black py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:col-span-1">
              <h3 className="text-3xl sm:text-5xl font-semibold leading-tight">Ce que vous obtenez</h3>
              <p className="mt-4 text-black/70">Transparence, cadence d’exécution et un plan d’action piloté par la data.</p>
            </motion.div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                {t:"Dashboard temps réel", d:"Suivi des ventes, CAC, ROAS, LTV par canal."},
                {t:"Sprints de 2 semaines", d:"Hypothèses, tests, validation, scale."},
                {t:"Créatifs A/B", d:"Angles, hooks, UGC, carrousels, landings."},
                {t:"SEO durable", d:"Tech + contenu, croissance organique stable."},
              ].map((b, i)=> (
                <motion.div key={i} variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-2xl border border-black/10 p-6 bg-black/[.02] hover:bg-black/[.04] transition">
                  <h4 className="font-semibold">{b.t}</h4>
                  <p className="text-black/70 mt-2 text-sm">{b.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJETS + témoignages */}
      <section id="projets" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl sm:text-5xl font-semibold tracking-tight text-center mb-10">
            Études de cas
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <motion.a key={i} href="#" whileHover={{ y: -4 }} className="group relative overflow-hidden rounded-2xl border border-white/10">
                <div className="aspect-[4/3] bg-gradient-to-br from-white/10 via-white/0 to-white/10" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/60">E‑commerce</p>
                    <h3 className="font-semibold">Scale d'acquisition x3 en 60 jours</h3>
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* bandeau témoignages défilants */}
          <div className="mt-12 border-t border-white/10 pt-10 overflow-hidden">
            <div className="flex items-center gap-6 whitespace-nowrap" style={{ animation: "marquee 28s linear infinite" }}>
              {[
                { n: "Nassim, SaaS", t: '"Roadmap claire, on voit l’impact chaque semaine."' },
                { n: "Maya, Retail", t: '"Meta + Email: nos ventes ont décollé."' },
                { n: "Yacine, E‑com", t: '"Tests rapides, ROAS x3."' },
              ].map((c, i) => (
                <div key={i} className="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-sm">
                  <span className="inline-flex items-center gap-2 text-white/80">
                    <Star className="h-4 w-4" /> {c.t} — <span className="text-white/50">{c.n}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">Prêt à scaler votre business ?</h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">Plan d’action, KPIs et quick wins dès le premier échange.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://calendly.com/" target="_blank" rel="noopener" className="rounded-lg bg-gradient-to-r from-emerald-400 to-purple-500 px-8 py-3 text-black hover:opacity-90">Réserver un audit gratuit</a>
            <a href="#" className="rounded-lg border border-white/20 bg-white/5 px-8 py-3 hover:bg-white/10">Écrire sur WhatsApp</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-white/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Genius Agency — Tous droits réservés.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Politique de confidentialité</a>
            <a href="#" className="hover:text-white">Mentions légales</a>
          </div>
        </div>
      </footer>

      {/* Keyframes for marquee */}
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

/*
=========================
Deployment files (copy)
=========================
1) netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

2) package.json
{
  "name": "genius-agency-landing",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^10.16.4",
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.1",
    "vite": "^5.0.0"
  }
}

3) tailwind.config.js
export default {
  content: ["./index.html", "./src.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}

4) postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

5) index.html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Genius Agency</title>
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body class="bg-black">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

6) src/main.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
createRoot(document.getElementById('root')).render(<App />)

7) index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
*/
