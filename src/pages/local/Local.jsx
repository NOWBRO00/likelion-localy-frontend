import { useNavigate } from "react-router";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { font } from "@/styles/font";
import BottomNavigation from "@/shared/components/bottom/BottomNavigation";
import Header from "@/shared/components/Header/Header";
import HomeCard from "@/features/local/components/localhome/HomeCard";
import Recommend from "@/features/local/components/localhome/Recommend";
import Banner from "@/features/local/components/localhome/Banner";
import PlaceCarousel from "@/features/local/components/localhome/PlaceCarousel";
import BookmarkIcon from "@/shared/components/icons/BookmarkIcon";
import { useGeolocation } from "@/features/local/hooks/useGeolocation";
import { useHomeData } from "@/features/local/hooks/useHomeData";

const Container = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoadingMessage = styled.div`
  ${font.regular16}
  color: ${colors.gray[600]};
  text-align: center;
  padding: 40px 20px;
`;

const ErrorMessage = styled.div`
  ${font.regular16}
  color: ${colors.error};
  text-align: center;
  padding: 40px 20px;
`;

export default function LocalPage() {
  const navigate = useNavigate();

  // 위치 정보 가져오기
  const { latitude, longitude, loading: locationLoading, error: locationError } = useGeolocation();

  // 홈 데이터 가져오기
  const { data, loading: dataLoading, error: dataError } = useHomeData(latitude, longitude);

  const handleRightClick = () => {
    navigate("/bookmark");
  };

  const handleLeftClick = () => {
    navigate("/");
  };

  return (
    <>
      <Header text="로컬 적용 가이드" rightIcon={<BookmarkIcon />} onRightClick={handleRightClick} onLeftClick={handleLeftClick} />
      <Container>
        {/* 에러 메시지 */}
        {(locationError || dataError) && (
          <ErrorMessage>{locationError || dataError}</ErrorMessage>
        )}

        {/* 로딩 중이고 데이터가 없을 때만 로딩 메시지 */}
        {(locationLoading || dataLoading) && !data && (
          <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>
        )}

        {/* 데이터가 있으면 바로 표시 */}
        {data && (
          <>
            {/* 미션 홈 카드 */}
            {data.missionBanner && (
              <HomeCard
                emotionKeyword={data.missionBanner.emotionKeyword}
                totalMissions={data.missionBanner.totalMissions}
                completedMissions={data.missionBanner.completedMissions}
                progressPercent={data.missionBanner.progressPercent}
              />
            )}

            {/* 미션 장소 추천 */}
            {data.missionPlaces && data.missionPlaces.length > 0 && (
              <PlaceCarousel
                title="미션 장소 바로 보기"
                items={data.missionPlaces}
                variant="circle"
                itemSize={76}
                pagination={false}
                slidesPerView={"auto"}
                spaceBetween={24}
              />
            )}

            {/* 추천 장소 */}
            {data.recommendedPlaces && data.recommendedPlaces.length > 0 && (
              <Recommend places={data.recommendedPlaces} />
            )}

            {/* 광고 배너 */}
            <Banner />

            {/* 최근 북마크한 장소 */}
            {data.recentBookmarks && data.recentBookmarks.length > 0 && (
              <PlaceCarousel
                title="최근에 북마크 한 장소"
                items={data.recentBookmarks}
                variant="rectangle"
                itemSize={76}
                pagination={false}
                slidesPerView={"auto"}
                spaceBetween={20}
              />
            )}
          </>
        )}
      </Container>
      <BottomNavigation />
    </>
  );
}
