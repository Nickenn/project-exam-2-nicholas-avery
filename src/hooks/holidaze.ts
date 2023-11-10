/*import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const holidazeApi = createApi({
    reducerPath: "holidazeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.noroff.dev/api/v1/holidaze/",
        prepareHeaders: (headers, { getState }) => 
        const token = (getState() as RootState).user.accessToken;
        if (token) {
        headers.set('authorization', `Bearer ${token}`);
    }
    return headers;

  },
}),

endpoints: (builder) => ({
    getVenueById: builder.query<SpecificVenue, string>({
        query: (id) => `venues/${id}?_owner=true&_bookings=true`,
    }),
    getVenues: builder.query<Venue[], string>({
        query:() => `venues`,
    }),
    registerUserProfile: builder.mutation<any, any>({
        query: (body) => ({
            url: `auth/register`,
            method: "POST",
            body,
        }),
    }),
    login: builder.mutation<any, any>({
        url: `auth/login`,
        method: "POST",
        body,
    }),
}),*/
