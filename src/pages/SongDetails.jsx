import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';


const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player)
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
    console.log(songData)

    return(
        <div className="flex flex-col">
                 <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">

            {songData?.sections[1].type == "LYRICS" ? songData?.sections[1].text.map((line,i)=>(<p>{line}</p>)) : <p>Sorry, NO lyrics Found!</p>}

        </div>
        </div>
        </div>
    )
};

export default SongDetails;
