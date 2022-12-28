import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import "swiper/css";
import "swiper/css/free-mode";

const TopPlay = () => {
 const dispatch = useDispatch();
 const {activeSong, isPlaying} = useSelector((state)=> state.player)
 const data = useGetTopChartsQuery()
 const divRef = useRef(null)
//  const topPlays = data?.slice(0, 5);



const handlePlayClick = ()=>{
  dispatch(setActiveSong({song, i , data}))
  dispatch(playPause(true))
}
const handlePauseClick = ()=>{
  dispatch(playPause(false))
}
useEffect(()=>{
  divRef.current.scrollIntoView({behaviour: "smooth"})
});

return (
  <div ref={divRef}>
    
  </div>
)

};



export default TopPlay;
