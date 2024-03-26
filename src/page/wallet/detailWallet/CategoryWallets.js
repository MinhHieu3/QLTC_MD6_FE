import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getDetails, addDetail } from "../../../service/detail/detailService";
import { getCategoryDetails, addCategory } from "../../../service/category/categoryService";
import CustomToast from "../../toas/CustomToast";
import "./CategoryWallets.css";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDi3k1wLzdUDz_UPUeuKatQBGvdcuMjPrQ",
    authDomain: "case-md6-68a8f.firebaseapp.com",
    projectId: "case-md6-68a8f",
    storageBucket: "case-md6-68a8f.appspot.com",
    messagingSenderId: "175511547154",
    appId: "1:175511547154:web:57ebb36215dfe8983357cb",
    measurementId: "G-PM3PDD7DJT"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function CategoryWallets() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(state => state.categories.categories);
    const [showDetail, setShowDetail] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: "",
        avatar: "",
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imagePreviewURL, setImagePreviewURL] = useState(""); // State to store temporary image URL

    useEffect(() => {
        dispatch(getDetails());
        dispatch(getCategoryDetails());
    }, [dispatch]);

    const handleCategoryClick = () => {
        setShowDetail(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addCategory(newCategory));
        setShowAddCategoryForm(false);
        setNewCategory({
            name: "",
            avatar: "",
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImagePreviewURL(URL.createObjectURL(file)); // Create temporary URL for image preview
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setUploadProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setNewCategory((prevState) => ({
                        ...prevState,
                        avatar: url,
                    }));
                });
            }
        );
    };

    const handleAddCategory = () => {
        setShowAddCategoryForm(true);
    };

    return (
        <>
            <div className="container-detail">
                <div className="category-wallets">
                    <div className="container-category">
                        <div className="span-category"><span>Category details</span></div>
                        <div className="clone-myDetails" onClick={() => navigate("/home")}>X</div>
                    </div>
                    <div className="list-category">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="category-item"
                                onClick={handleCategoryClick}
                            >
                                <div className="avatar-name">
                                    <div className="category-avatar">
                                        <img src={category.avatar} alt={category.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                                    </div>
                                    <div className="category-name">{category.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {showDetail && (
                    <div className="detail-wallets">

                    </div>
                )}
            </div>
            <button onClick={handleAddCategory}>Add Category</button>
            {showAddCategoryForm && (
                <div className="add-category-form">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Category Name"
                            value={newCategory.name}
                            onChange={handleChange}
                        />
                        <input
                            type="file"
                            name="avatar"
                            onChange={handleImageUpload}
                        />
                        {imagePreviewURL && <img src={imagePreviewURL} alt="Preview" />}
                        {uploadProgress > 0 && uploadProgress < 100 && (
                            <div className="upload-progress">{uploadProgress}%</div>
                        )}
                        <button type="submit">Add Category</button>
                    </form>
                </div>
            )}
        </>
    );
}
