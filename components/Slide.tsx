import React from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../util";
import { BlurView } from "expo-blur";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "../api";

const View = styled.View`
  flex: 1;
`;

const BgImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props: any) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Overview = styled.Text<{ isDark: boolean }>`
  color: ${(props: any) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
  margin-top: 10px;
`;

const Votes = styled(Overview)`
  font-size: 12px;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
  fullData: Movie;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
  fullData,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    // @ts-ignore
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View>
        <BgImg
          source={{ uri: makeImgPath(backdropPath) }}
          style={StyleSheet.absoluteFill}
        />
        <BlurView
          tint={isDark ? "dark" : "light"}
          intensity={80}
          style={StyleSheet.absoluteFill}
        >
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title isDark={isDark}>{originalTitle}</Title>
              {voteAverage > 0 && (
                <Votes isDark={isDark}>⭐️{voteAverage} / 10</Votes>
              )}
              <Overview isDark={isDark}>
                {overview.slice(0, 90)}
                {overview.length > 90 && "..."}
              </Overview>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Slide;
