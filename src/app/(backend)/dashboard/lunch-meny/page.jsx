import LunchMenu from "@/components/LunchMenu";
import { getTitle } from "@/lib/actions/menyLunch.action";

export default async function Home() {
  const data = await getTitle();
  return <LunchMenu data={data} />;
}
