import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/json/v1/1/",
  }),
  endpoints: (builder) => ({
    getRecipeById: builder.query({
      query: (id) => `lookup.php?i=${id}`,
    }),
    searchRecipes: builder.query({
      query: (searchTerm) => `search.php?s=${searchTerm}`,
    }),
    getCategories: builder.query({
      query: () => `categories.php`,
    }),
    getRecipesByCategory: builder.query({
      query: (category) => `filter.php?c=${category}`,
    }),
  }),
});

export const {
  useGetRecipeByIdQuery,
  useSearchRecipesQuery,
  useGetCategoriesQuery,
  useGetRecipesByCategoryQuery,
  endpoints: { getRecipeById },
} = recipeApi;
