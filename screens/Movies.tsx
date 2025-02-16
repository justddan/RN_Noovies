import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions, Image, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";
import { makeImgPath } from "../util";
import { BlurView } from "expo-blur";

const API_KEY = "fec442424b0d4ae084e35e7b48cab4c6";

const Container = styled.ScrollView`
  background-color: ${({ theme }: { theme: any }) => theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: { theme: any }) => theme.mainBgColor};
`;

const BgImg = styled.Image``;

const Title = styled.Text``;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({}) => {
  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const controlsEnabled = false;
  const timeout = 3.5;

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&api_key=${API_KEY}`
      )
    ).json();
    setNowPlayingMovies(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT * 0.4 }}
        loop
        controlsEnabled={controlsEnabled}
        timeout={timeout}
      >
        {nowPlayingMovies.map((movie: any) => (
          <View key={movie.id}>
            <BgImg
              source={{ uri: makeImgPath(movie.backdrop_path) }}
              style={StyleSheet.absoluteFill}
            />
            <BlurView
              tint="dark"
              intensity={80}
              style={StyleSheet.absoluteFill}
            >
              <Title>{movie.original_title}</Title>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
