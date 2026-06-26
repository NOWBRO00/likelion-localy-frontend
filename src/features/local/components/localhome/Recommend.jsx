import React, { useEffect, useState } from "react";
import { getProfile } from "@/features/mypage/api/mypageApi";
import PlaceRecommendCarousel from "@/features/local/components/bookmark/PlaceRecommendCarousel";

export default function Recommend({ places }) {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setNickname(profile.data.nickname);
      } catch (error) {
        console.error("프로필 조회 실패:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <PlaceRecommendCarousel
      title={
        nickname
          ? `${nickname}님에게 추천하는 장소`
          : "추천 장소"
      }
      places={places}
      imageWidth={148}
      imageHeight={148}
      slidesPerView="auto"
      spaceBetween={24}
      loop={false}
      direction="horizontal"
    />
  );
}
