import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.category.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      name: "Besteira",
      icon: "hamburger",
    },
  });

  await prisma.category.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      name: "Alimentação",
      icon: "utensils",
    },
  });

  await prisma.category.upsert({
    where: {
      id: 3,
    },
    update: {},
    create: {
      name: "Limpeza",
      icon: "broom",
    },
  });

  await prisma.category.upsert({
    where: {
      id: 4,
    },
    update: {},
    create: {
      name: "Higiene",
      icon: "soap",
    },
  });

  await prisma.category.upsert({
    where: {
      id: 5,
    },
    update: {},
    create: {
      name: "Carnes",
      icon: "fish",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
