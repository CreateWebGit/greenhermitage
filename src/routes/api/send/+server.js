import { Resend } from "resend";
import { RESEND_API_KEY } from "$env/static/private";
import Renderer, { toPlainText } from "better-svelte-email/render";
import BookingEmail from "$lib/emails/BookingEmail.svelte";
const resend = new Resend(RESEND_API_KEY);
const renderer = new Renderer();

export async function POST({ request }) {
	try {
		const { name, email, guests, phone, message, date, time, language } =
			await request.json();

		const normalizedLanguage = language === "en" ? "en" : "sv";

		
        const customerHtml = await renderer.render(BookingEmail, {
			props: { name, email, guests, phone, message, date, time, language: normalizedLanguage },
		});
        const customerText = toPlainText(customerHtml);

        //customer mail
		const { data, error } = await resend.emails.send({
			from: "Green Hermitage <onboarding@updates.createweb.se>",
			to: email,
			subject:
				normalizedLanguage === "en"
					? "Booking confirmation - Green Hermitage"
					: "Bokningsbekräftelse - Green Hermitage",
			html: customerHtml,
			text: customerText,
		});

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

        const adminHtml = await renderer.render(BookingEmail, {
			props: {
				name,
				email,
				guests,
				phone,
				message,
				date,
				time,
				language: "sv",
				title: "Green Hermitage - Bokningsbekräftelse",
				intro: "Ny bokning",
			},
		});
		const adminText = toPlainText(adminHtml);

        //admin mail
		const { data: data2, error: error2 } = await resend.emails.send({
			from: "Green Hermitage <onboarding@updates.createweb.se>",
			to: "emil@createweb.se",
			subject: `${name} har bokat bord!`,
			html: adminHtml,
			text: adminText,
		});

		if (error2) {
			return Response.json({ error: error2 }, { status: 500 });
		}

		return Response.json(
			{
				ok: true,
				data,
				data2,
				name,
				email,
				guests,
				phone,
				message,
				date,
				time,
			},
			{ status: 200 }
		);
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
