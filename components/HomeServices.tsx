import Link from "next/link";

export function HomeServices() {
  return <section id="home-services" className="shell section home-services" aria-labelledby="home-services-title">
    <div className="section-heading"><div><p className="eyebrow">How we can help</p><h2 id="home-services-title">A website you&apos;re proud to share.<br />A business people can find.</h2></div></div>
    <div className="home-services-grid">
      <article><h3>Website design & development</h3><p>A clear, welcoming website that feels like your business. We design and build it around your customers, with an easy path to get in touch.</p><Link className="text-link" href="/websites">Explore website design <span aria-hidden="true">↗</span></Link></article>
      <article id="local-seo"><h3>Local SEO</h3><p>Help nearby customers find your business. We work on your Google Business Profile, local search content and website foundations so people can understand what you do and where you work.</p><a className="text-link" href="#scope" data-cta="local-seo">Let&apos;s talk local SEO <span aria-hidden="true">↗</span></a></article>
    </div>
  </section>;
}
