import Skeleton ,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from "./ImageLoadingSlider.module.css";
const ImageLoadingSlider = () => {
  return (
<SkeletonTheme baseColor="#ebebeb" highlightColor="#dcdde1" duration="0.5">
    <div>
      <Skeleton className={styles.carousel__skeleton}/>
    </div>
  </SkeletonTheme>
  
  )
}

export default ImageLoadingSlider;