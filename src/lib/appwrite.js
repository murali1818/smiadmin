import { Client, Account, Databases} from 'appwrite';
 
export const client = new Client();
 
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6776b8d5003d7203540c'); // Replace with your project ID
 
export const account = new Account(client);
export const databases = new Databases(client);
export const databaseId = '6776b9fa00080858f599';
export const collectionId = '6776ba7a0031a73ccc25';
export const bucketImageId = '6776bada000a078a2e2f';
 
export { ID } from 'appwrite';