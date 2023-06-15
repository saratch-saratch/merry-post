import { RiChat3Line } from "react-icons/ri";
import moment from "moment";
import Header from "./Header";
import Posts from "./Posts";

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
          <button className="flex h-12 w-1/4 items-center justify-center gap-1 self-center rounded-3xl bg-red-500 font-semibold text-amber-200 hover:bg-red-600">
            New Post
            <RiChat3Line className="h-6 w-6 " />
          </button>
        </div>
        <div className=" h-1 w-full rounded-lg bg-gradient-to-r from-amber-200 via-neutral-700 to-neutral-800" />
        <Posts />
      </section>
    </section>
  );
}
