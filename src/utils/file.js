import fs from "fs/promises";
import path from "path";

export const deleteFile = async (fileUrl) => {
    if (!fileUrl) return;
    const filePath = path.join(process.cwd(), fileUrl);
    try {
        await fs.unlink(filePath);
    } catch (error) {

        if (error.code !== "ENOENT") {
            throw error;
        }
    }
};