import { useParams } from "react-router";
import styled from "styled-components";

import BottomNavigation from "@/shared/components/bottom/BottomNavigation";
import Header from "@/shared/components/Header/Header";
import PlaceRecommendCarousel from "@/features/local/components/bookmark/PlaceRecommendCarousel";
import { colors } from "@/styles/colors";
import { font } from "@/styles/font";
import BookmarkIcon from "@/shared/components/icons/BookmarkIcon";
import { usePlaceDetail } from "@/features/local/hooks/usePlaceDetail";
import { useNavigate } from "react-router";
const DetailContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    & > *:last-child {
        border-bottom: none;
    }
`;

const InfoSection = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${colors.gray[200]};
    padding: 16px;
    gap: 40px;
`;



const Category = styled.div`
    ${font.regular14}
    color: ${colors.gray[600]};
`;



const DetailLabel = styled.div`
    ${font.medium14}
    color: ${colors.gray[900]};
    min-width: 80px;
    flex-shrink: 0;
`;

const DetailValue = styled.div`
    ${font.regular14}
    color: ${colors.gray[600]};
`;

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
`;


const ShortDescription = styled.div`
    ${font.regular14}
    color: ${colors.gray[700]};
    line-height: 1.6;
`;

const LongDescriptionContainer = styled.div`
    padding: 0px 16px;
`;
const Description = styled.div`
    ${font.regular14}
color: ${colors.gray[600]};
line - height: 1.6;
    border: 1px solid ${colors.gray[200]};
    border-radius: 8px;
    padding: 16px;
`;

export default function LocalDetailPage() {
    const navigate = useNavigate();
    const handleLeftClick = () => {
        navigate(-1);
    };

    const { id } = useParams();

    // 장소 상세 정보 가져오기
    const { data: placeData, loading, error } = usePlaceDetail(id);

    if (loading) {
        return (
            <>
                <Header text="로딩 중..." />
                <DetailContainer>로딩 중...</DetailContainer>
                <BottomNavigation />
            </>
        );
    }

    if (error || !placeData) {
        return (
            <>
                <Header text="오류" />
                <DetailContainer>{error || '장소 정보를 불러올 수 없습니다.'}</DetailContainer>
                <BottomNavigation />
            </>
        );
    }

    // images 배열을 PlaceRecommendCarousel에 맞게 변환
    const imageSlides = placeData.images?.map((url) => ({ imageUrl: url })) || [];

    return (
        <>
            <Header text={placeData.placeName} rightIcon={<BookmarkIcon />} onLeftClick={handleLeftClick} />
            <DetailContainer>
                {/* 이미지 스와이퍼 */}
                {imageSlides.length > 0 && (
                    <PlaceRecommendCarousel
                        places={imageSlides}
                        slidesPerView="auto"
                        spaceBetween={16}
                        direction="horizontal"
                        padding={16}
                    />
                )}

                {/* 기본 정보 */}
                <InfoSection>
                    <DetailLabel>카테고리</DetailLabel>
                    <Category>{placeData.category}</Category>

                </InfoSection>


                {/* 주소 */}
                {placeData.address && (
                    <InfoSection>
                        <DetailLabel>위치</DetailLabel>
                        <DetailValue>{placeData.address}</DetailValue>
                    </InfoSection>
                )}

                {/* 영업시간 */}
                {placeData.openingHours && (
                    <InfoSection>
                        <DetailLabel>영업시간</DetailLabel>
                        <DetailValue>{placeData.openingHours}</DetailValue>
                    </InfoSection>
                )}


                {/* 전화번호 */}
                {placeData.phoneNumber && (
                    <InfoSection>
                        <DetailLabel>전화번호</DetailLabel>
                        <DetailValue>{placeData.phoneNumber}</DetailValue>
                    </InfoSection>
                )}


                {/* 상세 설명 */}
                {placeData.longDescription && (
                    <DescriptionContainer>
                        <InfoSection style={{ borderBottom: 'none' }}>
                            <DetailLabel>장소 소개</DetailLabel>
                            <ShortDescription>{placeData.shortDescription}</ShortDescription>
                        </InfoSection>
                        <LongDescriptionContainer>
                            <Description>{placeData.longDescription}</Description>
                        </LongDescriptionContainer>
                    </DescriptionContainer>
                )}

            </DetailContainer >
            <BottomNavigation />
        </>
    );
}