import { connectMongoDB } from "@/lib/mymongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { Resend } from "resend";

export async function POST(req) {
  const { email } = await req.json();

  await connectMongoDB();

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return NextResponse.json(
      { message: "Email doesn't exists." },
      { status: 400 }
    );
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const passwordResetExpires = Date.now() + 3600000;

  existingUser.resetToken = passwordResetToken;
  existingUser.resetTokenExpiry = passwordResetExpires;
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

  console.log(resetUrl);

  /*

  const myEmail = process.env.EMAIL;
  const pass = process.env.EMAIL_PASS;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailHtml = resetUrl;

  const options = {
    from: myEmail,
    to: myEmail,
    subject: "hello world",
    html: emailHtml,
  };

  await transporter
    .sendMail(options)
    .then(() => {
      return new NextResponse("Reset password is sent.", { status: 200 });
    })
    .catch(async (error) => {
      existingUser.resetToken = undefined;
      existingUser.resetTokenExpiry = undefined;
      await existingUser.save();

      return new NextResponse("Failed sending email. try again", {
        status: 400,
      });
    });

  

  */
  const resend = new Resend("re_8vVMNTAa_4PvX7CS4p9XMFFBAppW8VPdd");

  resend.emails
    .send({
      from: "onboarding@resend.dev",
      to: "kaj.olason@icloud.com",
      subject: "Hello World",
      html: `<p><a href="${resetUrl}">${resetUrl}</a></p>`,
    })
    .then(() => {
      return new NextResponse("Reset password is sent.", { status: 200 });
    })
    .catch(async (error) => {
      existingUser.resetToken = undefined;
      existingUser.resetTokenExpiry = undefined;
      await existingUser.save();

      return new NextResponse("Failed sending email. try again", {
        status: 400,
      });
    });

  try {
    await existingUser.save();
    return new NextResponse("Email is sent for reseting password", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
}
