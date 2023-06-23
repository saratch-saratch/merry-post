import {
  RiChat3Line,
  RiUser3Fill,
  RiSwordFill,
  RiMenu4Fill,
} from "react-icons/ri";
import Feed from "./Feed";
import Link from "next/link";
import ReloadButton from "./ReloadButton";

export default async function Home() {
  return (
    <section className="flex h-screen w-full min-w-[32rem] flex-col overflow-scroll rounded-lg bg-neutral-800">
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
      <section className="flex flex-col gap-4 overflow-x-hidden overflow-y-scroll bg-neutral-800 p-4">
        <div className="flex flex-row gap-4">
          <div className="w-3/4 rounded-md bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-800 px-4 py-2">
            <p>Welcome to Merry Post! {"(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"}</p>
            <p>Click the button to create a new post</p>
          </div>
          <Link href="/home/create" className="w-1/4 self-center">
            <button className="flex h-12 w-full items-center justify-center gap-1 rounded-3xl bg-rose-600 font-semibold text-amber-200 hover:bg-rose-500 hover:text-black">
              New Post
              <RiChat3Line className="h-6 w-6" />
            </button>
          </Link>
        </div>
        <div className=" h-1 w-full rounded-lg bg-gradient-to-r from-amber-200 via-neutral-700 to-neutral-800" />
        <Feed />
      </section>
    </section>
  );
}
