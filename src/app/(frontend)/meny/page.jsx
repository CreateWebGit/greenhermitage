import Navbar from "@/components/Navbar";
import RestaurantMenu from "@/components/RestaurantMenu";
import HeaderMenu from "@/components/UI/HeaderMenu";
import { fetchMenu } from "@/lib/actions/menu.actions";
import { fetchMenuPublished } from "@/lib/actions/menuPublished.action";
import { fetchProducts } from "@/lib/actions/products.actions";

export default async function Home() {
  const menuData = await fetchProducts();
  const menuPublishedData = await fetchMenuPublished();

  return (
    <div className="w-full min-h-full bg-[#F2EEE3]">
      <Navbar menuPublishedData={menuPublishedData} />
      <HeaderMenu />
      <RestaurantMenu menuData={menuData[0].products} />
    </div>
  );
}
