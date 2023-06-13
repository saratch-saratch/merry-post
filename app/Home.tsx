import { RiUser3Fill, RiSwordFill, RiMenu4Fill } from "react-icons/ri";
import Link from "next/link";

export default async function Home() {
  return (
    <section className=" left-0 h-screen w-full  overflow-scroll">
      <header className="sticky top-0 flex h-12 items-center border-b border-b-neutral-700 bg-neutral-900 px-4 py-2">
        <nav className="flex flex-1 items-center">
          <Link href="" className="group flex gap-0">
            <RiMenu4Fill className="h-6 w-6 -rotate-12 fill-amber-200 group-hover:fill-red-500" />
            <RiUser3Fill className="h-6 w-6 -rotate-12 fill-amber-200 group-hover:fill-red-500" />
          </Link>
          <div className="flex w-full items-center justify-center gap-4">
            <div className="flex items-center gap-4">
              <h1 className="font-vt323 text-2xl">Merry Post</h1>
              <RiSwordFill className="h-6 w-6 rotate-12" />
            </div>
          </div>
        </nav>
      </header>
      <section className="flex flex-col overflow-x-hidden overflow-y-scroll p-4">
        Server side rendering: <span className="text-teal-200">loading...</span>
        <Link href="/" className="bg-teal-800  hover:bg-teal-400">
          Topic
        </Link>
        <Link href="/" className="bg-teal-800  hover:bg-teal-400">
          Home
        </Link>
        <div></div>
      </section>
    </section>
  );
}
