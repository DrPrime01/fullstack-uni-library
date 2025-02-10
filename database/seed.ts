import ImageKit from "imagekit";
import dummybooks from "../dummybooks.json";
import { books } from "./schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config({ path: ".env.local" });
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL!,
});

const uploadToImageKit = async (
  coverUrl: string,
  fileName: string,
  folder: string
) => {
  try {
    const res = await imageKit.upload({
      file: coverUrl,
      fileName,
      folder,
    });

    return res.filePath;
  } catch (error) {
    console.log(error);
  }
};

const seed = async () => {
  console.log("Seeding data...");

  try {
    for (const book of dummybooks) {
      const coverUrl = (await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      )) as string;

      const videoUrl = (await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos"
      )) as string;

      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });
    }
    console.log("Data seeded successfully!");
  } catch (error) {
    console.log(error);
  }
};

seed();
