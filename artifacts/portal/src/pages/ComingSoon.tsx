interface ComingSoonProps {
  title: string;
}

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full text-center px-4" data-testid="page-coming-soon">
      <div className="bg-card p-10 rounded-3xl border border-border shadow-sm max-w-md w-full">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight mb-3">{title}</h1>
        <p className="text-muted-foreground">This module is currently under development. Check back later for updates.</p>
      </div>
    </div>
  );
}
