import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { colors } from "@/styles/colors";
import { font } from "@/styles/font";
import Header from "@/shared/components/Header/Header";
import BottomNavigation from "@/shared/components/bottom/BottomNavigation";
import BookmarkIcon from "@/shared/components/icons/BookmarkIcon";
import { useBookmarks } from "@/features/local/hooks/useBookmarks";
import { useInfiniteScroll } from "@/features/local/hooks/useInfiniteScroll";

const Container = styled.div`
  padding: 40px 20px 80px;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const PlaceCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
`;

const PlaceImage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background-color: ${colors.gray[200]};
  background-image: ${(props) => props.$imageUrl ? `url(${props.$imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`;

const BookmarkIconWrapper = styled.div`
  position: absolute;
  top: 1px;
  right: 1px;
  cursor: pointer;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

const PlaceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlaceCategory = styled.div`
  ${font.regular12}
  color: ${colors.gray[600]};
`;

const PlaceName = styled.div`
  ${font.bold14}
  color: ${colors.gray[900]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PlaceLocation = styled.div`
  ${font.medium12}
  color: ${colors.gray[900]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;
const SortButton = styled.button`
  ${font.medium14}
  color: ${(props) => props.$isActive ? colors.white : colors.gray[900]};
  background-color: ${(props) => props.$isActive ? colors.blue[20] : colors.gray[100]};
  border: 1px solid ${(props) => props.$isActive ? colors.blue[20] : colors.gray[300]};
  border-radius: 6px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const LoadingMessage = styled.div`
  ${font.regular14}
  color: ${colors.gray[600]};
  text-align: center;
  padding: 20px;
`;

const ErrorMessage = styled.div`
  ${font.regular14}
  color: ${colors.error};
  text-align: center;
  padding: 20px;
`;



export default function BookmarkPage() {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('latest');

  // 북마크 데이터 가져오기
  const { bookmarks, loading, fetchingMore, error, hasNext, fetchMore } = useBookmarks(sortType);

  // 무한 스크롤 설정
  const { ref: lastElementRef } = useInfiniteScroll(fetchMore, hasNext, fetchingMore);

  const handleLeftClick = () => {
    navigate(-1);
  };

  const handlePlaceClick = (placeId) => {
    navigate(`/local-detail/${placeId}`);
  };

  const handleSortChange = (type) => {
    setSortType(type);
  };

  return (
    <>
      <Header text="북마크" showLeftIcon onLeftClick={handleLeftClick} rightIcon={<BookmarkIcon />} />
      <Container>
        <ButtonGroup>
          <SortButton
            $isActive={sortType === 'latest'}
            onClick={() => handleSortChange('latest')}
          >
            최신순
          </SortButton>
          <SortButton
            $isActive={sortType === 'popular'}
            onClick={() => handleSortChange('popular')}
          >
            인기순
          </SortButton>
        </ButtonGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {loading && bookmarks.length === 0 ? (
          <LoadingMessage>북마크를 불러오는 중...</LoadingMessage>
        ) : bookmarks.length === 0 ? (
          <LoadingMessage>북마크한 장소가 없습니다.</LoadingMessage>
        ) : (
          <GridContainer>
            {bookmarks.map((place, idx) => {
              // 마지막 요소에 ref 연결 (무한 스크롤)
              const isLastElement = idx === bookmarks.length - 1;

              return (
                <PlaceCard
                  key={place.bookmarkId}
                  ref={isLastElement ? lastElementRef : null}
                  onClick={() => handlePlaceClick(place.placeId)}
                >
                  <PlaceImage $imageUrl={place.thumbnailImage}>
                    <BookmarkIconWrapper>
                      <BookmarkIcon
                        color={colors.blue[50]}
                        size={20}
                      />
                    </BookmarkIconWrapper>
                  </PlaceImage>
                  <PlaceContent>
                    <PlaceCategory>{place.category}</PlaceCategory>
                    <PlaceName>{place.placeName}</PlaceName>
                    <PlaceLocation>{place.address}</PlaceLocation>
                  </PlaceContent>
                </PlaceCard>
              );
            })}
          </GridContainer>
        )}

        {fetchingMore && <LoadingMessage>더 불러오는 중...</LoadingMessage>}
      </Container>
      <BottomNavigation />
    </>
  );
}

