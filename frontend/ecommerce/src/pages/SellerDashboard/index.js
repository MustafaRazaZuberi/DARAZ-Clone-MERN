import React, { useEffect, useState } from 'react'
import "./style.css"
import SellerNavbar from '../../Components/SellerNavbar';
import axios from 'axios'
import { useSelector } from 'react-redux';


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { Heading, CardFooter, Text, Image, Card, CardBody, Button, Stack, ChakraProvider } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';


// const baseUrl = "http://localhost:4000"
const baseUrl = "https://odd-rose-snapper-tie.cyclic.app/"

const SellerDashboard = () => {

    const navigate = useNavigate()






    // Protective Routing
    const isLogginedSeller = useSelector(state => state.isSeller)
    useEffect(() => {
        if (isLogginedSeller) {
            return
        } else {
            navigate('/login')
        }
    }, [])
    ///////////////////////////////







    const authInfo = useSelector(state => state.sellerAuth)
    const [userOrders, setuserOrders] = useState([])


    useEffect(() => {
        const getMyOrders = async () => {
            const response = await axios.get(`${baseUrl}/getOrdersOnSellerPortal/${authInfo._id}`)
            setuserOrders(response.data)
        }
        getMyOrders()
    }, [])

    console.log(userOrders)


    const [value, setValue] = useState('one');



    const updateStatus = async (e) => {
        console.log(e.status, e.orderId)
        const response = await axios.post(`${baseUrl}/updateStatus/${e.orderId}`, {
            status: e.status
        })


        const response2 = await axios.get(`${baseUrl}/getOrdersOnSellerPortal/${authInfo._id}`)
        setuserOrders(response2.data)


        swal(`Order ${e.status}!`)
    }


    return (
        <>
            <SellerNavbar />
            <div className="mainOrderPage">



                <Box sx={{ width: '70%', margin: "0 auto" }} className='mt-3'>
                    <Tabs
                        value={value}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="one" onClick={() => setValue('one')} label="Pending Orders" />
                        <Tab value="two" onClick={() => setValue('two')} label="Accepted Orders" />
                        <Tab value="three" onClick={() => setValue('three')} label="Rejected Orders" />
                    </Tabs>
                </Box>


                <div className={`forOne ${value === 'one' ? '' : 'd-none'}`}>

                    {userOrders.map((item, index) => {
                        if (item.ststus === 'pending') {
                            return <div key={index} className='divOrder'>
                                <h6 className='mx-3 mb-3 orderNo'>Order # {index + 1}</h6>
                                <h6 className='mx-3 mainInfoOrder'>Customer Name : {item.orderObj.orderName}</h6>
                                <h6 className='mx-3 mb-1 mainInfoOrder'>Customer Phone : {item.orderObj.orderPhone}</h6>

                                <ChakraProvider>
                                    <Card
                                        direction={{ base: 'column', sm: 'row' }}
                                        overflow='hidden'
                                        variant='outline'
                                    >
                                        <Image
                                            objectFit='cover'
                                            maxW={{ base: '100%', sm: '200px' }}
                                            src={item.orderObj.productImage}
                                            alt='Caffe Latte'
                                        />

                                        <Stack>
                                            <CardBody>
                                                <Heading size='md'>{item.orderObj.productName}</Heading>
                                                <Heading size='md' className='mt-2 orderPrice'>PRICE : PKR {item.orderObj.productPrice}</Heading>
                                                <Heading size='sm' className='mt-2'>Shipping Cost : PKR {item.orderObj.productShippingCost}</Heading>

                                                <Text py='2'>
                                                    {item.orderObj.productDescription}
                                                </Text>
                                            </CardBody>

                                            <CardFooter>
                                                <Button variant='solid' colorScheme='blue' onClick={() => navigate(`/productDetails/${item.orderObj._id}`)}>
                                                    View Product
                                                </Button>
                                                <Button variant='solid' className='mx-3' colorScheme='green' onClick={() => updateStatus({ status: "accepted", orderId: item._id })} >
                                                    Accept
                                                </Button>
                                                <Button variant='solid' colorScheme='red' onClick={() => updateStatus({ status: "rejected", orderId: item._id })} >
                                                    Reject
                                                </Button>

                                            </CardFooter>
                                        </Stack>
                                    </Card>
                                </ChakraProvider>
                            </div>
                        }

                    })}

                </div>






                <div className={`forTwo ${value === 'two' ? '' : 'd-none'}`}>
                    {userOrders.map((item, index) => {
                        if (item.ststus === 'accepted') {
                            return <div key={index} className='divOrder'>
                                <h6 className='mx-3 mb-3 orderNo'>Order # {index + 1}</h6>
                                <h6 className='mx-3 mainInfoOrder'>Customer Name : {item.orderObj.orderName}</h6>
                                <h6 className='mx-3 mb-1 mainInfoOrder'>Customer Phone : {item.orderObj.orderPhone}</h6>

                                <ChakraProvider>
                                    <Card
                                        direction={{ base: 'column', sm: 'row' }}
                                        overflow='hidden'
                                        variant='outline'
                                    >
                                        <Image
                                            objectFit='cover'
                                            maxW={{ base: '100%', sm: '200px' }}
                                            src={item.orderObj.productImage}
                                            alt='Caffe Latte'
                                        />

                                        <Stack>
                                            <CardBody>
                                                <Heading size='md'>{item.orderObj.productName}</Heading>
                                                <Heading size='md' className='mt-2 orderPrice'>PRICE : PKR {item.orderObj.productPrice}</Heading>
                                                <Heading size='sm' className='mt-2'>Shipping Cost : PKR {item.orderObj.productShippingCost}</Heading>

                                                <Text py='2'>
                                                    {item.orderObj.productDescription}
                                                </Text>
                                            </CardBody>

                                            <CardFooter>
                                                <Button variant='solid' colorScheme='blue' onClick={() => navigate(`/productDetails/${item.orderObj._id}`)}>
                                                    View Product
                                                </Button>
                                            </CardFooter>
                                        </Stack>
                                    </Card>
                                </ChakraProvider>
                            </div>
                        }

                    })}
                </div>





                <div className={`forThree ${value === 'three' ? '' : 'd-none'}`}>
                    {userOrders.map((item, index) => {
                        if (item.ststus === 'rejected') {
                            return <div key={index} className='divOrder'>
                                <h6 className='mx-3 mb-3 orderNo'>Order # {index + 1}</h6>
                                <h6 className='mx-3 mainInfoOrder'>Customer Name : {item.orderObj.orderName}</h6>
                                <h6 className='mx-3 mb-1 mainInfoOrder'>Customer Phone : {item.orderObj.orderPhone}</h6>

                                <ChakraProvider>
                                    <Card
                                        direction={{ base: 'column', sm: 'row' }}
                                        overflow='hidden'
                                        variant='outline'
                                    >
                                        <Image
                                            objectFit='cover'
                                            maxW={{ base: '100%', sm: '200px' }}
                                            src={item.orderObj.productImage}
                                            alt='Caffe Latte'
                                        />

                                        <Stack>
                                            <CardBody>
                                                <Heading size='md'>{item.orderObj.productName}</Heading>
                                                <Heading size='md' className='mt-2 orderPrice'>PRICE : PKR {item.orderObj.productPrice}</Heading>
                                                <Heading size='sm' className='mt-2'>Shipping Cost : PKR {item.orderObj.productShippingCost}</Heading>

                                                <Text py='2'>
                                                    {item.orderObj.productDescription}
                                                </Text>
                                            </CardBody>

                                            <CardFooter>
                                                <Button variant='solid' colorScheme='blue' onClick={() => navigate(`/productDetails/${item.orderObj._id}`)}>
                                                    View Product
                                                </Button>
                                            </CardFooter>
                                        </Stack>
                                    </Card>
                                </ChakraProvider>
                            </div>
                        }

                    })}
                </div>







            </div>
        </>
    )
}

export default SellerDashboard
