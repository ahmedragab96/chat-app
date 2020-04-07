import S3 from 'react-aws-s3';
 
const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
    region: 'us-east-1',
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCCESS_KEY,
    s3Url: process.env.REACT_APP_S3_URL, /* optional */
}
 
const ReactS3Client = new S3(config);
/*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */
 
export const uploadImage = async (file, fileName) => {
  try {
    const data = await ReactS3Client.uploadFile(file, fileName);

    return data;
  } catch (error) {
    console.error(error);
  }
 
  /**
   * {
   *   Response: {
   *     bucket: "myBucket",
   *     key: "image/test-image.jpg",
   *     location: "https://myBucket.s3.amazonaws.com/media/test-file.jpg"
   *   }
   * }
   */
}