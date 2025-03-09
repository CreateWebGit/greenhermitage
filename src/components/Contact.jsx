"use server";
import React from "react";
import EditForm from "@/components/EditForm";

import { MailPlus, Phone } from "lucide-react";
import { CgWebsite } from "react-icons/cg";
import { MapPinHouse } from "lucide-react";
import { TbHomeEdit } from "react-icons/tb";

import { MapPinX } from "lucide-react";
import EditAddressForm from "./EditAddressForm";

export default async function Contact({ data }) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      Kontakta oss
      <EditForm
        icon={<MailPlus />}
        data={data?.contacts?.companyEmail}
        title="Epost"
        dataName="companyEmail"
      />
      <EditForm
        icon={<Phone />}
        data={data?.contacts?.phone}
        title="Telefonnummer"
        dataName="phone"
      />
      <EditAddressForm
        icon={<TbHomeEdit size={22} />}
        data={data?.contacts?.address}
        title="Adress"
        dataName="phone"
      />
      <EditForm
        icon={<CgWebsite />}
        data={data?.contacts?.weburl}
        title="Hemsida"
        dataName="weburl"
      />
    </div>
  );
}
