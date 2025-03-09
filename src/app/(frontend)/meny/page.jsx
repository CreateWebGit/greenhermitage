import Navbar from "@/components/Navbar";
import RestaurantMenu from "@/components/RestaurantMenu";
import { fetchMenu } from "@/lib/actions/menu.actions";
import { fetchProducts } from "@/lib/actions/products.actions";

export default async function Home() {
  const menuData = await fetchProducts();

  return (
    <div className="w-full min-h-full bg-[#F2EEE3]">
      <Navbar white={true} />
      <section
        className="bg-[url('/menu/header.png')] w-full h-[500px] bg-cover flex items-center justify-center"
        style={{ backgroundPosition: "top 0px right 0px" }}
      >
        <h1 className=" font-Caveat text-center z-50 text-[#EFE7D2] text-[128px]">
          Boka bord
        </h1>
      </section>
      <RestaurantMenu menuData={menuData[0].products} />
    </div>
  );
}
