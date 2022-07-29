/*
 *  Document    : Home.js
 *  Author      : Uyarchi
 *  Description : View User Details
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
//components
import axios from "../../axios";
import Header from "../../components/Layout/Header";

//function init
const UpcomingLive = () => {
  //useState
  const [user, setuser] = useState("");
  const [reload, setreload] = useState(false);
  //router
  const navigate = useNavigate();

  useEffect(() => {
    const id = Cookies.get("UserId");
    axios
      .get(`/v1/requirementCollectionBS/SupplierLiveApproved/data/${id}`)
      .then((res) => {
        setuser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [reload]);
  //usestate
  const [isDetails, setDetails] = useState(false);
  const [isData, setData] = useState("");
  console.log(isData);
  const isDetailsClose = () => {
    setDetails(false);
  };
  const Details = (props) => {
    setDetails(true);
    axios.get(`/v1/requirementCollectionBS/Supplier/${props}`).then((res) => {
      setData(res.data[0]);
      console.log(res.data);
      setreload(!reload);
    });
  };
  const Time = (props) => {
    const a = props.data;
    const first2Str = String(a).slice(0, 2); // 👉️ '13'
    const second2Str = String(a).slice(2, 4); // 👉️ '13'
    const final = first2Str + ":" + second2Str;
    return <>{final}</>;
  };
  const Date = (props) => {
    // yyyy-MM-dd
    const input = props.data;
    const [year, month, day] = input.split("-");
    // dd/mm/yyyy
    const dateformat = `${day}-${month}-${year}`;
    return <>{dateformat}</>;
  };
  return (
    <>
      <Header />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex justify-center">
            Upcoming Live
          </h1>
        </div>
      </header>
      <div className="px-2 py-2">
        <div className="border-gray-500 scroll-smooth border">
          <Table
            size="sm"
            scaleY="44"
            variant="striped"
            colorScheme="whatsapp"
            className="overflow-auto table-auto"
          >
            <Thead className="bg-headergreen">
              <Tr>
                <Th textAlign="center">S.No</Th>
                <Th textAlign="center">Date</Th>
                <Th textAlign="center">Time</Th>
                <Th textAlign="center">Product</Th>
              </Tr>
            </Thead>
            <Tbody>
              {user != "" ? null : (
                <Tr>
                  <Td
                    style={{ textAlign: "center" }}
                    className="font-semibold"
                    colSpan="4"
                  >
                    No Data Found
                  </Td>
                </Tr>
              )}
              {user &&
                user.map((item, index) => (
                  <Tr key={index}>
                    <Td textAlign="center">{index + 1}</Td>
                    <Td textAlign="center">
                      <Date data={item.liveStreamDate} />
                    </Td>
                    <Td textAlign="center">
                      <Time data={item.liveStreamTime} />
                    </Td>
                    <Td textAlign="center">
                      <Button
                        size="md"
                        colorScheme="blue"
                        variant="link"
                        onClick={() => Details(item.userId)}
                      >
                        {item.product}
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </div>
        <Modal isOpen={isDetails} onClose={isDetailsClose} size="xs">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className="flex justify-center">
              Product Details
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="p-4">
                <>
                  <div className="border border-graycolor cursor-pointer">
                    <div className="grid grid-cols-6 px-4 px-1">
                      <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                        Product Name
                      </div>
                      <div className="col-span-4 border-b p-1">
                        {"isData.product"}
                      </div>
                      <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                        Quality
                      </div>
                      <div className="col-span-4 border-b border-r p-1">
                        {"isData.expectedQnty"}
                      </div>
                      <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                        Price
                      </div>
                      <div className="col-span-4 border-b border-r p-1">
                        {"isData.minprice"}
                      </div>
                      <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                        Location
                      </div>
                      <div className="col-span-4 border-b p-1">
                        {"isData.deliverylocation"}
                      </div>
                      <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                        status
                      </div>
                      <div className="col-span-4 border-b p-1">
                        {"isData.deliveryDate"}
                      </div>
                      <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                        Reason
                      </div>
                      <div className="col-span-4 border-b p-1">
                        {"isData.deliveryTime"}
                      </div>
                      {/* {BuyerData.status ? (
                      <>
                        <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                          Status
                        </div>
                        <div className="col-span-4 border-b p-1">
                          {BuyerData.status}
                        </div>
                        {BuyerData.status == "Accepted" ? (
                          <>
                            <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                              Accepted Reason
                            </div>
                            <div className="col-span-4 border-b p-1">
                              {BuyerData.statusAccept}
                            </div>
                            <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                              FeedBack
                            </div>
                            <div className="col-span-4 border-b p-1">
                              {BuyerData.statusAccept == "Requirement Alive"
                                ? BuyerData.aliveFeedback == ""
                                  ? "null"
                                  : BuyerData.aliveFeedback
                                : null}
                              {BuyerData.statusAccept == "Requirement dead"
                                ? BuyerData.deadFeedback == ""
                                  ? "null"
                                  : BuyerData.deadFeedback
                                : null}
                              {BuyerData.statusAccept ==
                              "Requirement Alive with modification"
                                ? BuyerData.modificationFeedback == ""
                                  ? "null"
                                  : BuyerData.modificationFeedback
                                : null}
                            </div>
                          </>
                        ) : null}
                        {BuyerData.status == "CallBack" ? (
                          <>
                            <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                              Callback Reason
                            </div>
                            <div className="col-span-4 border-b p-1">
                              {BuyerData.reasonCallback}
                            </div>
                            {BuyerData.reasonCallback ==
                            "Answer to call later" ? (
                              <>
                                <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                                  Back to Call
                                </div>
                                <div className="col-span-4 border-b p-1">
                                  {BuyerData.dateCallback.split("T")[0]}
                                </div>
                              </>
                            ) : null}
                            <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                              FeedBack
                            </div>
                            <div className="col-span-4 border-b p-1">
                              {BuyerData.feedbackCallback == ""
                                ? "null"
                                : BuyerData.feedbackCallback}
                            </div>
                          </>
                        ) : null}
                      </>
                    ) : null} */}
                    </div>
                  </div>
                </>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={isDetailsClose} colorScheme="red" mr={3}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
export default UpcomingLive;
