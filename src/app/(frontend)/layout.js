import Context from "../../context/context";
import Footer from "@/components/UI/Footer";

export default function Layout({ children }) {
  return (
    <div className="h-full">
      <Context>
        <div className="min-h-screen">{children}</div>
        <Footer />
      </Context>
    </div>
  );
}
