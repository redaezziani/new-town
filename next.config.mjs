/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";
const nextConfig = {
    // all domains are allowed by default
    images: {
        domains: ["files.edgestore.dev"]
    },
};


export default withPlaiceholder(nextConfig);
