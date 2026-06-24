interface ComingSoonProps {
  title: string;
}

export default function ComingSoon({ title }: ComingSoonProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center px-4" data-testid="page-coming-soon">
      <div className="bg-white p-8 rounded-2xl border border-border shadow-sm max-w-md w-full">
        <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground">This module is currently under development. Check back later for updates.</p>
      </div>
    </div>
  );
}
