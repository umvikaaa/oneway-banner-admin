# Oneway Banner Admin

배너 이미지를 한 번에 관리하는 어드민 페이지

## 로컬 실행

```bash
npm install
npm run dev
```

## Netlify 배포

1. GitHub에 이 프로젝트 업로드
2. Netlify → "Import from Git" 선택
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

## Cloudinary Upload Preset 설정 확인

- Cloudinary 콘솔 → Settings → Upload → Upload Presets
- `oneway_banners` preset이 **Unsigned** 모드인지 확인

## 스마트스토어 HTML에 넣을 고정 URL

배너 슬롯별 고정 URL (이미지 교체해도 URL 변하지 않음):

- 배너 1: `https://res.cloudinary.com/dizlzp6ee/image/upload/banners/banner_slot_1`
- 배너 2: `https://res.cloudinary.com/dizlzp6ee/image/upload/banners/banner_slot_2`
- 배너 3: `https://res.cloudinary.com/dizlzp6ee/image/upload/banners/banner_slot_3`

## 로그인 계정

- 이메일: oneway341300@gmail.com
- 비밀번호: Firebase Authentication에서 설정한 비밀번호
