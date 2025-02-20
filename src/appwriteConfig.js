import { Client, Account } from "appwrite";
 
const client = new Client();
 
client
  .setEndpoint("https://cloud.appwrite.io/v1") // 
  .setProject("67b6ce100032bb22257f"); //
 
const account = new Account(client);
 
export { client, account };