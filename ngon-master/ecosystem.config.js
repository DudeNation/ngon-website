module.exports = {
	  name: "NGON-CLIENT",
	  script: "serve",
	  env: {
		      PM2_SERVE_PATH: "./build",
		      PM2_SERVE_PORT: 1000,
		      PM2_SERVE_SPA: "true",
		    },
};
