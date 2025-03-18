import ContactFormFrontend from "@/components/ContactFormFrontend";
import GoogleMapContact from "@/components/GoogleMapContact";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <div className="pt-[150px] min-h-screen bg-[#F2EEE3]">
        <Navbar white={true} />
        <section>
          <h1 className="font-Caveat text-colorTitle text-4xl text-center my-12">
            Kontakta Green Hermitage
          </h1>
          <div className="flex gap-4 ea-grid">
            <div className="ea-col-6 ea-col-xs-12">
              <GoogleMapContact />
            </div>
            <div className="ea-col-6 ea-col-xs-12">
              <ContactFormFrontend />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
