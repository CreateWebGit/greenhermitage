import { EmailTemplateCustomer } from "@/components/email-template-customer";
import { EmailTemplateRestaurant } from "@/components/email-template-restaurant";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
  try {
    const { name, guests, phone, message, date, time } = await req.json();
    console.log("my req", guests);

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@updates.createweb.se>",
      to: "kaj.olason@icloud.com",
      subject: "Bokningsbekräftelse - Green Hermitage",
      react: EmailTemplateCustomer({
        name: name,
        guests: guests,
        phone: phone,
        message: message,
        date: date,
        time: time,
      }),
    });

    const { data2, error2 } = await resend.emails.send({
      from: "Acme <onboarding@updates.createweb.se>",
      to: "kajjan381@gmail.com",
      subject: "Ny bordsbokning",
      react: EmailTemplateRestaurant({
        name: name,
        guests: guests,
        phone: phone,
        message: message,
        date: date,
        time: time,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    if (error2) {
      return Response.json({ error2 }, { status: 500 });
    }

    return Response.json({ message: "alla ok", status: 200 }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
