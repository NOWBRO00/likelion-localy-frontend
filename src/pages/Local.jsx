import styled from "styled-components";
import { colors } from "@/styles/colors";
import { font } from "@/styles/font";
import BottomNavigation from "@/shared/components/bottom/BottomNavigation";
import Header from "@/shared/components/Header/Header";
import HomeCard from "@/features/local/components/HomeCard";

const Container = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  ${font.bold28}
  color: ${colors.purple[600]};
  margin-bottom: 40px;
`;



export default function LocalPage() {
  return (
    <>
      <Header text="로컬 적용 가이드" />

      <Container>
        <HomeCard />
        <BottomNavigation></BottomNavigation>
      </Container>
    </>
  );
}
