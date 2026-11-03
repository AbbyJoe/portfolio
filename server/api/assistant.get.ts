export default defineEventHandler(() => {
  const config = useRuntimeConfig()

  return {
    configured: Boolean(config.xaiBaseUrl && config.xaiAuthKey && config.xaiModel),
  }
})
