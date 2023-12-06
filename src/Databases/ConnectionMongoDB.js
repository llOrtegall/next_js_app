import mongoose from 'mongoose'

const URI = 'mongodb://127.0.0.1:27017/company'

export const ConnectMongoDB = async () => {
  await mongoose.connect(URI)
    .then(() => console.log('Mongoose connected ' + URI))
    .catch(error => console.log(error))
}
