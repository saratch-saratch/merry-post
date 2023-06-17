import { RiChat3Line } from "react-icons/ri";
import moment from "moment";
import Header from "./Header";
import Feed from "./Feed";
import Link from "next/link";

export default async function Home() {
  const date = moment().fromNow();

  return (
    <section className="h-screen w-full min-w-[32rem] overflow-scroll rounded-lg bg-neutral-800">
      <Header />
      <section className="flex flex-col gap-4 overflow-x-hidden overflow-y-scroll bg-neutral-800 p-4">
        <div className="flex flex-row gap-4">
          <div className="w-3/4 rounded-md bg-gradient-to-r from-neutral-700 via-neutral-800 to-neutral-800 px-4 py-2">
            <p>Welcome to Merry Post! {"(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"}</p>
            <p>Click the button to create a new post</p>
          </div>
          <Link href="/" className="w-1/4 self-center">
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
