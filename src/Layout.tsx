
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#0f172a] relative">
  {/* Dark Basic Grid Background - Faded */}
  <div
    className="fixed inset-0 z-0"
    style={{
      background: "#0f172a",
      backgroundImage: `
        linear-gradient(to right, rgba(148,163,184,0.2) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(148,163,184,0.2) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    }}
  />
  <div className="relative z-10">{children}</div>
</div>
  );
}

