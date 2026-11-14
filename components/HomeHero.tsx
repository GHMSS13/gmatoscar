import Link from 'next/link';

export default function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative isolate overflow-hidden bg-[#050505] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(220,38,38,0.07)_0%,transparent_55%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pb-12 lg:px-8 lg:pb-10">
        <h1
          id="home-hero-title"
          className="mb-3 max-w-4xl font-rajdhani text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
        >
          O universo dos supercarros.
        </h1>
        <p className="mb-5 max-w-3xl font-exo text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg">
          Histórias, curiosidades, engenharia, desempenho e exclusividade dos supercarros e hipercarros mais extraordinários do mundo.
        </p>
        <div className="flex flex-col items-start gap-3 sm:flex-row">
          <Link
            href="/artigos"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-sm bg-[#dc2626] px-6 py-3 font-rajdhani text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-[#b91c1c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            Ler os artigos
          </Link>
          <Link
            href="/sobre"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-white/30 px-6 py-3 font-rajdhani text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:border-[#dc2626] hover:bg-[#dc2626]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            Conhecer o GMATOSCAR
          </Link>
        </div>
      </div>
    </section>
  );
}
