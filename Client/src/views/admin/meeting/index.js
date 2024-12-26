import { useEffect, useState } from 'react';
import { Button, Input, Table, Thead, Tbody, Tr, Th, Td, Spinner, Text, Box } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { getApi } from 'services/api';
import { SiGooglemeet } from "react-icons/si";

const Index = () => {
    const title = "Contacts";
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Default meeting link
    const defaultMeetingLink = "https://us05web.zoom.us/j/84850119923?pwd=Aji8PCSYPGaBu0tLySOoJeLMZIXzRd.1";

    // Fetch data from API
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await getApi('api/contact');
            console.log(response)
            if (response.status === 200 && response.data) {
                const formattedData = response.data
                    .map(contact => ({
                        name: contact.ContactName,
                        mobile: contact.phoneNumber,
                        email: contact.email,
                        zoomMeetingLink: contact.zoomMeetingLink || defaultMeetingLink // Use default if not provided
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
                setData(formattedData);
                console.log(data)
            } else {
                toast.error("Failed to fetch contacts", "error");
            }
        } catch (error) {
            toast.error("An error occurred while fetching contacts", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Handle meeting redirection
    const handleViewMeeting = (zoomMeetingLink) => {
        if (zoomMeetingLink) {
            window.open(zoomMeetingLink, '_self'); // Open in the same tab
        } else {
            toast.error("Meeting link not available", "error");
        }
    };

    // Filtering data based on the search query
    const filterData = (data) => {
        if (!searchQuery) return data;
        const query = searchQuery.toLowerCase();
        return data.filter(contact => {
            const mobile = String(contact.mobile);
            return (
                contact.name.toLowerCase().includes(query) ||
                contact.email.toLowerCase().includes(query) ||
                mobile.includes(query)
            );
        });
    };

    return (
        <Box p={4} bg="white" maxWidth="100vw">
            {/* Responsive Search Box */}
            <Box mb={4} display="flex" >
                <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, or mobile"
                    size="md"
                    bg="gray.50"
                    color="gray.700"
                    border="1px solid"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'gray.400' }}
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px rgba(66,153,225,0.6)' }}
                    w={["90%", "70%", "50%", "400px"]} // Responsive width: full width on small screens, fixed on larger screens
                    
                />
            </Box>

            {/* Responsive Table */}
            <Box overflowX="auto">
                <Table variant="simple" color="gray.500" mb="24px">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Mobile</Th>
                            <Th>Email</Th>
                            <Th>Meeting</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isLoading ? (
                            <Tr>
                                <Td colSpan={4}>
                                    <Spinner />
                                </Td>
                            </Tr>
                        ) : data.length === 0 ? (
                            <Tr>
                                <Td colSpan={4}>
                                    <Text textAlign="center" color="gray.500" fontSize="sm">No data found</Text>
                                </Td>
                            </Tr>
                        ) : (
                            filterData(data).map((contact, index) => (
                                <Tr key={index}>
                                    <Td>{contact.name}</Td>
                                    <Td>{contact.mobile}</Td>
                                    <Td>{contact.email}</Td>
                                    <Td>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleViewMeeting(contact.zoomMeetingLink)}
                                            aria-label="View Meeting"
                                        >
                                            <SiGooglemeet size={34} color="red" />
                                        </Button>
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default Index;