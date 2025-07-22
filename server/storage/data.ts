import fs from "fs/promises";
import path from "path";
import { FileStorage } from "server/storage";

async function readJson<T>(filename: string): Promise<T> {
  try {
    const filePath = path.resolve(__dirname, filename);
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (err) {
    // se arquivo não existir, retorna valor padrão (array vazio ou objeto vazio)
    if ((err as any).code === "ENOENT") {
      return [] as unknown as T;
    }
    throw err;
  }
}

async function writeJson<T>(filename: string, data: T): Promise<void> {
  const filePath = path.resolve(__dirname, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export const storage = new FileStorage();