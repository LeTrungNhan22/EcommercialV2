/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "links.papareact.com",
      "images.unsplash.com",
      "i.redd.it",
      "cf.shopee.vn",
      "assets.nintendo.com",
      "scontent.fsgn2-6.fna.fbcdn.net",
      "ui-avatars.com",
      "www.google.com",
      "product.hstatic.net",
      "firebasestorage.googleapis.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
