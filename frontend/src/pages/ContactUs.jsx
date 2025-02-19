import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import StarRating from "../components/StarRating";
import InputForm from "../components/InputForm";
import { Cloudinary } from "@cloudinary/url-gen";
import SuccessPopup from "../components/SuccesPopup";

const cloudinary = new Cloudinary({ cloud_name: "dwmwivd2x", secure: true });

const inputsData = [
  {
    id: 1,
    label: "Fullname",
    type: "text",
    placeholder: "e.g. John Becker",
    name: "fullname",
    pattern: "/^[A-Za-z]+([-][A-Za-z]+)*([ ][A-Za-z]+([-][A-Za-z]+)*)*$",
  },
  {
    id: 2,
    label: "Email address",
    type: "email",
    placeholder: "johnbecker@gmail.com",
    name: "email",
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
  },
  {
    id: 3,
    label: "Message",
    type: "textarea",
    placeholder: "Write your message here",
    name: "message",
    rows: "12",
  },
  {
    id: 4,
    label: "Review text",
    type: "textarea",
    placeholder: "Write your review here",
    name: "review",
    rows: "12",
  },
  {
    id: 5,
    label: "Upload a photo (optional)",
    type: "file",
    accept: "image/*",
    name: "image",
  },
];

const ContactUs = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [rating, setRating] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const [formContactusValues, setFormContactusValues] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const [formReviewValues, setFormReviewValues] = useState({
    fullname: "",
    review: "",
  });
  const [errorMessageContactus, setErrorMessageContactus] = useState("");
  const [errorMessageReview, setErrorMessageReview] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = () => {
      setErrorMessageContactus("");
      setErrorMessageReview("");
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleInputMessageChange = (e) => {
    const { name, value } = e.target;
    setFormContactusValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputReviewChange = (e) => {
    const { name, value } = e.target;
    setFormReviewValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setErrorMessage("Please select a valid image file.");
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const validateFullName = (name) => {
    const namePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    return namePattern.test(name.trim());
  };

  const validateEmail = (email) => {
    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email.trim());
  };

  const validateReviewLength = (review) => {
    return review.length >= 220 && review.length <= 720;
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const { fullname, email, message } = formContactusValues;

    if (!fullname || !email || !message) {
      setErrorMessageContactus("Please fill out all required fields.");
      return;
    }

    if (!validateFullName(fullname)) {
      setErrorMessageContactus(
        "Full Name should contain only letters and spaces."
      );
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessageContactus("Please enter a valid email address.");
      return;
    }

    const messageData = {
      fullName: fullname.trim(),
      address: email.trim(),
      message: message.trim(),
    };

    try {
      const response = await fetch("/api/v1/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        form.reset();
        setFormContactusValues({
          fullname: "",
          email: "",
          message: "",
        });
        setShowPopup(true);
      } else {
        setErrorMessageContactus("Failed to submit message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessageContactus("An error occurred. Please try again.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const { fullname, review } = formReviewValues;

    if (!fullname || !review || rating === 0) {
      setErrorMessageReview(
        "Please fill out all required fields and provide a rating."
      );
      return;
    }

    if (!validateFullName(fullname)) {
      setErrorMessageReview(
        "Full Name should contain only letters and spaces."
      );
      return;
    }

    if (!validateReviewLength(review)) {
      setErrorMessageReview("Review should contain 220-720 characters.");
      return;
    }

    let imageUrl = null;

    if (selectedImage) {
      const imageData = new FormData();
      imageData.append("file", selectedImage);
      imageData.append("upload_preset", "Testimonies");

      try {
        const uploadResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dwmwivd2x/image/upload",
          {
            method: "POST",
            body: imageData,
          }
        );

        const uploadResult = await uploadResponse.json();

        if (uploadResult.secure_url) {
          imageUrl = uploadResult.secure_url;
        } else {
          setErrorMessageReview("Image upload failed. Please try again.");
          return;
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        setErrorMessageReview("Image upload failed. Please try again.");
        return;
      }
    }

    const reviewData = {
      reviewer_name: fullname.trim(),
      star: rating,
      review: review.trim(),
      reviewer_image: imageUrl,
    };

    try {
      const response = await fetch("/api/v1/testimonies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        form.reset();
        setFormReviewValues({
          fullname: "",
          review: "",
        });
        setRating(0);
        setSelectedImage(null);
        setImagePreview(null);
        setShowPopup(true);
      } else {
        setErrorMessageReview("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessageReview("An error occurred. Please try again.");
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/");
  };

  return (
    <div>
      <section className="w-full">
        <Hero
          title="Contact us"
          subtitle="The elegant luxury bedrooms in this gallery showcase custom interior designs & decorating ideas. View pictures and find your perfect luxury bedroom design."
        />
      </section>
      <section className="contactUs__section">
        <div className="w-full max-w-[1200px]">
          <h1 className="contactUs__section-title">
            Have some questions? We'd love to hear from you
          </h1>
          <form onSubmit={handleMessageSubmit}>
            <div className="flex w-full flex-wrap justify-between pb-10">
              {inputsData.slice(0, 2).map((input) => (
                <div key={input.id} className="contact__input-form">
                  <InputForm
                    {...input}
                    value={formContactusValues[input.name]}
                    onChange={handleInputMessageChange}
                    className="flex w-full flex-col rounded-md border-1 border-[#dbdbdb] bg-[#fafafa] p-3 focus:outline-[#cccccc]"
                  />
                </div>
              ))}
            </div>
            <InputForm
              {...inputsData[2]}
              value={formContactusValues.message}
              onChange={handleInputMessageChange}
              className="flex w-full flex-col rounded-md border-1 border-[#dbdbdb] bg-[#fafafa] p-2 focus:outline-[#cccccc]"
            />
            <div className="contact__btn-container pt-8">
              {errorMessageContactus && (
                <p className="mx-auto mb-5 w-auto rounded-lg text-center font-bold text-red drop-shadow-lg">
                  {errorMessageContactus}
                </p>
              )}
              <button type="submit" className="contact__btn rounded-md">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="contactUs__section mb-0 bg-primary pb-8 lg:pb-12">
        <div className="w-full max-w-[1200px]">
          <h1 className="contactUs__section-title">
            Please leave a review here
          </h1>
          <form onSubmit={handleReviewSubmit}>
            <div className="flex w-full flex-wrap items-center justify-between pb-3">
              <div className="flex w-full flex-col pb-3 md:w-[48%] md:pb-0">
                <InputForm
                  {...inputsData[0]}
                  value={formReviewValues.fullname}
                  onChange={handleInputReviewChange}
                  className="flex w-full flex-col rounded-md border-1 border-[#eee3ff] bg-[#f6f1ff] p-3 focus:outline-[#e3d1ff]"
                />
              </div>

              <div className="contact__input-form mb-4 w-full items-center md:w-[46%]">
                <p className="contact__input-label font-bold">
                  Rate your experience
                </p>
                <StarRating
                  rating={rating}
                  onRatingChange={handleRatingChange}
                />
              </div>
            </div>

            <InputForm
              {...inputsData[3]}
              value={formReviewValues.review}
              onChange={handleInputReviewChange}
              className="w-full rounded-md border-1 border-[#eee3ff] bg-[#f6f1ff] p-3 focus:outline-[#e3d1ff]"
            />

            <div className="contact__input-form my-4">
              <InputForm
                {...inputsData[4]}
                className="w-full pt-2"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-4">
                  <p className="contact__input-label">Image Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Selected"
                    className="mt-2 w-full max-w-[400px]"
                  />
                </div>
              )}
            </div>

            <div className="contact__btn-container">
              {errorMessageReview && (
                <p className="mx-auto mb-5 w-auto rounded-lg text-center font-bold text-red drop-shadow-lg">
                  {errorMessageReview}
                </p>
              )}
              <button type="submit" className="contact__btn mt-4 rounded-md">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
      <section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1388.1598400174482!2d-99.16255351123135!3d19.351852376896797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ffc464ce8279%3A0x77e3dbe6da694814!2sCoyoacan%20Market!5e0!3m2!1suk!2sua!4v1721826495383!5m2!1suk!2sua"
          width="1512"
          height="459"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        ></iframe>
      </section>
      {showPopup && <SuccessPopup onClose={handlePopupClose} />}
    </div>
  );
};

export default ContactUs;
