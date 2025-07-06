import path from 'path';
import { fileURLToPath } from 'url';
import stylexPlugin from '@stylexswc/nextjs-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default stylexPlugin({
  rsOptions: {
    dev: process.env.NODE_ENV === 'development',
    aliases: {
      '@/*': [path.join(__dirname, '*')],
    },
    unstable_moduleResolution: {
      type: 'commonJS',
      rootDir: __dirname,
    },
  },
  stylexImports: ['@stylexjs/stylex'], // default
  useCSSLayers: true,
  transformCss: async (css, filePath) => {
    const postcss = require('postcss');
    const result = await postcss([require('autoprefixer')]).process(css, {
      from: filePath,
      map: {
        inline: false,
        annotation: false,
      },
    });
    return result.css;
  },
})({ transpilePackages: ['@stylexjs/open-props'] });
