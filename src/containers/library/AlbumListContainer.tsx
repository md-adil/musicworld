import * as React from "react";
import * as fs from "fs";
import * as os from "os";
import glob from "glob";
import AlbumList from "../../components/library/AlbumList";
import * as mm from "music-metadata"; 

const tfile = "/Users/adil/Documents/Music/01\ -\ Dhoom\ 3\ -\ Malang\ \[DJMaza.Info\].mp3";
interface IState {
    albums: Array<any>;
    handlePlay: (album: any) => void;
}

class AlbumListContainer extends React.Component<{}, IState> {
    public state = {
        albums: []
    }

    protected getFiles() {
        return new Promise<Array<string>>((resolve, reject) => {
            const home = os.homedir();
            glob(`${home}/Documents/Music/**/*.mp3`, (err, files) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        })
    }

    public async componentDidMount() {
        const files = await this.getFiles();
        const songs = await Promise.all(files.map( file => mm.parseFile(file)));
        this.setState({ albums: songs });
    }

    public handlePlay = (album: any) => {
        console.log('playing', album);
    }

    public render() {
        return <AlbumList handlePlay={this.handlePlay} albums={ this.state.albums }/>
    }
}

export default AlbumListContainer;
