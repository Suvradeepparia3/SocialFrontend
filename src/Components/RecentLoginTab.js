import React from 'react';
import "../Style/Style.css";

function RecentLoginTab(props) {
    return (
        <div className="flex-container">

            {/* <button className="tab">
                <div className="crosSection">
                    <div className="dltBtn">x
                        <span className="tooltiptext">Remove account from this page</span>
                    </div>
                </div>
                <div className="upper"> */}
                    {/* Profile Pic */}
                    {/* <img src="/profile.jpg" alt="username" />
                </div>
                <div className="footer">
                    <div className="text" style={{ color: "rgb(133, 128, 128)" }}> */}
                        {/* User name */}
                        {/* Suvradeep
                    </div>
                </div>
            </button> */}

            <button className="tab">
                <div className="upperForAdd">
                    <div className="add">+</div>
                </div>
                <div className="footer">
                    <div className="text">Add Account</div>
                </div>
            </button>

        </div>
    );
}

export default RecentLoginTab;