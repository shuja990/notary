import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>


      <Card.Body>
        <Link to={`/vendor/${product.vendorId}`}>
          <Card.Title as='div'>
            <strong>{product.vendorName}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
            {product.vendorAddress}
        </Card.Text>

        <Card.Text as='h3'>{product.vendorPhone2}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
