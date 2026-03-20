import { config } from "../Config/config";
import { Client, ID, Permission, TablesDB,Role , Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    tables;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.tables = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            this.tables.createRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteCollectionId, // naam change kar sakte ho later
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
                // [
                //     Permission.read(Role.user()),                  // Anyone can view this row
                //     Permission.update(Role.user()),        // Admins can update this row
                //     Permission.delete(Role.user()), // User 5c1f88b42259e can delete this row
                //     Permission.delete(Role.user())          // Admins can delete this row
                // ],        
            })
        console.log("Appwrite service :: createPost :: post created successfully", config.appwriteDatabaseId, config.appwriteCollectionId, slug);

    } catch(error) {
        console.log("Appwrite serive :: createPost :: error", error);
    }
}

    async updatePost(slug, { title, content, featuredImage, status }) {
    try {
        return await this.tables.updateRow({
            databaseId: config.appwriteDatabaseId,
            tableId: config.appwriteCollectionId,
            rowId: slug,
            data: {
                title,
                content,
                featuredImage,
                status
            }
        })
    } catch (error) {
        console.log("Appwrite serive :: updatePost :: error", error);
    }
}

    async deletePost(slug) {
    try {
        await this.tables.deleteRow({
            databaseId: config.appwriteDatabaseId,
            tableId: config.appwriteCollectionId,
            rowId: slug,
        })
        return true
    } catch (error) {
        console.log("Appwrite serive :: deletePost :: error", error);
        return false
    }
}

    async getPost(slug) {
    try {
        return await this.tables.getRow({
            databaseId: config.appwriteDatabaseId,
            tableId: config.appwriteCollectionId,
            rowId: slug,

        })
    } catch (error) {
        console.log("Appwrite serive :: getPost :: error", error);
        return false
    }
}

    async getPosts() {
    try {
        return await this.tables.listRows({
            databaseId: config.appwriteDatabaseId,
            tableId: config.appwriteCollectionId,
            // queries:
            //     [Query.equal("status", "active")]
        })
    } catch (error) {
        console.log("Appwrite serive :: getPosts :: error", error);
        return false
    }
}

    // file upload service

    async uploadFile(file) {
    try {
        return await this.bucket.createFile({
            bucketId: config.appwriteBucketId,
            fileId: ID.unique(),
            file: file
        });
    } catch (error) {
        console.log("Appwrite service :: uploadFile :: error", error);
        return false;
    }
}

    async deleteFile(fileId) {
    try {
        await this.bucket.deleteFile({
            bucketId: config.appwriteBucketId,
            fileId: fileId
        });

        return true;

    } catch (error) {
        console.log("Appwrite service :: deleteFile :: error", error);
        return false;
    }
}

getFileView(fileId) {
    return this.bucket.getFileView({
        bucketId: config.appwriteBucketId,
        fileId: fileId
    });
}
}


const service = new Service()
export default service