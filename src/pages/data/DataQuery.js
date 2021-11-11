import { gql} from '@apollo/client';

const GET_users = gql`
{
  users{
    id
    createAt
    language
    lastname
    email
    mobile
    paymentMethod
    location{
      Latitude
      Longitude
    }
    username
    address{
      city
      street
    }
  }
}`

const GET_Vendors = gql`
{
  vendors{
  	id
  	createAt
    email
    duration
    location{
      Latitude
      Longitude
    }
    name
    priceRating
    courier{
      name
    }
    rating
    registrationNumber
    available
    address{
      city
      street
    }

  }
}

`
const GET_orders = gql`
{
  orders{
    id
    totalPrice
    status
    createAt
    transactionId
    customerId
    vendorId
    paymentMethod
    items{
      product
      count
    }
  }
}
`

const GET_products = gql`
{
    products{
      id
      vendorId
      photo
      name
    }
}
`
const GET_categories=gql`
{
  categories{
   id
  }
}
`


export {GET_users,GET_Vendors,GET_orders,GET_products,GET_categories}


