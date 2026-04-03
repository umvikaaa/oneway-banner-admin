import crypto from "crypto";
import FormData from "form-data";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { publicId, fileBase64, fileType } = req.body;

    if (!publicId || !fileBase64 || !fileType) {
        return res
            .status(400)
            .json({ error: "publicId, fileBase64, fileType 필요" });
    }

    const CLOUD_NAME = "dizlzp6ee";
    const API_KEY = "668345557544542";
    const API_SECRET = "7dzdOR39a2HJdZ-nOulg7OB3pvY";

    const timestamp = Math.round(Date.now() / 1000);
    const paramsToSign = `overwrite=true&public_id=${publicId}&timestamp=${timestamp}`;
    const signature = crypto
        .createHash("sha1")
        .update(paramsToSign + API_SECRET)
        .digest("hex");

    const form = new FormData();

    // base64를 Buffer로 변환
    const buffer = Buffer.from(fileBase64, "base64");
    form.append("file", buffer, {
        filename: `${publicId}.${fileType.split("/")[1]}`,
        contentType: fileType,
    });
    form.append("public_id", publicId);
    form.append("overwrite", "true");
    form.append("timestamp", String(timestamp));
    form.append("api_key", API_KEY);
    form.append("signature", signature);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            { method: "POST", body: form, headers: form.getHeaders() },
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Cloudinary 에러:", data);
            return res
                .status(400)
                .json({ error: data.error?.message || "업로드 실패" });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("업로드 중 에러:", error);
        return res.status(500).json({ error: error.message || "서버 에러" });
    }
}
