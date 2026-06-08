<script>
	export let language = "sv";
	export let title = "";
	export let intro = "";
	export let name = "";
	export let email = "";
	export let guests = "";
	export let phone = "";
	export let message = "";
	export let date = "";
	export let time = "";

	const t = (sv, en) => (language === "en" ? en : sv);

	$: resolvedTitle =
		title || t("Green Hermitage - Bokningsbekräftelse", "Green Hermitage - Booking confirmation");
	$: resolvedIntro =
		intro || t("Tack för din bokning.", "Thank you for your booking.");
</script>

<table
	role="presentation"
	width="100%"
	cellpadding="0"
	cellspacing="0"
	style="margin:0;padding:0;background:#f6f6f6;font-family:Arial,Helvetica,sans-serif;"
>
	<tbody>
		<tr>
			<td align="center" style="padding:24px 12px;">
				<table
					role="presentation"
					width="600"
					cellpadding="0"
					cellspacing="0"
					style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e6e6e6;border-radius:8px;overflow:hidden;"
				>
					<tbody>
						<tr>
							<td style="padding:20px 24px 12px;">
								<h1
									style="margin:0 0 8px;font-size:20px;line-height:28px;color:#1a1a1a;"
								>
									{resolvedTitle}
								</h1>
								<p
									style="margin:0 0 16px;font-size:14px;line-height:22px;color:#3a3a3a;"
								>
									{resolvedIntro}
								</p>
							</td>
						</tr>
						<tr>
							<td style="padding:0 24px 20px;">
								<table
									role="presentation"
									width="100%"
									cellpadding="0"
									cellspacing="0"
								>
									<tbody>
										<tr>
											<td
												style="padding:8px 0;border-bottom:1px solid #efefef;font-size:14px;color:#1a1a1a;"
												><strong>{t("Namn:", "Name:")}</strong>
												{name || "-"}</td
											>
										</tr>
										<tr>
											<td
												style="padding:8px 0;border-bottom:1px solid #efefef;font-size:14px;color:#1a1a1a;"
												><strong>{t("Tid:", "Time:")}</strong>
												{time.hour +
													":" +
													time.minute || "-"}</td
											>
										</tr>
										<tr>
											<td
												style="padding:8px 0;border-bottom:1px solid #efefef;font-size:14px;color:#1a1a1a;"
												><strong>{t("Datum:", "Date:")}</strong>
												{date || "-"}</td
											>
										</tr>
										<tr>
											<td
												style="padding:8px 0;border-bottom:1px solid #efefef;font-size:14px;color:#1a1a1a;"
												><strong>{t("Antal gäster:", "Number of guests:")}</strong>
												{guests || "-"}</td
											>
										</tr>
										<tr>
											<td
												style="padding:8px 0;border-bottom:1px solid #efefef;font-size:14px;color:#1a1a1a;"
												><strong>{t("Telefonnummer:", "Phone number:")}</strong>
												{phone || "-"}</td
											>
										</tr>
										<tr>
											<td
												style="padding:8px 0;font-size:14px;color:#1a1a1a;"
												><strong>Email:</strong>
												{email || "-"}</td
											>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
						{#if message}
							<tr>
								<td style="padding:0 24px 24px;">
									<div
										style="margin:0 0 6px;font-size:14px;color:#1a1a1a;"
									>
										<strong>{t("Meddelande:", "Message:")}</strong>
									</div>
									<div
										style="font-size:14px;line-height:22px;color:#3a3a3a;white-space:pre-line;"
									>
										{message}
									</div>
								</td>
							</tr>
						{/if}
						<tr>
							<td
								style="padding:16px 24px 24px;font-size:12px;color:#6a6a6a;"
							>
								{t("Green Hermitage Vegetariska Restaurang", "Green Hermitage Vegetarian Restaurant")} <br />
								St. Nygatan 11, Gamla Stan
							</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>
