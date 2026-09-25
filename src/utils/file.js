import fs from "fs/promises";
import path from "path";

export const deleteFile = async (fileUrl) => {
    if (!fileUrl) return;

    const filePath = path.join(process.cwd(), fileUrl);

    console.log("FILE URL:", fileUrl);
    console.log("FILE PATH:", filePath);

    try {
        await fs.unlink(filePath);
        console.log("✅ FILE DELETED:", filePath);
    } catch (error) {
        console.log("❌ DELETE ERROR:", error);
        
        if (error.code !== "ENOENT") {
            throw error;
        }
    }
};