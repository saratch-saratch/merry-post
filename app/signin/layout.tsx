export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen min-w-[32rem] bg-stone-50">
      <div className="flex h-1/3 items-end">
        <div className="h-1/4 w-full bg-gradient-to-b from-stone-50 to-stone-300"></div>
      </div>
      <div className="h-1/3 bg-neutral-400">{children}</div>
      <div className="h-1/3">
        <div className="h-1/4 bg-gradient-to-t from-stone-50 to-stone-300"></div>
      </div>
      <p className="absolute bottom-0 left-4 text-sm text-black">
        2023 Saratch Tanapongwonglert
      </p>
    </main>
  );
}
