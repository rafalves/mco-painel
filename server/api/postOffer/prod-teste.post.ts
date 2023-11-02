export default defineEventHandler(async (event) => {
  const { rafaelStrapiToken, lomadeePublisherID, lomadeeApiToken } = useRuntimeConfig(event)
  const config = useRuntimeConfig(event)

  console.log('ROTA TESTE')

  // console.log('-', rafaelStrapiToken)
  // console.log('-', lomadeeApiToken)
  // console.log('-', lomadeePublisherID)
  // console.log('-', config.public.lomadeeBaseUrl)
  return { data: 'teste response' }
})