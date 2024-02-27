const appConfig = () => ({
  app: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  },
});

export default appConfig;
