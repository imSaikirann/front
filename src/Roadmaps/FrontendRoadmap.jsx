import React, { useEffect, useContext, useState } from 'react';
import { Box,Progress, Button, Checkbox, Flex, Popover, PopoverArrow, PopoverContent, PopoverHeader, PopoverTrigger, Text, PopoverBody, Center } from '@chakra-ui/react';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import { DownIcon } from '../Roadmaps/svgs/Svg';
import { Spinner } from '@chakra-ui/react';

export default function FrontendRoadmap() {
    const { userData, setUserData } = useContext(UserContext);
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() { 
            try{
        const res = await fetch('/api/detailedFrontend/')
        const data = await res.json()
        setSelectedCourse(data)
        setLoading(false)
        console.log(data)
        } 
    
        catch (error)
        {
            console.log(error)
        }
    }
    fetchData();
    }, []);

    const isCourseCompleted = (courseName) => {
        return userData?.Data?.completedLanguages?.includes(courseName) || false;
    };

    const handleCheckboxChange = async (courseName) => {
        try {
            const updatedCompletedLanguages = [...userData.Data.completedLanguages];

            if (isCourseCompleted(courseName)) {
                const index = updatedCompletedLanguages.indexOf(courseName);
                if (index !== -1) {
                    updatedCompletedLanguages.splice(index, 1);
                }
            } else {
                updatedCompletedLanguages.push(courseName);
            }

            const updatedUserData = {
                ...userData,
                Data: {
                    ...userData.Data,
                    completedLanguages: updatedCompletedLanguages,
                },
            };

            setUserData(updatedUserData);

            await axios.patch(`/api/updateCheckbox/${userData.user._id}`, {
                completedLanguages: updatedCompletedLanguages,
            });

        } catch (error) {
            console.log(error);
        }
    };

    const progressValue = ((userData?.Data?.completedLanguages.length) / 25) * 100 || 0;
    console.log(progressValue)

    return (
        <>
        <Flex  >
            <Box width="50%" padding="1rem 2rem">
                <Text fontSize='xl' fontWeight="bold">Frontend Roadmap</Text>
            </Box>       
            <Box width="50%" padding="1rem 1rem">
            <Progress borderRadius="10px" colorScheme="purple" transition="width 0.3 ease-in-out" h="20px" value={progressValue}  />
            </Box>     
           
          
        </Flex>
      
    
        
        <Center>
        <Box className='home' display="flex"  flexDirection="column" alignItems="center" height="90rem" padding="2rem" width="90%" borderRadius="10px" textAlign="center" >
            {isLoading ? (
                <Box mt="4" display="flex" justifyContent="center" alignItems="center">
                    <Spinner size="md" />
                </Box>
            ) : (
                <>
                <Flex direction="column" align="center">
                    {selectedCourse.slice(0,2).map((course, index) => (
                        <Box key={index} >
                            <Flex direction="column" align="center">
                                <Flex gap="2px">
                                    <Checkbox
                                    colorScheme='purple'
                                        size="lg"
                                        isChecked={isCourseCompleted(course.name)}
                                        onChange={ () => handleCheckboxChange(course.name) }
                                    />
                                    <Button size="md" w="175px"><Text fontSize='small' color="#1A192F" fontFamily="sans-serif">{ course.name}</Text></Button>
                                </Flex>
                                <DownIcon />
                            </Flex>
                        </Box>
                    ))}
                    <Box direction='column' align="center" >
                    <Popover placement='left-start' isOpen={true}>
                        <PopoverTrigger>
                        <Flex gap="2px">
                                    <Checkbox
                                    colorScheme='purple'
                                        size="lg"
                                        isChecked={isCourseCompleted('fs')}
                                        onChange={ () => handleCheckboxChange('fs') }
                                    />
                                    <Button size="md" w="175px"><Text fontSize='small' color="#1A192F" fontFamily="sans-serif">Javascript frameworks</Text></Button>
                                </Flex>
                        </PopoverTrigger>
                        <PopoverContent bg="white" w="230px">
                            <PopoverArrow />
                            <PopoverHeader>List of Frameworks</PopoverHeader>
                            <PopoverBody>
                                {selectedCourse.slice(2, 4).map((course, index) => (
                                    <Box key={index}>
                                        <Flex direction="column" align="center" >
                                            <Flex gap="2px">
                                                <Checkbox
                                                    colorScheme='purple'
                                                    size="lg"
                                                    isChecked={isCourseCompleted(course.name)}
                                                    onChange={() => handleCheckboxChange(course.name)}
                                                />
                                                <Button size="md" w="175px" m="6px">
                                                    <Text fontSize='small' color="#1A192F" fontFamily="sans-serif">
                                                        {course.name}
                                                    </Text>
                                                </Button>
                                            </Flex>
                                        </Flex>
                                    </Box>
                                ))}
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    </Box>
                </Flex>
                </>
            )}
        </Box>
        </Center>
        </>
    );
}
