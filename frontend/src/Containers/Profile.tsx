import React, { useState, useRef } from "react";
import { ethers } from 'ethers';
import BaseContainer from "./BaseContainers/BaseContainer";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { MetaMaskUserContext } from "../utils/contexts";
import { useContext } from "react";
import { useEffect } from "react";
import { 
    Box,
    Input,
    Image,
    Heading,
    Flex,
    Grid,
    GridItem
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
const Profile = () => {
    const [profileImage, setProfileImage] = useState("");
    const [balance, setBalance]:any = useState()
    const inputFile = useRef(null);
    const storage = getStorage();
    const { user, userProfile, networkStats } = useContext(MetaMaskUserContext)
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

        const getBalance = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(user);
        setBalance((parseInt(String(balance)) * 0.1 ** 18).toFixed(2));
        };

        if (window.ethereum) {
            console.log(user, userProfile.data())   
            getDownloadURL(ref(storage, `${String(user)}`))
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
            getBalance();
        }
    })

    const onButtonClick = () => {
        inputFile.current.click();
    };

    return (
        <BaseContainer>
            <Box>
                <Heading color="green">Profile</Heading>
                    <Box border="1px solid white" py="2%" pl="5%" width="90%">
                        <Flex>

                            <Box 
                                pl="1%"
                                py="1%"
                                maxHeight="350px"
                                maxWidth="350px"
                            >
                                <Image
                                    borderRadius="50%"
                                    src={profileImage}
                                ></Image>
                            </Box>
                            <Grid 
                                pl="5%"
                                pt="5%"
                                color="white"
                                templateColumns='repeat(2, 1fr)' 
                                gap={10} 
                            >
                                <GridItem>
                                    <Flex>
                                        <Heading>Wins: {userProfile.data().totalWinnings}</Heading>
                                        <Box pt="2%"><FaEthereum size={30}/></Box>
                                    </Flex>
                                    <Box>
                                        <Heading fontSize="20px">${parseFloat(String(parseFloat(userProfile.data().totalWinnings) * parseFloat(networkStats.ethusd))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Heading>                       
                                    </Box>
                                </GridItem>
                                <GridItem>
                                    <Flex>
                                        <Heading>Deposited: {userProfile.data().totalDeposited}</Heading>
                                        <Box pt="2%"><FaEthereum size={30}/></Box>
                                    </Flex>
                                    <Box>
                                        <Heading fontSize="20px">${parseFloat(String(parseFloat(userProfile.data().totalDeposited) * parseFloat(networkStats.ethusd))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Heading>                       
                                    </Box>
                                </GridItem>
                                <GridItem>
                                    <Box>
                                        <Heading>Wallet Value:</Heading>
                                        <Flex>
                                            <Heading>{balance}</Heading>
                                            <Box pt="2%"><FaEthereum size={30}/></Box>
                                        </Flex>
                                        <Heading fontSize="20px">${parseFloat(String(balance * parseFloat(networkStats.ethusd))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Heading>
                                    </Box>
                                </GridItem>
                            </Grid>

                        </Flex>

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