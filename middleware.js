export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard"],
  publicRoutes: ["/api/uploadthing"],
};
