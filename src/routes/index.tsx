import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageWrap } from "@/components/PageWrap";
import { RevealText } from "@/components/RevealText";
import { Marquee } from "@/components/Marquee";
import { MagneticButton } from "@/components/MagneticButton";
import { useJson } from "@/hooks/use-json";
import { dataPaths } from "@/utils/dataLoader";

type Home = {
  hero: { eyebrow: string; title: string; subtitle: string; cta: { label: string; href: string }; secondaryCta: { label: string; href: string } };
  featuredWork: { eyebrow: string; title: string; projects: { slug: string; title: string; category: string; image: string }[] };
  servicesSnapshot: { eyebrow: string; title: string; items: { title: string; description: string }[] };
  marquee: string[];
  footerCta: { title: string; cta: { label: string; href: string } };
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio — Independent Design Studio" },
      { name: "description", content: "Brand, web, motion and digital product for ambitious teams." },
    ],
  }),
  component: Index,
});

function Index() {
  const { data } = useJson<Home>(dataPaths.home);
  if (!data) return <div className="min-h-screen" />;

  return (
    <PageWrap>
      <Hero data={data.hero} />
      <Featured data={data.featuredWork} />
      <ServicesSnapshot data={data.servicesSnapshot} />
      <section className="py-20 md:py-32 border-y border-border">
        <Marquee items={data.marquee} />
      </section>
      <FooterCta data={data.footerCta} />
    </PageWrap>
  );
}

function Hero({ data }: { data: Home["hero"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[92vh] noise overflow-hidden">
      {/* subtle gradient bg */}
      <motion.div
        aria-hidden
        style={{ y }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute -top-1/3 left-1/4 h-[60vw] w-[60vw] rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[40vw] w-[40vw] rounded-full bg-accent/10 blur-[120px]" />
      </motion.div>

      <motion.div style={{ opacity }} className="mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-between px-6 pb-12 pt-24 md:px-10 md:pb-20 md:pt-32">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          {data.eyebrow}
        </motion.span>

        <div className="my-12 md:my-0">
          <RevealText
            as="h1"
            delay={1.5}
            className="font-display text-[14vw] md:text-[10vw] leading-[0.95] tracking-tight"
          >
            {data.title}
          </RevealText>
        </div>

        <div className="flex flex-col-reverse gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.7 }}
            className="max-w-md text-muted-foreground md:text-lg"
          >
            {data.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.7 }}
            className="flex items-center gap-4"
          >
            <MagneticButton>
              <Link
                to={data.cta.href as "/contact"}
                className="inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm uppercase tracking-[0.2em] text-primary-foreground"
              >
                {data.cta.label}
                <span aria-hidden>→</span>
              </Link>
            </MagneticButton>
            <Link
              to={data.secondaryCta.href as "/work"}
              className="story-link text-sm uppercase tracking-[0.2em]"
            >
              {data.secondaryCta.label}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Featured({ data }: { data: Home["featuredWork"] }) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40">
      <div className="mb-12 flex items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{data.eyebrow}</span>
          <RevealText as="h2" className="mt-4 font-display text-5xl md:text-7xl leading-[1] tracking-tight">
            {data.title}
          </RevealText>
        </div>
        <Link to="/work" className="hidden md:inline-flex story-link text-sm uppercase tracking-[0.2em]">
          All work →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
        {data.projects.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            className={i % 2 === 1 ? "md:translate-y-24" : ""}
          >
            <Link to="/work/$slug" params={{ slug: p.slug }} className="block group">
              <div className="media-hover aspect-[4/5] w-full bg-card">
                <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <h3 className="font-display text-3xl md:text-4xl">{p.title}</h3>
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{p.category}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ServicesSnapshot({ data }: { data: Home["servicesSnapshot"] }) {
  return (
    <section className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{data.eyebrow}</span>
            <RevealText as="h2" className="mt-4 font-display text-5xl md:text-6xl leading-[1] tracking-tight">
              {data.title}
            </RevealText>
            <Link to="/services" className="mt-8 inline-block story-link text-sm uppercase tracking-[0.2em]">
              Explore services →
            </Link>
          </div>
          <ul className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            {data.items.map((it, i) => (
              <motion.li
                key={it.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="bg-background p-8"
              >
                <div className="text-xs uppercase tracking-[0.25em] text-primary">0{i + 1}</div>
                <h3 className="mt-4 font-display text-3xl">{it.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{it.description}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FooterCta({ data }: { data: Home["footerCta"] }) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-40 text-center">
      <RevealText as="h2" className="font-display text-5xl md:text-8xl leading-[1] tracking-tight">
        {data.title}
      </RevealText>
      <div className="mt-12 flex justify-center">
        <MagneticButton strength={0.45}>
          <Link
            to={data.cta.href as "/contact"}
            className="inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-sm uppercase tracking-[0.25em] text-primary-foreground"
          >
            {data.cta.label} <span aria-hidden>→</span>
          </Link>
        </MagneticButton>
      </div>
    </section>
  );
}
