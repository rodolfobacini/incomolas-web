import { Hero } from "@/components/home/Hero";
import { CategoryBar } from "@/components/home/CategoryBar";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { CategoryCards } from "@/components/home/CategoryCards";
import { DiffBand } from "@/components/home/DiffBand";
import { Institutional } from "@/components/home/Institutional";
import { Testimonials } from "@/components/home/Testimonials";
import { QuoteForm } from "@/components/home/QuoteForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryBar />
      <FeaturedGrid />
      <CategoryCards />
      <DiffBand />
      <Institutional />
      <Testimonials />
      <QuoteForm />
    </>
  );
}
