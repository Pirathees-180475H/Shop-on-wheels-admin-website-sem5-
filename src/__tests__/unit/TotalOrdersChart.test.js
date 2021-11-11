//function is brigns to test
const {CountWiseFilterForOrder} = require('../../pages/charts/components/TotalOrdersChart');

//case 1 -> for diffrent dates on same month
test('Should output dateWise order Count for all Order(same month)',()=>{
    let inputOrderArray =[{id:1,date:'26.5.2021'},{id:2,date:'26.5.2021'},{id:3,date:'27.5.2021'},{id:4,date:'27.5.2021'}]
    const outputObject = CountWiseFilterForOrder(inputOrderArray)
    expect(outputObject).toStrictEqual({'counts':[2,2],'dates':['26.5.2021','27.5.2021']})
})

//case 2-> for diffrent months with dates
test('Should output dateWise order Count for all Order(diffrent month)',()=>{
    let inputOrderArray =[{id:1,date:'26.5.2021'},{id:2,date:'2.6.2021'},{id:3,date:'2.6.2021'},{id:4,date:'2.6.2021'},
                          {id:5,date:'12.6.2021'},{id:6,date:'12.6.2021'},{id:7,date:'1.9.2021'}]
    const outputObject = CountWiseFilterForOrder(inputOrderArray)
    expect(outputObject).toStrictEqual({'counts':[1,3,2,1],'dates':['26.5.2021','2.6.2021','12.6.2021','1.9.2021']})
})

//case 3-> for diffrent months with dates also diffrent years
test('Should output dateWise order Count for all Order(diffrent year)',()=>{
    let inputOrderArray =[{id:1,date:'26.5.2020'},{id:2,date:'2.1.2021'},{id:3,date:'2.6.2021'},{id:4,date:'2.6.2021'},
                          {id:5,date:'12.6.2021'},{id:6,date:'12.6.2021'},{id:7,date:'1.9.2022'}]
    const outputObject = CountWiseFilterForOrder(inputOrderArray)
    expect(outputObject).toStrictEqual({'counts':[1,1,2,2,1],'dates':['26.5.2020','2.1.2021','2.6.2021','12.6.2021','1.9.2022']})
})

//case 4-> null inputs
test('Should output dateWise order Count for all Order(null input)',()=>{
    let inputOrderArray =[]
    const outputObject = CountWiseFilterForOrder(inputOrderArray)
    expect(outputObject).toStrictEqual({'counts':[],'dates':[]})
})