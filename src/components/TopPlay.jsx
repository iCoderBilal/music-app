
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
import { useState } from "react";


const TopChartCard = ({song, i, activeSong, isPlaying, handlePauseClick, handlePlayClick})=>(
   <div className="flex w-full flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
   <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
   <div className="flex-1 flex flex-row justify-between items-center">
   <img src={song?.images?.coverart} alt={song?.title}  className = "rounded-lg w-14 h-14" />

   <div className="flex flex-1 flex-col mx-3 justify-center">
   <Link to={`/songs/${song?.key}`}>
    <p className="text-xl font-bold text-white">{song?.title}</p>
   
   </Link>
   <Link to={`/artists/${song?.artists[0].adamid}`}>
    <p className="text-base text-gray-300 mt-1">{song?.subtitle}</p>
   
   </Link>
   </div>
   </div>

   <PlayPause 
  song = {song}
  handlePlay = {handlePlayClick}
  handlePause = {handlePauseClick}
  isPlaying = {isPlaying}
  activeSong = {activeSong}
  />
   </div>
)

const TopPlay = () => {
 const dispatch = useDispatch();
 const {activeSong, isPlaying} = useSelector((state)=> state.player);
 const {data} = useGetTopChartsQuery();
 const divRef = useRef(null);
 const topPlays = data?.slice(0, 5);

 console.log(topPlays)


const handlePlayClick = (song, i)=>{
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
  <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[400px] max-full-w flex flex-col">
   <div className="w-full flex flex-col">
    <div className="flex flex-row justify-between items-center">
      <h2 className="text-white font-bold text-2xl">
        Top Charts
      </h2>
     <Link to='/top-charts'>
     <p className="text-gray-300 text-base cursor-pointer" >See More</p>
     </Link>
    </div>

    <div className="mt-4 flex flex-col gap-1">
     {topPlays?.map((song,i)=>(
        <TopChartCard 
        key = {song.key}
        song = {song}
        i = {i}
        isPlaying = {isPlaying}
        activeSong = {activeSong}
        handlePauseClick = {handlePauseClick}
        handlePlayClick = {()=>handlePlayClick(song,i)}
        />
      ))}
    </div>
   </div>


   <div className="flex flex-col w-full">
   <div className="flex flex-row justify-between items-center">
      <h2 className="text-white font-bold text-2xl">
        Top Artists
      </h2>
     <Link to='/top-artists'>
     <p className="text-gray-300 text-base cursor-pointer" >See More</p>
     </Link>
    </div>


    
    <Swiper 
    slidesPerView="auto"
    centeredSlides
    spaceBetween={15}
    freeMode
    centeredSlidesBounds
    modules={[FreeMode]}
    >
       {topPlays?.map((song,i)=>(
      <SwiperSlide
      key={song.key}
      style= {{width: "25%" , height:"auto"}}
      className = "shadow-lg rounded-full animate-slideright"
      >

        <Link to={`/artists/${song?.artists[0].adamid}`}>
        <img src={song?.images.background} alt="name" className="rounded-full object-cover w-full" />
        </Link>
        </SwiperSlide>
    ))}

    </Swiper>
    </div>


  </div>
)

};



export default TopPlay;
