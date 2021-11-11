const {GetTotalTranaction} = require('../../pages/userReports/CustomerProfile');

//case 1 -> Basic
test('This Test Should give the TotalTransaction of specific customer Basic',()=>{
    let inputOrdersArray =[{id:1,customerId:'2xxxxxxxqq',totalPrice:500},{id:2,totalPrice:100,customerId:'Qaaasasasasd'},{id:3,totalPrice:1000,customerId:'qwearararda'},
    {id:4,totalPrice:1540,customerId:'qwqweQQW'}, {id:5,totalPrice:500,customerId:'2xxxxxxxqq'}]
    let customer={
        id:'2xxxxxxxqq',name:'xyz'
    }
    const outputPrice = GetTotalTranaction(inputOrdersArray,customer)
    expect(outputPrice).toStrictEqual(1000)
})

//case 2 -> customer not deals with  orders 
test('This Test Should give the TotalTransaction of specific customer (customer with zero orders)',()=>{
    let inputOrdersArray =[{id:1,customerId:'2xxxxxxxqq',totalPrice:500},{id:2,totalPrice:100,customerId:'Qaaasasasasd'},{id:3,totalPrice:1000,customerId:'qwearararda'},
    {id:4,totalPrice:1540,customerId:'qwqweQQW'}, {id:5,totalPrice:500,customerId:'2xxxxxxxqq'}]
    let customer={
        id:'wSSoSenz4578',name:'xyz'
    }
    const outputPrice = GetTotalTranaction(inputOrdersArray,customer)
    expect(outputPrice).toStrictEqual(0)
})

//case 3 -> order is null
test('This Test Should give the TotalTransaction of specific customer(null orders)',()=>{
    let inputOrdersArray =[]
    let customer={
        id:'2xxxxxxxqq',name:'xyz'
    }
    const outputPrice = GetTotalTranaction(inputOrdersArray,customer)
    expect(outputPrice).toStrictEqual(0)
})

//case 4 -> customer is undifind 
test('This Test Should give the TotalTransaction of specific customer (null customer)',()=>{
    let inputOrdersArray =[{id:1,customerId:'2xxxxxxxqq',totalPrice:500},{id:2,totalPrice:100,customerId:'Qaaasasasasd'},{id:3,totalPrice:1000,customerId:'qwearararda'},
    {id:4,totalPrice:1540,customerId:'qwqweQQW'}, {id:5,totalPrice:500,customerId:'2xxxxxxxqq'}]
    let customer={}
    const outputPrice = GetTotalTranaction(inputOrdersArray,customer)
    expect(outputPrice).toStrictEqual(0)
})

//case 4 -> customer and orders is null
test('This Test Should give the TotalTransaction of specific customer (null customer and orders)',()=>{
    let inputOrdersArray =[]
    let customer={}
    const outputPrice = GetTotalTranaction(inputOrdersArray,customer)
    expect(outputPrice).toStrictEqual(0)
})
