import axios from 'axios'
// const token = 


const getAllPosts = async () => {
    const { data } = await axios.get(process.env.REACT_APP_GET_ALL_POSTS);
    return data;
};

const createNewPost = async (postData, token) => {
    const { content, image } = postData;
    const formData = new FormData();
    formData.append('content', content);
    formData.append('file', image);


    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    };


    const { data } = await axios.post(process.env.REACT_APP_CREATE_POST, formData, config);
    return data;

};


const deletePost = async (id) => {
    console.log(id);
    const { data } = await axios.delete(`${process.env.REACT_APP_DELETE_POST}/${id}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('user')}`,
        },
    });
    console.log(data);
    return data;
}

const updatePost = async (postData) => {
    const { _id, content } = postData;
    const { data } = await axios.delete(`${process.env.REACT_APP_UPDATE_POSTS}/${_id}`, {
        content,
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('user')}`,
        },
    });
    return data;
}

const postService = {
    getAllPosts,
    createNewPost,
    updatePost,
    deletePost
};

export default postService;