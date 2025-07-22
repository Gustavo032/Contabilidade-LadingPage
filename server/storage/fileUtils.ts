import fs from "fs/promises";
import path from "path";

export async function readJson<T>(filename: string): Promise<T> {
  try {
    const filePath = path.resolve(__dirname, filename);
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (err: any) {
    if (err.code === "ENOENT") {
      // arquivo não existe ainda, retorna vazio
      return [] as unknown as T;
    }
    throw err;
  }
}

export async function writeJson<T>(filename: string, data: T): Promise<void> {
  const filePath = path.resolve(__dirname, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
