import LunchMenu from "@/components/LunchMenu";
import { getAllLuch } from "@/lib/actions/menyLunch.action";

export default async function Home() {
  const data = await getAllLuch();
  return <LunchMenu data={data} />;
}
