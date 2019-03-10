import * as React from "react";
import "./albumList.scss";

interface IProps {
    albums: Array<any>;
    handlePlay: (album: any) => void;
}

interface IAlbum {
    album: any;
    onPlay: () => void;
}

const Album = ({album, onPlay}: IAlbum) => {
    let picture;
    const pictures = album.common.picture;
    if(pictures && pictures.length) {
        const p = pictures[0];
        picture = `data:${p.format};base64, ${p.data.toString('base64')}`;
    } else {
        return null;
    }

    return <div className="album-list-item">
        <div className="artwork"><img src={picture} alt={album.common.title} /></div>
        <div className="name" onClick={onPlay}>{album.common.title}</div>
    </div>;
}

export default (props: IProps) => (
    <div className="albums">
        <h3 className="title">Album</h3>
        <div className="album-list">{ props.albums.map((album, i) => <Album onPlay={props.handlePlay.bind(null, album)} album={album} key={i} />) }</div>
    </div>
);
