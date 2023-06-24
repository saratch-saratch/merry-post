import { RiCloseCircleFill, RiChat3Line } from "react-icons/ri";
import Link from "next/link";
import Content from "./Content";

//here

export default async function Settings() {
  return (
    <main className="ml-2 flex h-screen w-full min-w-[32rem] flex-col overflow-auto rounded-lg bg-neutral-800">
      <header className="sticky top-0 flex h-12 w-full shrink-0 items-center justify-between gap-2 rounded-t-lg bg-neutral-900 px-4 py-2">
        <div className="flex gap-4 overflow-hidden">
          <RiChat3Line className="h-6 w-6 shrink-0 -rotate-90" />
          <h3 className="truncate font-vt323 text-lg font-bold">
            Profile settings
          </h3>
        </div>
        <Link href={"/home"}>
          <RiCloseCircleFill className="h-6 w-6 rotate-12 fill-amber-200 hover:fill-rose-600" />
        </Link>
      </header>
      <Content />
    </main>
  );
}
