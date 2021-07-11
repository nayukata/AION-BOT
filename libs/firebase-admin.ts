/* eslint-disable no-undef */
import * as admin from 'firebase-admin'

const params = {
  type: process.env.ADMIN_TYPE,
  projectId: process.env.PROJECT_ID,
  privateKeyId: process.env.PRIVATE_KEY_ID,
  privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.CLIENT_EMAIL,
  clientId: process.env.CLIENT_ID,
  authUri: process.env.AUTH_URI,
  tokenUri: process.env.TOKEN_URI,
  authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
  clientC509CertUrl: process.env.CLIENT_X509_CERT_URL,
}
if (!admin.apps.length) {
  console.log(
    'process.env.PRIVATE_KEY',
    process.env.PRIVATE_KEY?.replace(/\\n/g, '\n')
  )

  admin.initializeApp({
    credential: admin.credential.cert(params),
  })
}

const app = admin.app()
const db = admin.firestore()

export { admin, app, db }
