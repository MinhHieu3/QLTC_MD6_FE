import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addCategory, getCategoryDetails} from "../../../service/category/categoryService";
import {getDetails} from "../../../service/detail/detailService";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {getStorage} from "firebase/storage";
import {initializeApp} from "firebase/app";
import "./CategoryWallets.css"

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

export default function AddCategoryWallet() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.categories.categories);
    const [showDetail, setShowDetail] = useState(false);
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: "",
        avatar: "",
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageURL, setImageURL] = useState("");
    const [imagePreviewURL, setImagePreviewURL] = useState(""); // State to store temporary image URL
    const imagDefault = "https://firebasestorage.googleapis.com/v0/b/case-md6-68a8f.appspot.com/o/images%2Fdefault_avatar.png?alt=media&token=05d37e0d-63ea-4b18-9a42-83ab35118f5f";

    useEffect(() => {
        dispatch(getDetails());
        dispatch(getCategoryDetails());
    }, [dispatch]);

    const handleCategoryClick = () => {
        setShowDetail(true);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewCategory((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCategory(newCategory));
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
                    setImageURL(url);
                    setNewCategory((prevState) => ({
                        ...prevState,
                        avatar: url,
                    }));
                });
            }
        );
    };

    return (
        <>
            <div className="container-detail">
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
                            {imagePreviewURL && <img src={imagePreviewURL} alt="Preview"/>}
                            {uploadProgress > 0 && uploadProgress < 100 && (
                                <div className="upload-progress">{uploadProgress}%</div>
                            )}
                            <button type="submit">Add Category</button>
                        </form>
                    </div>
                )
            </div>
        </>
    );
}
