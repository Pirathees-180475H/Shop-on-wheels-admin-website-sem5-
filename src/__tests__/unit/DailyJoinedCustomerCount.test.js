// situation -> input :all customers (with their Joined Date), This Function Must be generate  Count Per Date
const {CountWiseFilterForUser} = require('../../pages/charts/components/DailyJoinedUserChart');

//case 1 -> for diffrent dates on same month
test('Should output dateWise Joined customer Count(same month)',()=>{
    let inputOrderArray =[{id:1,date:'26.5.2021'},{id:2,date:'26.5.2021'},{id:3,date:'27.5.2021'},{id:4,date:'27.5.2021'}]
    const outputObject = CountWiseFilterForUser(inputOrderArray)
    expect(outputObject).toStrictEqual({'counts':[2,2],'dates':['26.5.2021','27.5.2021']})
})


//case 2-> for diffrent months with dates
test('Should output dateWise JoinedCustomer Count(diffrent month)',()=>{
    let inputOrderArray =[{id:1,date:'26.5.2021'},{id:2,date:'2.6.2021'},{id:3,date:'2.6.2021'},{id:4,date:'2.6.2021'},
                          {id:5,date:'12.6.2021'},{id:6,date:'12.6.2021'},{id:7,date:'1.9.2021'}]
    const outputObject = CountWiseFilterForUser(inputOrderArray)
    expect(outputObject).toStrictEqual({'counts':[1,3,2,1],'dates':['26.5.2021','2.6.2021','12.6.2021','1.9.2021']})
})

//case 3-> for diffrent months with dates also diffrent years
test('Should output dateWise Should output dateWise JoinedCustomer Count(diffrent year)',()=>{
    let inputOrderArray =[{id:1,date:'26.5.2020'},{id:2,date:'2.1.2021'},{id:3,date:'2.6.2021'},{id:4,date:'2.6.2021'},
                          {id:5,date:'12.6.2021'},{id:6,date:'12.6.2021'},{id:7,date:'1.9.2022'}]
    const outputObject = CountWiseFilterForUser(inputOrderArray)
    expect(outputObject).toStrictEqual({'counts':[1,1,2,2,1],'dates':['26.5.2020','2.1.2021','2.6.2021','12.6.2021','1.9.2022']})
})

//case 4-> null inputs
test('Should output dateWise S JoinedCustomer Count(null input)',()=>{
    let inputOrderArray =[]
    const outputObject = CountWiseFilterForUser(inputOrderArray)
    expect(outputObject).toStrictEqual({'counts':[],'dates':[]})
})
