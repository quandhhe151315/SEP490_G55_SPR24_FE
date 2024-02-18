import React, {useEffect, useState} from "react";
import Avatar from 'react-avatar-edit';

const UploadAvatar = ({ setNewAvatarImage }) => {
    const [src, setSrc] = useState(null);
    const [preview, setPreview] = useState(null);

    const onClose =() => {
        setPreview(null);
    }

    const onCrop = view => {
        setPreview(view);
    }

    useEffect(() => {
        setNewAvatarImage(preview);
    }, [preview]);

    return (
        <div>
            <Avatar
                width={400}
                height={300}
                onCrop={onCrop}
                onClose={onClose}
                src = {src}
                label = "Chọn ảnh"
                labelStyle={{color: "#ff5e00", fontSize: "26px", fontWeight : "bold"}}
            />
        </div>
        
    );
};

export default UploadAvatar;