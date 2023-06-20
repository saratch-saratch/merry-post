import { RiUser3Fill, RiSwordFill, RiMenu4Fill } from "react-icons/ri";
import Link from "next/link";
import ReloadButton from "./ReloadButton";

export default async function Header() {
  return (
    <header className="sticky top-0 flex h-12 items-center rounded-t-lg bg-neutral-900 px-4 py-2">
      <nav className="flex flex-1 items-center">
        <Link href="/home/settings">
          <button className="group flex">
            <RiMenu4Fill className="h-6 w-6 -rotate-12 fill-amber-200 group-hover:fill-rose-600" />
            <RiUser3Fill className="h-6 w-6 -rotate-12 fill-amber-200 group-hover:fill-rose-600" />
          </button>
        </Link>
        <div className="flex w-full justify-center">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="font-vt323 text-2xl">Merry Post</h1>
            <RiSwordFill className="h-6 w-6 rotate-12" />
          </Link>
        </div>
        <ReloadButton />
      </nav>
    </header>
  );
}
