export default function MenuLayout({ children }) {
  return (
    <section className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {children}
      </div>
    </section>
  );
}