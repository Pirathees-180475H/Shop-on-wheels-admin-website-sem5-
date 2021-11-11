const {GetOrderCount} = require('../../pages/userReports/VendorProfile');

//case 1 -> Basic
test('This Test Should give the countof specific vendor orders (Basic case)',()=>{
    let inputOrdersArray =[{id:1,date:'26.5.2020',vendorId:'2xxxxxxxqq'},{id:2,date:'2.1.2021',vendorId:'Qaaasasasasd'},{id:3,date:'2.6.2021',vendorId:'qwearararda'},
    {id:4,date:'2.6.2021',vendorId:'qwqweQQW'}, {id:5,date:'12.6.2021',vendorId:'2xxxxxxxqq'}]
    let vendor={
        id:'2xxxxxxxqq',name:'xyz'
    }
    const outputCount = GetOrderCount(inputOrdersArray,vendor)
    expect(outputCount).toStrictEqual(2)
})


//case 2 -> That Vendor not have any  order 
test('This Test Should give the countof specific vendor orders (vendor has no orders)',()=>{
    let inputOrdersArray =[{id:1,date:'26.5.2020',vendorId:'2xxxxxxxqq'},{id:2,date:'2.1.2021',vendorId:'Qaaasasasasd'},{id:3,date:'2.6.2021',vendorId:'qwearararda'},
    {id:4,date:'2.6.2021',vendorId:'qwqweQQW'}, {id:5,date:'12.6.2021',vendorId:'2xxxxxxxqq'}]
    let vendor={
        id:'5xxcceraq',name:'xyz'
    }
    const outputCount = GetOrderCount(inputOrdersArray,vendor)
    expect(outputCount).toStrictEqual(0)
})


//case 3 -> Empty Order
test('This Test Should give the countof specific vendor orders (orders is null)',()=>{
    let inputOrdersArray =[]
    let vendor={
        id:'2xxxxxxxqq',name:'xyz'
    }
    const outputCount = GetOrderCount(inputOrdersArray,vendor)
    expect(outputCount).toStrictEqual(0)
})

//case 4 -> That Customer is not defined
test('This Test Should give the countof specific vendor orders (vendor is null)',()=>{
    let inputOrdersArray =[{id:1,date:'26.5.2020',vendorId:'2xxxxxxxqq'},{id:2,date:'2.1.2021',vendorId:'Qaaasasasasd'},{id:3,date:'2.6.2021',vendorId:'qwearararda'},
    {id:4,date:'2.6.2021',vendorId:'qwqweQQW'}, {id:5,date:'12.6.2021',vendorId:'2xxxxxxxqq'}]
    let vendor={}
    const outputCount = GetOrderCount(inputOrdersArray,vendor)
    expect(outputCount).toStrictEqual(0)
})

//case 5 -> That Customer and orders not defined
test('This Test Should give the countof specific customer orders (both orders and vendor is null)',()=>{
    let inputOrdersArray =[]
    let vendor={ }
    const outputCount = GetOrderCount(inputOrdersArray,vendor)
    expect(outputCount).toStrictEqual(0)
})
