import { RiCloseCircleFill } from "react-icons/ri";
import Link from "next/link";

export default async function Header() {
  return (
    <section className="h-screen w-full min-w-[32rem] flex-col rounded-lg bg-neutral-800">
      <header className="sticky top-0 flex h-12 items-center justify-between rounded-t-lg border border-b-0 border-neutral-800 bg-neutral-900 px-4 py-2">
        <h2 className="truncate font-vt323 text-lg font-bold">
          Post title blah blah blah blah blah blah
        </h2>
        <Link href="/">
          <RiCloseCircleFill className="h-6 w-6 rotate-12 fill-amber-200 hover:fill-red-500" />
        </Link>
      </header>
      <section className="mt-12"></section>
    </section>
  );
}
