import { PrismaClient } from "@prisma/client";
import { jobsData } from "./data/jobs";
import { usersData } from "./data/users";
import { postsData } from "./data/posts";
import { commentsData } from "./data/comments";

const prisma = new PrismaClient();

async function seed() {
  await prisma.job.createMany({ data: jobsData });
  await prisma.user.createMany({ data: usersData });
  await prisma.post.createMany({ data: postsData });
  await prisma.comment.createMany({ data: commentsData });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
