import * as React from "react";
import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Text,
	Tailwind,
	Section,
	Row,
	Column,
	Img,
} from "@react-email/components";

export const EmailTemplateRestaurant = ({
	name = "Lorem",
	guests = "4",
	phone = "060448422",
	message = "Det ska bli gott med mat",
	date = "2025-12-16",
	time = "17:00",
}) => (
	<Body style={{ padding: 0, margin: 0 }}>
		<Tailwind>
			<Section className="bg-[#5F6952]">
				<Row>
					<Column className="py-[64px]">
						<Img
							className="m-auto"
							src="https://www.greenhermitage.se/home/hermitage_logo_complete.svg"
							width="300px"
						></Img>
					</Column>
				</Row>
			</Section>
			<Container className="my-[64px] mb-[64px]">
				<div className="px-[16px]">
					<Text>Namn: {name}</Text>
					<Text>Antal gäster: {guests}</Text>
					<Text>Datum: {date}</Text>
					<Text>Tid: {time}</Text>
					<Text>
						Telefon: <Link href={`telto:${phone}`}>{phone}</Link>
					</Text>
					<Text>Meddelande: {message}</Text>
				</div>
			</Container>
			{/* <Section style={{ maxWidth: "50rem" }}>
				<Row>
					<Column>
						<Text className="my-[8px]">
							Hermitage Vegetariska Restaurang
						</Text>
						<Text className="my-[8px]">
							St: Nygatan 11, Gamla Stan
						</Text>
						<Text className="my-[8px]">111 27 Stockholm</Text>
					</Column>
				</Row>
			</Section> */}
			<Section className="bg-[#5f6952] text-white text-center">
				<Row>
					<Column className="py-8">
						{/* <Text className="text-[16px] mb-0 font-semibold">
							Green Hermitage Vegetariska Restaurang
						</Text>
						<Text>St: Nygatan 11, Gamla Stan</Text> */}
						<p className="text-[16px] mb-[4px] font-semibold">
							Green Hermitage Vegetariska Restaurang
						</p>
						<p>St: Nygatan 11, Gamla Stan</p>
					</Column>
				</Row>
			</Section>
		</Tailwind>
	</Body>
);
