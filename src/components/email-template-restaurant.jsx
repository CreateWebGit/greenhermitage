import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Tailwind,
} from "@react-email/components";

export const EmailTemplateRestaurant = ({
  name,
  guests,
  phone,
  message,
  date,
  time,
}) => (
  <div>
    <Tailwind>
      <Text className="text-red-400">{name} har bokat ett bord</Text>
      <Text className="text-red-400">
        {guests} gäster kommer {date} klockan {time}{" "}
      </Text>
    </Tailwind>
  </div>
);
