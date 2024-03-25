import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDetails, addDetail } from "../../../service/detail/detailService";
import CustomToast from "../../toas/CustomToast";

export default function DetailWallets() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const details = useSelector(state => state.details.details);
    const [showToast, setShowToast] = useState(false);
    const [newDetail, setNewDetail] = useState({
        description: '',
        money: 0,
        time: new Date().toISOString().slice(0, 16)
    });

    useEffect(() => {
        dispatch(getDetails());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDetail(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddExpense = async () => {
        try {
            await dispatch(addDetail(newDetail));
            setShowToast(true);
            setNewDetail({
                description: '',
                money: 0,
                time: new Date().toISOString().slice(0, 16)
            });
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    return (
        <>
            {showToast && <CustomToast message="Successful money transfer!" />}
            <div className="flex-container-account-details">
                <div className={"title-nav-details"}>
                    <div className={"title-nav-center"}>My Details</div>
                    <div className="clone-myDetails" onClick={() => { navigate("/home") }}>X</div>
                </div>
                <div className="profile-myDetails">
                    <form onSubmit={handleAddExpense}>
                        <input type="text" name="description" value={newDetail.description} onChange={handleChange} placeholder="Enter description" />
                        <input type="number" name="money" value={newDetail.money} onChange={handleChange} placeholder="Enter money" />
                        <input type="datetime-local" name="time" value={newDetail.time} onChange={handleChange} />
                        <button type="submit">Add Expense</button>
                    </form>
                    {details.map((currentDetail, index) => (
                        <div key={index}>
                            <hr />
                            <div className="main-myDetails-top1">
                                <div className="profile-myDetails-center">
                                    <div>Amount: {currentDetail.description}</div>
                                    <div>Note: {currentDetail.money}</div>
                                    <div>Time: {currentDetail.time}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
