// Chakra imports
import {
  Flex,
  Heading,
  Icon,
  IconButton,
  SimpleGrid,
  useColorModeValue,
  Grid,
  GridItem,
  Progress,
  Box,
  Text,
  Tooltip,
  VStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
// Assets
// Custom components
import { ViewIcon } from "@chakra-ui/icons";
import Card from "components/card/Card";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { HSeparator } from "components/separator/Separator";
import { useEffect, useState } from "react";
import { LuBuilding2 } from "react-icons/lu";
import { MdAddTask, MdContacts, MdLeaderboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getApi } from "services/api";
import ReportChart from "../reports/components/reportChart";
import Chart from "components/charts/LineChart.js";
import { HasAccess } from "../../../redux/accessUtils";
import PieChart from "components/charts/PieChart";
import CountUpComponent from "../../../../src/components/countUpComponent/countUpComponent";
import Spinner from "components/spinner/Spinner";
import building from "assets/img/building.png";
import { useSelector } from "react-redux";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaClipboardCheck,
  FaBookmark,
} from "react-icons/fa";
export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoding, setIsLoding] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [leadsCount, setLeadsCount] = useState({ hot: 0, warm: 0, cold: 0 });
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [contactsView, taskView, leadView, proprtyView] = HasAccess([
    "Contacts",
    "Tasks",
    "Leads",
    "Properties",
  ]);
  let [contCount, setContCount] = useState(0);
  const [regions, setRegions] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null); // To store clicked manager's data
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility

  const fetchData = async () => {
    let responseData = await getApi(
      user?.role === "superAdmin"
        ? `api/status/`
        : `api/status/?createBy=${user?._id}`
    );
    setAllData(responseData?.data?.data);
  };

  const sampData = useSelector((state) =>
    Array.isArray(state?.leadData?.data) ? state?.leadData?.data : []
  );
  console.log(sampData, "............");

  const fetchUserData = async () => {
    try {
      const response = await getApi(`api/user/`);
      // const userData = response.data;
      setUserData(response.data.user);
      console.log(
        response.data.user,
        ".....................userData................."
      );
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleManagerClick = (manager) => {
    setSelectedManager(manager);
    setIsModalOpen(true); // Open modal on manager click
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedManager(null); // Reset selected manager
  };

  const managers = userData.filter((user) => user.designation === "manager");
  console.log(managers, ".....................managers.................");

  const totalLeads = sampData.length;
  const siteVisitScheduledCount = sampData.filter(
    (lead) => lead.leadRemark === "siteVisitScheduled"
  ).length;
  const siteVisitDoneCount = sampData.filter(
    (lead) => lead.leadRemark === "siteVisitDone"
  ).length;
  const bookingDoneCount = sampData.filter(
    (lead) => lead.leadRemark === "bookingDone"
  ).length;

  const cardData = [
    { title: "Total Leads", count: totalLeads, icon: FaClipboardCheck },
    {
      title: "Site Visit Scheduled",
      count: siteVisitScheduledCount,
      icon: FaCalendarAlt,
    },
    {
      title: "Site Visit Done",
      count: siteVisitDoneCount,
      icon: FaCheckCircle,
    },
    { title: "Booking Done", count: bookingDoneCount, icon: FaBookmark },
  ];

  const fetchLeadsCount = async (employeeId) => {
    console.log(employeeId, ".....................empleeid.................");
    try {
      const response = await getApi(`api/lead/?createBy=${employeeId}`);
      console.log(response, ".....................response.................");
      const leads = response.data;

      // Count Hot, Warm, Cold leads
      const counts = {
        hot: leads.filter((lead) => lead.leadStatus === "hot").length,
        warm: leads.filter((lead) => lead.leadStatus === "warm").length,
        cold: leads.filter((lead) => lead.leadStatus === "cold").length,
      };

      setLeadsCount(counts);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      setLeadsCount({ hot: 0, warm: 0, cold: 0 });
    }
  };
  // console.log(state?.state.Contactslice)
  console.log(user, "............");
  const fetchProgressChart = async () => {
    setIsLoding(true);
    let result = await getApi(
      user?.role === "superAdmin"
        ? "api/reporting/line-chart"
        : `api/reporting/line-chart?createBy=${user?._id}`
    );
    if (result && result?.status === 200) {
      setData(result?.data);
    }
    setIsLoding(false);
  };
  useEffect(() => {
    if (user?.designation === "rm") {
      contactCount();
    }
    fetchPropertyData();
    fetchProgressChart();
    // fetchUserData();
  }, [sampData]);

  const contactCount = async () => {
    try {
      // Fetch data from the API
      const result = await getApi(`api/contact/?assignedTo=${user?.username}`);

      // Check if the response is valid and contains data
      if (result?.data) {
        console.log(
          result.data.length,
          "Number of contacts fetched successfully"
        );
        setContCount(result.data.length); // Return the count of contacts
      } else {
        console.warn("No data returned from the API.");
        return 0; // Return 0 if no data is found
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return 0; // Return 0 in case of an error
    }
  };

  const fetchPropertyData = async () => {
    try {
      const response = await getApi(`api/property/`);
      const propertyData = response.data;

      // Group properties by region
      const groupedRegions = propertyData.reduce((acc, property) => {
        const region = property.region || "Unknown"; // Default to 'Unknown' if no region is specified
        if (!acc[region]) {
          acc[region] = [];
        }
        acc[region].push(property);
        return acc;
      }, {});

      // Convert the grouped object into an array of regions
      const regionArray = Object.entries(groupedRegions).map(
        ([region, properties]) => ({
          region,
          count: properties.length,
          properties,
        })
      );

      setRegions(regionArray);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  };

  const findModuleData = (title) => {
    if (title === "Contacts" && user?.designation === "rm") {
      console.log("contactssssssssssssssssss");
      return contCount;
    }
    // console.log(title)
    const filterData = data?.find((item) => item?.name === title);
    return filterData?.length || 0;
  };

  //   const findModuleData = async (title) => {
  //     if (title === "Contacts" && user?.designation === 'rm') {
  //         // console.log('Fetching contacts for RM:', user?.username);
  //     }
  //     // Default case for other titles
  //     const filterData = data?.find(item => item?.name === title);
  //     return filterData?.length || 0;
  // };

  const findLeadStatus = (title) => {
    const filterData = allData?.leadData?.filter(
      (item) => item?.leadStatus === title
    );
    return filterData?.length || 0;
  };
  const findTaskStatus = (title) => {
    // console.log(title)
    const filterData = allData?.taskData?.filter(
      (item) => item?.status === title
    );
    return filterData?.length || 0;
  };

  const taskStatus = [
    {
      name: "Completed",
      status: "completed",
      length: findTaskStatus("completed"),
      color: "#4d8f3a",
    },
    {
      name: "Pending",
      status: "pending",
      length: findTaskStatus("pending"),
      color: "#a37f08",
    },
    {
      name: "In Progress",
      status: "inProgress",
      length: findTaskStatus("inProgress"),
      color: "#7038db",
    },
    {
      name: "Todo",
      status: "todo",
      length: findTaskStatus("todo"),
      color: "#1f7eeb",
    },
    {
      name: "On Hold",
      status: "onHold",
      length: findTaskStatus("onHold"),
      color: "#DB5436",
    },
  ];
  const navigateTo = {
    Lead: "/lead",
    Contact: "/contacts",
    Meeting: "/metting",
    Call: "/phone-call",
    // Task: '/task',
    Email: "/email",
    Property: "/properties",
  };

  useEffect(() => {
    fetchData();
    fetchUserData();
  }, [user?._id]);

  console.log(hoveredCard, "hoveredCard");
  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="20px" mb="20px">
        {/* , "2xl": 6 */}
        {/* {(taskView?.create || taskView?.update || taskView?.delete || taskView?.view) &&
          <MiniStatistics
            onClick={() => navigate("/task")}
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
              />
            }
            name="Tasks"
            value={findModuleData("Tasks")}
          />} */}
        {(contactsView?.create ||
          contactsView?.update ||
          contactsView?.delete ||
          contactsView?.view) && (
          <MiniStatistics
            onClick={() => navigate("/contacts")}
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdContacts} color={brandColor} />
                }
              />
            }
            name="Contacts"
            value={findModuleData("Contacts")}
          />
        )}
        {(leadView?.create ||
          leadView?.update ||
          leadView?.delete ||
          leadView?.view) && (
          <MiniStatistics
            onClick={() => navigate("/lead")}
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={MdLeaderboard}
                    color={brandColor}
                  />
                }
              />
            }
            name="Leads"
            value={findModuleData("Leads")}
          />
        )}
        {(proprtyView?.create ||
          proprtyView?.update ||
          proprtyView?.delete ||
          proprtyView?.view) && (
          <MiniStatistics
            onClick={() => navigate("/properties")}
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={LuBuilding2} color={brandColor} />
                }
              />
            }
            name="Property"
            value={findModuleData("Properties")}
          />
        )}
      </SimpleGrid>

      {/*--------------------- if user.role===superAdmin ---------------- */}

      {user?.role === "superAdmin" && (
  <Box p={5} bg="#ffffff" borderRadius="md" boxShadow="md">
    <Heading as="h2" size="lg" mb={5}>
      Managers
    </Heading>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
      {managers.map((manager) => (
        <Box
          key={manager.id}
          p={4}
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="md"
          onClick={() => handleManagerClick(manager)} // Handle click
        >
          <Text fontSize="xl" fontWeight="bold">
            {manager.name}
          </Text>
          <Text fontWeight="bold" textStyle="lg">
            Name: {manager.firstName} {manager.lastName}
          </Text>
          <Text>Email: {manager.username}</Text>
          <Text>Phone: {manager.phoneNumber}</Text>
        </Box>
      ))}
    </SimpleGrid>
  </Box>
)}

{selectedManager && (
  <Modal isOpen={isModalOpen} onClose={closeModal}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        Assigned Employees for {selectedManager.firstName} {selectedManager.lastName}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <SimpleGrid columns={1} spacing={5}>
          {selectedManager.assignedEmployees?.flat().map((employee, index) => {
            const isHovered = hoveredCard === index;

            return (
              <Box
                key={employee._id}
                p={4}
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                boxShadow="md"
                position="relative"  // Add this line to make the tooltip position relative to the Box
                onMouseEnter={() => {
                  setHoveredCard(index);
                  fetchLeadsCount(employee._id); // Fetch leads on hover
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  setLeadsCount({ hot: 0, warm: 0, cold: 0 }); // Reset counts
                }}
              >
                <Text fontWeight="bold">
                  {employee.firstName} {employee.lastName}
                </Text>
                <Text>Email: {employee.username}</Text>
                <Text>Phone: {employee.phoneNumber}</Text>

                {/* Tooltip for hover */}
                {isHovered && (
                  <Box
                    position="absolute"
                    top="-100%"
                    left="50%"
                    transform="translateX(-50%)"
                    bg="gray.700"
                    color="white"
                    p="10px"
                    borderRadius="8px"
                    boxShadow="md"
                    zIndex="10"
                    width="200px"
                  >
                    <Text fontWeight="bold">Leads Count:</Text>
                    <Text>Hot: {leadsCount.hot}</Text>
                    <Text>Warm: {leadsCount.warm}</Text>
                    <Text>Cold: {leadsCount.cold}</Text>
                  </Box>
                )}
              </Box>
            );
          })}
        </SimpleGrid>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" color="red" onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
      )}

      {/* ---------------------Lead counts based on remarks for rms. */}
      {user?.designation === "rm" && (
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing="20px"
          mt="20px"
        >
          {cardData.map((data, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
              bg="white"
              p="20px"
              textAlign="left"
            >
              <Flex justifyContent="space-between" alignItems="center" gap={6}>
                <Icon as={data.icon} boxSize={16} color="gray.500" />
                <Box>
                  <Text fontSize="lg" fontWeight="bold" mb="10px">
                    {data.title}
                  </Text>
                  <Text fontSize="2xl" fontWeight="extrabold" color="gray.900">
                    {data.count}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}
      {/* ---------------------RM details in cards for Managers------------------------ */}
      {user.assignedEmployees && user.assignedEmployees.length > 0 && (
        <Box p={5} bg="#ffffff" borderRadius="md" boxShadow="md" mt={10}>
          <Text fontSize="lg" fontWeight="bold" mb="10px">
            People You Manage
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="20px" mb="20px">
            {user.assignedEmployees &&
              user.assignedEmployees.length > 0 &&
              user.assignedEmployees.flat().map((employee, index) => {
                const isHovered = hoveredCard === index;

                return (
                  <Box
                    key={index}
                    position="relative"
                    // overflowY="auto"
                    onMouseEnter={() => {
                      setHoveredCard(index);
                      fetchLeadsCount(employee._id); // Fetch leads on hover
                    }}
                    onMouseLeave={() => {
                      setHoveredCard(null);
                      setLeadsCount({ hot: 0, warm: 0, cold: 0 }); // Reset counts
                    }}
                    p="20px"
                    border="1px solid #E2E8F0"
                    borderRadius="8px"
                    boxShadow="sm"
                    backgroundColor="white"
                    _hover={{ boxShadow: "lg", transform: "scale(1.03)" }}
                    transition="all 0.2s ease-in-out"
                  >
                    {/* Main card content */}
                    <Box>
                      <Text fontWeight="bold" fontSize="lg" mb="5px">
                        {employee.firstName + " " + employee.lastName ||
                          "Unknown Employee"}
                      </Text>
                      <Text fontSize="sm" color="gray.500" mb="10px">
                        {employee.username || "No Email Provided"}
                      </Text>
                    </Box>

                    {/* Custom popup for hover */}
                    {isHovered && (
                      <Box
                        position="absolute"
                        top="-100%"
                        left="50%"
                        transform="translateX(-50%)"
                        bg="gray.700"
                        color="white"
                        p="10px"
                        borderRadius="8px"
                        boxShadow="md"
                        zIndex="10"
                        width="200px"
                      >
                        {/* <Text fontWeight="bold">
                    {employee.firstName + " " + employee.lastName || "Unknown Employee"}
                  </Text>
                  <Text>Designation: {employee.designation || "N/A"}</Text>
                  <Text>Phone: {employee.phoneNumber || "No Phone Number"}</Text> */}
                        <Text mt="10px" fontWeight="bold">
                          Leads Count:
                        </Text>
                        <Text>Hot: {leadsCount.hot}</Text>
                        <Text>Warm: {leadsCount.warm}</Text>
                        <Text>Cold: {leadsCount.cold}</Text>
                      </Box>
                    )}
                  </Box>
                );
              })}
          </SimpleGrid>
        </Box>
      )}

      <Box
        p={5}
        bg={"#ffffff"}
        borderRadius="md"
        boxShadow="md"
        mt={10}
        mb={10}
      >
        <Text fontSize="lg" fontWeight="bold" mb="10px">
          Properties To Sell
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="20px" mb="20px">
          {regions.map((region) => (
            <Box
              onClick={() =>
                navigate(`/properties`, { state: { region: region } })
              }
              key={region.region}
              borderWidth="1px"
              borderRadius="lg"
              p="4"
              bg="white"
              boxShadow="md"
            >
              <Image
                src={building}
                alt="Region Property"
                borderRadius="md"
                mb="4"
                objectFit="cover"
                width="100%"
                height="150px" // Set the desired height for the image
              />
              <VStack spacing="4">
                <Text fontSize="xl" fontWeight="bold">
                  {region.region.toUpperCase()}
                </Text>
                <Text>{region.count} Properties</Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Grid Grid templateColumns="repeat(12, 1fr)" gap={3}>
        <GridItem rowSpan={2} colSpan={{ base: 12, md: 6 }}>
          <Card>
            <Flex mb={3} alignItems={"center"} justifyContent={"space-between"}>
              <Heading size="md">Email and Call Report</Heading>
              <IconButton
                color={"green.500"}
                onClick={() => navigate("/reporting-analytics")}
                aria-label="Call Fred"
                borderRadius="10px"
                size="md"
                icon={<ViewIcon />}
              />
            </Flex>
            <HSeparator />
            <ReportChart dashboard={"dashboard"} />
          </Card>
        </GridItem>
        <GridItem rowSpan={2} colSpan={{ base: 12, md: 6 }}>
          <Card>
            <Flex mb={5} alignItems={"center"} justifyContent={"space-between"}>
              <Heading size="md">Module Data Report</Heading>
            </Flex>
            <Box mb={3}>
              <HSeparator />
            </Box>
            <Chart dashboard={"dashboard"} data={data} />
          </Card>
        </GridItem>
      </Grid>
      <SimpleGrid
        gap="20px"
        columns={{
          base: 1,
          md: leadView?.view && taskView?.view ? 2 : 2,
          lg: leadView?.view && taskView?.view ? 3 : 2,
        }}
        my="20px"
      >
        {data && data.length > 0 && (
          <Card>
            <Heading size="md" pb={3}>
              Statistics
            </Heading>
            {!isLoding ? (
              data &&
              data.length > 0 &&
              data?.map((item, i) => (
                <>
                  <Box
                    border={"1px solid #e5e5e5"}
                    p={2}
                    m={1}
                    cursor={"pointer"}
                    key={i}
                    onClick={() => navigate(navigateTo[item.name])}
                  >
                    <Flex justifyContent={"space-between"}>
                      <Text fontSize="sm" fontWeight={600} pb={2}>
                        {item?.name}
                      </Text>
                      <Text fontSize="sm" fontWeight={600} pb={2}>
                        <CountUpComponent targetNumber={item?.length} />
                      </Text>
                    </Flex>
                    <Progress
                      colorScheme={item?.color}
                      size="xs"
                      value={item?.length}
                      width={"100%"}
                    />
                  </Box>
                </>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner />
              </div>
            )}
          </Card>
        )}

        {leadView?.view && (
          <Card>
            <Heading size="md" pb={2}>
              Lead Statistics
            </Heading>
            {leadView?.view && (
              <Grid templateColumns="repeat(12, 1fr)" gap={2}>
                <GridItem colSpan={{ base: 12, md: 6 }}>
                  <Box
                    backgroundColor={"#ebf5ff"}
                    borderRadius={"10px"}
                    cursor={"pointer"}
                    onClick={() => navigate("/lead")}
                    p={2}
                    m={1}
                    textAlign={"center"}
                  >
                    <Heading size="sm" pb={3} color={"#1f7eeb"}>
                      Total Leads{" "}
                    </Heading>
                    <Text fontWeight={600} color={"#1f7eeb"}>
                      <CountUpComponent
                        targetNumber={allData?.leadData?.length || 0}
                      />{" "}
                    </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 6 }}>
                  <Box
                    backgroundColor={"#eaf9e6"}
                    borderRadius={"10px"}
                    cursor={"pointer"}
                    onClick={() => navigate("/lead", { state: "hot" })}
                    p={2}
                    m={1}
                    textAlign={"center"}
                  >
                    <Heading size="sm" pb={3} color={"#43882f"}>
                      Hot Leads
                    </Heading>
                    <Text fontWeight={600} color={"#43882f"}>
                      <CountUpComponent targetNumber={findLeadStatus("hot")} />
                    </Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 6 }}>
                  <Box
                    backgroundColor={"#fbf4dd"}
                    onClick={() => navigate("/lead", { state: "warm" })}
                    borderRadius={"10px"}
                    cursor={"pointer"}
                    p={2}
                    m={1}
                    textAlign={"center"}
                  >
                    <Heading size="sm" pb={3} color={"#a37f08"}>
                      Warm Leads
                    </Heading>
                    <Text fontWeight={600} color={"#a37f08"}>
                      <CountUpComponent targetNumber={findLeadStatus("warm")} />
                    </Text>
                  </Box>
                </GridItem>

                <GridItem colSpan={{ base: 12, md: 6 }}>
                  <Box
                    backgroundColor={"#ffeeeb"}
                    borderRadius={"10px"}
                    cursor={"pointer"}
                    onClick={() => navigate("/lead", { state: "cold" })}
                    p={2}
                    m={1}
                    textAlign={"center"}
                  >
                    <Heading size="sm" pb={3} color={"#d6401d"}>
                      Cold Leads{" "}
                    </Heading>
                    <Text fontWeight={600} color={"#d6401d"}>
                      <CountUpComponent targetNumber={findLeadStatus("cold")} />
                    </Text>
                  </Box>
                </GridItem>
                {/* <GridItem colSpan={{ base: 12, md: 6 }}>
                <Box backgroundColor={"#E5E5E5"}
                  borderRadius={"10px"}
                  cursor={"pointer"}
                  onClick={() => navigate('/lead', { state: 'pending' })}
                  p={2} m={1} textAlign={"center"}>
                  <Heading size="sm" pb={3} color={"#74899E"}>Pending Leads </Heading>
                  <Text fontWeight={600} color={"#74899E"}><CountUpComponent targetNumber={findLeadStatus("pending")} /></Text>
                </Box>
              </GridItem> */}
              </Grid>
            )}
            <Flex justifyContent={"center"}>
              <PieChart leadData={allData?.leadData} />
            </Flex>
          </Card>
        )}

        {taskView?.view && (
          <Card>
            <Heading size="md" pb={3}>
              Task Statistics
            </Heading>
            <Grid templateColumns="repeat(12, 1fr)" gap={2} mb={2}>
              <GridItem colSpan={{ base: 12 }}>
                <Box
                  backgroundColor={"#ebf5ff"}
                  onClick={() => navigate("/task")}
                  borderRadius={"10px"}
                  cursor={"pointer"}
                  p={2}
                  m={1}
                  textAlign={"center"}
                >
                  <Heading size="sm" pb={3} color={"#1f7eeb"}>
                    Total Tasks{" "}
                  </Heading>
                  <Text fontWeight={600} color={"#1f7eeb"}>
                    <CountUpComponent
                      targetNumber={allData?.taskData?.length || 0}
                    />
                  </Text>
                </Box>
              </GridItem>
            </Grid>
            {taskStatus &&
              taskStatus.length > 0 &&
              taskStatus?.map((item, i) => (
                <Box my={1.5} key={i}>
                  {/* <Flex justifyContent={"space-between"} cursor={'pointer'} onClick={() => navigate('/task', { state: item.status })} alignItems={"center"} padding={4} backgroundColor={"#0b0b0b17"} borderRadius={"10px"}> */}
                  <Flex
                    justifyContent={"space-between"}
                    cursor={"pointer"}
                    alignItems={"center"}
                    padding={4}
                    backgroundColor={"#0b0b0b17"}
                    borderRadius={"10px"}
                  >
                    <Flex alignItems={"center"}>
                      <Box
                        height={"18px"}
                        width={"18px"}
                        lineHeight={"18px"}
                        textAlign={"center"}
                        border={`1px solid ${item.color}`}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        borderRadius={"50%"}
                        margin={"0 auto"}
                      >
                        <Box
                          backgroundColor={`${item.color}`}
                          height={"10px"}
                          width={"10px"}
                          borderRadius={"50%"}
                        ></Box>
                      </Box>

                      <Text ps={2} fontWeight={"bold"} color={`${item.color}`}>
                        {item.name}
                      </Text>
                    </Flex>
                    <Box fontWeight={"bold"} color={`${item.color}`}>
                      <CountUpComponent targetNumber={item?.length} />
                    </Box>
                  </Flex>
                </Box>
              ))}
          </Card>
        )}
      </SimpleGrid>
    </>
  );
}
