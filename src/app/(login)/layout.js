import Navbar from "@/components/Navbar";
import Context from "../context/context";

export default function Layout({ children }) {
  return (
    <div>
      <Context>
        <div>{children}</div>
      </Context>
    </div>
  );
}
