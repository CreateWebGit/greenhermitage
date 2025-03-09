import { connectMongoDB } from "@/lib/mymongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import Profile from "@/models/profile";
import { NextResponse } from "next/server";
import { signIn, useSession } from "next-auth/react";

export async function POST(req) {
  try {
    const { myID, email } = await req.json();

    await connectMongoDB();

    await Profile.create({
      _id: myID,
      email: email,
    });

    return NextResponse.json(
      { message: "Profile registered" },
      { status: 201 }
    );
  } catch (error) {
    console.log("haha", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { myID, email } = await req.json();

    await connectMongoDB();

    await Profile.create({
      _id: myID,
      email: email,
    });

    return NextResponse.json(
      { message: "Profile registered" },
      { status: 201 }
    );
  } catch (error) {
    console.log("haha", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const data = await req.json();
  console.log("hej");

  if (data.type === "delete-person") {
    try {
      const session = await getServerSession(authOptions);
      const email = session.user.email;

      let options = { upsert: true, new: true, setDefaultsOnInsert: true };

      console.log(data.id);

      connectMongoDB();

      await Profile.findOneAndUpdate(
        {
          email: email,
        },
        {
          $pull: {
            stuff: {
              _id: data.id,
            },
          },
        },
        options
      );
    } catch (error) {
      console.log(error);
      {
        return NextResponse.json(
          { message: "An error occurred while registering the user." },
          { status: 500 }
        );
      }
    }
    return NextResponse.json({ message: "User registered" }, { status: 201 });
  }

  if (data.type === "stuffChanges") {
    try {
      const session = await getServerSession(authOptions);
      const email = session.user.email;

      let options = {
        upsert: false,
        new: true,
        setDefaultsOnInsert: true,
        multi: true,
      };

      console.log(data);

      connectMongoDB();

      await Profile.findOneAndUpdate(
        {
          email: email,
          "stuff._id": data.id,
        },
        {
          $set: {
            "stuff.$": {
              _id: data.id,
              img: data.image,
              name: data.name,
              speciality: data.speciality,
              despcription: data.description,
            },
          },
        },
        options
      );
    } catch (error) {
      console.log(error);
      {
        return NextResponse.json(
          { message: "An error occurred while registering the user." },
          { status: 500 }
        );
      }
    }
    return NextResponse.json({ message: "User registered" }, { status: 201 });
  }

  if (data.type === "productsList") {
    try {
      const session = await getServerSession(authOptions);
      const email = session.user.email;
      let options = { upsert: true, new: true, setDefaultsOnInsert: true };

      connectMongoDB();

      await Profile.findOneAndUpdate(
        { email: email },
        {
          productsList: data._formField,
        },
        options
      );
    } catch (error) {
      console.log(error);
      {
        return NextResponse.json(
          { message: "An error occurred while registering the user." },
          { status: 500 }
        );
      }
    }
    return NextResponse.json({ message: "User registered" }, { status: 201 });
  } else {
    try {
      const session = await getServerSession(authOptions);
      console.log("haha");
      const email = session.user.email;
      console.log("haha");
      //const data = await req.json();

      console.log("haha");

      let query = {};

      if (data.type === "company") {
        query = { $set: { "about.company": data.dataItem } };
        console.log("haha");
      }

      if (data.type === "shortDescription") {
        query = { $set: { "about.shortDescription": data.dataItem } };
      }

      if (data.type === "longDescription") {
        query = { $set: { "about.longDescription": data.dataItem } };
        console.log("LongDescription");
      }

      if (data.type === "image") {
        query = { $set: { "about.img": data.url } };
        console.log("Image");
      }

      if (data.type === "companyEmail") {
        query = { $set: { "contacts.companyEmail": data.dataItem } };

        console.log("companyEmail");
      }

      if (data.type === "phone") {
        query = { $set: { "contacts.phone": data.dataItem } };

        console.log("phone");
      }

      if (data.type === "address") {
        console.log(data);
        query = {
          $set: {
            "contacts.address.streetAddress": data.dataItem.streetAddress,
            "contacts.address.streetNumber": data.dataItem.streetNumber,
            "contacts.address.zipCode": data.dataItem.zipCode,
            "contacts.address.postalAddress": data.dataItem.postalAddress,
          },
        };

        console.log("address");
      }

      if (data.type === "weburl") {
        query = { $set: { "contacts.weburl": data.dataItem } };
        console.log("weburl");
      }

      if (data.type === "stuff") {
        console.log(data);

        query = {
          $push: {
            stuff: [
              {
                _id: data.id,
                img: data.myimage,
                name: data.name,
                speciality: data.speciality,
                despcription: data.description,
              },
            ],
          },
        };
        console.log("stuff");
      }

      {
        /*
      if (data.type === "productsList") {
        console.log(data);
        query = {
          $set: {
            "productsList.categoryID": data.formField[0].categoryID,
            "productsList.categoryName": data.formField[0].categoryName,
            "productsList.products.$.": data.formField[0].categoryName,
          },
        };
        console.log("stuff");
      }
      */
      }

      if (data.type === "opening") {
        query = {
          opening_hours: {
            monday: {
              start: data.mondayFromTime,
              end: data.mondayToTime,
              close: false,
            },
            tuesday: {
              start: data.tuesdayFromTime,
              end: data.tuesdayToTime,
              close: false,
            },
            wednesday: {
              start: data.wednesdayFromTime,
              end: data.wednesdayToTime,
              close: false,
            },
            thursday: {
              start: data.thursdayFromTime,
              end: data.thursdayToTime,
              close: false,
            },
            friday: {
              start: data.fridayFromTime,
              end: data.fridayToTime,
              close: false,
            },
            saturday: {
              start: data.saturdayFromTime,
              end: data.saturdayToTime,
              close: false,
            },
            sunday: {
              start: data.sundayFromTime,
              end: data.sundayToTime,
              close: false,
            },
          },
        };
        console.log(data.wednesdayToTime);
      }

      let options = { upsert: true, new: true, setDefaultsOnInsert: true };
      console.log("Query:", query);
      connectMongoDB();
      await Profile.findOneAndUpdate({ email: email }, query, options);

      return NextResponse.json({ message: "User registered" }, { status: 201 });
    } catch (error) {
      console.log("no");
      return NextResponse.json(
        { message: "An error occurred while registering the user." },
        { status: 500 }
      );
    }
  }
}

export async function GET(req) {
  connectMongoDB();

  const profile = await Profile.findOne().lean();
  console.log(profile);
  return Response.json(profile);
}
