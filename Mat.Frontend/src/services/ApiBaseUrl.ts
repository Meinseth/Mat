export const ApiBaseUrl =
  process.env.NODE_ENV === "production" ? "/proxy" : undefined; // undefined so it uses
