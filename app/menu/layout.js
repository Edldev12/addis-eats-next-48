export default function MenuLayout({ children }) {
  return (
    <section className="min-h-screen bg-stone-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      {children}
    </section>
  );
}