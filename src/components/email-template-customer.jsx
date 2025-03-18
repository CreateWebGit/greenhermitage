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

export const EmailTemplateCustomer = ({
  name,
  guests,
  phone,
  message,
  date,
  time,
}) => (
  <div>
    <h1 className=" text-red-400">Welcome, {name}!</h1>
  </div>
);
