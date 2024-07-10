"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Webcam from "react-webcam";

export default function CardIdForm() {
  const [cardIdFrontPreview, setCardIdFrontPreview] = useState<string | null>(
    null
  );
  const [cardIdBackPreview, setCardIdBackPreview] = useState<string | null>(
    null
  );
  const [cardIdFront, setCardIdFront] = useState<File | null>(null);
  const [cardIdBack, setCardIdBack] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [SelfieImage, setSelfieImage] = useState<string | null>(null);

  const cardIdFrontRef = useRef<HTMLInputElement>(null);
  const cardIdBackRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam | null>(null);

  const handleCardIdFrontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCardIdFront(file);
      const reader = new FileReader();
      reader.onload = () => {
        setCardIdFrontPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCardIdFront(null);
      setCardIdFrontPreview(null);
    }
  };

  const handleCardIdBackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCardIdBack(file);
      const reader = new FileReader();
      reader.onload = () => {
        setCardIdBackPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCardIdBack(null);
      setCardIdBackPreview(null);
    }
  };

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setSelfieImage(imageSrc as string);
    setIsCameraOpen(false);
  };

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
    setSelfieImage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cardIdFront && cardIdBack) {
      const formData = new FormData();
      formData.append("card-id-front", cardIdFront);
      formData.append("card-id-back", cardIdBack);
      if (SelfieImage) {
        formData.append("selfie", SelfieImage);
      }

      try {
        const response = await fetch("/api/kyc/verifications", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          toast.success("Files uploaded successfully");
        } else {
          toast.error("Failed to upload files");
          console.error(response);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center justify-around w-full">
        <div className="flex flex-col items-center gap-7">
          <label className=" text-center" htmlFor="card-id-front">
            Card ID Front
          </label>
          <input
            ref={cardIdFrontRef}
            className="hidden"
            type="file"
            id="card-id-front"
            name="card-id-front"
            accept="image/*"
            onChange={handleCardIdFrontChange}
          />

          <div className=" p-5  flex flex-col items-center gap-4 rounded-sm">
            {cardIdFrontPreview ? (
              <Image
                src={cardIdFrontPreview}
                alt="Card ID Front"
                className="w-80 h-auto  object-cover rounded-md"
                width={200}
                height={200}
              />
            ) : (
              <div className="w-80 h-52 bg-gray-200 rounded-md"></div>
            )}

            <div className="w-full flex items-center justify-between">
              <button
                onClick={() => {
                  cardIdFrontRef?.current?.click();
                }}
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Upload
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-7">
          <label className="text-center" htmlFor="card-id-back">
            Card ID Back
          </label>
          <input
            ref={cardIdBackRef}
            type="file"
            className="hidden"
            id="card-id-back"
            name="card-id-back"
            accept="image/*"
            onChange={handleCardIdBackChange}
          />
          <div className="p-5 flex flex-col items-center gap-4 rounded-sm">
            {cardIdBackPreview ? (
              <Image
                src={cardIdBackPreview}
                alt="Card ID Front"
                className="w-80 h-auto  object-cover rounded-md"
                width={200}
                height={200}
              />
            ) : (
              <div className="w-80 h-52 bg-gray-200 rounded-md"></div>
            )}

            <div className="w-full flex items-center justify-between">
              <button
                onClick={() => {
                  cardIdBackRef?.current?.click();
                }}
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Upload
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-20">
        <div className="w-[80%] mx-auto">
          <h2 className="text-3xl text-center mb-6">Selfie </h2>
          {/* Camera section */}
          <div
            className={` w-full ${
              isCameraOpen || SelfieImage ? "h-auto" : "h-60"
            }  bg-gray-200 rounded-md relative`}
          >
            {isCameraOpen && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover rounded-md"
              />
            )}
            {SelfieImage && (
              <Image
                src={SelfieImage}
                alt="Captured Selfie"
                className="rounded-lg shadow-md w-full h-full object-cover"
                width={200}
                height={200}
              />
            )}
          </div>
          <div className="flex justify-center items-center">
            {!isCameraOpen && (
              <button
                type="button"
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleOpenCamera}
              >
                Open Camera
              </button>
            )}

            {isCameraOpen && (
              <button
                type="button"
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={capture}
              >
                Capture
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-20">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
