import {
  RiUser3Fill,
  RiSwordFill,
  RiMenu4Fill,
  RiChat3Line,
} from "react-icons/ri";
import Link from "next/link";

export default async function Home() {
  return (
    <section className=" left-0 h-screen w-full overflow-scroll rounded-lg bg-neutral-800">
      <header className="sticky top-0 flex h-12 items-center rounded-t-lg border border-b-0 border-neutral-800 bg-neutral-900 px-4 py-2">
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
      <section className="flex flex-col gap-4 overflow-x-hidden overflow-y-scroll bg-neutral-800 p-4">
        <div className=" flex flex-row gap-4">
          <div className="w-3/4 rounded-lg bg-neutral-700 px-4 py-2">
            <p className="">Welcome to Merry Post!</p>
            <p>Click the button to create a new post</p>
          </div>
          <button className="flex h-12 w-1/4 items-center justify-center gap-1 self-center rounded-3xl bg-red-500 p-2 text-amber-200 hover:outline hover:outline-white">
            New Post
            <RiChat3Line className="h-6 w-6 rotate-12 pb-1" />
          </button>
        </div>
        <div className=" h-1 w-full bg-neutral-700" />
        {[1, 2, 3, 4, 5, 6].map((e) => (
          <div className="h-32 w-full rounded-lg bg-neutral-700" />
        ))}
        <div></div>
      </section>
    </section>
  );
}
