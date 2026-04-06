import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

const BUCKET = "oneway-banner-admin.firebasestorage.app";

export const BANNER_SLOTS = [
  { id: "banner_slot_1", label: "배너 1" },
  { id: "banner_slot_2", label: "배너 2" },
];

// 항상 동일한 고정 URL (토큰 없이 공개 접근 — Storage 규칙에서 read 허용 필요)
export function getBannerUrl(slotId) {
  const path = encodeURIComponent(`banners/${slotId}`);
  return `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${path}?alt=media`;
}

// 캐시 무력화용 (화면 갱신 직후에만 사용)
export function getBannerUrlFresh(slotId) {
  return `${getBannerUrl(slotId)}&t=${Date.now()}`;
}

const MAX_WIDTH = 1200;
const QUALITY = 0.85;

function compressImage(file) {
  // SVG·GIF는 Canvas 변환 불가 — 원본 그대로
  if (file.type === "image/svg+xml" || file.type === "image/gif") {
    return Promise.resolve(file);
  }
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, MAX_WIDTH / img.naturalWidth);
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      canvas.toBlob((blob) => resolve(new File([blob], file.name, { type: "image/webp" })), "image/webp", QUALITY);
    };
    img.src = url;
  });
}

export async function uploadBanner(slotId, file) {
  const compressed = await compressImage(file);
  const storageRef = ref(storage, `banners/${slotId}`);
  await uploadBytes(storageRef, compressed, {
    contentType: compressed.type,
    cacheControl: "public, max-age=31536000",
  });
  return { url: getBannerUrl(slotId) };
}

export async function deleteBanner(slotId) {
  const svgBlob = new Blob(
    [`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400"><rect width="1200" height="400" fill="#f5f5f5"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="32" fill="#ccc">배너 없음</text></svg>`],
    { type: "image/svg+xml" }
  );
  const file = new File([svgBlob], "empty.svg", { type: "image/svg+xml" });
  return await uploadBanner(slotId, file);
}
