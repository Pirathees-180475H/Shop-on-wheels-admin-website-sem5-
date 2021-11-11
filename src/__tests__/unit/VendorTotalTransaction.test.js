const {GetTotalTranaction} = require('../../pages/userReports/VendorProfile');

//case 1 -> Basic
test('This Test Should give the TotalTransaction of specific vendor Basic',()=>{
    let inputOrdersArray =[{id:1,vendorId:'2xxxxxxxqq',totalPrice:500},{id:2,totalPrice:100,vendorId:'Qaaasasasasd'},{id:3,totalPrice:1000,vendorId:'qwearararda'},
    {id:4,totalPrice:1540,vendorId:'qwqweQQW'}, {id:5,totalPrice:500,vendorId:'2xxxxxxxqq'}]
    let vendor={
        id:'2xxxxxxxqq',name:'xyz'
    }
    const outputPrice = GetTotalTranaction(inputOrdersArray,vendor)
    expect(outputPrice).toStrictEqual(1000)
})

//case 2 -> vendor not deals with  orders 
test('This Test Should give the TotalTransaction of specific vendor (vendor with zero orders)',()=>{
    let inputOrdersArray =[{id:1,vendorId:'2xxxxxxxqq',totalPrice:500},{id:2,totalPrice:100,vendorId:'Qaaasasasasd'},{id:3,totalPrice:1000,vendorId:'qwearararda'},
    {id:4,totalPrice:1540,vendorId:'qwqweQQW'}, {id:5,totalPrice:500,vendorId:'2xxxxxxxqq'}]
    let vendor={
        id:'wSSoSenz4578',name:'xyz'
    }
    const outputPrice = GetTotalTranaction(inputOrdersArray,vendor)
    expect(outputPrice).toStrictEqual(0)
})

//case 3 -> order is null
test('This Test Should give the TotalTransaction of specific vendor(null orders)',()=>{
    let inputOrdersArray =[]
    let vendor={
        id:'2xxxxxxxqq',name:'xyz'
    }
    const outputPrice = GetTotalTranaction(inputOrdersArray,vendor)
    expect(outputPrice).toStrictEqual(0)
})

//case 4 -> vendor is undifind 
test('This Test Should give the TotalTransaction of specific vendor (null vendor)',()=>{
    let inputOrdersArray =[{id:1,vendorId:'2xxxxxxxqq',totalPrice:500},{id:2,totalPrice:100,vendorId:'Qaaasasasasd'},{id:3,totalPrice:1000,vendorId:'qwearararda'},
    {id:4,totalPrice:1540,vendorId:'qwqweQQW'}, {id:5,totalPrice:500,vendorId:'2xxxxxxxqq'}]
    let vendor={}
    const outputPrice = GetTotalTranaction(inputOrdersArray,vendor)
    expect(outputPrice).toStrictEqual(0)
})

//case 4 -> vendor and orders is null
test('This Test Should give the TotalTransaction of specific vendor (null vendor and orders)',()=>{
    let inputOrdersArray =[]
    let vendor={}
    const outputPrice = GetTotalTranaction(inputOrdersArray,vendor)
    expect(outputPrice).toStrictEqual(0)
})
