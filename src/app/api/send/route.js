import { EmailTemplateCustomer } from "@/components/email-template-customer";
import { EmailTemplateRestaurant } from "@/components/email-template-restaurant";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req, res) {
	try {
		const { name, email, guests, phone, message, date, time } =
			await req.json();
		console.log("my req", guests);

		//så här ska to vara kundens email
		const { data, error } = await resend.emails.send({
			from: "Green Hermitage <onboarding@updates.createweb.se>",
			to: email,
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

		//här ska to vara arams email
		const { data2, error2 } = await resend.emails.send({
			from: "Green Hermitage <onboarding@updates.createweb.se>",
			to: "aramavagian@yahoo.se",
			cc: ["kaj.olason@icloud.com", "emil@createweb.se"],
			subject: `${name} har bokat bord!`,
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

		return Response.json(
			{ message: "alla ok", status: 200 },
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
