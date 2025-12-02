import { useParams, useNavigate } from "react-router";
import BottomNavigation from "@/shared/components/bottom/BottomNavigation";
import Header from "@/shared/components/Header/Header";
import BookmarkIcon from "@/shared/components/icons/BookmarkIcon";
import { usePlaceDetail } from "@/features/local/hooks/usePlaceDetail";
import { DetailContainer } from "@/features/local/styles/LocalDetail.styles";
import PlaceImages from "@/features/local/components/localdetail/PlaceImages";
import PlaceBasicInfo from "@/features/local/components/localdetail/PlaceBasicInfo";
import PlaceDescription from "@/features/local/components/localdetail/PlaceDescription";

export default function LocalDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: placeData } = usePlaceDetail(id);

    const handleLeftClick = () => navigate(-1);

    if (!placeData) {
        return (
            <>
                <Header text="" onLeftClick={handleLeftClick} />
                <DetailContainer />
                <BottomNavigation />
            </>
        );
    }

    return (
        <>
            <Header
                text={placeData.placeName}
                rightIcon={<BookmarkIcon />}
                onLeftClick={handleLeftClick}
            />
            <DetailContainer>
                <PlaceImages images={placeData.images} />
                <PlaceBasicInfo placeData={placeData} />
                <PlaceDescription
                    shortDescription={placeData.shortDescription}
                    longDescription={placeData.longDescription}
                />
            </DetailContainer>
            <BottomNavigation />
        </>
    );
}