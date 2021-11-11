const {GetOrderCount} = require('../../pages/userReports/CustomerProfile');

//case 1 -> Basic
test('This Test Should give the countof specific customer orders',()=>{
    let inputOrdersArray =[{id:1,date:'26.5.2020',customerId:'2xxxxxxxqq'},{id:2,date:'2.1.2021',customerId:'Qaaasasasasd'},{id:3,date:'2.6.2021',customerId:'qwearararda'},
    {id:4,date:'2.6.2021',customerId:'qwqweQQW'}, {id:5,date:'12.6.2021',customerId:'2xxxxxxxqq'}]
    let customer={
        id:'2xxxxxxxqq',name:'xyz'
    }
    const outputCount = GetOrderCount(inputOrdersArray,customer)
    expect(outputCount).toStrictEqual(2)
})


//case 2 -> That Customer not order Anything
test('This Test Should give the countof specific customer orders',()=>{
    let inputOrdersArray =[{id:1,date:'26.5.2020',customerId:'wqwqeqe'},{id:2,date:'2.1.2021',customerId:'Qaaasasasasd'},{id:3,date:'2.6.2021',customerId:'qwearararda'},
    {id:4,date:'2.6.2021',customerId:'qwqweQQW'}, {id:5,date:'12.6.2021',customerId:'Aadaddda'}]

    let customer={
        id:'2xxxxxxxqq',name:'xyz'
    }
    const outputCount = GetOrderCount(inputOrdersArray,customer)
    expect(outputCount).toStrictEqual(0)
})


//case 3 -> Empty Order
test('This Test Should give the countof specific customer orders (orders is null)',()=>{
    let inputOrdersArray =[]
    let customer={
        id:'2xxxxxxxqq',name:'xyz'
    }
    const outputCount = GetOrderCount(inputOrdersArray,customer)
    expect(outputCount).toStrictEqual(0)
})

//case 4 -> That Customer is not defined
test('This Test Should give the countof specific customer orders (customer is null)',()=>{
    let inputOrdersArray =[{id:1,date:'26.5.2020',customerId:'wqwqeqe'},{id:2,date:'2.1.2021',customerId:'Qaaasasasasd'},{id:3,date:'2.6.2021',customerId:'qwearararda'},
    {id:4,date:'2.6.2021',customerId:'qwqweQQW'}, {id:5,date:'12.6.2021',customerId:'Aadaddda'}]
    let customer={}
    const outputCount = GetOrderCount(inputOrdersArray,customer)
    expect(outputCount).toStrictEqual(0)
})

//case 5 -> That Customer and orders not defined
test('This Test Should give the countof specific customer orders (both orders and customer is null)',()=>{
    let inputOrdersArray =[]
    let customer={ }
    const outputCount = GetOrderCount(inputOrdersArray,customer)
    expect(outputCount).toStrictEqual(0)
})
