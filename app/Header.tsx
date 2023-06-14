import {
  RiUser3Fill,
  RiRestartFill,
  RiSwordFill,
  RiMenu4Fill,
} from "react-icons/ri";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="sticky top-0 flex h-12 items-center rounded-t-lg bg-neutral-900 px-4 py-2">
      <nav className="flex flex-1 items-center">
        <Link href="" className="group flex">
          <RiMenu4Fill className="h-6 w-6 -rotate-12 fill-amber-200 group-hover:fill-red-500" />
          <RiUser3Fill className="h-6 w-6 -rotate-12 fill-amber-200 group-hover:fill-red-500" />
        </Link>
        <div className="flex w-full items-center justify-center gap-2">
          <h1 className="font-vt323 text-2xl">Merry Post</h1>
          <RiSwordFill className="h-6 w-6 rotate-12" />
        </div>
        {/* will be replaced with client componant with useRouter */}
        <Link href={"/"}>
          <RiRestartFill className="h-6 w-6 rotate-12 fill-amber-200 hover:fill-red-500" />
        </Link>
      </nav>
    </header>
  );
}
