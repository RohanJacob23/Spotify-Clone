/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "*",
      "lineup-images.scdn.co",
      "images-ak.spotifycdn.com",
      "i.scdn.co",
      "mosaic.scdn.co",
      "wrapped-images.spotifycdn.com",
      "thisis-images.scdn.co",
    ],
  },
};

module.exports = nextConfig;
