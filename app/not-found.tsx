import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export default function NotFound() {
  return (
    <div className="ub">
      <Header />
      <main className="page">
        <p className="meta">404</p>
        <h1>That page doesn&apos;t exist.</h1>
        <div className="page-actions">
          <Link href="/" className="btn blue">
            Back to the start <span className="dot" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
