import * as React from "react";
import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Section,
	Column,
	Img,
	Row,
	Preview,
	Text,
	Tailwind,
} from "@react-email/components";

export const EmailTemplateCustomer = ({
	name = "Lorem",
	guests = "4",
	phone = "060448422",
	message = "Det ska bli gott med mat",
	date = "2025-12-16",
	time = "17:00",
}) => (
	<div style={{ height: "100svh" }}>
		<Tailwind>
			{/* <!--  --> */}
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
			<Container className="bg-gray-100 my-[64px]">
				<div className="px-[16px]">
					<Text className="text-lg">Tack för din bokning.</Text>
				</div>
				<Row>
					<Column className="w-[50%] px-[16px]">
						<Text className="!mb-0 !mt-0">Namn:</Text>
						<Text className="font-bold !mt-0">{name}</Text>
					</Column>
					<Column className="w-[50%] px-[16px]">
						<Text className="!mb-0 !mt-0">Antal gäster:</Text>
						<Text className="font-bold !mt-0">{guests}</Text>
					</Column>
				</Row>
				<Row>
					<Column className="w-[50%] px-[16px]">
						<Text className="!mb-0 !mt-0">Datum:</Text>
						<Text className="font-bold !mt-0">{date}</Text>
					</Column>
					<Column className="w-[50%] px-[16px]">
						<Text className="!mb-0 !mt-0">Tid:</Text>
						<Text className="font-bold !mt-0">{time}</Text>
					</Column>
				</Row>
			</Container>
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
	</div>
);
