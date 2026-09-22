import { Book } from "@/components/book/Book";

const Index = () => {
  return (
    <main className="min-h-screen px-3 py-3 sm:px-6 sm:py-7 lg:px-10">
      <div className="mx-auto mb-4 flex max-w-[1100px] items-center justify-between px-1 font-mono text-[9px] uppercase tracking-[0.18em] text-cream/70 sm:px-2">
        <span>AS / ENGINEERING JOURNAL</span>
        <span>ISSUE 01 · 2026</span>
      </div>
      <Book />
    </main>
  );
};

export default Index;
