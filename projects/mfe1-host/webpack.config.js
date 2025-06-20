const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "mfe1Host",
    publicPath: "auto",
    scriptType: "text/javascript"
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    //outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        //library: { type: "module" },

        // For remotes (please adjust)
        // name: "mfe1Host",
        // filename: "remoteEntry.js",
        // exposes: {
        //     './Component': './projects/mfe1-host/src/app/app.component.ts',
        // },        
        
        // For hosts (please adjust)
        // remotes: {
        //     "mfe2Search": "http://localhost:4200/remoteEntry.js",

        // },
        remotes: {
          'mfe2-search': 'mfe2Search@http://localhost:4200/remoteEntry.js',
          'mfe3-bookmark': 'mfe3Bookmark@http://localhost:4300/remoteEntry.js',
      },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin()
  ],
};
