import { Client, Account } from "appwrite";
 
const client = new Client();
 
client
  .setEndpoint("https://cloud.appwrite.io/v1") // ✅ Replace with your Appwrite endpoint
  .setProject("67b6ce100032bb22257f"); // ✅ Replace with your Project ID
 
const account = new Account(client);
 
export { client, account };