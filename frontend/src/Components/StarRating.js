import { Rating } from '@mui/material';
const StarRating = ({ratings}) => {
  return (
<Rating name="half-rating-read" defaultValue={ratings} precision={0.5} readOnly size="large"/>
  )
}

export default StarRating;