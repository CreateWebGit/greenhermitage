import Context from "../../context/context";
import Footer from "@/components/UI/Footer";

// app/layout.tsx

export const metadata = {
  title: "Green Hermitage - Vegetarisk restaurang i Gamla Stan, Stockholm",
  description: "Vegetarisk mat lagad med kärlek i en trevlig miljö i Gamla Stan i Stockholm.",
  metadataBase: new URL("https://greenhermitage.se"),
  openGraph: {
    title: "Green Hermitage - Vegetarisk restaurang i Gamla Stan",
    description: "Vegetarisk mat lagad med kärlek i en trevlig miljö i Gamla Stan.",
    url: "https://greenhermitage.se",
    siteName: "Green Hermitage",
    locale: "sv_SE",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Hermitage - Vegetarisk restaurang i Gamla Stan",
    description: "Vegetarisk mat lagad med kärlek i en trevlig miljö i Gamla Stan.",
  },
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true
  }
};

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
