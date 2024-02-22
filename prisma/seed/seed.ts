import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function seed() {
  try {
    // Create an array of data to be inserted
    const data = [
      {
        name: "Sushil Gupta",
        prn: "1132230901",
        mobile: "9654617300",
        type: "Student",
      },
      {
        name: "Kriti Gupta",
        prn: "11322309025",
        mobile: "9654617301",
        type: "Student",
      },
      {
        name: "Mr. Harishchandra Deshmukh",
        prn: "1019221070",
        mobile: "9876543210",
        type: "Faculty",
      },
      {
        name: "Akash",
        prn: "1019221701",
        mobile: "9876543210",
        type: "Staff",
      },
    ];

    // Insert the data into the database
    const createdData = await prismaClient.data.createMany({
      data: data,
    });

    console.log("Data seeding done");

    // Create an array of attendees to be inserted
    const attendees = [
      { name: "Registrar", sequence: 1 },
      { name: "Deputy Registrar", sequence: 2 },
    ];

    // Insert the data into the database
    const createdAttendees = await prismaClient.attendee.createMany({
      data: attendees,
    });

    console.log("Attendees seeding done");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prismaClient.$disconnect();
  }
}

seed();
