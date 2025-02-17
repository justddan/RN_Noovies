import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { Dimensions, FlatList, RefreshControl, View } from "react-native";
import { ActivityIndicator } from "react-native";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { useQuery, useQueryClient } from "react-query";
import { Movie, MovieResponse, moviesApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const API_KEY = "fec442424b0d4ae084e35e7b48cab4c6";

const Container = styled.ScrollView``;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  /* color: white; */
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const movieKeyExtractor = (item: Movie) => item.id + "";

  // console.log(Object.keys(nowPlayingData?.results[0]));
  // console.log(Object.keys(nowPlayingData?.results[0]).map((v) => typeof v));

  return loading ? (
    <Loader />
  ) : (
    upcomingData && (
      <FlatList
        data={upcomingData.results}
        keyExtractor={movieKeyExtractor}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListHeaderComponent={
          <>
            <Swiper
              horizontal
              loop
              autoplay
              autoplayTimeout={3.5}
              showsButtons={false}
              showsPagination={false}
              containerStyle={{
                marginBottom: 40,
                width: "100%",
                height: SCREEN_HEIGHT / 4,
              }}
            >
              {nowPlayingData?.results.map((movie) => (
                <Slide
                  key={movie.id}
                  backdropPath={movie.backdrop_path || ""}
                  posterPath={movie.poster_path || ""}
                  originalTitle={movie.original_title}
                  voteAverage={movie.vote_average}
                  overview={movie.overview}
                  fullData={movie}
                />
              ))}
            </Swiper>
            {trendingData ? (
              <HList title="Trending Movies" data={trendingData.results} />
            ) : null}
            <ComingSoonTitle>Coming soon</ComingSoonTitle>
          </>
        }
        renderItem={({ item }) => (
          <HMedia
            posterPath={item.poster_path || ""}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
            fullData={item}
          />
        )}
        ItemSeparatorComponent={HSeparator}
      />
    )
  );
};

export default Movies;
