const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

module.exports = async function (env, argv) {
  // Load environment variables from .env and .env.local
  const envLocal = dotenv.config({ path: path.resolve(__dirname, '.env.local') });
  const envDefault = dotenv.config({ path: path.resolve(__dirname, '.env') });
  
  // Merge env vars (local takes precedence)
  const envVars = {
    ...envDefault.parsed,
    ...envLocal.parsed
  };

  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Add environment variables to webpack
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.EXPO_PUBLIC_SUPABASE_URL': JSON.stringify(envVars.EXPO_PUBLIC_SUPABASE_URL),
      'process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(envVars.EXPO_PUBLIC_SUPABASE_ANON_KEY),
    })
  );

  return config;
};