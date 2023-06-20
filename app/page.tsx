import { redirect } from "next/navigation";

export default function Index() {
  // redirect("/login");

  //if have token then:
  redirect("/home");
}
