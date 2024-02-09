import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateOutTime() {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 hour ago

  const visitorsToUpdate = await prisma.visitors.findMany({
    where: {
      outTime: null,
      inTime: {
        lt: oneHourAgo,
      },
    },
  });

  for (const visitor of visitorsToUpdate) {
    await prisma.visitors.update({
      where: {
        id: visitor.id,
      },
      data: {
        out: true,
        outTime: new Date(),
      },
    });
  }
}

updateOutTime()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
