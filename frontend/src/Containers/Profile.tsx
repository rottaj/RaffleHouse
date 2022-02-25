import React, { useState, useRef } from "react";
import BaseContainer from "./BaseContainers/BaseContainer";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { MetaMaskUserContext } from "../utils/contexts";
import { useContext } from "react";
import { useEffect } from "react";
import { 
    Box,
    Input,
    Image
} from "@chakra-ui/react";
const Profile = () => {
    const [profileImage, setProfileImage] = useState("");
    const inputFile = useRef(null);
    const storage = getStorage();
    const user = useContext(MetaMaskUserContext)
    const storageRef = ref(storage, `${String(user.user)}`);

    const handleFileUpload = e => {
        const { files } = e.target;
        if (files && files.length) {
            uploadBytes(storageRef, files[0]).then((snapshot) => {
                console.log('Uploaded a file!', files[0].name);
            });
        }
    };
    useEffect(()  => {
        console.log(user)   
        getDownloadURL(ref(storage, `${String(user.user)}`))
        .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
            const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            console.log("BIIITCH", url)
            setProfileImage(url)
            // Or inserted into an <img> element
            //const img = document.getElementById('myimg');
            //img.setAttribute('src', url);
        })
        .catch((error) => {
            // Handle any errors
        });
    })

    const onButtonClick = () => {
        inputFile.current.click();
    };

    return (
        <BaseContainer>
            <Box>
                Profile Page
                <Box>
                <Box 
                    pt="10%"
                    pl="15%"
                    maxHeight="200px"
                    maxWidth="200px"
                >
                    <Image
                        borderRadius="50%"
                        minHeight="200px"
                        minWidth="200px"
                        src={profileImage}
                    ></Image>
                </Box>


                <Input
                    ref={inputFile}
                    onChange={handleFileUpload}
                    type="file"
                />
                <Box className="button" onClick={onButtonClick}>
                    Upload
                </Box>

                </Box>
            </Box>       
        </BaseContainer>

    )

}

export default Profile;