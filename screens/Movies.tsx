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

const API_KEY = "fec442424b0d4ae084e35e7b48cab4c6";

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  /* color: white; */
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
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
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    refetch: refetchNowPlaying,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    refetch: refetchUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    refetch: refetchTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  const onRefresh = async () => {
    queryClient.refetchQueries(["movies"]);
  };

  const renderVMedia = ({ item }: { item: Movie }) => (
    <VMedia
      posterPath={item.poster_path || ""}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );

  const renderHMedia = ({ item }: { item: Movie }) => (
    <HMedia
      posterPath={item.poster_path || ""}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );

  const movieKeyExtractor = (item: Movie) => item.id + "";

  // console.log(Object.keys(nowPlayingData?.results[0]));
  // console.log(Object.keys(nowPlayingData?.results[0]).map((v) => typeof v));

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
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
                />
              ))}
            </Swiper>
            <ListContainer>
              <ListTitle>Trending Movies</ListTitle>
              {trendingData && (
                <TrendingScroll
                  data={trendingData.results}
                  keyExtractor={movieKeyExtractor}
                  renderItem={renderVMedia}
                  ItemSeparatorComponent={VSeparator}
                  contentContainerStyle={{ paddingHorizontal: 30 }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              )}
            </ListContainer>
            <ComingSoonTitle>Coming soon</ComingSoonTitle>
          </>
        }
        renderItem={renderHMedia}
        ItemSeparatorComponent={HSeparator}
      />
    )
  );
};

export default Movies;
