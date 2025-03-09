import axios from "axios";

const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
            params: {
                key: import.meta.env.VITE_IMGBB_API_KEY, // Use VITE_ for environment variables in Vite
            },
        });

        return response.data.data.url; // Return the uploaded image URL
    } catch (error) {
        console.error("ImgBB upload failed:", error);
        throw new Error("Failed to upload image");
    }
};

export default uploadImageToImgBB;
