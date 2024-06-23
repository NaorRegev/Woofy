import React, { useState, useRef } from 'react';
import { toast } from "react-toastify";
import {api} from "../../api/api";

type ImageComponentProps = {
    onFileSelect: (file: File) => void;
};

export const getImage = async (id: number) => {
    try {
        const res = await api.get(`/image/get/${id}`, { responseType: 'arraybuffer' });
        const imageInBase64 = btoa(
            new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
            ),
        );
        return `data:${res.headers['content-type'].toLowerCase()};base64,${imageInBase64}`;
    } catch (error) {
        console.error("Error getting image", error);
    }
};


const ImageComponent: React.FC<ImageComponentProps> = ({ onFileSelect }) => {
    const [imageData, setImageData] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadButtonClick = (event: React.MouseEvent) => {
        event.preventDefault();
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Check if the selected file is an image
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        // Pass the selected file up to the parent component
        onFileSelect(file);

        // Display the selected image
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageData(reader.result as string);
        };
        reader.readAsDataURL(file);
    };


    return (
        <div className="flex flex-row items-center justify-start py-0 pr-[318px] pl-0 gap-[24px] mq450:pr-5 mq450:box-border mq750:flex-wrap mq750:pr-[159px] mq750:box-border">
            {imageData ? (
                <img
                    className="h-20 w-20 relative rounded-[50%] object-cover"
                    loading="lazy"
                    alt="From database"
                    src={imageData}
                />
            ) : (
                <img
                    className="h-20 w-20 relative rounded-[50%] object-cover"
                    loading="lazy"
                    alt=""
                    src="/caregiver-avatar-image@2x.png"
                />
            )}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <button
                type="button"
                onClick={handleUploadButtonClick}
                className="cursor-pointer py-2 px-[16.5px] bg-[transparent] h-[42px] rounded-11xl box-border flex flex-row items-center justify-center whitespace-nowrap border-[1px] border-solid border-color-neutral-neutral-light hover:bg-gray-400 hover:box-border hover:border-[1px] hover:border-solid hover:border-gray-200">
                <div className="relative text-base leading-[150%] font-text-medium-normal text-color-neutral-neutral-dark text-left inline-block min-w-[103px]">
                    Upload photo
                </div>
            </button>
        </div>
    );
};

export default ImageComponent;