import React from "react";
import "./OnBoardingForm.scss";

const SellerRegisterForm = () => {
  return (
    <>
      <header className="form__header">
        <div className="form__header-wrapper">
          <div className="form__header-left">
            <span className="logo">Seller Admin</span>
          </div>
          <div className="form__header-right">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/instagram-rn-aa052.appspot.com/o/user.png?alt=media&token=f0f5c13b-ee34-4d16-9972-6c59e4f60f3e"
              alt=""
              className="topAvatar"
            />
            <div className="form__header-username">
              <span>Lê Trung Nhân</span>
            </div>
          </div>
        </div>
      </header>
      <main className="form__main">
        <div className="form__main-wrapper">
          <div className="form__main-input">
            <div className="form__input-title">
              <h2>Đăng ký tài khoản</h2>
            </div>
            <div>
              <form action="">
                <div className="form__input-group">
                  <label htmlFor="shopName">Tên shop</label>
                  <input type="text" name="shopName" id="shopName" />
                </div>
                <div className="form__input-group">
                  <label htmlFor="address">Địa chỉ</label>
                  <input type="text" name="address" id="address" />
                </div>
                <div className="form__input-group">
                  <label htmlFor="address">Email</label>
                  <input disabled type="email" name="email" id="email" />
                </div>
                <div className="form__input-group">
                  <label htmlFor="address">Số điện thoại</label>
                  <input
                    disabled
                    type="phone"
                    name="phoneNumber"
                    id="phoneNumber"
                  />
                </div>
                <div className="change__Profile-redirect">
                  <a href="/seller/change-profile">Thay đổi thông tin</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SellerRegisterForm;
